import * as Actions from '../actions';

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	},
	loadingLogin: false
};

const login = (state = initialState, action) => {
	switch (action.type) {
		case Actions.LOGIN_SUCCESS: {
			return {
				...initialState,
				success: true,
				loadingLogin: false,
				error: {
					username: null,
					password: null
				}
			};
		}
		case Actions.LOGIN_ERROR: {
			return {
				loadingLogin: false,
				success: false,
				error: action.payload
			};
		}
		case Actions.LOGIN_BEGIN: {
			return {
				loadingLogin: true
			};
		}
		default: {
			return state;
		}
	}
};

export default login;
