import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { Header } from 'components';
import { push } from 'react-router-redux';
import { login, checkEmail, loadAuth } from 'redux/modules/auth';
import cookie from 'react-cookie';
import Isvg from 'react-inlinesvg';
import logo from './tso_logo.svg';
import styles from './Login.scss';
import { cartLoad, updateCart, cartLoadById, togglePickupOption, clean } from 'redux/modules/cart';
import { loadAddress } from 'redux/modules/address';
import { updateCard } from 'redux/modules/card';

@connect(
  (state) => ({cart: state.cart.item, user: state.auth.user, address: state.address.item}),
  {login, checkEmail, cartLoad, updateCart, loadAddress, cartLoadById, updateCard, loadAuth, clean,
  togglePickupOption, pushState: push})
export default class Login extends Component {
  static propTypes = {
    login: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    location: PropTypes.object,
    checkEmail: PropTypes.func,
    cartLoad: PropTypes.func,
    updateCart: PropTypes.func,
    cart: PropTypes.object,
    user: PropTypes.object,
    loadAddress: PropTypes.func,
    togglePickupOption: PropTypes.func,
    updateCard: PropTypes.func,
    loadAuth: PropTypes.func,
    clean: PropTypes.func,
    cartLoadById: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {error: false};
  }

  componentWillMount() {
    if (typeof(window) === 'undefined') {
      global.window = {};
    }
    this.state = {windowWidth: global.window.innerWidth};
  }

  componentDidMount() {
    const {location: {query}} = this.props;
    if (query.email) {
      this.refs.username.value = query.email;
    }
  }

  handleSubmit = (event) => {
    const { cart, updateCart, cartLoad, loadAddress, login, cartLoadById, togglePickupOption, updateCard, loadAuth, user } = this.props;
    event.preventDefault();
    this.setState({error: false});
    const { username, password } = this.refs;
    const oldUser = user;
    let cardId = null;
    if (oldUser && oldUser.cards.length && oldUser.cards[0].id) {
      cardId = user.cards[0].id;
    }
    login(username.value, password.value).then(newUser => {
      if (this.props.cart.id) {
        if (oldUser.cards.length) {
          updateCard(cardId, newUser.id).then(() => {
            loadAuth(newUser.token);
          });
        }
        updateCart(cart.id, newUser.id, cart.address_id, cart.pickup).then(() => {
          cartLoadById(cart.id).then(() => {
            loadAddress(cart.address_id).then((address) => {
              if (cart.pickup || address.out_of_range) {
                togglePickupOption(cart.id, true);
              } else {
                togglePickupOption(cart.id, false);
              }
            });
          });
        });
      }
      cookie.save('user', newUser.token);
      username.value = '';
      password.value = '';
      if (location.search === '?cart-login') {
        this.props.pushState('/cart');
      } else {
        this.props.pushState('/');
      }
    }).catch(() => this.props.checkEmail(username.value).then(e => {
      if (e) {
        this.setState({error: true});
      } else {
        this.props.pushState('/register?email=' + username.value);
      }
    }).catch(() => this.setState({error: true})));
  }

  handleClickBack = () => {
    if (location.search === '?cart-login') {
      this.props.pushState('/cart');
    } else {
      this.props.pushState('/');
    }
  }

  render() {
    return (
      <div className={styles.login}>
      <Helmet title="Login"/>
       <Header buttonText={'Back'}
               pageCaption={<span>sign in</span>}
               btnAction={this.handleClickBack}
       />
        <div className={styles.loginFormWrap}>

          <div className={styles.loginLogo}>
              <Isvg src={logo}/>
          </div>
            <form className={styles.loginForm} onSubmit={this.handleSubmit}>
              <div className={styles.formGroup}>
                <div className={styles.inputGroup}>
                  <input type="text" ref="username" placeholder="Enter email or phone number"/>
                </div>
              </div>
              <div className={styles.formGroup}>
                <div className={styles.inputGroup}>
                  <Isvg src={'/uploads/eye.svg'} className={styles.eye}/>
                  <input type="password" ref="password" placeholder="Enter Password"/>
                </div>
              </div>
                {this.state.error && <div className={styles.errorAuth}>The provided login or password is incorrect.<br/> Try again, please.</div>}
              <div className={styles.forgotPass}><a onClick={() => this.props.pushState('/forgot-password')}>Forgot password?</a></div>
              <button className={styles.redBtn} onClick={this.handleSubmit}>SIGN IN</button>
            </form>
        </div>
      </div>
    );
  }
}
