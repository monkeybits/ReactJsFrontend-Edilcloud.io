import _ from '@lodash';
import * as Actions from '../actions';

const filesReducer = (state = {}, action) => {
	switch (action.type) {
		case Actions.GET_FILES:
			return _.keyBy(action.payload, 'id');
		case Actions.GET_PHOTOS:
			return {
				...state,
				photos: action.payload
			};
		case Actions.GET_VIDEOS:
			return {
				...state,
				videos: action.payload
			};
		case Actions.GET_DOCUMENTS:
			return {
				...state,
				documents: action.payload
			};
		case Actions.GET_FOLDERS:
			return {
				...state,
				folders: action.payload
			};
		default:
			return state;
	}
};

export default filesReducer;
