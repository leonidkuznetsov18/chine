import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { Header, AddressLine, TimeSlider, TotalAmount, ModalInfo, Preloader } from 'components';
import { push } from 'react-router-redux';
import { Row, Col } from 'react-bootstrap/lib';
import { kitchenWorking } from 'redux/modules/product';
import {
  cartLoad,
  setDeliveryTime,
  payAuthorized,
  togglePickupOption,
  applyPromoCode,
  removePromoCode,
  clearPromoCodeErrors,
  changeProductsCounter,
  changeExtraCounter,
  updateAdditionalItems,
  setTime,
  getSliderMarks,
  updateNotes
} from 'redux/modules/cart';
import { clearProductDetails } from 'redux/modules/productDetails';
import { updateAddress } from 'redux/modules/address';
import {load as configLoad} from 'redux/modules/config';
import chopstiks from '../../../static/uploads/chopsticks.svg';
import utensils from '../../../static/uploads/utensils.svg';
import plate from '../../../static/uploads/plate.svg';
import arrowRight from '../../../static/uploads/arrow-right.svg';
import Isvg from 'react-inlinesvg';
import styles from './Cart.scss';
import config from '../../config';
import {applyPromoCode as checkPromoCode} from '../../../api/utils/promo_code';
import CartCalculator from '../../utils/cartCalculator';
import cx from 'classnames';
import { Link } from 'react-router';
import { cardType } from 'redux/modules/card';

@connect(
  (state) => ({
    user: state.auth.user,
    cart: state.cart.item,
    disabled: state.cart.loading,
    savedTime: state.cart.timeValue,
    promoCodeErrors: state.cart.promoCodeErrors,
    cartConfig: state.config.item,
    card: state.card,
    sliderMarks: state.cart.sliderMarks,
    notes: state.cart.notes
  }),
  { cartLoad, changeProductsCounter, changeExtraCounter,
    setDeliveryTime, togglePickupOption, payAuthorized, updateNotes, cardType,
    updateAdditionalItems, applyPromoCode, clearProductDetails, removePromoCode,
    clearPromoCodeErrors, updateAddress, configLoad, setTime, getSliderMarks, kitchenWorking,
    pushState: push })
export default class Cart extends Component {
  static propTypes = {
    user: PropTypes.object,
    cart: PropTypes.object,
    payAuthorized: PropTypes.func,
    cartLoad: PropTypes.func,
    changeCounter: PropTypes.func,
    setDeliveryTime: PropTypes.func,
    changeCounterExtras: PropTypes.func,
    changeCounterUtensils: PropTypes.func,
    changeCounterChopstiks: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    configLoad: PropTypes.func,
    togglePickupOption: PropTypes.func,
    changeProductsCounter: PropTypes.func,
    toggleSidebar: PropTypes.func,
    disabled: PropTypes.bool,
    updateAdditionalItems: PropTypes.func,
    removePromoCode: PropTypes.func,
    applyPromoCode: PropTypes.func,
    clearProductDetails: PropTypes.func,
    clearPromoCodeErrors: PropTypes.func,
    cartConfig: PropTypes.object,
    card: PropTypes.object,
    setTime: PropTypes.func,
    savedTime: PropTypes.number,
    sliderMarks: PropTypes.object,
    getSliderMarks: PropTypes.func,
    kitchenWorking: PropTypes.func,
    updateAddress: PropTypes.func,
    updateNotes: PropTypes.func,
    notes: PropTypes.string,
    cardType: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      headerError: '',
      promoCode: '',
      promoCodeErrors: [],
      isPromocode: false,
      disabled: false,
      showPreloader: false,
      utensils: null,
      chopstiks: 0,
      kitchenOpen: null,
      showInstruction: false,
      modalPromoCode: false,
      modalTip: false,
    };
  }

  componentWillMount() {
    const {
      cartLoad,
      user,
      configLoad,
      cart,
      updateAdditionalItems,
      getSliderMarks,
      kitchenWorking,
      updateNotes,
      notes,
      cardType
    } = this.props;
    kitchenWorking().then(value => {
      this.setState({kitchenOpen: value});
    });
    if (user.cards.length) {
      cardType(user.id);
    }
    cartLoad(user.id).then((cart) => {
      if (!notes) {
        updateNotes(cart.address.notes);
      }
      if (cart && cart.address) {
        if (cart.address.out_of_range && !cart.pickup) {
          this.props.togglePickupOption(
            cart.id, true
          );
        }
      }
      if (!this.state.promoCode) {
        this.setState({promoCode: cart.promo_code ? cart.promo_code.name : ''});
      }
      if (this.state.promoCode) {
        this.setState({disabled: true});
      }
    });
    getSliderMarks();
    configLoad();
    let utensilsCount = null;
    let chopstiksCount = null;
    let utensils;
    if (cart && cart.orders) {
      utensilsCount = cart.orders.reduce((sum, current) => {
        return sum + current.count;
      }, 0);
      utensils = cart.utensils >= utensilsCount ? cart.utensils : utensilsCount;
      chopstiksCount = cart.chopsticks;
      updateAdditionalItems(cart.id, 'utensils', null, utensils);
      this.setState({utensils: utensils});
      this.setState({chopsticks: chopstiksCount});
    }
  }

  componentWillReceiveProps(nextProps) {
    const {cart, removePromoCode, promoCodeErrors } = nextProps;
    if (cart && cart.promo_code && checkPromoCode(cart.promo_code, cart).length) {
      removePromoCode(cart.id).then(() => {
        this.setState({
          promoCode: '',
          discountValue: null
        });
      });
    }
    if (promoCodeErrors && promoCodeErrors.length) {
      this._toggleModal(promoCodeErrors[0], '', 'try again');
      this.setState({disabled: false});
    }
  }

  onPromoCodeChange = (value) => {
    if (!/^.*[A-Za-z0-9].*$/.test(value) && value !== '') {
      return;
    }
    this.setState({promoCode: value});
  };


  onShowModalPromoCode = () => {
    this.setState({
      modalPromoCode: true
    });
  };

  onShowModalTip = () => {
    this.setState({
      modalTip: true
    });
  };


  onHideModalPromoCode = () => {
    const { clearPromoCodeErrors } = this.props;
    clearPromoCodeErrors();
    this.setState({
      modalPromoCode: false
    });
  };

  onHideModalTip = () => {
    this.setState({
      modalTip: false
    });
  };

  /**
   * Perform network request to remove promo code from cart
   * and then clear promo code input;
   */
  onPromoCodeRemove = (cartId) => {
    this.props.removePromoCode(cartId);
    this.setState({
      promoCode: ''
    });
  };

  onClick = (href) => {
    this.setState({
      showModal: false
    }, () => {
      this.props.toggleSidebar();
      this.props.pushState(href);
    });
  }

  setDeliveryTime(val) {
    const { kitchenOpen } = this.state;
    const { cart, setDeliveryTime } = this.props;
    if (cart.id) {
      setDeliveryTime(cart.id, val, kitchenOpen);
    }
  }

  _togglePickupOption = () => {
    const {cart} = this.props;
    if (cart.address.out_of_range) {
      this._toggleModal('Sorry, your current delivery address is outside our delivery area.', '', 'Change address', this._deliveryChangeAddress);
      return;
    }
    this.props.togglePickupOption(
      cart.id, !cart.pickup
    );
  };

  _deliveryChangeAddress = () => {
    const {cart, user} = this.props;
    if (cart.address.out_of_range) {
      if (user && user.is_active) {
        this.props.togglePickupOption(cart.id, !cart.pickup).then(() => {
          this.props.pushState('/profile/address/list?change-address');
        });
      } else {
        this.props.togglePickupOption(cart.id, !cart.pickup).then(() => {
          this.props.pushState('/address?change-address');
        });
      }
    }
  }

  _toggleModal = (error, headerError, closeButtonText, func = this.onHideModalPromoCode) => {
    this.setState({
      modalPromoCode: !this.state.modalPromoCode,
      error: error,
      headerError: headerError,
      closeButtonText: closeButtonText,
      onClickModalBtn: func
    });
  };

  _decrease(itemId, count) {
    let _count = count;
    let _utensils = this.state.utensils;
    const finalCount = _count > 0 ? --_count : _count;
    const { changeProductsCounter } = this.props;
    changeProductsCounter(itemId, finalCount);
    if (--_utensils >= 0) {
      this.setState({utensils: _utensils});
    }
  }

  _increase(itemId, count) {
    let _count = count;
    let _utensils = this.state.utensils;
    const { changeProductsCounter } = this.props;
    changeProductsCounter(itemId, ++_count);
    this.setState({utensils: ++_utensils});
  }

  updateAdditionalItems = (type, action, count) => {
    const { updateAdditionalItems, cart} = this.props;
    try {
      // if count = 0 and we need decrement it
      if (action == 'decrement' && !count) {
        throw new Error('count is 0');
      }
      const finalCount = action == 'decrement' ? --count : ++count;
      if (type == 'utensils') {
        this.setState({utensils: finalCount});
      }
      if (type == 'chopsticks') {
        this.setState({chopsticks: finalCount});
      }
      updateAdditionalItems(cart.id, type, action);
    } catch (e) {}
  }

  _pay() {
    const cartProps = new CartCalculator(this.props.cart).parseCart();
    const productsCount = cartProps.items.reduce((c, n) => {
      let _c = c;
      if (n.type === 'product') {
        return (_c += n.count);
      }
      return _c;
    }, 0);
    if (productsCount < 1) {
      this._toggleModal('There are only sides in your cart. Choose products please from our menu.', '', 'close');
      return;
    }
    const count = this.refs.utensils.value;
    const { payAuthorized, user, cart, updateAdditionalItems, setTime, notes, updateAddress } = this.props;
    updateAddress(cart.address.id, {notes: notes});
    updateAdditionalItems(cart.id, 'utensils', null, count).then(() => {
      if (user.cards.length) {
        this.setState({showPreloader: true});
        payAuthorized(user.id, (cartProps.total - cartProps.discount).toFixed(2)).then(() => {
          setTime(0);
          this.props.pushState(`/order-status/${cart.id}?payment`);
        }).catch(() => {
          this._toggleModal('we are sorry - your payment did not go through', 'unsuccsessful', 'try again');
          this.setState({showPreloader: false});
        });
      } else {
        this.props.pushState('/profile/card/add?id=' + user.id);
      }
    });
  }

  redirectToModify(orderId) {
    this.props.clearProductDetails();
    this.props.pushState(`/modify/order/${orderId}`);
  }

  handleClickBack() {
    this.props.pushState('/');
  }

  handleRedirectAddress() {
    const { user } = this.props;
    if (user && user.is_active) {
      this.props.pushState('/profile/address/list?change-address');
    } else {
      this.props.pushState('/address?change-address');
    }
  }

  manualChangeUtensilsAndChopsticks = (type, e) => {
    if (!/\d+$/.test(e.target.value)) {
      return;
    }
    const {cart, changeCounterChopstiks, changeCounterUtensils} = this.props;
    const action = type === 'utensils' ? changeCounterUtensils : changeCounterChopstiks;
    action(cart.id, e.target.value);
  };

  handleCheckbox = () => {
    this.setState({isPromocode: !this.state.isPromocode});
  }

  handleInstructionCheckbox = () => {
    this.setState({showInstruction: !this.state.showInstruction});
  }

  handleInput = (e) => {
    const { updateNotes } = this.props;
    updateNotes(e.target.value);
  }

  render() {
    const { cart, user, cartConfig, savedTime, sliderMarks, card } = this.props;
    let cartProps = {};
    let totalAmount = null;
    let discountValue = null;
    let totalWithDiscount = null;
    let discount = null;
    let total = null;
    if (cart.orders) {
      cartProps = new CartCalculator(cart).parseCart();
      discount = cartProps.discount;
      total = cartProps.total;
      totalAmount = total.toFixed((total % 1 > 0) ? 2 : 0 );
      discountValue = discount.toFixed((discount % 1 > 0) ? 2 : 0);
      totalWithDiscount = (total - discount) > 0 ? (total - discount).toFixed(((total - discount) % 1 > 0) ? 2 : 0) : 0;
    }
    if (cart && cart.orders) {
      if (this.state.utensils == null) {
        const utensilsCount = cart.orders.reduce((sum, current) => {
          return sum + current.count;
        }, 0);
        const utensils = cart.utensils >= utensilsCount ? cart.utensils : utensilsCount;
        if (utensilsCount != 0) {
          this.setState({utensils: utensils});
        } else {
          this.setState({utensils: 0});
        }
      }
    }
    const renderModifiers = (modifiers) =>
      <span>
        {modifiers.filter(m => m.modifier.type !== 'spiciness').map((item, index) => {
          const delimiter = index === 0 ? '' : ',';
          if (item.modifier.type === 'single' || item.modifier.type === 'starch') {
            return (`${delimiter} ${item.modifier.name}`);
          } else if (item.modifier.type === 'boolean') {
            return (`${delimiter} ${item.modifier.name.split(',')[!item.value ? 1 : 0]}`);
          }
        }) }
      </span>;

    const renderCartItem = (item, key) => {
      const total = (item.price * item.count).toFixed((item.price * item.count) % 1 > 0 ? 2 : 0);
      if (item.count > 0) {
        return (
          <div className={styles.foodRow} key={key}>
            <div className={styles.foodCol}>
              <div
                className={
                  item.type === 'product' ?
                    styles.foodNameWrapPointer :
                    styles.foodNameWrap
                }
                onClick={item.type === 'product' && this.redirectToModify.bind(this, item.orderId)}
              >
                <div className={styles.foodName}>{item.name}</div>
                <div className={styles.foodConsist}>
                  {(item.type === 'product' && !item.is_default) && renderModifiers(item.modifiers)}
                </div>
                <div className={styles.foodPrice} style={(item.discount && item.withDiscount) ? {textDecoration: 'line-through', color: '#9b9fa5'} : {}}>${total} (${item.price}x{item.count})</div>
                {item.discount && item.withDiscount > 0 && <div className={styles.foodPrice}>${(total - (item.discount * item.withDiscount)).toFixed((total - (item.discount * item.withDiscount)) % 1 > 0 ? 2 : 0)}</div> || null}
              </div>
            </div>
            <div className={styles.foodCol}>
              <div className={styles.foodButtonsGroup}>
                <button className={styles.foodToggleButton}
                        disabled={this.props.disabled}
                        onClick={this._decrease.bind(this, item.orderId, item.count)}>-</button>
                <input type="text" value={item.count} className={styles.foodInputNum} readOnly={true}/>
                <button className={styles.foodToggleButton}
                        disabled={this.props.disabled}
                        onClick={this._increase.bind(this, item.orderId, item.count)}>+</button>
              </div>
            </div>
          </div>
        );
      }
    };
    const pickupProps = cart.pickup ? {
      title: 'Carryout From',
      sliderText: 'Choose carryout time'
    } : {
      title: 'Deliver To',
      sliderText: 'Choose your delivery time'
    };

    return (
      <div className={styles.cart}>
        {
          this.state.showPreloader && <Preloader/>
        }
        <Helmet title={pickupProps.title}/>
        <Header buttonText={'Back'}
          isRed={true}
          pageCaption={<span>{pickupProps.title}</span>}
          cartItems={this.state ? this.state.countWithExtras : 0}
          btnAction={this.handleClickBack.bind(this) }
        >
        {(cart.orders && cart.orders.find(o => o.count > 0) && cart.address) && <AddressLine address={cart.pickup ? config.pickupAddress : cart.address} redirectAddress={!cart.pickup ? this.handleRedirectAddress.bind(this) : null} />}
        {(cart.orders && !cart.orders.find(o => o.count > 0)) && <div className={styles.emptyCart}><span className={styles.emptyCartText}>Cart is empty</span></div>}
      </Header>
        <div className={styles.cartWrapTable}>
          <div className={styles.cartContainer}>
          {this.props.cart &&
           <Row>
              <Col xs={12}>
                <div className={styles.switches}>
                  <div
                    className={cart.pickup ? styles.switchBoolean : styles.switchActive}
                    onClick={cart.pickup ? this._togglePickupOption : null}
                  >
                    Delivery
                  </div>
                  <div
                    className={cart.pickup ? styles.switchActive : styles.switchBoolean}
                    onClick={!cart.pickup ? this._togglePickupOption : null}
                  >
                    Carryout
                  </div>
                </div>
              </Col>
            </Row>
          }
            <Row>
              <Col xs={12}>
                <h4 className={styles.cartTitle}>
                  {pickupProps.sliderText}
                </h4>
              </Col>
            </Row>
            {
              sliderMarks && cart &&
              <Row>
                <Col xs={12}>
                  <div className={styles.cartWrapTimeSlider}>
                    <TimeSlider
                      savedTime={this.props && savedTime ? savedTime : null }
                      setTime={this.props.setTime}
                      changeSlider={this.setDeliveryTime.bind(this) }
                      asapTime={cart.pickup ? cartConfig.carry_out_asap_time : cartConfig.asap_time}
                      marks={cart.pickup ? sliderMarks.carry_out : sliderMarks.delivery}
                    />
                  </div>
                </Col>
              </Row>
            }
            <Row>
              <Col xs={12}>
                {
                  cartProps.items && cartProps.items.map((item, key) => {
                    return renderCartItem(item, key);
                  })
                }

                <div className={styles.foodRow}>
                  <div className={styles.foodCol}>
                    <div className={styles.foodCutlery}>
                      <Isvg src={chopstiks} className={styles.foodIcon}/>
                      <span className={styles.foodCutleryName}>Chopsticks</span>
                    </div>
                  </div>
                  <div className={styles.foodCol}>
                    <div className={styles.foodButtonsGroup}>
                      <button className={styles.foodToggleButton}
                        disabled={this.props.disabled}
                        onClick={() => this.updateAdditionalItems('chopsticks', 'decrement', this.state.chopsticks)}>-</button>
                      <input type="text" ref="chopsticks"
                        value={this.state.chopsticks ? this.state.chopsticks : 0}
                        className={styles.foodInputNum}
                        onChange={(e) => this.manualChangeUtensilsAndChopsticks('chopsticks', e)}
                      />
                      <button className={styles.foodToggleButton}
                        disabled={this.props.disabled}
                        onClick={() => this.updateAdditionalItems('chopsticks', 'increment', this.state.chopsticks)}>+</button>
                    </div>
                  </div>
                </div>

                <div className={styles.foodRow}>
                  <div className={styles.foodCol}>
                    <div className={styles.foodCutlery}>
                      <Isvg src={utensils} className={styles.foodIcon}/>
                      <span className={styles.foodCutleryName}>Utensils</span>
                    </div>
                  </div>
                  <div className={styles.foodCol}>
                    <div className={styles.foodButtonsGroup}>
                      <button className={styles.foodToggleButton}
                        disabled={this.props.disabled}
                        onClick={() => this.updateAdditionalItems('utensils', 'decrement', this.state.utensils)}>-</button>
                      <input type="text" ref="utensils"
                        value={this.state.utensils ? this.state.utensils : 0}
                        className={styles.foodInputNum}
                        onChange={(e) => this.manualChangeUtensilsAndChopsticks('utensils', e)}
                      />
                      <button className={styles.foodToggleButton}
                        disabled={this.props.disabled}
                        onClick={() => this.updateAdditionalItems('utensils', 'increment', this.state.utensils)}>+</button>
                    </div>
                  </div>
                </div>
                 { user && user.is_catering &&
                  <div className={styles.foodRow}>
                    <div className={styles.foodCol}>
                     <div className={styles.foodCutlery}>
                       <Isvg src={plate} className={styles.foodIcon}/>
                       <span className={styles.foodCutleryName}>Plates</span>
                     </div>
                    </div>
                    <div className={styles.foodCol}>
                      <div className={styles.foodButtonsGroup}>
                        <button className={styles.foodToggleButton}
                                 >-</button>
                        <input type="text" ref="plates"
                              value="0"
                              className={styles.foodInputNum}/>
                        <button className={styles.foodToggleButton}
                               >+</button>
                      </div>
                    </div>
                  </div>
                  }
                  <div className={styles.wrapNotationBlock}>
                    <div className={styles.checkbox}>
                      <input type="checkbox" id="chB" onChange={this.handleCheckbox}/>
                      <label htmlFor="chB">I have a coupon code</label>
                    </div>
                    {
                    this.state.isPromocode &&
                    <div className={styles.promoCode}>
                      <h3 className={styles.promoCodeTitle}>Do you have a promo code? Type it here</h3>
                      <div className={styles.promoCodeWrapper}>
                        <div className={styles.formGroup}>
                          <div className={styles.inputGroup}>
                            <input
                              value={this.state.promoCode}
                              onChange={(e) => this.onPromoCodeChange(e.target.value)}
                              disabled={this.state.disabled}
                            />
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            this.setState({disabled: !this.state.disabled});
                            if (this.state.disabled === false) {
                              this.props.applyPromoCode({
                                promo_code: this.state.promoCode,
                                cart_id: cart.id
                              });
                            } else {
                              this.onPromoCodeRemove(cart.id);
                            }
                          }}
                          className={styles.transparentBtn}
                        >
                          {cart && !cart.promo_code ? 'APPLY' : 'REMOVE CODE'}
                        </button>
                      </div>
                    </div>
                  }
                  </div>
                {!cart.pickup &&
                  <div className={styles.wrapNotationBlock}>
                    <div className={styles.checkbox}>
                      <input type="checkbox" id="di" onChange={this.handleInstructionCheckbox} />
                      <label htmlFor="di">Delivery instructions</label>
                    </div>
                  {this.state.showInstruction &&
                    <div className={styles.promoCode}>
                      <h3 className={styles.promoCodeTitle}>Add delivery instructions</h3>
                      <div className={cx({
                        [styles.promoCodeWrapper]: true,
                        [styles.notOffsetRight]: true
                      })}>
                        <div className={styles.formGroup}>
                          <div className={styles.inputGroup}>
                            <textarea
                            defaultValue={this.props && this.props.notes ? this.props.notes : ''}
                            onChange={this.handleInput}
                            maxLength={255}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              }
                {/* {discount && <TotalAmount type="order" amount={totalAmount} /> || null}
                {discount && <TotalAmount type="promo" amount={discountValue} /> || null}
                {total ? <TotalAmount type="total" amount={totalWithDiscount}/> : <TotalAmount type="total" amount={0}/> } */}
              </Col>
            </Row>
          </div>
          <div className={styles.controlPaymentsContainer}>
            <div className={styles.controlPaymentsWrap}>
              <Row>
                <Col xs={12}>
                  <div className={styles.paymentForm}>
                    <div className={styles.paymentFormContainer}>
                      <div className={styles.wrapPaymentForm}>
                        <Link to="profile/card/list?add-card" className={styles.paymentFormRow}>
                          <div className={styles.paymentFormColumn}>
                            <span className={styles.paymentText}>
                              Payment
                            </span>
                          </div>
                          {user.cards.length && card && card.card &&
                          <div className={styles.paymentFormColumn}>
                            <span className={styles.paymentText}>
                              {card.card.cardType} ****{card.card.cardNumber}
                            </span>
                            <Isvg src={arrowRight} className={styles.paymentArrowRight}/>
                          </div> || null}
                          {user && !user.cards.length &&
                          <div className={styles.paymentFormColumn}>
                            <span className={styles.paymentText}>
                              Add card
                            </span>
                            <Isvg src={arrowRight} className={styles.paymentArrowRight}/>
                          </div> || null}
                        </Link>
                        <div className={styles.paymentFormRow}>
                          <div className={styles.paymentFormColumn}>
                            <span className={styles.paymentText}>
                              Delivery fee
                            </span>
                          </div>
                          <div className={styles.paymentFormColumn}>
                            <span className={styles.paymentText}>
                              Free
                            </span>
                          </div>
                        </div>
                        <div className={styles.paymentFormRow}>
                          <div className={styles.paymentFormColumn}>
                            <span className={styles.paymentText}>
                              Tax
                            </span>
                          </div>
                          <div className={styles.paymentFormColumn}>
                            <span className={styles.paymentText}>
                              Included
                            </span>
                          </div>
                        </div>
                        <div onClick={this.onShowModalTip} className={styles.paymentFormRow}>
                          <div className={styles.paymentFormColumn}>
                            <span className={styles.paymentText}>
                              Tip
                            </span>
                          </div>
                          <div className={styles.paymentFormColumn}>
                            <span className={styles.paymentText}>
                              No Tipping Policy
                            </span>
                            <Isvg src={arrowRight} className={styles.paymentArrowRight}/>
                          </div>
                        </div>
                      </div>
                      {discount && <div className={styles.paymentFormRow}>
                        <div className={styles.paymentFormColumn}>
                          <span className={styles.paymentTextLarge}>
                            ORDER
                          </span>
                        </div>
                        <div className={styles.paymentFormColumn}>
                          <span className={styles.paymentTextBold}>
                            ${totalAmount}
                          </span>
                        </div>
                      </div> || null}
                      {discount && <div className={styles.paymentFormRow}>
                        <div className={styles.paymentFormColumn}>
                          <span className={styles.paymentTextLarge}>
                            PROMO
                          </span>
                        </div>
                        <div className={styles.paymentFormColumn}>
                          <span className={styles.paymentTextBold}>
                            -${discountValue}
                          </span>
                        </div>
                      </div> || null}
                      {total && <div className={styles.paymentFormRow}>
                        <div className={styles.paymentFormColumn}>
                          <span className={styles.paymentTextLarge}>
                            Total
                          </span>
                        </div>
                        <div className={styles.paymentFormColumn}>
                          <span className={styles.paymentTextBold}>
                            ${totalWithDiscount}
                          </span>
                        </div>
                      </div>}
                    </div>

                  </div>
                 <div className={styles.paymentFormContainerBtn}>
                     {user && !user.is_active &&
                       <h4 className={styles.paymentFormBtnTitle}>TO COMPLETE YOUR ORDER, SIGN-IN OR REGISTER BELOW</h4>}
                     {user && !user.is_active &&
                      <div className={styles.paymentFormWrapBtn}>
                       <button className={styles.transparentBtn} onClick={() => this.props.pushState('/login?cart-login')}>
                         Sign in
                       </button>
                       <button className={styles.redBtn} onClick={() => this.props.pushState('/register?cart-register')}>
                         Register
                       </button>
                     </div>
                    }
                    <div className={styles.paymentFormWrapColumnBtn}>
                      {(user && user.is_active) && cartProps && cartProps.total < 10 && <span className={styles.redNotification}>$10 minimum order</span>}
                      {user.is_active && user ? <button onClick={this._pay.bind(this)} className={styles.redBtn}
                      disabled = {(user && user.is_active) && cartProps && cartProps.total < 10}
                      >
                      Checkout & Pay</button> : null}
                   </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        {this.state.modalPromoCode &&
          <ModalInfo
             onShow={this.onShowModalPromoCode}
             onHide={this.onHideModalPromoCode}
             showModal={this.state.modalPromoCode}
             onClickModalBtn={this.state.onClickModalBtn}
             modalInfoBtnOkName={this.state.closeButtonText}
             modalHeaderText={this.state.headerError}
             modalInfoText={this.state.error}
           />
         }
        {this.state.modalTip &&
         <ModalInfo
            type='extra'
            onShow={this.onShowModalTip}
            onHide={this.onHideModalTip}
            showModal={this.state.modalTip}
            modalNotification='At Tso Chinese Delivery, our drivers are W2 employees on our very competitive payroll - we do not use contractors. We believe that providing good service is its own reward. We want our staff to be motivated to provide this great service not from the hope of a big tip but rather from pride in a job well done.'
            modalRedBtn='Got it, thanks'
          />
        }
      </div>
    );
  }
}
