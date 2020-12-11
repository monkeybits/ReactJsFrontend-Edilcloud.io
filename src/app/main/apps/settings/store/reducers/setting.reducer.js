import * as Actions from '../actions';

const foldersReducer = (state = {}, action) => {
	switch (action.type) {
		case Actions.GET_SETTINGS:
			return { ...state, ...action.payload };
		case Actions.UPDATE_SETTINGS: {
			let data = { ...state };
			let key = action.payload.isEmail ? 'email' : 'bell';
			let index = action.payload.index;
			data.notification[key] = {
				...data.notification[key],
				status: true
			};
			data.notification[key].typology[index] = {
				...data.notification[key].typology[index],
				status: action.payload.bool
			};
			return data;
		}
		case Actions.UPDATE_FULL_ARRAY_SETTINGS: {
			let data = { ...state };
			let key = action.payload.isEmail ? 'email' : 'bell';
			data.notification[key] = {
				...data.notification[key],
				status: true
			};
			data.notification[key].typology = data.notification[key].typology.map(d => ({
				...d,
				status: action.payload.bool
			}));
			return data;
		}
		default:
			return state;
	}
};

export default foldersReducer;
