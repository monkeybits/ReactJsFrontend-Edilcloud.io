import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	entities: [],
	projectDialog: false
};

const labelsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_PROJECT: {
			return {
				...state,
				entities: _.keyBy(action.payload, 'id')
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
