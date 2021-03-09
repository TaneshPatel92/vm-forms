import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import Routes from './Routes';
import { store, persistor, history } from './store/store';
import reportWebVitals from './reportWebVitals';
import 'jquery';
import 'bootstrap';
import 'jquery.easing';
import './assets/scss/index.scss';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

require('es6-promise').polyfill();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ConnectedRouter history={history}>
        <Routes history={history} store={store} />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);
reportWebVitals();
