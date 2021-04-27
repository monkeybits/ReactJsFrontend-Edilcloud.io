import * as Actions from '../actions';

const initialState = {
	filterKey: 'edit_profile'
};

const foldersReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.FILTER_BY: {
			return {
				...state,
				filterKey: action.filterKey
			};
		}
		case Actions.GET_SETTINGS:
			return { ...state, ...action.payload };
		case Actions.UPDATE_SETTINGS: {
			const data = { ...state };
			const key = action.payload.isEmail ? 'email' : 'bell';
			const { index } = action.payload;
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
			const data = { ...state };
			const key = action.payload.isEmail ? 'email' : 'bell';
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
