import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


// serviceWorker.register() for app to work offline and load faster. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// change register to unregister to disable this
serviceWorker.register();
