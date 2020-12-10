import * as Actions from '../actions';

const foldersReducer = (state = [], action) => {
	switch (action.type) {
		case Actions.GET_SETTINGS:
			return [...action.payload];
		default:
			return state;
	}
};

export default foldersReducer;
