import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import * as userActions from 'app/auth/store/actions';
import auth0Service from 'app/services/auth0Service';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { getMainProfileId, getHeaderToken, decodeDataFromToken, getTokenOnly } from 'app/services/serviceUtils';
import { GET_MAIN_PROFILE, GET_COMPANY_PROFILE } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';

class Auth extends Component {
	state = {
		waitAuthCheck: true
	};

	componentDidMount() {
		const outsidePlatformPaths = ['user-account-activation', 'reset-password-confirm', 'register'];
		const { location } = this.props;
		const { pathname } = location;
		const outsidePath = outsidePlatformPaths.filter(d => String(pathname).includes(d));
		if (outsidePath.length) {
			this.setState({
				waitAuthCheck: false
			});
			return localStorage.clear();
		} else {
			return Promise.all([
				// Comment the lines which you do not use
				// this.firebaseCheck(),
				// this.auth0Check(),

				this.jwtCheck()
			])
				.then(() => {
					this.setState({ waitAuthCheck: false });
					this.getUser();
					this.getCompanyProfileData();
				})
				.catch(() => {
					this.setState({ waitAuthCheck: false });
				});
		}
	}
	getUser = () => {
		const mainProfileId = getMainProfileId();
		apiCall(
			GET_MAIN_PROFILE(mainProfileId),
			{},
			res => this.props.setUserData(res),
			err => console.log({ err }),
			METHOD.GET,
			getHeaderToken()
		);
	};
	getCompanyProfileData = () => {
		this.props.getCompanyProfile(getTokenOnly());
	};
	jwtCheck = () =>
		new Promise((resolve, reject) => {
			jwtService.on('onAutoLogin', () => {
				/**
				 * Sign in and retrieve user data from Api
				 */
				jwtService
					.signInWithToken()
					.then(user => {
						this.props.setUserData(user);

						resolve();

						// this.props.showMessage({ message: 'Logged in with JWT' });
					})
					.catch(error => {
						// this.props.showMessage({ message: 'Failed to login with token.' });

						reject();
					});
			});

			jwtService.on('onAutoLogout', message => {
				if (message) {
					this.props.showMessage({ message });
				}

				this.props.logout();

				resolve();
			});

			jwtService.on('onNoAccessToken', () => {
				resolve();
			});

			jwtService.init();

			return Promise.resolve();
		});

	auth0Check = () =>
		new Promise(resolve => {
			auth0Service.init(success => {
				if (!success) {
					resolve();
				}
			});

			if (auth0Service.isAuthenticated()) {
				this.props.showMessage({ message: 'Logging in with Auth0' });

				/**
				 * Retrieve user data from Auth0
				 */
				auth0Service.getUserData().then(tokenData => {
					this.props.setUserDataAuth0(tokenData);

					resolve();

					this.props.showMessage({ message: 'Logged in with Auth0' });
				});
			} else {
				resolve();
			}

			return Promise.resolve();
		});

	firebaseCheck = () =>
		new Promise(resolve => {
			firebaseService.init(success => {
				if (!success) {
					resolve();
				}
			});

			firebaseService.onAuthStateChanged(authUser => {
				if (authUser) {
					this.props.showMessage({ message: 'Logging in with Firebase' });

					/**
					 * Retrieve user data from Firebase
					 */
					firebaseService.getUserData(authUser.uid).then(
						user => {
							this.props.setUserDataFirebase(user, authUser);

							resolve();

							this.props.showMessage({ message: 'Logged in with Firebase' });
						},
						error => {
							resolve();
						}
					);
				} else {
					resolve();
				}
			});

			return Promise.resolve();
		});

	render() {
		return this.state.waitAuthCheck ? <FuseSplashScreen /> : <>{this.props.children}</>;
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			logout: userActions.logoutUser,
			setUserData: userActions.setUserData,
			getCompanyProfile: userActions.getCompanyProfile,
			setUserDataAuth0: userActions.setUserDataAuth0,
			setUserDataFirebase: userActions.setUserDataFirebase,
			showMessage: Actions.showMessage,
			hideMessage: Actions.hideMessage
		},
		dispatch
	);
}

export default withRouter(connect(null, mapDispatchToProps)(Auth));
