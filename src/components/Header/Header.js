import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Sticky } from 'react-sticky';
import styles from './Header.scss';
import cx from 'classnames';
import Isvg from 'react-inlinesvg';
import arrowBack from '../../../static/uploads/arrow-back.svg';

@connect(
  (state) => ({user: state.auth.user})
)
export default class Header extends Component {
  static propTypes = {
    pageCaption: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.object
    ]),
    user: PropTypes.object,
    cartItems: PropTypes.number,
    buttonType: PropTypes.string,
    isRed: PropTypes.bool,
    isTransparent: PropTypes.bool,
    btnAction: PropTypes.func.isRequired,
    buttonText: PropTypes.string,
    headerHidden: PropTypes.bool,
    children: PropTypes.node
  };

  render() {
    const { btnAction, pageCaption, buttonType, isRed, cartItems, isTransparent, buttonText, user } = this.props;
    const headerClass = cx({
      [styles.header]: true,
      [styles.headerRed]: isRed,
      [styles.headerTransparent]: isTransparent,
      [styles.headerHidden]: this.props.headerHidden
    });

    const renderLeftButton = (buttonText) => <div className={styles.renderLeftButton}>
      {buttonType === 'menu' &&
       <div className={styles.headerHumburger} onClick={btnAction}>
          <span className={styles.headerHumburgerItem}></span>
          <span className={styles.headerHumburgerItem}></span>
          <span className={styles.headerHumburgerItem}></span>
        </div>
      }
      {buttonType === 'menuOpen' &&
        <div className={styles.headerHumburgerOpen} onClick={btnAction}>
          <span className={styles.headerHumburgerItem}></span>
          <span className={styles.headerHumburgerItem}></span>
          <span className={styles.headerHumburgerItem}></span>
        </div>
      }
        {buttonText && <div className={styles.headerBtnBack} onClick={btnAction}>
          <Isvg src={arrowBack} className={styles.headerBtnBackIcon}/>
          <span className={styles.headerBtnBackText}>{buttonText}</span>
        </div>
        }
      </div>;

    return (
      <Sticky style={{zIndex: 9999}}>
        <header className={headerClass}>
          <div className={styles.headerWrapper}>
            {renderLeftButton(buttonText)}
            <h2 className={styles.headerTitle}>{pageCaption}</h2>
            {(cartItems > 0 && user) &&
              <Link to="/cart" className={styles.cartBox}>
               <span className={styles.cartBoxCounter}>{cartItems > 0 ? cartItems : ''}</span>
            </Link>}
          </div>
        </header>
        {this.props.children}
      </Sticky>
    );
  }
}
