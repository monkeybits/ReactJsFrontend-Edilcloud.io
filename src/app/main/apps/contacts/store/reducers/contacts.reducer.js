import _ from '@lodash';
import * as Actions from '../actions';

const initialState = () => ({
	entities: [],
	waiting: [],
	approved: [],
	refused: [],
	deactivated: [],
	searchText: '',
	routeParams: {},
	filterKey: 'all',
	contactDialog: {
		type: 'new',
		props: {
			open: false,
			view: false
		},
		data: null
	}
});

const mergeArray = (oldArr = [], newArr = []) =>
	[...newArr, ...oldArr].reduce((arr, current) => {
		const x = arr.find(item => (item.id && current.id ? item.id === current.id : false));
		if (!x) {
			return arr.concat([current]);
		} else {
			return arr;
		}
	}, []);
const removeByEmail = (arr = [], email) => (arr.length ? arr.filter((d, i) => d.email != email) : []);
const addTypeInArray = (arr = [], status) => (arr.length ? arr.map((d, i) => ({ ...d, status })) : []);
const contactsReducer = (state = initialState(), action) => {
	switch (action.type) {
		case Actions.RESET_CONTACTS: {
			return { ...initialState(), filterKey: state.filterKey };
		}
		case Actions.FILTER_BY: {
			return {
				...state,
				filterKey: action.filterKey
			};
		}
		case Actions.GET_CONTACTS: {
			return {
				...state,
				entities: mergeArray(state.entities, addTypeInArray(action.payload, 'Approved')),
				approved: addTypeInArray([...action.payload], 'Approved'),
				routeParams: action.routeParams
			};
		}
		case Actions.REMOVE_CONTACT: {
			return {
				...state,
				entities: removeByEmail(state.entities, action.payload),
				deactivated: removeByEmail(state.deactivated, action.payload),
				routeParams: action.routeParams
			};
		}
		case Actions.GET_WAITING_CONTACTS: {
			return {
				...state,
				entities: mergeArray(state.entities, addTypeInArray(action.payload, 'Waiting')),
				waiting: addTypeInArray([...action.payload], 'Waiting'),
				routeParams: action.routeParams
			};
		}
		case Actions.GET_DEACTIVATED_CONTACTS: {
			return {
				...state,
				deactivated: addTypeInArray([...action.payload], 'Deactivated'),
				routeParams: action.routeParams
			};
		}
		case Actions.GET_REFUSED_CONTACTS: {
			return {
				...state,
				entities: mergeArray(state.entities, addTypeInArray(action.payload, 'Refused')),
				refused: addTypeInArray([...action.payload], 'Refused'),
				routeParams: action.routeParams
			};
		}
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.OPEN_NEW_CONTACT_DIALOG: {
			return {
				...state,
				contactDialog: {
					type: 'new',
					props: {
						open: true
					},
					data: null
				}
			};
		}
		case Actions.CLOSE_NEW_CONTACT_DIALOG: {
			return {
				...state,
				contactDialog: {
					type: 'new',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		case Actions.OPEN_EDIT_CONTACT_DIALOG: {
			return {
				...state,
				contactDialog: {
					type: 'edit',
					props: {
						open: true
					},
					data: action.data
				}
			};
		}
		case Actions.CLOSE_EDIT_CONTACT_DIALOG: {
			return {
				...state,
				contactDialog: {
					type: 'edit',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		case Actions.OPEN_VIEW_CONTACT_DIALOG: {
			return {
				...state,
				contactDialog: {
					type: 'view',
					props: {
						view: true
					},
					data: action.data
				}
			};
		}
		case Actions.CLOSE_VIEW_CONTACT_DIALOG: {
			return {
				...state,
				contactDialog: {
					type: 'view',
					props: {
						view: false
					},
					data: null
				}
			};
		}
		default: {
			return state;
		}
	}
};

export default contactsReducer;
