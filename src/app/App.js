import MomentUtils from '@date-io/moment';
import '@fake-db';
import FuseAuthorization from '@fuse/core/FuseAuthorization';
import FuseLayout from '@fuse/core/FuseLayout';
import FuseTheme from '@fuse/core/FuseTheme';
import history from '@history';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import React from 'react';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import AppContext from './AppContext';
import { Auth } from './auth';
import routes from './fuse-configs/routesConfig';
import store from './store';
import InternetStatus from './InternetStatus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
// import 'bootstrap/dist/css/bootstrap.min.css';
import WebSocketProvider, { WebSocketContext } from 'app/WebSocket';
import ProjectReportsProvider, { WebSocketProjectReportContext } from 'app/ProjectReportsWebSocket';

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
