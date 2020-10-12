import { closeMobileChatsSidebar } from 'app/main/apps/chat/store/actions/sidebars.actions';
import axios from 'axios';
import { setselectedContactId } from './contacts.actions';
import {
	GET_MESSAGES_API,
	SEND_MESSAGE_API,
	GET_PROJECT_MESSAGES_API,
	SEND_PROJECT_MESSAGE_API
} from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken, decodeDataFromToken, getChatToken } from 'app/services/serviceUtils';

export const GET_CHAT = '[CHAT PANEL] GET CHAT';
export const ADD_USER_DATA = '[CHAT PANEL] ADD_USER_DATA';
export const REMOVE_CHAT = '[CHAT PANEL] REMOVE CHAT';
export const SEND_MESSAGE = '[CHAT PANEL] SEND MESSAGE';
export const UPDATE_CHAT_LOG = '[CHAT PANEL] UPDATE_CHAT_LOG';
export const CHAT_IS_LOADING = '[CHAT PANEL] CHAT_IS_LOADING';

export function updateChatLog(update) {
	return {
		type: UPDATE_CHAT_LOG,
		update
	};
}
export function loadingChat(payload) {
	return {
		type: CHAT_IS_LOADING,
		payload
	};
}

export function getChat(contact) {
	return (dispatch, getState) => {
		dispatch(loadingChat(true));
		dispatch({
			type: ADD_USER_DATA,
			chatUserData: contact
		});
		apiCall(
			contact.type == 'company' ? GET_MESSAGES_API : GET_PROJECT_MESSAGES_API(contact.id),
			{},
			chat => {
				if (global.socket && chat && chat[chat.length - 1]) {
					global.socket.emit('join', {
						room: chat[chat.length - 1].talk.code,
						name: chat[chat.length - 1].sender.first_name
					});
				}
				dispatch({
					type: GET_CHAT,
					chat: chat,
				});
				dispatch(loadingChat(false));
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

export function sendMessage(messageText, setMessageText, user, images, setImages) {
	return (dispatch, getState) => {
		const userInfo = decodeDataFromToken();
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
			user.type == 'company'
				? SEND_MESSAGE_API(userInfo.extra.profile.company)
				: SEND_PROJECT_MESSAGE_API(user.id),
			formData,
			chat => {
				setImages(null);
				setMessageText('');
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	};
}
