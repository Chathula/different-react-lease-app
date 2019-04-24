import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import store from './store';

import Navbar from './components/navBar';

import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import Home from './components/pages/home';
import Lease from './components/pages/lease';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/lease/:leaseId" component={Lease} />
    </Router>
  </Provider>, 
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
