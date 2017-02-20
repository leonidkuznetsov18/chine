import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import { StickyContainer } from 'react-sticky';
import cookie from 'react-cookie';
import { SideBar } from 'components';
import cx from 'classnames';
import styles from './App.scss';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()));
    }
    if (!isAuthLoaded(getState())) {
      const token = cookie.load('user');
      if (token) {
        promises.push(dispatch(loadAuth(token)));
      }
    }
    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user, isOpen: state.sidebar.isOpen, state: state}),
  {pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    isOpen: PropTypes.bool,
    user: PropTypes.object,
    state: PropTypes.object,
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };


  render() {
    const { user, isOpen } = this.props;
    const appMainClass = cx({
      [styles.appMain]: true,
      [styles.appMainBlue]: user && user.is_catering
    });
    return (
      <StickyContainer>
        <div className = {appMainClass}>
          <Helmet {...config.app.head}/>
          {isOpen && <SideBar isUser={ user && user.is_active}/>}
          {this.props.children}
        </div>
      </StickyContainer>
    );
  }
}
