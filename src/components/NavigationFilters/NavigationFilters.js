import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cx from 'classnames';
import styles from './NavigationFilters.scss';
import { push } from 'react-router-redux';


@connect(
  (state) => ({
    categories: state.categories,
  }), {pushState: push}
)
export default class NavigationFilters extends Component {

  static propTypes = {
    categories: PropTypes.object,
    btnAction: PropTypes.func,
    showMenu: PropTypes.bool,
    cartItems: PropTypes.number,
    getProducts: PropTypes.func,
    activeFilter: PropTypes.number,
    pushState: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      mobileView: false,
      showMenu: false,
      showFilters: false,
      activeFilter: null
    };
  }

  componentDidMount() {
    if (typeof(window) === 'undefined') {
      global.window = {};
    }
    this.setState({mobileView: global.window.innerWidth <= 768});
  }

  handleToggleFilters() {
    this.setState({showFilters: !this.state.showFilters});
  }

  chooseFilter(id) {
    this.props.getProducts(id);
    this.setState({showFilters: false});
  }

  render() {
    const { categories, btnAction, showMenu, cartItems, activeFilter } = this.props;
    const { showFilters } = this.state;

    const filterClassAll = cx({
      [styles.navigationFilterItem]: true,
      [styles.navigationFilterItemActive]: activeFilter === null
    });

    const navigationWrapClass = cx({
      [styles.navigationFiltersListWrap]: true,
      [styles.navigationFiltersListWrapOpen]: showFilters
    });

    const menuButton = () => <div className={styles.menuButton}>
       <div className={styles.headerHumburger} onClick={btnAction}>
          <span className={styles.headerHumburgerItem} />
          <span className={styles.headerHumburgerItem} />
          <span className={styles.headerHumburgerItem} />
        </div>
      </div>;

    const cartButton = () =>
      <div className={styles.cartButton}>
        {
          cartItems > 0 &&
          <Link to="/cart" className={styles.cartBox}>
            <span className={styles.cartBoxCounter}>{cartItems > 0 ? cartItems : ''}</span>
          </Link>
        }
      </div>;


    const renderFilters = () =>
      <div className={navigationWrapClass}>
        <div
          className={filterClassAll}
          onClick={this.chooseFilter.bind(this, null)}
        >
          All
        </div>
        {
          categories.items &&
          categories.items.map((category, index) => {
            const filterClass = cx({
              [styles.navigationFilterItem]: true,
              [styles.navigationFilterItemActive]: activeFilter === category.id
            });
            if (category.is_primary) {
              if (category.name === 'Sides') {
                return (
                  <div
                    className={filterClass}
                    onClick={() => this.props.pushState('/extras')}
                    key={index}
                  >
                    {category.name}
                  </div>
                );
              }
              return (
                <div
                  className={filterClass}
                  onClick={this.chooseFilter.bind(this, category.id)}
                  key={index}
                >
                  {category.name}
                </div>
              );
            }
          })
        }


        { /* <div className={styles.navigationFilterItem}>Catering</div> */ }
      </div>;

    return (
      <div className={styles.navigationFilters}>
        <div className={styles.navigationFiltersWrap}>
          {showMenu && menuButton()}
          <nav className={styles.navigationFiltersList}>
            <div className={styles.navigationFilterMobileIconWrap}>
            <span
              onClick={this.handleToggleFilters.bind(this)}
              className={styles.navigationFilterMobileIcon}
            >
              <i className="fa fa-sliders"/>
              Filters
            </span>
            </div>
            {renderFilters()}
        </nav>
         {showMenu && cartButton()}
        </div>
      </div>
    );
  }
}
