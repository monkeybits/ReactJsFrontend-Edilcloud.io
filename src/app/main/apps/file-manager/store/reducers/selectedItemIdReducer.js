import * as Actions from '../actions';

const selectedItemIdReducer = (state = {}, action) => {
	switch (action.type) {
		case Actions.SET_SELECTED_ITEM_ID:
			return action.payload;
		default:
			return state;
	}
};

export default selectedItemIdReducer;
