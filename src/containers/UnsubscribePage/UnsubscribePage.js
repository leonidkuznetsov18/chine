import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { push } from 'react-router-redux';
import { login } from 'redux/modules/auth';
import {connect} from 'react-redux';
import { Header, UnsubscribePageForm } from 'components';
import styles from './UnsubscribePage.scss';
import Isvg from 'react-inlinesvg';
import logo from './tso_logo.svg';

@connect(
  () => ({}),
  {login, pushState: push})
export default class UnsubscribePage extends Component {

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
        <Header buttonType={'menuOpen'}
                 pageCaption={<span>UNSUBSCRIBE</span>}
                 btnAction={this.handleClickBack.bind(this)}
         />
         <div className={styles.forgotPasswordLogo}>
           <Isvg src={logo}/>
         </div>
          <UnsubscribePageForm/>
        </div>
    );
  }
}
