import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Header, CardAddForm, Preloader, ModalInfo } from 'components';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { cardSave } from 'redux/modules/card';
import { load as loadAuth } from 'redux/modules/auth';
import styles from './Card.scss';
import { cartLoad } from 'redux/modules/cart';
import CartCalculator from '../../../utils/cartCalculator';
import { pay, setTime } from 'redux/modules/cart';

@connect(
  (state) => ({
    user: state.auth.user,
    cards: state.card.items,
    cart: state.cart.item
  }),
  {cardSave, loadAuth, cartLoad, pay, setTime, pushState: push})
export default class Add extends Component {
  static propTypes = {
    user: PropTypes.object,
    cardSave: PropTypes.func,
    loadAuth: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    cards: PropTypes.array,
    cartLoad: PropTypes.func,
    routeParams: PropTypes.object,
    cart: PropTypes.object,
    location: PropTypes.object,
    pay: PropTypes.func,
    setTime: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      showPreloader: false,
      showModal: false,
      cartRedirect: false
    };
  }

  componentWillMount() {
    if (typeof(window) === 'undefined') {
      global.window = {};
    }
    this.state = {windowWidth: global.window.innerWidth};
    const { location, cartLoad } = this.props;
    if (location && location.query.id) {
      cartLoad(location.query.id).then((cart) => {
        const cartProps = new CartCalculator(cart).parseCart();
        const totalAmount = cartProps.total - cartProps.discount;
        this.setState({
          amount: totalAmount.toFixed((totalAmount % 1 > 0) ? 0 : 2),
          cartRedirect: true
        });
      });
    }
  }

  onHideModal = () => {
    this.setState({
      showModal: false
    });
    this.props.pushState('/cart');
  };

  handleClickBack() {
    if (location.search === '?add-card') {
      this.props.pushState('/profile/card/list?add-card');
    } else if (this.state.cartRedirect) {
      this.props.pushState('/cart');
    } else {
      this.props.pushState('/profile/card/list');
    }
  }

  handleSubmitClick(data) {
    const { user, cardSave, pushState, cards, loadAuth, pay, setTime, cart, location } = this.props;
    const updatedData = Object.assign({}, data, {
      cardNumber: data.cardNumber.replace(/\s|\/|\*/g, ''),
      expDate: data.expDate.replace(/\s|\/|\*/g, '')
    });
    const isDefault = cards.length === 0;
    cardSave(user.id, isDefault, updatedData).then((response) => {
      if (response) {
        loadAuth(user.token).then((user) => {
          if (location && location.query.id) {
            pay(this.state.amount, user.id, user.phone, updatedData.cardNumber, updatedData.expDate, updatedData.cvc).then(() => {
              this.setState({showPreloader: true});
              setTime(0);
              this.props.pushState(`/order-status/${cart.id}?payment`);
            }).catch(() => {this.setState({showPreloader: false, showModal: true});});
          } else {
            if (location.search === '?add-card') {
              pushState('/profile/card/list?add-card');
            } else {
              pushState('/profile/card/list');
            }
          }
        });
      }
    });
  }

  render() {
    return (
      <div className={styles.card}>
        <Helmet title="Payment"/>
        <Header buttonText={'Back'}
                pageCaption={<span>Payment</span>}
                btnAction={this.handleClickBack.bind(this)}
        />
          {this.state.showPreloader && <Preloader/>}
          <CardAddForm onSubmit={this.handleSubmitClick.bind(this)}/>
            {this.state.showModal &&
             <ModalInfo
                onHide={this.onHideModal}
                showModal={this.state.showModal}
                onClickModalBtn={this.onHideModal}
                modalInfoBtnOkName={'OK'}
                modalHeaderText={'TRY again'}
                modalInfoText={'Card save, but YOUR PAYMENT DID NOT GO THROUGH'}
              />
            }
      </div>
    );
  }
}
