import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { Header, SetNewPasswordForm } from 'components';
import styles from './SetNewPassword.scss';
import { checkHash, update} from 'redux/modules/auth';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { toggleSidebar } from 'redux/modules/sidebar';
import Isvg from 'react-inlinesvg';
import logo from './tso_logo.svg';

@connect(
  (state) => ({
    user: state.auth.user
  }),
  {pushState: push, toggleSidebar, checkHash, update})
export default class SetNewPassword extends Component {

  static propTypes = {
    routeParams: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
    checkHash: PropTypes.func,
    update: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      validLink: false,
      isHash: false
    };
  }

  componentDidMount() {
    const { routeParams: { hash }, checkHash } = this.props;
    if (hash) {
      this.setState({
        isHash: true
      });
      checkHash(hash).then((userId) => {
        this.setState({
          userId: userId.user_id
        });
      }).catch(() => {
        this.setState({
          validLink: true,
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      this.props.pushState('/');
    }
  }

  handleBackClick() {
    const {routeParams: { hash }} = this.props;
    if (hash) {
      this.props.pushState('/');
      document.body.style.overflow = 'auto';
    } else {
      this.props.pushState('/profile/user/edit');
      document.body.style.overflow = 'auto';
    }
  }

  handleSubmit = (password) =>{
    this.props.update(this.state.userId, {password: password});
    this.props.pushState('/login');
  }

  handleSubmitPassword = (userId, password) =>{
    this.props.update(userId, {password: password});
    this.props.pushState('/');
  }

  render() {
    return (
      <div className={styles.setNewPassword}>
        <Helmet title="New Password"/>
          <Header buttonText={'Back'}
            pageCaption={<span>New Password</span>}
            btnAction={this.handleBackClick.bind(this)}
          />
          <div className={styles.setNewPasswordLogo}>
            <Isvg src={logo}/>
          </div>
          <SetNewPasswordForm
            handleSubmit={this.handleSubmit}
            isHash={this.state.isHash}
            validLink={this.state.validLink}
            handleSubmitPassword={this.handleSubmitPassword}
        />
      </div>
    );
  }
}
