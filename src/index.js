import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/jquery/dist/jquery.slim.js'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import '../node_modules/jquery.easing/jquery.easing.js'
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
