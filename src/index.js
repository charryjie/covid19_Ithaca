/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.4.0";
import "assets/css/demo.css";

import App from "App";

import updateReducer from './reducer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

ReactDOM.render(
  <Provider store={configureStore({
    reducer: {
      update: updateReducer,
    }
  })}>
    <App />
  </Provider>,
  document.getElementById("root")
);
