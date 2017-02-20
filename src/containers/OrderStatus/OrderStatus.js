import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { cartLoad, cartLoadById, cartStatusUpdated, voidTransaction } from 'redux/modules/cart';
import { update as userUpdate, load as loadAuth } from 'redux/modules/auth';
import { initialize } from 'redux-form';
import { Header, Marker, AddressLine, TotalAmount } from 'components';
import { push } from 'react-router-redux';
import GoogleMap from 'google-map-react';
import styles from './OrderStatus.scss';
import { Col} from 'react-bootstrap/lib';
import chopstiks from '../../../static/uploads/chopsticks.svg';
import utensils from '../../../static/uploads/utensils.svg';
import plate from '../../../static/uploads/plate.svg';
import Isvg from 'react-inlinesvg';
import io from 'socket.io-client';
import moment from 'moment';
import CartCalculator from '../../utils/cartCalculator';
import config from '../../../api/config';
import cfg from '../../config';
import Scroll from 'react-scroll';

@connect(
  (state) => ({
    cart: state.cart.item,
    user: state.auth.user,
    history: state.orderHistory.items,
  }),
  {initialize, cartLoad, cartLoadById, userUpdate, loadAuth, cartStatusUpdated, pushState: push, voidTransaction})
export default class OrderStatus extends Component {
  static propTypes = {
    user: PropTypes.object,
    cart: PropTypes.object,
    loadAuth: PropTypes.func,
    cartLoad: PropTypes.func,
    cartLoadById: PropTypes.func,
    userUpdate: PropTypes.func,
    voidTransaction: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    routeParams: PropTypes.object,
    cartStatusUpdated: PropTypes.func,
    location: PropTypes.object,
    history: PropTypes.array
  }
  constructor(props) {
    super(props);
    this.state = {
      defaultPosition: config.defaultPosition,
      position: null,
      status: null,
      deliveryTime: null,
      canceledError: null,
      homeButtonShow: false
    };
  }

  componentWillMount() {
    const { cartLoadById, routeParams: {cartId} } = this.props;
    cartLoadById(cartId).then(cart => {
      this.setState({status: cart.status.name});
    });
    if (typeof (window) === 'undefined') {
      global.window = {};
    }
    this.state = { windowWidth: global.window.innerWidth };
  }

  /**
   * Setup WS connections and handle status updates
   */
  componentDidMount() {
    if (location.search === '?payment') {
      this.setState({homeButtonShow: true});
    }
    const {cartStatusUpdated, routeParams: {cartId}, location: {query}} = this.props;
    if (query.from !== 'history') {
      this.socket = io.connect('', {path: '/ws', query: 'order_id=' + cartId});
      this.socket.on('updateOrderStatus', (cart) => {
        const {id} = cart;
        if (this.props.cart.id === id) {
          cartStatusUpdated(cart);
        }
      });
    }
  }

  /**
   * Check if user can view this order.
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.cart) {
      if (nextProps.cart.user_id !== this.props.user.id) {
        this.props.pushState('/');
      }
      if (!this.state.deliveryTime) {
        const {cart} = nextProps;
        this.setState({
          deliveryTime: `${cart.pickup ? 'Carryout time' : 'Delivery time'} ${moment.utc(cart.delivery_time).format('h:mm A')} - ${moment.utc(cart.delivery_time).add(20, 'minutes').format('h:mm A')}`
        });
      }
      const {bringg_uiid, status_id} = nextProps.cart;
      if (status_id === 5 && bringg_uiid) { // eslint-disable-line
        this._initializeTracker(bringg_uiid);
      }
      this.setState({status: nextProps.cart.status.name});
    }
  }

  /**
   * Force client to disconnect from socket to prevent
   * unnecessary cart status updates.
   */
  componentWillUnmount() {
    if (this.socket) {
      this.socket.emit('forceDisconnect');
    }
  }

  /**
   * Get cart rendering properties. If there's orderHistory get
   * cart from it, otherwise wait for cart loading as a regular.
   * @returns {*}
   */
  getCartProps = (cart) => {
    if (cart.orders) {
      const { history, location: { query }, routeParams: { cartId } } = this.props;
      if (query.from === 'history') {
        if (history.length) {
          return new CartCalculator(
            history.filter(cart => cart.id == cartId)[0].paid_cart // eslint-disable-line
          ).parseCart();
        }
      }
      return new CartCalculator(cart).parseCart();
    }
    return {};
  };

  handleSubmit(data) {
    data.phone = data.phone.replace(/-/g, '');
    const { userUpdate, user, loadAuth } = this.props;
    userUpdate(user.id, data).then(() => {
      loadAuth(user.token);
    });
  }

  handleClickBack() {
    const { routeParams: {cartId}, pushState } = this.props;
    if (cartId && location.search !== '?payment') {
      pushState('/order-history');
    } else {
      pushState('/');
    }
  }

  handleVoidClick(cartId) {
    const scroll = Scroll.animateScroll;
    scroll.scrollToTop({duration: 500});
    this.setState({status: 'Canceling...'});

    this.props.voidTransaction(cartId)
    .then(() => {
      this.props.cartLoadById(cartId).then(cart => {
        this.setState({status: cart.status.name});
      });
    })
    .catch(resp => {
      this.setState({
        canceledError: resp.error.error_message,
        status: this.props.cart.status.name
      });
    });
  }

  /**
   * Handle location update while order status is
   * `on the way`
   * @param location
   * @private
   */
  _onLocationUpdate = (location) => {
    if (location.lat() && location.lng()) {
      this.setState({
        position: {
          lat: location.lat(),
          lng: location.lng()
        }
      });
    }
  };

  _initializeTracker = (orderUuid) => {
    BringgSDK.connect(config.BRING.ACCESS_TOKEN, () => { // eslint-disable-line
      BringgSDK.watchOrder({ // eslint-disable-line
        order_uuid: orderUuid,
      });
    });
    BringgSDK.setLocationUpdateCb((location) => { // eslint-disable-line
      this._onLocationUpdate(location);
    });
    const {cart} = this.props;
    this.setState({
      deliveryTime: `Delivery time ${moment().add(Math.round(cart.address.distance * 0.002), 'minutes').format('h:mm A')}`
    });
  };

  render() {
    const { cart, user } = this.props;
    const position = this.state.position || config.defaultPosition;
    const cartProps = this.getCartProps(cart);
    const renderCartItem = (item, index) => {
      const total = (item.price * item.count).toFixed((item.price * item.count) % 1 > 0 ? 2 : 0);
      const foodPriceStyle = (item.discount && item.withDiscount) ?
        {
          textDecoration: 'line-through',
          color: '#9b9fa5'
        } : {};
      return (
        <div className={styles.foodRow} key={index}>
          <div className={styles.foodCol}>
            <div className={styles.foodNameWrap}>
              <div className={styles.foodName}>{item.name}</div>
              <div className={styles.foodConsist}></div>
              <div
                className={styles.foodPrice}
                style={foodPriceStyle}
              >
                {
                  `$${total} (${item.price.toFixed(item.price % 1 > 0 ? 2 : 0)} X ${item.count})`
                }
              </div>
              {
                item.discount &&
                item.withDiscount &&
                <div className={styles.foodPrice}>
                  ${(total - (item.discount * item.withDiscount)).toFixed((total - (item.discount * item.withDiscount)) % 1 > 0 ? 2 : 0)}
                </div>
              }
            </div>
          </div>
          <div className={styles.foodCol}>
            <span className={styles.foodCount}>{item.count}</span>
          </div>
        </div>
      );
    };
    const showCancelBtn = cart.status && ['pending', 'order_received', 'canceled'].indexOf(cart.status.slug) >= 0;
    return (
      <div className={styles.orderStatus}>
        <Helmet title="Order Status"/>
        <Header buttonText={this.state.homeButtonShow ? 'Home' : 'Back'}
          pageCaption={<span>order status</span>}
          btnAction={this.handleClickBack.bind(this) }
          />
        <div className={styles.googleMapWrapperOrder}>
          <GoogleMap
            defaultCenter={config.defaultPosition}
            defaultZoom={14}
            bootstrapURLKeys={{
              key: config.GOOGLE_MAPS_API_KEY,
              language: 'en',
              libraries: 'places',
            }}
            yesIWantToUseGoogleMapApiInternals={true}
            >
            <Marker {...position}/>
            </GoogleMap>
        </div>
        {
          cart.address &&
          <AddressLine address={cart.pickup ? cfg.pickupAddress : cart.address} />
        }
        <h1 className={styles.orderStatusCondition}>{this.state.status}</h1>
        <div className={styles.orderStatusWrap}>
            <div style={{opacity: cart.status && cart.status.slug === 'canceled' ? 0.2 : 1}}>
              <div className={styles.foodNameWrap}>
                <div className={styles.foodName}>
                  {this.state.deliveryTime}
                </div>
              </div>

              {
                cartProps.items && cartProps.items.map((item, index) => {
                  if (item.count > 0) {
                    return renderCartItem(item, index);
                  }
                })
              }
              {
                cart.chopsticks ?
                  <div className={styles.foodRow}>
                    <div className={styles.foodCol}>
                      <div className={styles.foodCutlery}>
                        <Isvg src={chopstiks} className={styles.foodIcon}/>
                        <span className={styles.foodCutleryName}>Chopsticks</span>
                      </div>
                    </div>
                    <div className={styles.foodCol}>
                      <span className={styles.foodCount}>{cart.chopsticks}</span>
                    </div>
                  </div> : null
              }
              {
                cart.utensils ?
                  <div className={styles.foodRow}>
                    <div className={styles.foodCol}>
                      <div className={styles.foodCutlery}>
                        <Isvg src={utensils} className={styles.foodIcon}/>
                        <span className={styles.foodCutleryName}>Utensils</span>
                      </div>
                    </div>
                    <div className={styles.foodCol}>
                      <span className={styles.foodCount}>{cart.utensils}</span>
                    </div>
                  </div> : null
              }
              {
                (user && user.is_catering) &&
                <div className={styles.foodRow}>
                  <div className={styles.foodCol}>
                    <div className={styles.foodCutlery}>
                      <Isvg src={plate} className={styles.foodIcon}/>
                      <span className={styles.foodCutleryName}>Plates</span>
                    </div>
                  </div>
                  <div className={styles.foodCol}>
                    <span className={styles.foodCount} />
                  </div>
                </div>
              }
              {
                cartProps.discount &&
                <TotalAmount
                  type="order"
                  amount={cartProps.total.toFixed((cartProps.total % 1 > 0 ? 2 : 0))}
                /> || null
              }
              {
                cartProps.discount &&
                <TotalAmount
                  type="promo"
                  amount={cartProps.discount.toFixed((cartProps.discount % 1 > 0 ? 2 : 0))}
                /> || null
              }
              {
                cartProps.total &&
                <TotalAmount
                  type="total"
                  amount={(cartProps.total - cartProps.discount) > 0 ? (cartProps.total - cartProps.discount).toFixed(((cartProps.total - cartProps.discount) % 1 > 0 ? 2 : 0)) : 0}
                />
              }
            </div>
            {this.state.canceledError && <Col sm={12} className={styles.canceledError}>{this.state.canceledError}</Col>}
            <Col sm={12}>
              <div className="text-center cartWrapTable">
                {showCancelBtn && <button
                  onClick={this.handleVoidClick.bind(this, cart.id)}
                  className={styles.blackBtn}
                  disabled={cart.status && cart.status.slug === 'canceled'}
                >
                  CANCEL ORDER
                </button>}
              </div>
            </Col>
        </div>
      </div>
    );
  }
}
