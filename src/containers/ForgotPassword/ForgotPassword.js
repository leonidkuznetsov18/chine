import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { login } from 'redux/modules/auth';
import {connect} from 'react-redux';
import { Header, ForgotPasswordForm } from 'components';
import styles from './ForgotPassword.scss';
import Isvg from 'react-inlinesvg';
import logo from './tso_logo.svg';

@connect(
  () => ({}),
  {login, pushState: push})
export default class ForgotPassword extends Component {

  static propTypes = {
    login: PropTypes.func,
    pushState: PropTypes.func.isRequired
  }

  handleClickBack = () => {
    this.props.pushState('/');
  }

  render() {
    return (
        <div className={styles.forgotPassword}>
        <Helmet title="PASSWORD RECOVERY"/>
        <Header buttonText={'Back'}
                 pageCaption={<span>PASSWORD RECOVERY</span>}
                 btnAction={this.handleClickBack.bind(this)}
         />
         <div className={styles.forgotPasswordLogo}>
           <Isvg src={logo}/>
         </div>
         <ForgotPasswordForm/>
        </div>
    );
  }
}
