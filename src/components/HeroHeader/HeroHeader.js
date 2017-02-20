import React, { Component, PropTypes} from 'react';
import styles from './HeroHeader.scss';
import { connect } from 'react-redux';
import logoRed from './logored.svg';
import logoTransparent from './logo.svg';
import Isvg from 'react-inlinesvg';
import cx from 'classnames';
import { push } from 'react-router-redux';

@connect(
  () => ({}),
  {pushState: push})

export default class HeroHeader extends Component {

  static propTypes = {
    pushState: PropTypes.func.isRequired,
    img: PropTypes.string,
    showHeader: PropTypes.bool,
    heroClick: PropTypes.func,
    type: PropTypes.string
  }

  componentWillMount() {
    this.setState({
      cacheBreaker: Date.now(),
    });
  }

  handleClickRegister() {
    this.props.pushState('/register');
  }

  handleClickLogin() {
    this.props.pushState('/login');
  }

  _renderCurrentlyClosedHeader() {
    const { img } = this.props;
    const heroClass = cx({
      [styles.heroHeader]: true,
      [styles.heroHeaderClose]: !this.props.showHeader
    });
    return (
      <div className={heroClass} onClick={this.props.heroClick}>
       <div className={styles.currentlyClosedInfoWrap}>
         <div
           className={styles.heroHeaderBg}
           style={{backgroundImage: `url(/uploads/splash_screen/${img})`}}
         />
         <Isvg src={logoTransparent} className={styles.heroHeaderLogo}/>
         <h2 className={styles.currentlyClosedTitle}>
             Currently Closed
         </h2>
         <h4 className={styles.currentlyClosedSubTitle}>
           Service Hours
           <br/>
          11am - 10pm
         </h4>
       </div>
       <div className={styles.currentlyClosedBottomWrap}>
         <div className={styles.currentlyClosedRedRow}>
           <span className={styles.currentlyClosedRedRowTitle}>Preorder for Lunch</span>
         </div>
       </div>
      </div>
    )
  }

  _renderDefaultHeroHeader() {
    const { img } = this.props;
    const heroClass = cx({
      [styles.heroHeader]: true,
      [styles.heroHeaderClose]: !this.props.showHeader
    });
    return (
      <div className={heroClass} onClick={this.props.heroClick}>
        <div
          className={styles.heroHeaderBg}
          style={{backgroundImage: `url(/uploads/splash_screen/${img})`}}
        />
        <div className={styles.heroHeaderWrap}>
          <Isvg src={logoRed} className={styles.heroHeaderLogo}/>
          <div className={styles.heroHeaderWrapText}>
            <div className={styles.heroHeaderText}>
              FRESH FOOD.&nbsp;
              <br className={styles.brStyle}/>
              FREE DELIVERY.
              <br/>
              NO TIPPING.
            </div>
          </div>
        </div>
      </div>
    )
  }

  _renderCustomHeroHeader(type) {
    switch(type) {
      case 'currentlyClosed' :
        return (
          this._renderCurrentlyClosedHeader()
        )
      default:
        return (
          this._renderDefaultHeroHeader()
        )
    }
  }

  render() {
    return this._renderCustomHeroHeader(this.props.type)
  }
}
