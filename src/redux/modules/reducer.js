import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';

import auth from './auth';
import productDetails from './productDetails';
import products from './product';
import categories from './categories';
import cart from './cart';
import card from './card';
import sidebar from './sidebar';
import address from './address';
import orderHistory from './orderHistory';
import config from './config';
import {reducer as form} from 'redux-form';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  auth,
  cart,
  card,
  products,
  categories,
  productDetails,
  sidebar,
  address,
  orderHistory,
  config,
  form
});
