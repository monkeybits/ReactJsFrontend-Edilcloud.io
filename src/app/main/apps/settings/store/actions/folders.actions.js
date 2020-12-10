import axios from 'axios';

export const GET_SETTINGS = '[SETTINGS APP] GET SETTINGS';

export function getSettings() {
	const request = axios.get('/api/todo-app/folders');

	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_SETTINGS,
				payload: response.data
			})
		);
}
