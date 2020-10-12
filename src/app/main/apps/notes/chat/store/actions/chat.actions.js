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

export const GET_CHAT = '[CHAT APP] GET CHAT (PROJECT)';
export const REMOVE_CHAT = '[CHAT APP] REMOVE CHAT (PROJECT)';
export const SEND_MESSAGE = '[CHAT APP] SEND MESSAGE (PROJECT)';
export const COMPANY_INFO = '[CHAT APP] COMPANY INFO (PROJECT)';
export const UPDATE_CHAT_LOG = '[CHAT APP] UPDATE_CHAT_LOG (PROJECT)';

export function updateChatLog(update) {
	return {
		type: UPDATE_CHAT_LOG,
		update
	};
}

export function getChat(pid) {
	return (dispatch, getState) => {
		apiCall(
			GET_PROJECT_MESSAGES_API(pid),
			{},
			chat => {
				if (global.socket && chat &&chat[chat.length - 1]) {
					setTimeout(() => {
						global.socket.emit('join', {
							room: chat[chat.length - 1].talk.code,
							name: chat[chat.length - 1].sender.first_name
						});
					}, 400);
				}
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

export function sendMessage(messageText, setMessageText, pid, images, setImages) {
	return (dispatch, getState) => {
		let values = {
			body: messageText
		};
		var formData = new FormData();
		for (let key in values) {
				formData.append(key, values[key]);
		}
		if (images) {
			const acceptedFiles = images.map(d => d.file);
			let i = 0;
			for (const file of acceptedFiles) {
				formData.append('files[' + i + ']', file, file.name);
				i += 1;
			}
		}
		apiCall(
			SEND_PROJECT_MESSAGE_API(pid),
			formData,
			chat => {
				setImages(null)
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
