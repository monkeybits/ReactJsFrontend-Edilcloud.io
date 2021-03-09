import React from 'react';
import loadable from '@loadable/component';
import MomentUtils from '@date-io/moment';
import '@fake-db';
import history from '@history';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AppContext from './AppContext';
import { Auth } from './auth';
import routes from './fuse-configs/routesConfig';
import store from './store';
import InternetStatus from './InternetStatus';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import WebSocketProvider from 'app/WebSocket';
import ProjectReportsProvider from 'app/ProjectReportsWebSocket';
const FuseAuthorization = loadable(() => import('@fuse/core/FuseAuthorization'))
const FuseLayout = loadable(() => import('@fuse/core/FuseLayout'))
const FuseTheme = loadable(() => import('@fuse/core/FuseTheme'))

const jss = create({
	...jssPreset(),
	plugins: [...jssPreset().plugins, jssExtend(), rtl()],
	insertionPoint: document.getElementById('jss-insertion-point')
});

const generateClassName = createGenerateClassName();
const App = () => {
	return (
		<AppContext.Provider
			value={{
				routes
			}}
		>
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<Provider store={store}>
					<MuiPickersUtilsProvider utils={MomentUtils}>
						<Router history={history}>
							<Auth>
								<FuseAuthorization>
									<FuseTheme>
										<WebSocketProvider>
											<ProjectReportsProvider>
												<FuseLayout />
											</ProjectReportsProvider>
										</WebSocketProvider>
									</FuseTheme>
								</FuseAuthorization>
							</Auth>
						</Router>
					</MuiPickersUtilsProvider>
				</Provider>
			</StylesProvider>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
			<InternetStatus />
		</AppContext.Provider>
	);
};

export default App;
