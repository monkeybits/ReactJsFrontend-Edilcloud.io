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
				isActive: false
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
		activeFilterKey: 'Mine'
	};
};

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
	return result;
};
const peopleFilterNames = arr => {
	// var result = arr.reduce((unique, o) => {
	// 	if (o.assigned_company && !unique.some(obj => obj.id === o.assigned_company.id)) {
	// 		unique.push({
	// 			...o.assigned_company
	// 		});
	// 	}
	// 	return unique;
	// }, []);
	// return result;
};

const filtersReducer = (state = initialState(), action) => {
	switch (action.type) {
		case Actions.GET_TODOS:
			console.log({ action, result: projectNames(action.payload) });
			return {
				...state,
				projectFilter: projectNames(action.payload),
				companyFilter: companyFilterNames(action.payload)
			};
		case Actions.CHANGE_FILTERS:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};

export default filtersReducer;
