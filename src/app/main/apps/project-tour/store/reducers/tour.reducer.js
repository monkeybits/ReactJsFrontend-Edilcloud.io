import _ from '@lodash';
import * as Actions from '../actions';

const tour = (state = {}, action) => {
	switch (action.type) {
		case Actions.OPEN: {
			return {
				...state,
				isSpen: action.payload
			};
		}
		case Actions.CLOSE: {
			return {
				...state,
				isSpen: action.payload
			};
		}

		default: {
			return state;
		}
	}
};

export default tour;
