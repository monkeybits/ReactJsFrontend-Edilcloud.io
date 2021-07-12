import * as Actions from '../actions';

const initialState = {
	role: [], // guest
	data: {
		displayName: 'John Doe',
		photoURL: 'assets/images/avatars/Velazquez.jpg',
		email: 'johndoe@withinpixels.com',
		shortcuts: ['calendar', 'mail', 'contacts', 'todo']
	},
	showBillingFormDialog: false
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SET_USER_DATA: {
			return {
				...state,
				...action.payload
			};
		}
		case Actions.SET_USER_COMPANY_DATA: {
			return {
				...state,
				data: {
					...state.data,
					...action.payload
				}
			};
		}
		case Actions.REMOVE_USER_DATA: {
			return {
				...initialState
			};
		}
		case Actions.SHOW_BILLING_FORM_DIALOG: {
			return {
				...state,
				showBillingFormDialog: true
			};
		}
		case Actions.CLOSE_BILLING_FORM_DIALOG: {
			return {
				...state,
				showBillingFormDialog: false
			};
		}
		case Actions.USER_LOGGED_OUT: {
			return initialState;
		}
		default: {
			return state;
		}
	}
};

export default user;
