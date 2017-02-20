import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { pay, payAuthorized, cartLoad, setTime } from 'redux/modules/cart';
import { cardSave } from 'redux/modules/card';
import { initialize } from 'redux-form';
import { Header, CheckoutForm, AddressLine, TotalAmount, ModalInfo, PhoneForm, Preloader } from 'components';
import { push } from 'react-router-redux';
import { load as loadAuth, updateUser } from 'redux/modules/auth';
import cookie from 'react-cookie';
import styles from './Checkout.scss';
import CartCalculator from '../../utils/cartCalculator';
import config from '../../config';

@connect(
  (state) => ({
    cart: state.cart.item,
    user: state.auth.user
  }),
  { initialize, cartLoad, cardSave, pay, payAuthorized, loadAuth, updateUser, setTime, pushState: push })

export default class Checkout extends Component {
  static propTypes = {
    pay: PropTypes.func,
    user: PropTypes.object,
    cart: PropTypes.object,
    cartLoad: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    payAuthorized: PropTypes.func,
    cardSave: PropTypes.func,
    updateUser: PropTypes.func,
    loadAuth: PropTypes.func,
    toggleSidebar: PropTypes.func,
    setTime: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      phoneNumber: '',
      showPreloader: false,
    };
  }

  componentWillMount() {
    const { cartLoad, user } = this.props;
    cartLoad(user.id).then(() => {
      const cartProps = new CartCalculator(this.props.cart).parseCart();
      this.setState({
        amount: (cartProps.total - cartProps.discount).toFixed(((cartProps.total - cartProps.discount) % 1 > 0) ? 0 : 2)
      });
    });
    if (typeof (window) === 'undefined') {
      global.window = {};
    }
    this.state = {windowWidth: global.window.innerWidth};
  }

  onShowModal = () => {
    this.setState({
      showModal: true
    });
  }

  onHideModal = () => {
    this.setState({
      showModal: false
    });
  }

  onClick = (href) => {
    this.setState({
      showModal: false
    }, () => {
      this.props.toggleSidebar();
      this.props.pushState(href);
    });
  }

  handleSubmit(data) {
    const { pay, payAuthorized, cardSave, user, loadAuth, updateUser, cart, setTime } = this.props;
    let updatedData = {};
    if (this.state.amount > 0) {
      updatedData = Object.assign({}, data, {
        cardNumber: data.cardNumber.replace(/\s|\/|\*/g, ''),
        expDate: data.expDate.replace(/\s|\/|\*/g, '')
      });
    }
    if (!data.isSave && this.state.amount > 0) {
      this.setState({showPreloader: true});
      pay(this.state.amount, user.id, updatedData.phone.replace(/-/g, ''), updatedData.cardNumber, updatedData.expDate, updatedData.cvc).then(() => {
        setTime(0);
        this.props.pushState(`/order-status/${cart.id}?payment`);
      }).catch(() => this.setState({showModal: true, showPreloader: false}));
    } else if (this.state.amount <= 0) {
      this.setState({showPreloader: true});
      pay(this.state.amount, user.id, data.phone.replace(/-/g, '')).then(() => {
        setTime(0);
        this.props.pushState(`/order-status/${cart.id}?payment`);
      }).catch(() => this.setState({showModal: true, showPreloader: false}));
    } else {
      this.setState({showPreloader: true});
      cardSave(user.id, true, updatedData).then(() => {
        payAuthorized(user.id, this.state.amount).then(() => {
          setTime(0);
          updateUser(user.id, { phone: data.phone.replace(/-/g, ''), is_active: user.is_active}).then(() => {
            loadAuth(user.token).then((_user) => {
              cookie.save('user', _user.token);
              this.props.pushState(`/order-status/${cart.id}?payment`);
            });
          });
        }).catch(() => this.setState({showModal: true, showPreloader: false}));
      }).catch(() => this.setState({showModal: true, showPreloader: false}));
    }
  }

  handleClickBack() {
    this.props.pushState('/cart');
  }

  render() {
    const { cart } = this.props;
    let cartProps = {};
    let totalWithDiscount = null;
    let discount = null;
    let total = null;
    if (cart.orders) {
      cartProps = new CartCalculator(cart).parseCart();
      discount = cartProps.discount;
      total = cartProps.total;
      totalWithDiscount = (total - discount).toFixed((total - discount) % 1 > 0 ? 2 : 0);
    }

    return (
      <div className={styles.checkout}>
        {
          this.state.showPreloader && <Preloader/>
        }
        <Helmet title="Checkout"/>
        <Header buttonText={'Back'}
          pageCaption={<span>checkout</span>}
          btnAction={this.handleClickBack.bind(this) }
          />
        {cart.address && <AddressLine address={cart.pickup ? config.pickupAddress : cart.address}/>}
        <div className={styles.checkoutWrap}>
          {
            totalWithDiscount > 0 &&
            <CheckoutForm
              onSubmit={this.handleSubmit.bind(this)}
              initialValues={{
                userId: this.props.user.id,
                phone: this.props.user.phone}}
            >
            {totalWithDiscount && <TotalAmount type="total" amount={totalWithDiscount}/>}
          </CheckoutForm>
          }
          {
            totalWithDiscount < 0 &&
            <PhoneForm
              onSubmit={this.handleSubmit.bind(this)}
              initialValues={{
                phone: this.props.user.phone
              }}
            >
              {total ? <TotalAmount type="total" amount={totalWithDiscount > 0 ? totalWithDiscount : 0}/> : <TotalAmount type="total" amount={0}/> }
          </PhoneForm>
          }
        </div>
        {this.state.showModal &&
          <ModalInfo
            onShow={this.onShowModal}
            onHide={this.onHideModal}
            showModal={this.state.showModal}
            onClickModalBtn={this.onHideModal}
            modalInfoBtnOkName={'Close'}
            modalHeaderText={'unsuccessful'}
            modalInfoText={'we are sorry - your payment did not go through'}
          />
        }
      </div>
    );
  }
}
