import React, {Component, PropTypes} from 'react';
import styles from './SetNewPasswordForm.scss';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { checkHash, update, checkPassword } from 'redux/modules/auth';
import Isvg from 'react-inlinesvg';


@connect(
  (state) => ({user: state.auth.user}),
  {checkHash, update, checkPassword, pushState: push})

export default class SetNewPasswordForm extends Component {

  static propTypes = {
    validLink: PropTypes.bool,
    isHash: PropTypes.bool,
    handleSubmit: PropTypes.func,
    handleSubmitPassword: PropTypes.func,
    user: PropTypes.object,
    checkPassword: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      length_error: false
    };
  }

  handleSubmitPassword = (event) =>{
    event.preventDefault();
    const { password, repeat_password } = this.refs;
    if ((password.value === repeat_password.value) && (password.value.length >= 6 && repeat_password.value.length >= 6)) {
      this.props.handleSubmit(password.value).catch(() => this.setState({error: true}));
    } else {
      this.setState({error: true});
    }
  }

  handleSubmitNewPassword = (event) =>{
    event.preventDefault();
    const { user } = this.props;
    const { oldPassword, password, repeatPassword } = this.refs;
    this.props.checkPassword(user.email, oldPassword.value).then(() => {
      this.setState({error: false});
      if ((password.value === repeatPassword.value) && (password.value.length >= 6 && repeatPassword.value.length >= 6)) {
        this.props.handleSubmitPassword(user.id, password.value);
      } else {
        this.setState({
          length_error: true
        });
      }
    }).catch(() => this.setState({error: true}));
  }

  render() {
    return (
      <div className={styles.setNewPasswordForm}>
       {!this.props.isHash && !this.props.validLink &&
         <form>
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <Isvg src={'/uploads/eye.svg'} className={styles.eye}/>
              <input type="password" ref="oldPassword" placeholder="Enter old Password" />
            </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <Isvg src={'/uploads/eye.svg'} className={styles.eye}/>
                <input type="password" ref="password" placeholder="Enter new Password" />
              </div>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <Isvg src={'/uploads/eye.svg'} className={styles.eye}/>
                <input type="password" ref="repeatPassword" placeholder="Repeat new Password" />
              </div>
            </div>
            {this.state.length_error &&
              <div className={styles.errorAuth}>
                The new password must be 6 characters or more.<br/>
              </div>
            }
            {this.state.error &&
              <div className={styles.errorAuth}>
                The provided password is incorrect.<br/>
                Try again, please.
              </div>
            }
          <button className={styles.redBtn} onClick={this.handleSubmitNewPassword}>SAVE & CONTINUE</button>
        </form>}
        {this.props.isHash && !this.props.validLink &&
        <form>
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <Isvg src={'/uploads/eye.svg'} className={styles.eye}/>
              <input type="password" ref="password" placeholder="Enter new Password" />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <Isvg src={'/uploads/eye.svg'} className={styles.eye}/>
              <input type="password" ref="repeat_password" placeholder="Repeat Password" />
            </div>
          </div>
            {this.state.error &&
              <div className={styles.errorAuth}>
                The new password must be 6 characters or more.<br/>
                Try again, please.
              </div>
            }
          <button className={styles.redBtn} onClick={this.handleSubmitPassword}>SAVE & CONTINUE</button>
        </form>}
        {this.props.validLink &&
          <h1>Link is not valid</h1>
        }
        </div>
    );
  }
}
