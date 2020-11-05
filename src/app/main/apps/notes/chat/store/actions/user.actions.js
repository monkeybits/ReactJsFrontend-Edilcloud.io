import axios from 'axios';

export const GET_USER_DATA = '[CHAT APP] GET USER DATA (PROJECT)';
export const UPDATE_USER_DATA = '[CHAT APP] UPDATE USER DATA (PROJECT)';

export function getUserData() {
	const request = axios.get('/api/chat/user');

	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_USER_DATA,
				payload: response.data
			})
		);
}

export function updateUserData(newData) {
	const request = axios.post('/api/chat/user/data', newData);

	return dispatch =>
		request.then(response =>
			dispatch({
				type: UPDATE_USER_DATA,
				payload: response.data
			})
		);
}
