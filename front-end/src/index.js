import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Global from './style/Global';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Global />
  </React.StrictMode>,
  document.getElementById('root'),
);
