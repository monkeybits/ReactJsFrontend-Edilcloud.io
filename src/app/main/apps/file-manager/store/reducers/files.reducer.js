import _ from '@lodash';
import * as Actions from '../actions';

const initialState = () => ({
	files: [],
	searchText: '',
	folderPath: ['']
});

function formatBytes(a, b = 2) {
	if (0 === a) return '0 Bytes';
	const c = 0 > b ? 0 : b,
		d = Math.floor(Math.log(a) / Math.log(1024));
	return (
		parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
		' ' +
		['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
	);
}

const addTypeInArray = (arr = [], type) =>
	arr.map((d, i) => ({ ...d, mainId: d.id, id: i, type, size: formatBytes(d.size) }));
const mergeArray = (oldArr = [], newArr = []) =>
	[...oldArr, ...newArr].reduce((arr, current) => {
		const x = arr.find(item => item.mainId === current.mainId);
		if (!x) {
			return arr.concat([current]);
		} else {
			return arr;
		}
	}, []);
function sortByProperty(array, property, order = 'ASC') {
	return array.sort((a, b) =>
		order === 'ASC'
			? a[property] > b[property]
				? 1
				: a[property] < b[property]
				? -1
				: 0
			: a[property] > b[property]
			? -1
			: a[property] < b[property]
			? 1
			: 0
	);
}
const chnageIds = (arr = []) => arr.map((d, i) => ({ ...d, id: i }));
const filesReducer = (state = initialState(), action) => {
	switch (action.type) {
		case Actions.GET_FILES:
			return _.keyBy(action.payload, 'id');
		case Actions.GET_PHOTOS:
			return {
				...state,
				photos: action.payload,
				files: chnageIds(
					sortByProperty(mergeArray(state.files, addTypeInArray(action.payload.results, 'photo')), 'title')
				)
			};
		case Actions.GET_VIDEOS:
			return {
				...state,
				videos: action.payload,
				files: chnageIds(
					sortByProperty(mergeArray(state.files, addTypeInArray(action.payload.results, 'video')), 'title')
				)
			};
		case Actions.GET_DOCUMENTS:
			return {
				...state,
				documents: action.payload,
				files: chnageIds(
					sortByProperty(mergeArray(state.files, addTypeInArray(action.payload.results, 'document')), 'title')
				)
			};
		case Actions.GET_FOLDERS:
			return {
				...state,
				folders: action.payload.sort((_a, _b) => {
					let a = _a.path.replace('/', '');
					let b = _b.path.replace('/', '');
					return a > b ? 1 : a < b ? -1 : 0;
				})
			};
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.SET_FOLDER_PATH:
			return {
				...state,
				folderPath: [...state.folderPath, action.payload]
			};
		case Actions.POP_FOLDER_PATH:
			let folderPath = state.folderPath;
			folderPath.pop();
			return {
				...state,
				folderPath
			};
		case Actions.RESET_FILES: {
			return initialState();
		}
		default:
			return state;
	}
};

export default filesReducer;
