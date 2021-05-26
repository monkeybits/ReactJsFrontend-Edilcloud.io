import axios from 'axios';

export const GET_FILTERS = '[TODO APP] GET FILTERS(project)';
export const CHANGE_FILTERS = '[TODO APP] CHANGE FILTERS(project)';

export function getFilters() {
	const request = axios.get('/api/todo-app/filters');

	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_FILTERS,
				payload: response.data
			})
		);
}

export function changeFilters(payload) {
	return dispatch =>
		dispatch({
			type: CHANGE_FILTERS,
			payload
		});
}
