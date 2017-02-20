import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { Header } from 'components';
import { push } from 'react-router-redux';
import { Grid, Row, Col, Button } from 'react-bootstrap/lib';
import { cartLoad, addToCart } from 'redux/modules/cart';
import { getProducts, kitchenWorking } from 'redux/modules/product';
import { categoriesProduct as getCategories } from 'redux/modules/categories';
import styles from './Extras.scss';

@connect(
  (state) => ({
    user: state.auth.user,
    cart: state.cart,
    categories: state.categories,
    products: state.products,
  }),
  {getCategories, getProducts, pushState: push, addToCart, cartLoad, kitchenWorking})
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    cart: PropTypes.object,
    extras: PropTypes.object,
    categories: PropTypes.object,
    routeParams: PropTypes.object,
    cartLoad: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired,
    products: PropTypes.object,
    getProducts: PropTypes.func,
    addToCart: PropTypes.func,
    kitchenWorking: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      showFilters: false,
      activeFilter: null,
      kitchenWorkStatus: null
    };
  }

  componentWillMount() {
    const {
      user,
      categories,
      products,
      cart,
      getCategories,
      getProducts,
      cartLoad,
      kitchenWorking
    } = this.props;

    kitchenWorking().then((kitchenOpen) => {
      this.setState({
        kitchenWorkStatus: kitchenOpen
      });
      getProducts();
    });

    if (typeof(window) === 'undefined') {
      global.window = {};
    }
    // Skip loading data if not necessary e.g.
    // we already have it in store.

    if (user && !Object.keys(cart.item).length) {
      cartLoad(user.id);
    }
    if (!categories.items.length) {
      getCategories();
    }
    if (!products.items.length) {
      getProducts();
    }
  }

  _cartCounter() {
    if (this.props.cart.item.orders) {
      return this.props.cart.item.orders.reduce((c, n) => {
        let _c = c;
        return (_c += n.count);
      }, 0);
    }
    return 0;
  }

  handleChooseFilter(id) {
    this.setState({activeFilter: id});
  }

  handleSubmit() {
    this.props.pushState('/');
  }

  handleClickBack() {
    this.props.pushState('/');
  }

  handleAddToCart(productId) {
    const { user, addToCart } = this.props;
    addToCart(user.id, productId);
  }

  applyFilter = (product) => {
    const { activeFilter } = this.state;
    if (!activeFilter) {
      return product.type === 'side';
    }
    return product.type === 'side' && product.category_id === activeFilter;
  };

  render() {
    const { categories, user, products } = this.props;
    const { activeFilter } = this.state;
    const colWidth = {
      width: categories.items ?
      100 / (categories.items.filter(category => !category.is_primary).length + 1) + '%' : '100%'
    };
    const orderTitle = this.state.kitchenWorkStatus ? 'ORDER NOW' : 'PREORDER';
    const renderFilters = () =>
      <Grid>
        <Row className={styles.filters}>
          <Col
            style={colWidth}
            className={activeFilter === null ? styles.activeFilter : null}
            onClick={this.handleChooseFilter.bind(this, null)}>All
          </Col>
          {
            categories.items &&
            categories.items.map((category, index) => {
              if (!category.is_primary) {
                return (
                  <Col
                    className={activeFilter === category.id ? styles.activeFilter : null}
                    style={colWidth} onClick={this.handleChooseFilter.bind(this, category.id)}
                    key={index}
                  >
                    {category.name}
                  </Col>
                );
              }
            })
          }
        </Row>
      </Grid>;
    const renderExtra = (extras, index) =>
      <Col xs={6} sm={3} key={index}>
        <div className={styles.extraItem}>
          <img src={`/uploads/products/${extras.img}`}/>
          <p className={styles.extraName}>
            {extras.name}
          </p>
          {
            user && user.is_catering &&
            <Button
              className={styles.extrasButton}
              onClick={this.handleAddToCart.bind(this, extras.id)}
            >
              {orderTitle} ${extras.price.toFixed((extras.price % 1 > 0) ? 2 : 0)}
            </Button>
          }
          {
            (!user || user && !user.is_catering) &&
            <div className={styles.buttonsBlock}>
              <Button
                className={styles.extrasButton}
                onClick={this.handleAddToCart.bind(this, extras.id)}
              >
                {orderTitle} - ${extras.price.toFixed((extras.price % 1 > 0) ? 2 : 0)}
              </Button>
            </div>
          }
        </div>
        </Col>;
    return (
      <div className={styles.extras}>
        <Helmet title="Sides"/>
        <Header
          buttonText={'Back'}
          isRed={true}
          pageCaption={<span>sides</span>}
          cartItems={this._cartCounter()}
          btnAction={this.handleClickBack.bind(this)}
        >
          <div className={styles.filtersCaption}>
            {renderFilters()}
          </div>
        </Header>

        <div className={styles.wrapExtrasItems}>
          <Grid>
            <Row>
            {
              products.items &&
              products.items.filter(
                item => this.applyFilter(item)
              ).map((extra, index) => {
                return renderExtra(extra, index);
              })
            }
            </Row>
          </Grid>
        </div>
      </div>
    );
  }
}
