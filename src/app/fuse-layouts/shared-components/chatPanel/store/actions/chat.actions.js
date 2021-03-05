import { closeMobileChatsSidebar } from 'app/main/apps/chat/store/actions/sidebars.actions';
import axios from 'axios';
import {
	GET_MESSAGES_API,
	SEND_MESSAGE_API,
	GET_PROJECT_MESSAGES_API,
	SEND_PROJECT_MESSAGE_API,
	READ_ALL_MESSAGES
} from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken, decodeDataFromToken, getChatToken } from 'app/services/serviceUtils';
import { setselectedContactId } from './contacts.actions';

export const GET_CHAT = '[CHAT PANEL] GET CHAT';
export const ADD_USER_DATA = '[CHAT PANEL] ADD_USER_DATA';
export const REMOVE_CHAT = '[CHAT PANEL] REMOVE CHAT';
export const SEND_MESSAGE = '[CHAT PANEL] SEND MESSAGE';
export const UPDATE_CHAT_LOG = '[CHAT PANEL] UPDATE_CHAT_LOG';
export const RESET_CONTECT_COUNT = '[CHAT PANEL] RESET_CONTECT_COUNT';
export const CHAT_IS_LOADING = '[CHAT PANEL] CHAT_IS_LOADING';
const uuidv1 = require('uuid/v1');

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
				// if (global.socket && chat && chat[chat.length - 1]) {
				// 	global.socket.emit('join', {
				// 		room: chat[chat.length - 1].talk.code,
				// 		name: chat[chat.length - 1].sender.first_name
				// 	});
				// }
				if (chat && chat[chat.length - 1]) {
					dispatch(readAllMessages(chat[chat.length - 1].talk.id, contact.type));
				}
				dispatch({
					type: GET_CHAT,
					chat
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
export function resetContactCount(contactMessage) {
	console.log({ contactMessage });
	return {
		type: RESET_CONTECT_COUNT,
		payload: contactMessage
	};
}
export function sendMessage(messageText, setMessageText, user, images, setImages) {
	console.log({ messageText, setMessageText, user, images, setImages });
	return (dispatch, getState) => {
		const getChats = () => getState().chatPanel.chat.chats;
		const getUser = () => getState().auth.user.data.company;
		const unique_code = uuidv1();
		let files = [];
		if (images) {
			files = images.map(d => ({
				extension: d.extension,
				media_url: d.imgPath,
				name: d.file.name,
				type: d.type
			}));
		}
		console.log({ images });
		const userInfo = decodeDataFromToken();
		const values = {
			body: messageText,
			unique_code
		};
		const formData = new FormData();
		for (const key in values) {
			formData.append(key, values[key]);
		}
		if (images) {
			const acceptedFiles = images.map(d => d.file);
			let i = 0;
			for (const file of acceptedFiles) {
				formData.append(`files[${i}]`, file, file.name);
				i += 1;
			}
		}

		const { id, first_name, last_name, photo, is_shared, is_in_showroom } = getUser();
		const msg = {
			body: messageText,
			files,
			sender: {
				id,
				first_name,
				last_name,
				photo,
				is_shared,
				is_in_showroom
			},
			waitingToSend: true,
			unique_code,
			user,
			formData
		};
		dispatch(
			updateChatLog({
				message: msg
			})
		);
		apiCall(
			user.type == 'company'
				? SEND_MESSAGE_API(userInfo.extra.profile.company)
				: SEND_PROJECT_MESSAGE_API(user.id),
			formData,
			chat => {},
			err => {
				const findUnique_code = element => element?.unique_code == unique_code;
				const chats = getChats();
				const index = chats.findIndex(findUnique_code);
				if (chats[index]) {
					chats[index] = {
						...chats[index],
						retryOption: true
					};
					dispatch({
						type: GET_CHAT,
						chat: chats,
						userChatData: {}
					});
				}
			},
			METHOD.POST,
			getHeaderToken()
		);
		setImages(null);
		setMessageText('');
	};
}
export function retryToSendMessage(chatItem) {
	return (dispatch, getState) => {
		const { formData } = chatItem;
		const userInfo = decodeDataFromToken();
		apiCall(
			chatItem.user.type == 'company'
				? SEND_MESSAGE_API(userInfo.extra.profile.company)
				: SEND_PROJECT_MESSAGE_API(chatItem.user.id),
			formData,
			chat => {},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	};
}
export function readAllMessages(talkCode, type) {
	return (dispatch, getState) => {
		const projectId = getState().chatPanel.user?.id;
		apiCall(
			READ_ALL_MESSAGES(talkCode),
			{},
			chat => {
				if (type == 'company') {
					dispatch({
						type: '[CHAT APP] RESET_CONTECT_COUNT'
					});
				} else {
					dispatch(resetContactCount(projectId));
				}
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	};
}
