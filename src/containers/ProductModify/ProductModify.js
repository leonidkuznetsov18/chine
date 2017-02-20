import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { Header, Preloader } from 'components';
import { push } from 'react-router-redux';
import { getProductDetails } from 'redux/modules/productDetails';
import { kitchenWorking } from 'redux/modules/product';
import { cartLoad } from 'redux/modules/cart';
import { orderCreate, orderRemove, orderUpdate } from 'redux/modules/order';
import { Grid, Row, Col } from 'react-bootstrap/lib';
import { Sticky } from 'react-sticky';
import Rcslider from 'rc-slider';
import { browserHistory } from 'react-router';
import Isvg from 'react-inlinesvg';
import styles from './ProductModify.scss';
import Preload from 'react-preload';
import config from '../../../api/config';

@connect(
  (state) => ({
    user: state.auth.user,
    productDetails: state.productDetails.details,
    kitchenOpen: state.products.kitchenWorking,
    cart: state.cart,
  }),
  {getProductDetails, kitchenWorking, cartLoad, orderCreate, orderRemove, orderUpdate, pushState: push})
export default class ProductModify extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    orderCreate: PropTypes.func,
    orderUpdate: PropTypes.func,
    orderRemove: PropTypes.func,
    cart: PropTypes.object,
    cartLoad: PropTypes.func,
    productDetails: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ]),
    getProductDetails: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
    kitchenWorking: PropTypes.func,
    kitchenOpen: PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      modifiers: [],
      isTransparent: true,
      img: null,
      render: false,
    };
  }

  componentWillMount() {
    const { getProductDetails, user, cartLoad, routeParams: { productId, orderId }, kitchenWorking } = this.props;
    kitchenWorking();
    if (productId) {
      getProductDetails(productId).then(details => {
        this.setState({modifiers: details.product_modifiers, render: true});
      });
    } else if (orderId) {
      cartLoad(user.id).then(cart => {
        const cartOrders = cart.orders;
        const cartOrder = cartOrders.find(co => co.id === parseInt(orderId, 10));
        if (cartOrder) {
          getProductDetails(cartOrder.product_id).then(details => {
            this._mergeModifiers(details.product_modifiers, cartOrder.order_modifiers);
          });
        }
      });
    }
    if (typeof(window) === 'undefined') {
      global.window = {};
    }
    this.setState({windowWidth: global.window.innerWidth});
  }

  componentDidMount() {
    global.window.addEventListener('scroll', this.onStickyStateChangeHeader);
  }

  componentWillUnmount() {
    global.window.removeEventListener('scroll', this.onStickyStateChangeHeader);
  }

  onStickyStateChangeHeader = () => {
    this.setState({ isTransparent: window.pageYOffset <= 0 });
  }

  _mergeModifiers(prodModifiers, modifiers) {
    const productModifiers = Object.assign(prodModifiers);
    modifiers.map(modifier => {
      productModifiers.map(defaultModifier => {
        if (modifier.modifier.type === 'single') {
          if (modifier.modifier.id === defaultModifier.modifier.id) {
            defaultModifier.value = modifier.value;
            defaultModifier.modifier.id = modifier.modifier.id;
          } else {
            defaultModifier.value = 0;
          }
        } else {
          if (modifier.modifier.id === defaultModifier.modifier.id) {
            defaultModifier.value = modifier.value;
          }
        }
        defaultModifier.id = defaultModifier.modifier.id;
      });
    });
    this.setState({modifiers: productModifiers});
  }

  _splitName(name, position) {
    const splittedName = name.split(',');
    if (splittedName.length >= 2) {
      return splittedName[position];
    } else if (splittedName.length === 1) {
      return splittedName[0];
    }
    return '';
  }

  _calculateOrderSumm() {
    const orderModifiers = this.state.modifiers;
    let summ = this.props.productDetails.price;
    if (orderModifiers) {
      for (let i = 0; i < orderModifiers.length; ++i) {
        if (orderModifiers[i].value === 1 || orderModifiers[i].value === 2) {
          summ += orderModifiers[i].modifier.price;
        }
      }
    }
    return summ ? summ.toFixed((summ % 1 > 0) ? 2 : 0) : summ;
  }

  handleSubmit() {
    const { user, productDetails, orderCreate, orderRemove, orderUpdate, routeParams: { orderId } } = this.props;
    if (orderId) {
      orderRemove(orderId).then(() => {
        orderUpdate(orderId, this.state.modifiers).then(() => {
          browserHistory.goBack();
        });
      });
    } else {
      orderCreate(user.id, productDetails.id, this.state.modifiers.filter(m => m.value)).then(() => {
        this.props.cartLoad(user.id);
      });
    }
  }

  handleClickBack() {
    this.props.pushState('/');
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

  handleModiferClick(id, value, type = 'spiciness') {
    let newValue = 0;
    const { modifiers } = this.state;
    if (type !== 'spiciness' && (value === 1 || value === 0)) {
      newValue = 1;
    } else {
      newValue = value;
    }
    modifiers
    .map(m => {
      if (m.modifier.type === 'single' && m.id === id) this.setState({img: m.img});
      if (m.id === id) {
        m.value = newValue;
        if (newValue === 0) {
          this.setState({img: this.props.productDetails.img});
        }
      }
      return m;
    })
    .filter(m => m.modifier.type === type && m.id !== id).map(m => m.value = 0);
    this.setState({modifiers: modifiers});
  }

  handleModiferSwitchesClick(id, value, type = 'spiciness') {
    let newValue = 0;
    const { modifiers } = this.state;
    if (type !== 'spiciness' && (value === 1 || value === 0)) {
      if (value === 1) {
        newValue = 0;
      } else {
        newValue = 1;
      }
    } else {
      newValue = value;
    }
    modifiers
    .map(m => {
      if (m.id === id) {
        m.value = newValue;
      }
      return m;
    })
    .filter(m => m.modifier.type === type && m.id !== id).map(m => m.value = 0);
    this.setState({modifiers: modifiers});
  }

  render() {
    const { productDetails, user, routeParams: {orderId}, cart, kitchenOpen } = this.props;
    const { modifiers } = this.state;
    const renderProteins = (modifiers) =>
      <div className={styles.modifiersContainer}>
        {modifiers && modifiers.map((item, index) => {
          return (
            <div className={styles.proteinBlock} key={index}>
              <div
                className={item.value === 1 ? styles.protein : styles.unactiveProtein}
                onClick={this.handleModiferClick.bind(this, item.id, item.value, item.modifier.type) }
                style={{backgroundImage: `url(/uploads/modifiers/${item.modifier.img})`}}></div>
              <span>{item.modifier.name}</span>
            </div>
            );
        })}
      </div>;

    const renderSwitches = (modifiers) =>
      <div className={styles.switchesContainer}>
        {modifiers && modifiers.map((item, index) => {
          if (item.modifier.type === 'boolean') {
            return (
              <div key={index} className={styles.switches}>
                <div className={item.value === 1 ? styles.switchActive : styles.switchBoolean} onClick={item.value === 0 ? this.handleModiferSwitchesClick.bind(this, item.id, item.value) : null }>{this._splitName(item.modifier.name, 0)}</div>
                <div className={item.value === 0 ? styles.switchActive : styles.switchBoolean} onClick={item.value === 1 ? this.handleModiferSwitchesClick.bind(this, item.id, item.value) : null }>{this._splitName(item.modifier.name, 1)}</div>
              </div>);
          }
        })}
      </div>;


    const CustomHandle = props => {
      let offset;
      switch (props.value) {
        case 0:
          offset = 7;
          break;
        case 1:
          offset = 37.5;
          break;
        case 2:
          offset = 62.5;
          break;
        case 3:
          offset = 93;
          break;
        default:
          offset = props.offset;
          break;
      }
      return (
      <div className={styles.handleBlock}>
        <div
          style={{
            left: `${offset}%`
          }}
        className={styles.sliderHandle}
      />
      </div>
      );
    };

    const renderSpiciness = (modifiers) =>
      <div className={styles.wrapProductSpicinessSlider}>
        {modifiers && modifiers.map((item, index) => {
          if (item.modifier.type === 'spiciness') {
            return (<Rcslider
              key={index}
              step={1}
              min={0}
              max={3}
              onAfterChange={this.handleModiferClick.bind(this, item.id)}
              className={styles.sliderMain}
              defaultValue={0}
              handle={<CustomHandle/>}
              marks={{
                0: '',
                1: '',
                2: '',
                3: ''
              }}
            />);
          }
        })}
      </div>;

    const renderLabels = (labels) =>
      <div className={styles.productLabelsInfoContainer}>
        {labels && labels.map((item, index) => {
          return (
            <div key={index} className={styles.productLabelInfo}>
              <Isvg src={`/uploads/${item.name}.svg`} className={styles.productLabelInfoIcon}/>
              <span className={styles.productLabelInfoName}>{item.name.replace('_', '-')}</span>
            </div>
          );
        })}
      </div>;
    return (
      <div className={styles.productModify}>
        <Helmet title="Today Special"/>
        <Header buttonText={'Back'}
                isTransparent={this.state.isTransparent}
                btnAction={this.handleClickBack.bind(this)}
                cartItems={cart.item !== null && this._cartCounter() }
        />
        {productDetails.img && <Preload
          loadingIndicator={<Preloader/>}
          images={[`${config.SITE_URL}uploads/products/${productDetails.img}`]}
          autoResolveDelay={3000}
          mountChildren
          resolveOnError
        >
          <div className={styles.productImage} style={{backgroundImage: 'url(/uploads/products/' + (this.state.img ? this.state.img : productDetails.img) + ')' }}>
            {productDetails.badge && <span className={styles.productLabel}>{productDetails.badge.name}</span>}
          </div>
        </Preload>}
          <div className={styles.fixedOrder}>
              <div className={styles.productInfo}>
                <div className={styles.productInfoWrap}>
                  <p className={styles.productName}>{productDetails.name}</p>
                  <p className={styles.productSubName}>{productDetails.short_description}</p>
                  {(!user || user && !user.is_catering) &&
                    <div>
                      <div className={styles.aboutBlock}>
                      <p className={styles.productName}>About</p>
                      <p className={styles.productDescription}>
                        {productDetails.description}
                      </p>
                    </div>
                    <Sticky className={styles.stickyBtnProduct} topOffset={-60}>
                      <button
                        className={styles.buyButton}
                        onClick={this.handleSubmit.bind(this)}>{kitchenOpen ? `${orderId ? 'save' : 'order now'}` : 'preorder'} - ${this._calculateOrderSumm()}
                      </button>
                    </Sticky>
                  </div>
                }
                </div>
              </div>
          </div>
          <Grid>
            <div className={styles.wrapContains}>
              {user && user.is_catering &&
              <Row>
                <Col xs={12}>
                  <div className={styles.wrapCountGroup}>
                    <Sticky
                      className={styles.stickyBtnProduct}
                      topOffset={-60}
                    >
                      <button
                        className={styles.buyButton}
                        onClick={this.handleSubmit.bind(this)}>{orderId ? 'save' : 'order now'} - ${this._calculateOrderSumm()}
                      </button>
                    </Sticky>
                  </div>
                </Col>
              </Row>
              }
              <Row>
                {this.state.modifiers.find((m) => m.modifier.type === 'single') &&
                  <Col xs={12}>
                    {renderProteins(modifiers.filter(m => m.modifier.type === 'single'))}
                  </Col>
                  }
                  {this.state.modifiers.find((m) => m.modifier.type === 'starch') &&
                   <Col xs={12}>
                    {renderProteins(modifiers.filter(m => m.modifier.type === 'starch'))}
                  </Col>
                }

                  {this.state.modifiers.find((m) => m.modifier.type === 'boolean') &&
                  <Col xs={12}>
                    {renderSwitches(modifiers)}
                  </Col>
                  }
                  {modifiers.find(modifier => modifier.modifier.type === 'spiciness') &&
                    <Col xs={12}>
                    <div className={styles.productSpicinessSlider}>
                        {renderSpiciness(modifiers)}
                        <div className={styles.spicinessScale}>
                          <span>Not Spicy</span>
                          <span>Mild</span>
                          <span>Spicy</span>
                          <span>Extra Spicy</span>
                        </div>
                  </div>
                </Col>}
              </Row>
              {this.props.productDetails.labels &&
               <Row>
                  <Col xs={12}>
                    {renderLabels(productDetails.labels)}
                  </Col>
              </Row>
            }
          </div>
        </Grid>
        {/* <ModalInfo
           type='extra'
           showModal={true}
           modalBoldTitle='Let’s see&nbsp;if we can deliver to you'
           modalRedBtn='Enter Delivery Address'
           modalUnderlineBtn='Order Carry Out Instead'
         /> */}
      </div>
    );
  }
}
