import axios from 'axios';

export const TOGGLE_QUICK_PANEL = '[QUICK PANEL] TOGGLE QUICK PANEL';
export const GET_QUICK_PANEL_DATA = '[QUICK PANEL] GET DATA';
export const OPEN_ALERT_QUICK_PANEL = '[QUICK PANEL] OPEN ALERT QUICK PANEL';
export const CLOSE_ALERT_POST = '[QUICK PANEL] CLOSE ALERT POST';

export function getQuickPanelData() {
	const request = axios.get('/api/quick-panel/data');
	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_QUICK_PANEL_DATA,
				payload: response.data
			})
		);
}

export function toggleQuickPanel() {
	return {
		type: TOGGLE_QUICK_PANEL
	};
}

export function openAlertQuickPanel(id) {
	return {
		type: OPEN_ALERT_QUICK_PANEL,
		id
	};
}

export function closeAlertPost() {
	return {
		type: CLOSE_ALERT_POST
	};
}
