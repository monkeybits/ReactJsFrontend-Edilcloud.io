import * as Actions from '../actions';

const initialState = {
	can_access_chat: true,
	can_access_files: true
};

const company = (state = initialState, action) => {
	switch (action.type) {
		case Actions.COMPANY_INFO: {
			return {
				...action.company
			};
		}
		default: {
			return state;
		}
	}
};

export default company;
