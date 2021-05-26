import * as Actions from '../actions';

const initialState = [];

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
const mergeArray = (oldArr = [], newArr = []) =>
	[...newArr, ...oldArr].reduce((arr, current) => {
		const x = arr.find(item => item.name === current.name);
		if (!x) {
			return arr.concat([current]);
		}
		return arr;
	}, []);
const boardsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_BOARDS: {
			return sortByProperty(mergeArray([...state, ...action.payload]), 'name');
		}
		case Actions.NEW_BOARD: {
			return [...state, action.board];
		}
		case Actions.RESET_BOARDS: {
			return [];
		}
		default:
			return state;
	}
};

export default boardsReducer;
