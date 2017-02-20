import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import { cartLoad } from 'redux/modules/cart';
import {
  App,
  Home,
  Login,
  NotFound,
  Register,
  Address,
  Extras,
  Cart,
  ProductModify,
  OrderHistory,
  Checkout,
  OrderStatus,
  ForgotPassword,
  UnsubscribePage
} from 'containers';
import { List as CardList, Add as CardAdd } from 'containers/Profile/Card';
import { UserEdit } from 'containers/Profile/User';
import { SetNewPassword } from 'containers/Profile/SetNewPassword';
import { List as AddressList, Edit as AddressEdit } from 'containers/Profile/Address';
import { TermsOfUse, PrivacyPolicy, AboutCatering, EmailPreview } from 'containers/StaticPages';

import cookie from 'react-cookie';

export default (store) => {
  const requireLoginAndAddress = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user || !user.addresses.find(ua => ua.is_default)) {
        // oops, not logged in, so can't be here!
        replace('/address');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      const token = cookie.load('user');
      if (token) {
        store.dispatch(loadAuth(token)).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      checkAuth();
    }
  };

  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/address');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      const token = cookie.load('user');
      if (token) {
        store.dispatch(loadAuth(token)).then(checkAuth);
      } else {
        checkAuth();
      }
    } else {
      checkAuth();
    }
  };

  const loginUserIfExists = (nextState, replace, cb) => {
    if (!isAuthLoaded(store.getState())) {
      const token = cookie.load('user');
      if (token) {
        store.dispatch(loadAuth(token));
        // .then(user =>
        //   store.dispatch(cartLoad(user.id))
        // );
      }
    }
    cb();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App} onEnter={loginUserIfExists}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLoginAndAddress} >
        <Route path="cart" component={Cart}/>
        <Route path="checkout" component={Checkout} />
        <Route path="order-status" component={OrderStatus}/>
        <Route path="order-status/:cartId" component={OrderStatus}/>
        <Route path="sides/:id" component={Extras}/>
        <Route path="modify/product/:productId" component={ProductModify}/>
        <Route path="modify/order/:orderId" component={ProductModify}/>
      </Route>

      { /* Profile */ }
      <Route onEnter={requireLogin}>
        <Route path="profile/address/list" component={AddressList}/>
        <Route path="profile/address/edit/:addressId" component={AddressEdit}/>
        <Route path="profile/card/list" component={CardList}/>
        <Route path="profile/card/add" component={CardAdd}/>
        <Route path="profile/user/edit" component={UserEdit}/>
        <Route path="order-history" component={OrderHistory}/>
        <Route path="profile/set-new-password" component={SetNewPassword}/>
      </Route>

      { /* Routes */ }
      <Route path="login" component={Login}/>
      <Route path="register" component={Register}/>
      <Route path="address" component={Address}/>
      <Route path="extras/:id" component={Extras}/>
      <Route path="extras" component={Extras}/>
      <Route path="modify/product/:productId" component={ProductModify}/>
      <Route path="modify/order/:orderId" component={ProductModify}/>
      <Route path="static-page/terms-of-use" component={TermsOfUse}/>
      <Route path="static-page/privacy-policy" component={PrivacyPolicy}/>
      <Route path="static-page/about-catering" component={AboutCatering}/>
      <Route path="forgot-password" component={ForgotPassword}/>
      <Route path="set-new-password/:hash" component={SetNewPassword}/>
      <Route path="unsubscribe/:hash" component={UnsubscribePage}/>
      <Route path="preview-email" component={EmailPreview}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
