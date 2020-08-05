import axios from 'axios';
import { setselectedContactId } from './contacts.actions';
import { closeMobileChatsSidebar } from './sidebars.actions';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import {
	GET_MESSAGES_API,
	SEND_MESSAGE_API,
	COMPANY_DETAIL,
	GET_PROJECT_MESSAGES_API,
	SEND_PROJECT_MESSAGE_API
} from 'app/services/apiEndPoints';

export const GET_CHAT = '[CHAT APP] GET CHAT';
export const REMOVE_CHAT = '[CHAT APP] REMOVE CHAT';
export const SEND_MESSAGE = '[CHAT APP] SEND MESSAGE';
export const COMPANY_INFO = '[CHAT APP] COMPANY INFO';

export function getChat(pid) {
	return (dispatch, getState) => {
		apiCall(
			GET_PROJECT_MESSAGES_API(pid),
			{},
			chat => {
				return dispatch({
					type: GET_CHAT,
					chat: chat,
					userChatData: {}
				});
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
}

export function removeChat() {
	return {
		type: REMOVE_CHAT
	};
}

export function sendMessage(messageText, setMessageText, pid) {
	return (dispatch, getState) => {
		let values = {
			body: messageText
		};
		var formData = new FormData();
		for (let key in values) {
			if (values[key]) {
				formData.append(key, values[key]);
			}
		}
		apiCall(
			SEND_PROJECT_MESSAGE_API(pid),
			formData,
			chat => {
				dispatch(getChat());
				setMessageText('');
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	};
}

export function companyInfo() {
	return (dispatch, getState) => {
		apiCall(
			COMPANY_DETAIL,
			{},
			company => {
				return dispatch({
					type: COMPANY_INFO,
					company
				});
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
}
