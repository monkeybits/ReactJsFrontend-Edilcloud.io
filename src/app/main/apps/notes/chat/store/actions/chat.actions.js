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
	READ_ALL_MESSAGES,
	SEND_PROJECT_MESSAGE_API,
	DELETE_MESSAGE
} from 'app/services/apiEndPoints';
import { resetContactCount } from 'app/fuse-layouts/shared-components/chatPanel/store/actions';
const uuidv1 = require('uuid/v1');

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

export function getChat(pid, handleSetLoading = () => '') {
	handleSetLoading({
		loadingGetChat: true
	});
	return (dispatch, getState) => {
		apiCall(
			GET_PROJECT_MESSAGES_API(pid),
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
				handleSetLoading({
					loadingGetChat: false
				});
				if (chat && chat[chat.length - 1]) {
					dispatch(readAllMessages(chat[chat.length - 1].talk.id, pid));
				}
				return dispatch({
					type: GET_CHAT,
					chat: chat,
					userChatData: {}
				});
			},
			err => {
				handleSetLoading({
					loadingGetChat: false
				});
				console.log(err);
			},
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
		const getChats = () => getState().chatAppProject.chat.chats;
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
			pid,
			formData
		};
		dispatch(
			updateChatLog({
				message: msg
			})
		);
		apiCall(
			SEND_PROJECT_MESSAGE_API(pid),
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
export function readAllMessages(talkCode, pid) {
	console.log({ talkCode, pid });
	return (dispatch, getState) => {
		apiCall(
			READ_ALL_MESSAGES(talkCode),
			{},
			chat => {
				// dispatch(resetContactCount(pid));
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken(),
			true
		);
	};
}
export function retryToSendMessage(chatItem) {
	return (dispatch, getState) => {
		const formData = chatItem.formData;
		apiCall(
			SEND_PROJECT_MESSAGE_API(chatItem.pid),
			formData,
			chat => {},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	};
}
export function companyInfo(handleSetLoading = () => '') {
	handleSetLoading({
		loadingCompanyInfo: true
	});
	return (dispatch, getState) => {
		apiCall(
			COMPANY_DETAIL,
			{},
			company => {
				handleSetLoading({
					loadingCompanyInfo: false
				});
				return dispatch({
					type: COMPANY_INFO,
					company
				});
			},
			err => {
				handleSetLoading({
					loadingCompanyInfo: false
				});
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
