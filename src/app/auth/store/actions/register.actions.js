import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_BEGIN = 'REGISTER_BEGIN';

export function submitRegister({ username, first_name, last_name, password, email, history }) {
	return dispatch => {
		dispatch({
			type: REGISTER_BEGIN
		});
		jwtService
			.createUser({
				username,
				first_name,
				last_name,
				password1: password,
				password2: password,
				email
			})
			.then(successData => {
				history.push('/pages/auth/mail-confirm');
				return dispatch({
					type: REGISTER_SUCCESS,
					payload: successData
				});
			})
			.catch(error => {
				return dispatch({
					type: REGISTER_ERROR,
					payload: error
				});
			});
	};
}

export function registerWithFirebase(model) {
	if (!firebaseService.auth) {
		console.warn("Firebase Service didn't initialize, check your configuration");

		return () => false;
	}

	const { email, password, displayName } = model;
	return dispatch =>
		firebaseService.auth
			.createUserWithEmailAndPassword(email, password)
			.then(response => {
				dispatch(
					UserActions.createUserSettingsFirebase({
						...response.user,
						displayName,
						email
					})
				);

				return dispatch({
					type: REGISTER_SUCCESS
				});
			})
			.catch(error => {
				const usernameErrorCodes = ['auth/operation-not-allowed', 'auth/user-not-found', 'auth/user-disabled'];

				const emailErrorCodes = ['auth/email-already-in-use', 'auth/invalid-email'];

				const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

				const response = {
					email: emailErrorCodes.includes(error.code) ? error.message : null,
					displayName: usernameErrorCodes.includes(error.code) ? error.message : null,
					password: passwordErrorCodes.includes(error.code) ? error.message : null
				};

				if (error.code === 'auth/invalid-api-key') {
					dispatch(Actions.showMessage({ message: error.message }));
				}

				return dispatch({
					type: REGISTER_ERROR,
					payload: response
				});
			});
}
