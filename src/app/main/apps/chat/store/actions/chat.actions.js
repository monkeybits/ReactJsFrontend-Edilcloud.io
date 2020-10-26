import axios from 'axios';
import { setselectedContactId } from './contacts.actions';
import { closeMobileChatsSidebar } from './sidebars.actions';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import { GET_MESSAGES_API, SEND_MESSAGE_API, COMPANY_DETAIL, DELETE_MESSAGE } from 'app/services/apiEndPoints';

export const GET_CHAT = '[CHAT APP] GET CHAT';
export const REMOVE_CHAT = '[CHAT APP] REMOVE CHAT';
export const SEND_MESSAGE = '[CHAT APP] SEND MESSAGE';
export const COMPANY_INFO = '[CHAT APP] COMPANY INFO';
export const UPDATE_CHAT_LOG = '[CHAT APP] UPDATE_CHAT_LOG';
const uuidv1 = require('uuid/v1');

export function updateChatLog(update) {
	return {
		type: UPDATE_CHAT_LOG,
		update
	};
}

export function getChat(contactId) {
	return (dispatch, getState) => {
		apiCall(
			GET_MESSAGES_API,
			{},
			chat => {
				// if (global.socket && chat && chat[chat.length - 1]) {
				// 	setTimeout(() => {
				// 		global.socket.emit('join', {
				// 			room: chat[chat.length - 1].talk.code,
				// 			name: chat[chat.length - 1].sender.first_name
				// 		});
				// 	}, 400);
				// }
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
export function deleteMessage(mid) {
	return (dispatch, getState) => {
		apiCall(
			DELETE_MESSAGE(mid),
			{},
			chat => {},
			err => console.log(err),
			METHOD.DELETE,
			getHeaderToken()
		);
	};
}
export function sendMessage(messageText, setMessageText, images, setImages) {
	return (dispatch, getState) => {
		const getChats = () => getState().chatApp.chat.chats;
		const getUser = () => getState().auth.user.data.company;
		console.log({
			user: getUser()
		});
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

		const userInfo = decodeDataFromToken();
		let values = {
			body: messageText,
			unique_code
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
		const { id, first_name, last_name, photo, is_shared, is_in_showroom } = getUser();
		let msg = {
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
			formData
		};
		dispatch(
			updateChatLog({
				message: msg
			})
		);
		apiCall(
			SEND_MESSAGE_API(userInfo.extra.profile.company),
			formData,
			chat => {},
			err => {
				const findUnique_code = element => element?.unique_code == unique_code;

				let chats = getChats();
				let index = chats.findIndex(findUnique_code);
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
		const userInfo = decodeDataFromToken();
		const formData = chatItem.formData;
		apiCall(
			SEND_MESSAGE_API(userInfo.extra.profile.company),
			formData,
			chat => {},
			err => {},
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
