import { decodeDataFromToken } from 'app/services/serviceUtils';
import * as Actions from '../actions';

const initialState = () => {
	const genrealFilterJsonData = localStorage.getItem('genrealFilterJsonDataProject');
	const timeFilterJsonData = localStorage.getItem('timeFilterJsonDataProject');
	const genrealFilter = [
		{
			name: 'ACTIVE',
			isActive: false,
			icon: 'check_circle'
		},
		{
			name: 'ARCHIVED',
			isActive: false,
			icon: 'archive'
		},
		{
			name: 'DELETED',
			isActive: false,
			icon: 'delete'
		}
	];
	const timeFilter = [
		{
			name: 'TODAY',
			isActive: false,
			icon: 'today'
		},
		{
			name: 'NEXT_WEEK',
			isActive: false,
			icon: 'next_week'
		},
		{
			name: 'IN_LATE',
			isActive: false,
			icon: 'av_timer'
		},
		{
			name: 'COMPLETED',
			isActive: false,
			icon: 'done'
		}
	];
	const nextWeek = new Date();

	// Change it so that it is 7 days in the feature.
	const pastDate = nextWeek.getDate() + 7;
	nextWeek.setDate(pastDate);
	return {
		companyFilter: [],
		peopleFilter: [],
		activeFilter: 'genrealFilter',
		activeFilterKey: 'MINE',
		usedKeys: [],
		genrealFilter,
		timeFilter
	};
};
const addIsActiveToDefault = (arr = []) => arr.map(d => (d = { ...d, isActive: false }));
const projectNames = arr => {
	const result = arr.reduce((unique, o) => {
		if (!unique.some(obj => obj.name === o?.name)) {
			unique.push({
				...o
			});
		}
		return unique;
	}, []);
	return result;
};
const companyFilterNames = arr => {
	const companyArr = arr.map(project => project.company);
	const result = companyArr.reduce((unique, o) => {
		if (!unique.some(obj => obj.id === o.id)) {
			unique.push({
				...o
			});
		}
		return unique;
	}, []);
	return addIsActiveToDefault(result);
};
const peopleFilterNames = arr => {
	const userInfo = decodeDataFromToken();
	const result = arr.reduce(function (flat, toFlatten) {
		let activityPeople = [];
		if (
			toFlatten.assigned_company &&
			userInfo?.extra?.profile &&
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
	const result = arr.reduce((unique, o) => {
		if (!unique.some(obj => obj.id === o.id)) {
			unique.push(o);
		}
		return unique;
	}, []);
	return addIsActiveToDefault(result);
};
function flatten(arr) {
	return (
		Array.isArray(arr) &&
		arr.reduce(function (flat, toFlatten) {
			return flat.concat(Array.isArray(toFlatten.workers) ? flatten(toFlatten.workers) : toFlatten);
		}, [])
	);
}
const canSelectMultiple = ['projectFilter', 'companyFilter'];
const filtersReducer = (state = initialState(), action) => {
	switch (action.type) {
		case Actions.GET_PROJECTS:
			return {
				...state,
				companyFilter: companyFilterNames(action.payload.length > 0 ? action.payload : state.projectFilter),
				usedKeys: ['genrealFilter', 'timeFilter']
			};
		// case Actions.RESET_ALL_FILTERS:
		// 	return {
		// 		...state,
		// 		projectFilter: addIsActiveToDefault(state.projectFilter),
		// 		companyFilter: addIsActiveToDefault(state.companyFilter),
		// 		peopleFilter: addIsActiveToDefault(state.peopleFilter),
		// 		genrealFilter: addIsActiveToDefault(state.genrealFilter),
		// 		timeFilter: addIsActiveToDefault(state.timeFilter)
		// 	};
		case Actions.CHANGE_FILTERS:
			let tempUsedKeys = [...state.usedKeys];
			tempUsedKeys = tempUsedKeys.filter(item => item != action.payload.activeFilter);
			const chnagedState = state[action.payload.activeFilter].map(d => {
				if (d.name == action.payload.activeFilterKey || d.id == action.payload.activeFilterKey) {
					const isActive = !d.isActive;
					return { ...d, isActive };
				}
				if (!canSelectMultiple.includes(action.payload.activeFilter)) {
					return { ...d, isActive: false };
				}
				return d;
			});
			const allActivited = chnagedState.filter(d => d.isActive);

			if (allActivited?.length) {
				tempUsedKeys.push(action.payload.activeFilter);
			}
			if (action.payload.activeFilter === 'genrealFilter') {
				const genrealFilterJsonData = JSON.stringify(chnagedState);
				localStorage.setItem('genrealFilterJsonDataProject', genrealFilterJsonData);
			}
			if (action.payload.activeFilter === 'timeFilter') {
				const timeFilterJsonData = JSON.stringify(chnagedState);
				localStorage.setItem('timeFilterJsonDataProject', timeFilterJsonData);
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
