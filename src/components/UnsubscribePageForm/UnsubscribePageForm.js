import React, {Component, PropTypes} from 'react';
import styles from './UnsubscribePageForm.scss';
import { checkUser } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import {connect} from 'react-redux';
import { ModalInfo } from 'components';

@connect(
  () => ({}),
  {checkUser, pushState: push})

export default class UnsubscribePageForm extends Component {

  static propTypes = {
    checkUser: PropTypes.func,
    pushState: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  onHideModal = () => {
    this.setState({
      showModal: false,
      error: false
    });
    this.props.pushState('/');
  }

  handleRecoverPassword = (event) => {
    event.preventDefault();
    const { username } = this.refs;
    const hash = global.window.location.pathname.replace('/unsubscribe/', '');
    this.props.checkUser(username.value, hash).then(() => {
      this.setState({showModal: true});
    }).catch(() => {
      this.setState({error: true});
    });
  }

  render() {
    return (
      <div className={styles.forgotPasswordForm}>
        <form >
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <input type="text" ref="username" placeholder="Enter email"/>
            </div>
          </div>
          <button className={styles.redBtn} onClick={this.handleRecoverPassword}>UNSUBSCRIBE</button>
        </form>

        {this.state.error &&
              <div className={styles.errorAuth}>
                The email dose not exist.<br/>
                Try again, please.
              </div>
        }
       {this.state.showModal &&
        <ModalInfo
            onShow={this.onShowModal}
            onHide={this.onHideModal}
            showModal={this.state.showModal}
            onClickModalBtn={this.onHideModal}
            modalInfoBtnOkName={'Ok'}
            modalInfoText={'You have unsubscribed from the mailing list'}
          />}
      </div>
    );
  }
}
