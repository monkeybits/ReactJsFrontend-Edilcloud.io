import {
	READ_NOTIFICATION,
	GET_NOTIFICATION_COUNT,
	READ_ALL_NOTIFICATION,
	DELETE_NOTIFICATION_BY_ID
} from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import axios from 'axios';

export const TOGGLE_NOTOFICATION_PANEL = '[Notification] TOGGLE NOTOFICATION PANEL';
export const LOADING_REPORT = '[Notification] LOADING REPORT';
export const GET_NOTOFICATION_PANEL_DATA = '[Notification] GET DATA';
export const GET_READ_NOTOFICATION_PANEL_DATA = '[Notification] GET READ DATA';
export const DELETE_NOTOFICATION_PANEL_DATA_BY_INDEX = '[Notification] DELETE DATA BY INDEX';
export const ADD_NOTOFICATION_PANEL_DATA = '[Notification] ADD DATA';
export const ADD_NOTOFICATION_PANEL_COUNT = '[Notification] ADD COUNT';
export const INCREMENT_NOTOFICATION_PANEL_COUNT = '[Notification] INCREMENT COUNT';
export const DECREMENT_NOTOFICATION_PANEL_COUNT = '[Notification] DECREMENT COUNT';
export const RESET_NOTOFICATION_PANEL_COUNT = '[Notification] RESET COUNT';
export const RESET_NOTOFICATION_PANEL_DATA = '[Notification] RESET NOTIFICATIONS DATA';

export const PUSH_NOTOFICATION_PANEL_DATA = '[Notification] PUSH DATA';

export const REMOVE_FROM_VIEW_NOTOFICATION_PANEL_DATA = '[Notification] REMOVE FROM VIEW DATA';

export function loadingReport(payload) {
	return {
		type: LOADING_REPORT,
		payload
	};
}

export function resetNotificationData() {
	return {
		type: RESET_NOTOFICATION_PANEL_DATA
	};
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
	return dispatch => {
		dispatch({
			type: ADD_NOTOFICATION_PANEL_DATA,
			payload
		});
	};
}
export function deleteNotificationDataByIndex(payload, hasRead, data) {
	return dispatch => {
		dispatch({
			type: DELETE_NOTOFICATION_PANEL_DATA_BY_INDEX,
			payload,
			hasRead
		});
		apiCall(
			DELETE_NOTIFICATION_BY_ID(data.hasOwnProperty('id') ? data.id : data.notification.id),
			{},
			res => {
				// console.log(res)
			},
			err => {
				// console.log(err)
			},
			METHOD.DELETE,
			getHeaderToken()
		);
	};
}
export function getNotificationData(payload) {
	return {
		type: GET_NOTOFICATION_PANEL_DATA,
		payload
	};
}
export function getReadNotificationData(payload) {
	return {
		type: GET_READ_NOTOFICATION_PANEL_DATA,
		payload
	};
}
export function pushNotificationData(payload) {
	return {
		type: PUSH_NOTOFICATION_PANEL_DATA,
		payload
	};
}
export function getNotificationCount() {
	return dispatch => {
		apiCall(
			GET_NOTIFICATION_COUNT,
			{},
			payload => {
				dispatch({
					type: ADD_NOTOFICATION_PANEL_COUNT,
					payload
				});
			},
			err => {
				// console.log(err)
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function readAllNotifications() {
	return dispatch => {
		dispatch({
			type: RESET_NOTOFICATION_PANEL_COUNT
		});
		apiCall(
			READ_ALL_NOTIFICATION,
			{},
			payload => {},
			err => {
				// console.log(err)
			},
			METHOD.POST,
			getHeaderToken()
		);
	};
}
export function incrementNotificationCount(payload) {
	return {
		type: INCREMENT_NOTOFICATION_PANEL_COUNT,
		payload
	};
}
export function decrementNotificationCount(payload) {
	return {
		type: DECREMENT_NOTOFICATION_PANEL_COUNT,
		payload
	};
}
