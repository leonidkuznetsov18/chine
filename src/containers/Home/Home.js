import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Header, NavigationFilters, HeroHeader, Preloader, ModalInfo } from 'components';
import Helmet from 'react-helmet';
import { getProducts, kitchenWorking } from 'redux/modules/product';
import { addToCart, cartLoad } from 'redux/modules/cart';
import { login, load as loadAuth } from 'redux/modules/auth';
import { register } from 'redux/modules/register';
import { load as configLoad, changeCategoryFilter } from 'redux/modules/config';
import { clearProductDetails } from 'redux/modules/productDetails';
import { categoriesProduct as getCategories } from 'redux/modules/categories';
import { push } from 'react-router-redux';
import { Row, Col, Button } from 'react-bootstrap/lib';
import { Sticky } from 'react-sticky';
import { toggleSidebar } from 'redux/modules/sidebar';
import styles from './Home.scss';
import cx from 'classnames';
import Isvg from 'react-inlinesvg';
import logoIcon from './tsoLogo.svg';
import arrow from './arrow.svg';
import Preload, { ImageHelper } from 'react-preload';
import config from '../../../api/config';
import Scroll from 'react-scroll';
import cookie from 'react-cookie';
import { addressAdd } from 'redux/modules/address';

@connect(
  (state) => ({
    user: state.auth.user,
    products: state.products,
    cart: state.cart,
    categories: state.categories,
    config: state.config,
    isOpen: state.sidebar.isOpen,
    kitchenOpen: state.products.kitchenWorking
  }),
  {
    getProducts, getCategories, addToCart, cartLoad, toggleSidebar, login, register, loadAuth,
    clearProductDetails, changeCategoryFilter, kitchenWorking, pushState: push, configLoad, addressAdd
  })
export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object,
    categories: PropTypes.object,
    cart: PropTypes.object,
    products: PropTypes.object,
    getProducts: PropTypes.func,
    getCategories: PropTypes.func,
    addToCart: PropTypes.func,
    cartLoad: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    toggleSidebar: PropTypes.func,
    clearProductDetails: PropTypes.func,
    config: PropTypes.object,
    configLoad: PropTypes.func,
    changeCategoryFilter: PropTypes.func,
    isOpen: PropTypes.bool,
    kitchenWorking: PropTypes.func,
    kitchenOpen: PropTypes.bool,
    register: PropTypes.func,
    addressAdd: PropTypes.func,
    login: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      mobileView: false,
      showMenu: false,
      showHeader: true,
      headerHidden: false,
      overflowHidden: true,
      images: [],
      showArrow: false,
      showLoader: true,
      showCurrently: false,
      productId: null,
      showModal: false,
      modifierId: null
    };
  }

  componentWillMount() {
    const { getProducts, getCategories, user, cartLoad, configLoad, kitchenWorking } = this.props;
    kitchenWorking().then((kitchenOpen) => {
      try {
        if (global.window.sessionStorage.getItem('showCurrentlyClosed') === 'true' || kitchenOpen) {
          document.body.style.overflow = 'auto';
          this.setState({showCurrently: false});
        } else {
          global.window.sessionStorage.setItem('heroHeader', 'true');
          global.window.sessionStorage.setItem('showCurrentlyClosed', 'true');
          this.setState({
            showCurrently: true,
            headerHidden: false
          });
          document.body.style.overflow = 'hidden';
        }

        if ((user && user.is_active) || global.window.sessionStorage.getItem('heroHeader') === 'true' || !kitchenOpen) {
          if (!this.state.showCurrently) {
            document.body.style.overflow = 'auto';
          }
          this.setState({
            showHeader: false,
          });
        } else {
          document.body.style.overflow = 'hidden';
          global.window.sessionStorage.setItem('heroHeader', 'true');
          this.setState({
            showHeader: true,
            headerHidden: false
          });
        }
      } catch (e) {}
      getProducts().then((product) => {
        configLoad().then(configResp => {
          const images = [
            ...product.map(p => `${config.SITE_URL}uploads/products/${p.img}`),
            `${config.SITE_URL}uploads/splash_screen/${configResp.splash_screen}`];
          // handle loader status manually because of issues with SSR.
          ImageHelper.loadImages(images).then(
            () => this.setState({
              showLoader: false
            }),
            () => this.setState({
              showLoader: false
            })
          );
        });
      });
    });
    getCategories(1);
    if (user) {
      cartLoad(user.id);
    }
    this.setState({
      cacheBreaker: Date.now(),
    });
  }

  componentDidMount() {
    if (typeof (window) === 'undefined') {
      global.window = {};
    }
    this.setState({ mobileView: global.window.innerWidth <= 768 });
    global.window.addEventListener('touchmove', this._handleClickHero); // mobile
    global.window.addEventListener('scroll', this._onStickyStateChangeHeader); // header scroll
    if (window.screen.availWidth > 1024) {
      window.onscroll = function(event) {
       let scrolled = window.pageYOffset || document.documentElement.scrollTop;
       if (scrolled >= 4 && scrolled <= 50) {
         event.preventDefault();
       } else {
         if (scrolled >= 1 && scrolled <= 4) {
           window.scrollTo(0, 85);
         }else if (scrolled >= 50 && scrolled <= 80) {
           window.scrollTo(0, 0);
         }
       }
      };
    }
  }

  componentWillUnmount() {
    global.window.removeEventListener('touchmove', this._handleClickHero); // mobile
    global.window.removeEventListener('scroll', this._onStickyStateChangeHeader); // header scroll
  }

  onShowModal = () => {
    this.setState({
      showModal: true
    });
  };

  onHideModal = () => {
    this.setState({
      showModal: false
    });
    global.window.sessionStorage.removeItem('preorder');
  };

  _handleClickHero = () => {
    const foo = () => {
      document.body.style.overflow = 'auto';
      this.setState({
        overflowHidden: false
      });
    };
    if (this.state.overflowHidden) {
      this.setState({
        showHeader: false,
        showCurrently: false
      });
      setTimeout(foo, 1000);
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

  _isProductInCart(productId) {
    const { cart } = this.props;
    if (cart.item && cart.item.orders) {
      return (cart.item.orders.filter(order => {
        return (
          order.product_id === productId &&
          order.count > 0 &&
          !order.order_modifiers.length
        );
      }).length > 0);
    }
    return false;
  }

  handleMenuClick() {
    this.props.toggleSidebar(true);
    this.setState({
      overflowHidden: false,
    });
  }

  chooseFilter(id) {
    this.props.changeCategoryFilter(id);
  }

  handleStickyStateChange(status) {
    this.setState({ showMenu: status });
  }

  handleAddToCart(productId) {
    const { user, addToCart } = this.props;
    if (user && user.addresses.length > 0) {
      addToCart(user.id, productId);
    } else {
      this.setState({showModal: true, productId: productId});
    }
  }

  _userToCookieAndRedirect(user) {
    cookie.save('user', user.token);
    if (this.state.modifierId) {
      this.props.pushState('modify/product/' + this.state.modifierId);
    } else {
      this.props.pushState('/');
    }
  }

  _addToCart(user) {
    const { addToCart, cartLoad } = this.props;
    const productId = global.window.sessionStorage.getItem('preorder');
    if (productId) {
      return addToCart(user.id, productId).then(() => {
        global.window.sessionStorage.removeItem('preorder');
        return cartLoad(user.id);
      });
    }
    return cartLoad(user.id);
  }

  handleRedirect(type) {
    const {register, addressAdd, login } = this.props;
    const formattedData = {out_of_range: true, is_default: false};
    global.window.sessionStorage.setItem('preorder', this.state.productId.toString());
    if (type === 'delivery') {
      if (this.state.modifierId) {
        this.props.pushState('/address?' + this.state.modifierId);
      } else {
        this.props.pushState('/address');
      }
    } else {
      register({ isActive: false }).then((newUser) => {
        formattedData.user_id = newUser.id;
        addressAdd(formattedData).then(() => {
          login(newUser.email, 'newPassword').then((_user) => {
            this._addToCart(_user).then(() => {
              this._userToCookieAndRedirect(_user);
              this.setState({showModal: false});
            });
          });
        });
      });
    }
  }

  handleExtrasClick(productId) {
    const cartItems = this.props.cart.item.orders;
    for (let i = 0; i < cartItems.length; ++i) {
      if (cartItems[i].product_id === productId) {
        const cartId = cartItems[i].id;
        this.props.pushState(`/extras/${cartId}`);
      }
    }
  }

  handleModifyClick(productId) {
    this.props.clearProductDetails();
    if (this.props.user || this.state.address) {
      this.props.pushState(`/modify/product/${productId}`);
    } else {
      this.setState({showModal: true, productId: productId, modifierId: productId});
    }
  }

  _onStickyStateChangeHeader = () => {
    this.setState({ showArrow: window.pageYOffset > window.innerHeight });
    if (window.pageYOffset <= 0) {
      this.setState({
        headerHidden: false
      });
    } else {
      this.setState({
        headerHidden: true
      });
    }
  }

  handleScrollToTop() {
    const scroll = Scroll.animateScroll;
    scroll.scrollToTop({duration: 500});
  }

  applyFilters = (product) => {
    const { config } = this.props;
    if (config) {
      const { activeFilter } = config;
      if (!activeFilter) {
        return product.type === 'product';
      }
      return product.type === 'product' && product.category_id === activeFilter;
    }
  };

  render() {
    const { showMenu, mobileView, images } = this.state;
    const { products, cart, user, config, kitchenOpen } = this.props;
    const containerClass = cx({
      [styles.containerTransform]: true,
      [styles.containerTransformOpen]: !this.state.showHeader
    });
    const arrowButton = cx({
      [styles.arrowToTop]: true,
      [styles.arrowToTopWithIndent]: (user && user.addresses.length === 0) || !user
    });

    const renderProduct = (product, index) =>
        <Row key={index}>
          <Col xs={12} >
            <div className={styles.productImage} onClick={this.handleModifyClick.bind(this, product.id) }>
              <img src={'/uploads/products/' + product.img} />
            </div>
            <div className={styles.whiteArea}>
              {product.badge && <span className={styles.productLabel}>{product.badge.name}</span>}
              <Row>
                <Col xs={12}>
                  <p className={styles.productName}>{product.name}</p>
                  <p className={styles.productSubName}>{product.short_description}</p>
                </Col>
              </Row>
              {(!user || user && !user.is_catering) &&
                <Row className={styles.buttonsBlock}>
                  <Col sm={6} mdOffset={1} lgOffset={2} xs={12} md={5} lg={4} >
                    <div className={styles.leftButton} >
                      <Button className={styles.detailsButton}
                        onClick={this.handleModifyClick.bind(this, product.id) }>
                        CUSTOMIZE
                      </Button>
                    </div>
                  </Col>
                  {this._isProductInCart(product.id) &&
                    <Col sm={6} xs={12} md={5} lg={4}>
                      <div className={styles.doubleButton}>
                        <Button className={styles.buyWithExtrasButton} onClick={this.handleAddToCart.bind(this, product.id) }>{kitchenOpen ? 'ONE MORE' : 'preorder'} — ${product.price.toFixed((product.price % 1 > 0) ? 2 : 0 ) }</Button>
                        <Button className={styles.extrasButton} onClick={this.handleExtrasClick.bind(this, product.id) }>{kitchenOpen ? '+sides' : 'side'}</Button>
                      </div>
                    </Col>}
                  {!this._isProductInCart(product.id) &&
                    <Col sm={6} xs={12} md={5} lg={4} >
                      <div className={styles.rightButton} >
                        <Button
                          className={styles.buyButton}
                          onClick={this.handleAddToCart.bind(this, product.id)}
                        >{kitchenOpen ? 'order now' : 'preorder'} — ${ product.price ? product.price.toFixed((product.price % 1 > 0) ? 2 : 0 ) : 0 }</Button>
                      </div>
                    </Col>}
                </Row>}
              {user && user.is_catering &&
                <Row className={styles.buttonsBlock}>
                  <Col xs={12}>
                    <div className={styles.centerWrapBtn}>
                      <button className={styles.redBtn}>Order now &amp; trays number</button>
                      <button className={styles.extrasBtn}>+sides</button>
                    </div>
                  </Col>
                </Row>
              }
            </div>
          </Col>
        </Row>;
    return (
      <Preload
        loadingIndicator={<Preloader/>}
        images={images}
        mountChildren={!this.state.showLoader}
        resolveOnError
      >
      <div className={styles.home}>
        <HeroHeader
          img={config.item && config.item.splash_screen}
          showHeader={this.state.showHeader}
          heroClick={this._handleClickHero}
          />
        <HeroHeader
          type='currentlyClosed'
          img={config.item && config.item.splash_screen}
          showHeader={this.state.showCurrently}
          heroClick={this._handleClickHero}
          />
        <Helmet title="Home"/>
        <div className={containerClass}>
          <Header
            pageCaption={mobileView ? <span>tso chinese delivery</span> : <Isvg src={logoIcon} className={styles.homeLogo} />}
            buttonType={'menu'}
            isRed={mobileView ? true : false}
            cartItems={cart.item !== null && this._cartCounter() }
            btnAction={this.handleMenuClick.bind(this) }
            headerHidden={this.state.headerHidden}
            />
          {(this.state && this.state.showArrow && this.props && !this.props.isOpen) && <div className={arrowButton} onClick={this.handleScrollToTop} ><Isvg src={arrow} className={styles.arrowIcon} /></div>}
          <Sticky onStickyStateChange={this.handleStickyStateChange.bind(this) } style={{ position: 'relative', zIndex: 9999 }}>
            <NavigationFilters
              activeFilter={config && config.activeFilter || null}
              getProducts={this.chooseFilter.bind(this) }
              btnAction={this.handleMenuClick.bind(this) }
              cartItems={cart.item !== null && this._cartCounter() }
              showMenu={showMenu}
              />
          </Sticky>
          <div className={styles.wrapperProduct}>
            {products.items && products.items.filter(product => this.applyFilters(product)).map((product, index) => {
              return renderProduct(product, index);
            }) }
          </div>
          {((user && user.addresses.length === 0 || !user) && !this.state.address) &&
            <div className={styles.doWeDeliver}>
              <a onClick={() => this.props.pushState('/address')}>do we deliver in your area?</a>
            </div>}
        </div>
        {this.state.showModal &&
         <ModalInfo
            onShow={this.onShowModal}
            onHide={this.onHideModal}
            type="extra"
            showModal={this.state.showModal}
            modalBoldTitle="Let’s see&nbsp;if we can deliver to you"
            modalRedBtn="Enter Delivery Address"
            modalUnderlineBtn="Order Carry Out Instead"
            onClickModalRedBtn={this.handleRedirect.bind(this, 'delivery')}
            onClickModalUnderlineBtn={this.handleRedirect.bind(this, 'carryOut')}
          />
        }
    </div>
      </Preload>
    );
  }
}
