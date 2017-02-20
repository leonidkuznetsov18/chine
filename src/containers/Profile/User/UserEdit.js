import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { update as userUpdate, load as loadAuth } from 'redux/modules/auth';
import { initialize } from 'redux-form';
import { Header, UserEditForm } from 'components';
import { push } from 'react-router-redux';
import styles from './UserEdit.scss';

@connect(
  (state) => ({user: state.auth.user}),
  {initialize, userUpdate, loadAuth, pushState: push})

export default class UserEdit extends Component {
  static propTypes = {
    userUpdate: PropTypes.func,
    loadAuth: PropTypes.func,
    pushState: PropTypes.func.isRequired,
    user: PropTypes.object,
  }

  componentWillMount() {
    if (typeof(window) === 'undefined') {
      global.window = {};
    }
    this.state = {windowWidth: global.window.innerWidth};
  }

  handleSubmit(data) {
    const { user, userUpdate, loadAuth } = this.props;
    userUpdate(user.id, data).then(() => {
      loadAuth(user.token);
    });
    this.props.pushState('/');
  }

  handleClickBack() {
    this.props.pushState('/');
  }

  render() {
    const { user: { id, email, phone, first_name, last_name} } = this.props;
    return (
      <div className={styles.userEdit}>
       <Helmet title="Profile"/>
        <Header
          buttonText={'Back'}
          pageCaption={<span>Profile</span>}
          btnAction={this.handleClickBack.bind(this)}
          isRed={false}
        />
        <div className={styles.userEditWrap}>
            <UserEditForm onSubmit={this.handleSubmit.bind(this)} initialValues={{
              id: id,
              email: email,
              phone: phone,
              firstName: first_name,
              lastName: last_name
            }} />
            <div className={styles.registerLinks}>
              <a onClick={() => this.props.pushState('/profile/set-new-password')}>Set new password</a>
              <br/>
              <a onClick={() => this.props.pushState('/profile/address/list')}>Go to address book</a>
            </div>
        </div>
      </div>
    );
  }
}
