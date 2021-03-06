import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Admin from "./admin";
import Router from "./router.js";
import { Provider } from "react-redux";
import configureStore from "./redux/store/configStore";

const store = configureStore();

ReactDOM.render( 
    <Provider store={store}>
       <Router  />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
