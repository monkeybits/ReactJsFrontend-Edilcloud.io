import axios from 'axios';

export const TOGGLE_NOTOFICATION_PANEL = '[Notification] TOGGLE NOTOFICATION PANEL';
export const GET_NOTOFICATION_PANEL_DATA = '[Notification] GET DATA';
export const ADD_NOTOFICATION_PANEL_DATA = '[Notification] ADD DATA';
export const REMOVE_FROM_VIEW_NOTOFICATION_PANEL_DATA = '[Notification] REMOVE FROM VIEW DATA';

export function getNotificationData() {
	const request = axios.get('/api/quick-panel/data');
	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_NOTOFICATION_PANEL_DATA,
				payload: response.data
			})
		);
}

export function toggleNotification() {
	return {
		type: TOGGLE_NOTOFICATION_PANEL
	};
}
export function removeFrmViewNotification() {
	return {
		type: REMOVE_FROM_VIEW_NOTOFICATION_PANEL_DATA
	};
}
export function addNotificationData(payload) {
	return {
		type: ADD_NOTOFICATION_PANEL_DATA,
		payload
	};
}
