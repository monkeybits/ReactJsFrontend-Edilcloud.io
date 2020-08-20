import history from '@history';
import _ from '@lodash';
import auth0Service from 'app/services/auth0Service';
import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import * as FuseActions from 'app/store/actions/fuse';
import firebase from 'firebase/app';
import jwtDecode from 'jwt-decode';
import { getTokenOnly } from 'app/services/serviceUtils';
export const SET_USER_DATA = '[USER] SET DATA';
export const SET_USER_COMPANY_DATA = '[USER] SET COMPANY DATA';
export const REMOVE_USER_DATA = '[USER] REMOVE DATA';
export const USER_LOGGED_OUT = '[USER] LOGGED OUT';

const authUserData = {
	uuid: 'XgbuVEXBU5gtSKdbQRP1Zbbby1i1',
	from: 'custom-db',
	password: 'user',
	redirectUrl: '/apps/todo/all',
	role: 'user',
	data: {
		displayName: '',
		email: '',
		photoURL: '/assets/images/avatars/Abbott.jpg',
		settings: {
			layout: {
				style: 'layout1',
				config: {
					scroll: 'content',
					navbar: {
						display: true,
						folded: false,
						position: 'left'
					},
					toolbar: {
						display: true,
						style: 'fixed',
						position: 'below'
					},
					footer: {
						display: true,
						style: 'fixed',
						position: 'below'
					},
					mode: 'fullwidth'
				}
			},
			customScrollbars: true,
			theme: {
				main: 'default',
				navbar: 'mainThemeDark',
				toolbar: 'mainThemeLight',
				footer: 'mainThemeDark'
			}
		},
		shortcuts: ['calendar', 'mail', 'contacts']
	}
};
/**
 * Set user data from Auth0 token data
 */
export function setUserDataAuth0(tokenData) {
	const user = {
		role: ['admin'],
		from: 'auth0',
		data: {
			displayName: tokenData.username,
			photoURL: tokenData.picture,
			email: tokenData.email,
			settings:
				tokenData.user_metadata && tokenData.user_metadata.settings ? tokenData.user_metadata.settings : {},
			shortcuts:
				tokenData.user_metadata && tokenData.user_metadata.shortcuts ? tokenData.user_metadata.shortcuts : []
		}
	};

	return setUserData(user);
}

/**
 * Set user data from Firebase data
 */
export function setUserDataFirebase(user, authUser) {
	if (
		user &&
		user.data &&
		user.data.settings &&
		user.data.settings.theme &&
		user.data.settings.layout &&
		user.data.settings.layout.style
	) {
		// Set user data but do not update
		return setUserData(user);
	}

	// Create missing user settings
	return createUserSettingsFirebase(authUser);
}

/**
 * Create User Settings with Firebase data
 */
export function createUserSettingsFirebase(authUser) {
	return (dispatch, getState) => {
		const guestUser = getState().auth.user;
		const fuseDefaultSettings = getState().fuse.settings.defaults;
		const { currentUser } = firebase.auth();

		/**
		 * Merge with current Settings
		 */
		const user = _.merge({}, guestUser, {
			uid: authUser.uid,
			from: 'firebase',
			role: ['admin'],
			data: {
				displayName: authUser.displayName,
				email: authUser.email,
				settings: { ...fuseDefaultSettings }
			}
		});
		currentUser.updateProfile(user.data);

		updateUserData(user, dispatch);
		return dispatch(setUserData(user));
	};
}

/**
 * Set User Data
 */
export function setUserData(user) {
	let token = getTokenOnly();
	let decode = token && jwtDecode(token);
	let userData = {
		...authUserData,
		role: decode ? 'user' : []
	};
	return (dispatch, getState) => {
		const guestUser = getState().auth.user.data;
		/*
        You can redirect the logged-in user to a specific route depending on his role
         */

		history.location.state = {
			redirectUrl: user.redirectUrl // for example 'apps/academy'
		};

		/*
        Set User Settings
         */
		dispatch(FuseActions.setDefaultSettings(userData.data.settings));

		/*
        Set User Data
         */

		dispatch({
			type: SET_USER_DATA,
			payload: decode
				? {
						...userData,
						data: { ...userData.data, ...guestUser, displayName: decode.username, ...decode, user }
				  }
				: userData
		});
	};
}

export function setUserCompanyData(company) {
	return dispatch => {
		dispatch({
			type: SET_USER_COMPANY_DATA,
			payload: company
		});
	};
}
/**
 * Update User Settings
 */
export function updateUserSettings(settings) {
	return (dispatch, getState) => {
		const oldUser = getState().auth.user;
		const user = _.merge({}, oldUser, { data: { settings } });

		updateUserData(user, dispatch);

		return dispatch(setUserData(user));
	};
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts) {
	return (dispatch, getState) => {
		const { user } = getState().auth;
		const newUser = {
			...user,
			data: {
				...user.data,
				shortcuts
			}
		};

		updateUserData(newUser, dispatch);

		return dispatch(setUserData(newUser));
	};
}

/**
 * Remove User Data
 */
export function removeUserData() {
	return {
		type: REMOVE_USER_DATA
	};
}

/**
 * Logout
 */
export function logoutUser() {
	return (dispatch, getState) => {
		const { user } = getState().auth;

		if (!user.role || user.role.length === 0) {
			// is guest
			return null;
		}

		history.push({
			pathname: '/'
		});

		switch (user.from) {
			case 'firebase': {
				firebaseService.signOut();
				break;
			}
			case 'auth0': {
				auth0Service.logout();
				break;
			}
			default: {
				jwtService.logout();
			}
		}

		dispatch(FuseActions.setInitialSettings());

		return dispatch({
			type: USER_LOGGED_OUT
		});
	};
}

/**
 * Update User Data
 */
function updateUserData(user, dispatch) {
	if (!user.role || user.role.length === 0) {
		// is guest
		return;
	}

	switch (user.from) {
		case 'firebase': {
			firebaseService
				.updateUserData(user)
				.then(() => {
					dispatch(MessageActions.showMessage({ message: 'User data saved to firebase' }));
				})
				.catch(error => {
					dispatch(MessageActions.showMessage({ message: error.message }));
				});
			break;
		}
		case 'auth0': {
			auth0Service
				.updateUserData({
					settings: user.data.settings,
					shortcuts: user.data.shortcuts
				})
				.then(() => {
					dispatch(MessageActions.showMessage({ message: 'User data saved to auth0' }));
				})
				.catch(error => {
					dispatch(MessageActions.showMessage({ message: error.message }));
				});
			break;
		}
		default: {
			jwtService
				.updateUserData(user)
				.then(() => {
					dispatch(MessageActions.showMessage({ message: 'User data saved with api' }));
				})
				.catch(error => {
					dispatch(MessageActions.showMessage({ message: error.message }));
				});
			break;
		}
	}
}
