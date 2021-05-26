import axios from 'axios';

export const GET_LABELS = '[NOTES APP] GET LABELS';
export const LABELS_DIALOG_OPEN = '[PROJECT APP] PROJECT DIALOG OPEN';
export const LABELS_DIALOG_CLOSE = '[PROJECT APP] PROJECT DIALOG CLOSE';
export const UPDATE_LABELS = '[PROJECT APP] PROJECT UPDATE PROJECT';
export const DIALOG_PROJECT_OPEN = '[PROJECT APP] PROJECT DIALOG OPEN';
export const DIALOG_PROJECT_CLOSE = '[PROJECT APP] PROJECT DIALOG CLOSE';

export function getLabels() {
	const request = axios.get('/api/notes-app/labels');

	return dispatch =>
		request.then(response =>
			dispatch({
				type: GET_LABELS,
				payload: response.data
			})
		);
}

export function updateLabels(labels) {
	const request = axios.post('/api/notes-app/update-labels', { labels: Object.values(labels) });

	return dispatch =>
		request.then(response =>
			dispatch({
				type: UPDATE_LABELS,
				payload: response.data
			})
		);
}

export function openLabelsDialog() {
	return {
		type: LABELS_DIALOG_OPEN
	};
}

export function openProjectDialog(dialogType, name) {
	return {
		type: DIALOG_PROJECT_OPEN,
		dialogType,
		name
	};
}

export function closeLabelsDialog() {
	return {
		type: LABELS_DIALOG_CLOSE
	};
}
export function closeProjectDialog() {
	return {
		type: DIALOG_PROJECT_CLOSE
	};
}
