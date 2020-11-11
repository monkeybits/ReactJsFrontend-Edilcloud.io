import { decodeDataFromToken } from 'app/services/serviceUtils';
import * as Actions from '../actions';
const initialState = () => {
	var nextWeek = new Date();

	//Change it so that it is 7 days in the feature.
	var pastDate = nextWeek.getDate() + 7;
	nextWeek.setDate(pastDate);
	return {
		genrealFilter: [
			{
				name: 'Mine',
				isActive: true
			},
			{
				name: 'All',
				isActive: false
			},
			{
				name: 'Alerted',
				isActive: false
			}
		],
		timeFilter: [
			{
				name: 'Today',
				isActive: false
			},
			{
				name: 'Next week',
				isActive: false
			},
			{
				name: 'In late',
				isActive: false
			},
			{
				name: 'Completed',
				isActive: false
			}
		],
		projectFilter: [],
		companyFilter: [],
		peopleFilter: [],
		activeFilter: 'genrealFilter',
		activeFilterKey: 'Mine',
		usedKeys: ['genrealFilter']
	};
};
const addIsActiveToDefault = (arr = []) => arr.map(d => (d = { ...d, isActive: false }));
const projectNames = arr => {
	var result = arr.reduce((unique, o) => {
		if (!unique.some(obj => obj.name === o.project.name)) {
			unique.push({
				...o.project
			});
		}
		return unique;
	}, []);
	return result;
};
const companyFilterNames = arr => {
	var result = arr.reduce((unique, o) => {
		if (o.assigned_company && !unique.some(obj => obj.id === o.assigned_company.id)) {
			unique.push({
				...o.assigned_company
			});
		}
		return unique;
	}, []);
	return addIsActiveToDefault(result);
};
const peopleFilterNames = arr => {
	const userInfo = decodeDataFromToken();
	var result = arr.reduce(function (flat, toFlatten) {
		let activityPeople = [];
		if (toFlatten.assigned_company && toFlatten.assigned_company.id == userInfo.extra.profile.company) {
			activityPeople = flatten(toFlatten.activities);
		}
		if (Array.isArray(activityPeople)) {
			flat = [...flat, ...activityPeople];
		}
		return flat;
	}, []);
	return addIsActiveToDefault(uniqueById(result));
};
const uniqueById = arr => {
	let result = arr.reduce((unique, o) => {
		if (!unique.some(obj => obj.id === o.id)) {
			unique.push(o);
		}
		return unique;
	}, []);
	return addIsActiveToDefault(result);
};
function flatten(arr) {
	return arr.reduce(function (flat, toFlatten) {
		return flat.concat(Array.isArray(toFlatten.workers) ? flatten(toFlatten.workers) : toFlatten);
	}, []);
}
const canSelectMultiple = ['projectFilter', 'companyFilter', 'peopleFilter'];
const filtersReducer = (state = initialState(), action) => {
	switch (action.type) {
		case Actions.GET_TODOS:
			// console.log({ action, peopleFilterNames: peopleFilterNames(action.payload) });
			return {
				...state,
				projectFilter: projectNames(action.payload),
				companyFilter: companyFilterNames(action.payload),
				peopleFilter: peopleFilterNames(action.payload)
			};
		case Actions.CHANGE_FILTERS:
			let tempUsedKeys = [...state.usedKeys];
			tempUsedKeys = tempUsedKeys.filter(item => item != action.payload.activeFilter);
			const chnagedState = state[action.payload.activeFilter].map(d => {
				if (d.name == action.payload.activeFilterKey || d.id == action.payload.activeFilterKey) {
					let isActive = !d.isActive;
					if (isActive) {
						tempUsedKeys.push(action.payload.activeFilter);
					}
					return { ...d, isActive };
				} else {
					if (!canSelectMultiple.includes(action.payload.activeFilter)) {
						return { ...d, isActive: false };
					} else {
						return d;
					}
				}
			});
			let data =
				state.activeFilterKey == action.payload.activeFilterKey
					? { ...action.payload, activeFilterKey: '' }
					: action.payload;
			return {
				...state,
				[action.payload.activeFilter]: chnagedState,
				usedKeys: tempUsedKeys,
				...data
			};
		default:
			return state;
	}
};

export default filtersReducer;
