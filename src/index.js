//* *******************************************************************************
// Title : Edilcloud
// Developer: Chaitnya parikh
// *Email:chaitnya@peerbits.com
// *Company:Peerbits Solution
// Created By : Chaitnya parikh
// Created Date :
// Updated Date :
// Updated By :
//* *******************************************************************************
// Internet Explorer 11 requires polyfills and partially supported by this project.
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import loadable from '@loadable/component';
import ReactDOM from 'react-dom';
import 'typeface-muli';
import './i18n';
import './react-chartjs-2-defaults';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';
import './styles/custom-style.css';
import './styles/responsive.css';
const App = loadable(() => import('app/App'))

ReactDOM.render(<App />, document.getElementById('root'));

// //If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA erviceWorker.register();//
serviceWorker.register();
