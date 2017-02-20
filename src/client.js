/**
 * THIS IS THE ENTRY POINT FOR THE CLIENT, JUST LIKE server.js IS THE ENTRY POINT FOR THE SERVER.
 */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
//  import useScroll from 'scroll-behavior/lib/useStandardScroll';

import getRoutes from './routes';

const client = new ApiClient();
//  const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(browserHistory, client, window.__data);
const history = syncHistoryWithStore(browserHistory, store);

const component = (
  <Router render={(props) =>
        <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />
      } history={history} onUpdate={() => {if (location.pathname.search('/modify/product') !== 0) {window.scrollTo(0, 0);}} }>
    {getRoutes(store)}
  </Router>
);
ReactDOM.render(
  <Provider store={store} key="provider" >
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV === 'development') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
