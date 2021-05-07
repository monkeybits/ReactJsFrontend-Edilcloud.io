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
import React, { Suspense } from 'react';
// // import loadable from '@loadable/component';
import ReactDOM from 'react-dom';
import 'typeface-poppins';
import './i18n';
import './react-chartjs-2-defaults';
import './styles/index.css';
import { ClearBrowserCacheBoundary } from 'react-clear-browser-cache';
import * as serviceWorker from './serviceWorker';
import './styles/custom-style.css';
import './styles/responsive.css';
import ErrorBoundary from './ErrorBoundary';
// import App from 'app/App'
const App = React.lazy(() => import('app/App'));

ReactDOM.render(
	<Suspense fallback={<div>Loading...</div>}>
		<ErrorBoundary>
			<ClearBrowserCacheBoundary auto fallback="Loading" duration={60000}>
				<App />
			</ClearBrowserCacheBoundary>
		</ErrorBoundary>
	</Suspense>,
	document.getElementById('root')
);

// //If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA erviceWorker.register();//
serviceWorker.register();
