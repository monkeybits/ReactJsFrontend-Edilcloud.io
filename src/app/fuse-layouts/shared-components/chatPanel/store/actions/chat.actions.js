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
export const REMOVE_CHAT = '[CHAT PANEL] REMOVE CHAT';
export const SEND_MESSAGE = '[CHAT PANEL] SEND MESSAGE';
export const UPDATE_CHAT_LOG = '[CHAT PANEL] UPDATE_CHAT_LOG';

export function updateChatLog(update) {
	return {
		type: UPDATE_CHAT_LOG,
		update
	};
}

export function getChat(contact) {
	return (dispatch, getState) => {
		apiCall(
			contact.type == 'company' ? GET_MESSAGES_API : GET_PROJECT_MESSAGES_API(contact.id),
			{},
			chat => {
				// console.log({ chat });
				dispatch({
					type: GET_CHAT,
					chat: chat,
					chatUserData: contact
				});
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
		// const { id: userId } = getState().chatPanel.user;
		// const request = axios.get('/api/chat/get-chat', {
		// 	params: {
		// 		contactId,
		// 		userId
		// 	}
		// });

		// return request.then(response => {
		// 	dispatch(setselectedContactId(contactId));

		// 	dispatch(closeMobileChatsSidebar());

		// 	return dispatch({
		// 		type: GET_CHAT,
		// 		chat: response.data.chat,
		// 		userChatData: response.data.userChatData
		// 	});
		// });
	};
}

export function removeChat() {
	return {
		type: REMOVE_CHAT
	};
}

export function sendMessage(messageText, setMessageText, user) {
	return (dispatch, getState) => {
		const userInfo = decodeDataFromToken();
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
			user.type == 'company'
				? SEND_MESSAGE_API(userInfo.extra.profile.company)
				: SEND_PROJECT_MESSAGE_API(user.id),
			formData,
			chat => {
				// dispatch(getChat(user));
				setMessageText('');
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	};
}
