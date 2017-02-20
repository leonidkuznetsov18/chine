import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { register } from 'redux/modules/register';
import { login } from 'redux/modules/auth';
import { initialize } from 'redux-form';
import { RegisterForm, Header } from 'components';
import { push } from 'react-router-redux';
import cookie from 'react-cookie';
import styles from './Register.scss';

@connect(
  (state) => ({user: state.auth.user}),
  {initialize, register, login, pushState: push})
export default class Register extends Component {
  static propTypes = {
    login: PropTypes.func,
    register: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    location: PropTypes.object,
    user: PropTypes.object,
  }

  componentWillMount() {
    if (typeof(window) === 'undefined') {
      global.window = {};
    }
    this.state = {windowWidth: global.window.innerWidth};
  }


  handleSubmit = (data) => {
    data.isActive = true;
    data.phone = data.phone.replace(/-/g, '');
    this.props.register(data).then(() => {
      this.props.login(data.email, data.password).then(user => {
        cookie.save('user', user.token);
        if (location.search === '?cart-register') {
          this.props.pushState('/cart');
        } else {
          this.props.pushState('/');
        }
      });
    });
  }

  handleClickBack() {
    if (location.search === '?cart-register') {
      this.props.pushState('/cart');
    } else {
      this.props.pushState('/');
    }
  }

  render() {
    const {user, location: {query}} = this.props;
    return (
      <div className={styles.register}>
        <Helmet title="Register"/>
        <Header buttonText={'Back'}
                pageCaption={<span>registration</span>}
                btnAction={this.handleClickBack.bind(this)}
        />
        <div className={styles.registerWrap}>
          <RegisterForm onSubmit={this.handleSubmit} initialValues={{email: query.email, id: user ? user.id : null}}/>
          <div className={styles.registerLinks}>
            <a onClick={() => this.props.pushState('/static-page/privacy-policy')}>Privacy policy</a>
            &nbsp;
            &amp;
            &nbsp;
            <a onClick={() => this.props.pushState('/static-page/terms-of-use')}>Terms of use</a>
          </div>
        </div>
      </div>
    );
  }
}
