import axios from 'axios';

export const TOGGLE_NOTOFICATION_PANEL = '[Notification] TOGGLE NOTOFICATION PANEL';
export const GET_NOTOFICATION_PANEL_DATA = '[Notification] GET DATA';

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
