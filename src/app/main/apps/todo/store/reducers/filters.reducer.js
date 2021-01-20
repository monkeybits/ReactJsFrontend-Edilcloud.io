import { decodeDataFromToken } from 'app/services/serviceUtils';
import * as Actions from '../actions';
const initialState = () => {
	let genrealFilterJsonData = localStorage.getItem('genrealFilterJsonData');
	let timeFilterJsonData = localStorage.getItem('timeFilterJsonData');

	let genrealFilter = [
		{
			name: 'MINE',
			isActive: true
		},
		{
			name: 'ALL',
			isActive: false
		},
		{
			name: 'ALERTED',
			isActive: false
		}
	];
	let timeFilter = [
		{
			name: 'TODAY',
			isActive: true
		},
		{
			name: 'NEXT_WEEK',
			isActive: false
		},
		{
			name: 'IN_LATE',
			isActive: false
		},
		{
			name: 'COMPLETED',
			isActive: false
		}
	];
	var nextWeek = new Date();

	//Change it so that it is 7 days in the feature.
	var pastDate = nextWeek.getDate() + 7;
	nextWeek.setDate(pastDate);
	return {
		projectFilter: [],
		companyFilter: [],
		peopleFilter: [],
		activeFilter: 'genrealFilter',
		activeFilterKey: 'MINE',
		usedKeys: [],
		genrealFilter: genrealFilterJsonData ? JSON.parse(genrealFilterJsonData) : genrealFilter,
		timeFilter: timeFilterJsonData ? JSON.parse(timeFilterJsonData) : timeFilter
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
		if (
			toFlatten.assigned_company &&
			userInfo.extra?.profile &&
			toFlatten.assigned_company.id == userInfo.extra.profile.company
		) {
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
				peopleFilter: peopleFilterNames(action.payload),
				usedKeys: ['genrealFilter', 'timeFilter']
			};
		case Actions.CHANGE_FILTERS:
			let tempUsedKeys = [...state.usedKeys];
			tempUsedKeys = tempUsedKeys.filter(item => item != action.payload.activeFilter);
			const chnagedState = state[action.payload.activeFilter].map(d => {
				if (d.name == action.payload.activeFilterKey || d.id == action.payload.activeFilterKey) {
					let isActive = !d.isActive;
					return { ...d, isActive };
				} else {
					if (!canSelectMultiple.includes(action.payload.activeFilter)) {
						return { ...d, isActive: false };
					} else {
						return d;
					}
				}
			});
			let allActivited = chnagedState.filter(d => d.isActive);
			console.log({ allActivited: allActivited });
			if (allActivited?.length) {
				tempUsedKeys.push(action.payload.activeFilter);
			}
			if (action.payload.activeFilter === 'genrealFilter') {
				const genrealFilterJsonData = JSON.stringify(chnagedState);
				localStorage.setItem('genrealFilterJsonData', genrealFilterJsonData);
			}
			if (action.payload.activeFilter === 'timeFilter') {
				const timeFilterJsonData = JSON.stringify(chnagedState);
				localStorage.setItem('timeFilterJsonData', timeFilterJsonData);
			}
			return {
				...state,
				[action.payload.activeFilter]: chnagedState,
				usedKeys: tempUsedKeys,
				...action.payload
			};
		default:
			return state;
	}
};

export default filtersReducer;
