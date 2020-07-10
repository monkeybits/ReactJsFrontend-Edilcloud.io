import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { APPROVE_LIST } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_BEGIN = 'LOGIN_BEGIN';

export function submitLogin({ email, password }) {
	return dispatch => {
		dispatch({
			type: LOGIN_BEGIN
		});
		jwtService
			.signInWithEmailAndPassword(email, password)
			.then(user => {
				apiCall(
					APPROVE_LIST,
					{},
					({ results }) => {
						if (Array.isArray(results)) {
							let boards = results.filter(d => d.is_main);

							if (boards.length) {
								dispatch(UserActions.setUserData({ ...user, redirectUrl: '/apps/companies' }));

								return dispatch({
									type: LOGIN_SUCCESS
								});
							} else {
								dispatch(UserActions.setUserData({ ...user, redirectUrl: '/main-profile' }));

								return dispatch({
									type: LOGIN_SUCCESS
								});
							}
						}
					},
					err => console.log(err),
					METHOD.GET,
					getHeaderToken()
				);
			})
			.catch(error => {
				return dispatch({
					type: LOGIN_ERROR,
					payload: error
				});
			});
	};
}

export function submitLoginWithFireBase({ username, password }) {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}

	return dispatch =>
		firebaseService.auth
			.signInWithEmailAndPassword(username, password)
			.then(() => {
				return dispatch({
					type: LOGIN_SUCCESS
				});
			})
			.catch(error => {
				console.info('error');
				const usernameErrorCodes = [
					'auth/email-already-in-use',
					'auth/invalid-email',
					'auth/operation-not-allowed',
					'auth/user-not-found',
					'auth/user-disabled'
				];
				const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

				const response = {
					username: usernameErrorCodes.includes(error.code) ? error.message : null,
					password: passwordErrorCodes.includes(error.code) ? error.message : null
				};

				if (error.code === 'auth/invalid-api-key') {
					dispatch(Actions.showMessage({ message: error.message }));
				}

				return dispatch({
					type: LOGIN_ERROR,
					payload: response
				});
			});
}
