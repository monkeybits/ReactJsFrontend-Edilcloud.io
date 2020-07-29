import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	entities: [],
	projectDialog: false,
	searchText: '',
	projectDetail: {}
};

const labelsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_PROJECTS: {
			return {
				...state,
				entities: action.payload
			};
		}
		case Actions.GET_PROJECT_DETAIL: {
			return {
				...state,
				projectDetail: action.payload
			};
		}
		case Actions.TOGGLE_PROJECT_STATUS: {
			let index = action.index;
			let results = state.entities;
			results[index] = { ...results[index], status: !results[index].status };
			return {
				...state,
				entities: results
			};
		}
		case Actions.DIALOG_PROJECT_OPEN: {
			return {
				...state,
				projectDialog: true
			};
		}
		case Actions.DIALOG_PROJECT_CLOSE: {
			return {
				...state,
				projectDialog: false
			};
		}
		default: {
			return state;
		}
	}
};

export default labelsReducer;
