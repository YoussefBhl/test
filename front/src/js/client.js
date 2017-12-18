import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './store/configureStore';  
import ProductPage from "./components/products/ProductPage"
import {loadProducts} from './actions/productActions';

const store = configureStore();

const app = document.getElementById('app');
store.dispatch(loadProducts());

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={ProductPage}>
      </Route>
    </Router>
  </Provider>,
app);
