import * as Actions from '../actions';

const initialState = {
	success: false,
	error: {
		username: null,
		password: null
	}
};

const register = (state = initialState, action) => {
	switch (action.type) {
		case Actions.REGISTER_SUCCESS: {
			return {
				...initialState,
				success: true,
				loadingRegister: false,
				sucessData: action.payload
			};
		}
		case Actions.REGISTER_ERROR: {
			return {
				success: false,
				loadingRegister: false,
				error: action.payload
			};
		}
		case Actions.REGISTER_BEGIN: {
			return {
				loadingRegister: true
			};
		}
		default: {
			return state;
		}
	}
};

export default register;
