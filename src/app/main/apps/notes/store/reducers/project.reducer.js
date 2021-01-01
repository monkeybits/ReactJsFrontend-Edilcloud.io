import _ from '@lodash';
import * as Actions from '../actions';
import FuseUtils from '@fuse/utils';

const initialState = () => ({
	entities: [],
	projectDialog: false,
	searchText: '',
	projectDetail: {},
	dialogType: 'new'
});
const mergeArray = (oldArr = [], newArr = []) =>
	[...newArr, ...oldArr].reduce((arr, current) => {
		const x = arr.find(item => item.name === current.name);
		if (!x) {
			return arr.concat([current]);
		} else {
			return arr;
		}
	}, []);
function sortByProperty(array, property, order = 'ASC') {
	return array.sort((a, b) =>
		order === 'ASC'
			? a[property].toLocaleLowerCase() > b[property].toLocaleLowerCase()
				? 1
				: a[property].toLocaleLowerCase() < b[property].toLocaleLowerCase()
				? -1
				: 0
			: a[property].toLocaleLowerCase() > b[property].toLocaleLowerCase()
			? -1
			: a[property].toLocaleLowerCase() < b[property].toLocaleLowerCase()
			? 1
			: 0
	);
}
const deleteByProjectId = (projects = [], pid) => projects.filter(project => project.id != pid);
const mergeArrayByComapny = arr =>
	arr.reduce((arr, current) => {
		const x = arr.find(item => (item.id && current.id ? item.id === current.id : false));
		if (!x) {
			return arr.concat([current]);
		} else {
			return arr;
		}
	}, []);
const getAllCompanies = (arr = []) => arr.map(item => item.company).filter(i => i && i);
const labelsReducer = (state = initialState(), action) => {
	switch (action.type) {
		case Actions.GET_PROJECTS: {
			return {
				...state,
				entities: sortByProperty(mergeArray(state.entities, action.payload), 'name'),
				companies: mergeArrayByComapny(getAllCompanies(mergeArray(state.entities, action.payload), 'name'))
			};
		}
		case Actions.GET_PROJECT_LIST: {
			return {
				...state,
				entities: sortByProperty(mergeArray(action.payload), 'name')
			};
		}
		case Actions.DELETE_PROJECT_ACTION: {
			return {
				...state,
				entities: deleteByProjectId(state.entities, action.pid)
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
				projectDialog: true,
				dialogType: action.dialogType
			};
		}
		case Actions.DIALOG_PROJECT_CLOSE: {
			return {
				...state,
				projectDialog: false
			};
		}
		case Actions.RESET_PROEJECTS: {
			return initialState();
		}
		default: {
			return state;
		}
	}
};

export default labelsReducer;
