import { READ_NOTIFICATION, GET_NOTIFICATION_COUNT } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import axios from 'axios';

export const TOGGLE_NOTOFICATION_PANEL = '[Notification] TOGGLE NOTOFICATION PANEL';
export const GET_NOTOFICATION_PANEL_DATA = '[Notification] GET DATA';
export const DELETE_NOTOFICATION_PANEL_DATA_BY_INDEX = '[Notification] DELETE DATA BY INDEX';
export const ADD_NOTOFICATION_PANEL_DATA = '[Notification] ADD DATA';
export const ADD_NOTOFICATION_PANEL_COUNT = '[Notification] ADD COUNT';
export const INCREMENT_NOTOFICATION_PANEL_COUNT = '[Notification] INCREMENT COUNT';
export const DECREMENT_NOTOFICATION_PANEL_COUNT = '[Notification] DECREMENT COUNT';

export const PUSH_NOTOFICATION_PANEL_DATA = '[Notification] PUSH DATA';

export const REMOVE_FROM_VIEW_NOTOFICATION_PANEL_DATA = '[Notification] REMOVE FROM VIEW DATA';

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
		dispatch(decrementNotificationCount());
		apiCall(
			READ_NOTIFICATION(payload.hasOwnProperty('id') ? payload.id : payload.notification.id),
			{},
			res => console.log(res),
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function deleteNotificationDataByIndex(payload) {
	return {
		type: DELETE_NOTOFICATION_PANEL_DATA_BY_INDEX,
		payload
	};
}
export function getNotificationData(payload) {
	return {
		type: GET_NOTOFICATION_PANEL_DATA,
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
			err => console.log(err),
			METHOD.GET,
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
