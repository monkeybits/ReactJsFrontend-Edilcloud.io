// WebSocket.js
import React, { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as chatPanelActions from 'app/fuse-layouts/shared-components/chatPanel/store/actions';
import { WS_BASE } from './services/config';
import * as companyChatActions from './main/apps/chat/store/actions';
import * as ProjectChatActions from './main/apps/notes/chat/store/actions';
import { decodeDataFromToken } from './services/serviceUtils';

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
	// let socket;
	let ws;
	const dispatch = useDispatch();
	const company = useSelector(({ chatApp }) => chatApp.company);
	const passMessage = msg => {
		const userInfo = decodeDataFromToken();
		const getUserId = () => userInfo?.extra?.profile.id;
		dispatch((dispatch, getState) => {
			if (getState().chatPanel.state) {
				// chat panel
				const getChats = () => getState().chatPanel.chat?.chats;
				const findUnique_code = element => element?.unique_code == msg.message.unique_code;
				const chats = getChats();
				const index = chats.findIndex(findUnique_code);

				if (chats && chats[index]) {
					chats[index] = msg.message;
					dispatch({
						type: chatPanelActions.GET_CHAT,
						chat: chats,
						userChatData: {}
					});
				} else {
					dispatch(chatPanelActions.updateChatLog(msg));
				}
			}
			if (msg.message.sender?.['id'] != getUserId()) {
				if (msg.message.talk.content_type_name == 'project') {
					// project chat sidebar update count
					dispatch(chatPanelActions.updateContactCount(msg));
				} else {
					// company chat sidebar update count
					dispatch(companyChatActions.updateContactCount(msg));
				}
			}
			if (
				msg.message.talk.content_type_name == 'project' &&
				getState().notesApp?.project?.projectDetail?.id == msg.message.talk.object_id &&
				getState().chatAppProject.chat
			) {
				const getChats = () => getState().chatAppProject.chat.chats;
				const findUnique_code = element => element?.unique_code == msg.message.unique_code;
				const chats = getChats();
				const index = chats.findIndex(findUnique_code);

				if (chats[index]) {
					chats[index] = msg.message;
					dispatch({
						type: ProjectChatActions.GET_CHAT,
						chat: chats,
						userChatData: {}
					});
				} else {
					dispatch(ProjectChatActions.updateChatLog(msg));
				}
			} else if (msg.message.talk.content_type_name == 'company') {
				const getChats = () => getState().chatApp.chat?.chats;
				const findUnique_code = element => element?.unique_code == msg.message.unique_code;
				const chats = getChats();
				if (chats) {
					const index = chats.findIndex(findUnique_code);
					if (chats[index]) {
						chats[index] = msg.message;
						dispatch({
							type: companyChatActions.GET_CHAT,
							chat: chats,
							userChatData: {}
						});
					} else {
						dispatch(companyChatActions.updateChatLog(msg));
					}
				}
			}
		});
	};
	const createSocket = () => {
		global.socket = new WebSocket(WS_BASE);
		global.socket.onmessage = function (e) {
			const data = JSON.parse(e.data);
			const userInfo = decodeDataFromToken();
			const getUserId = () => userInfo?.extra?.profile.id;
			if (data.message.message.dest?.['id'] === parseInt(getUserId())) {
				passMessage(data.message);
				global.socket.send(
					JSON.stringify({
						message: {
							read_check: true,
							message: data.message.message
						}
					})
				);
			}
		};
		global.socket.onclose = function (event) {
			// toast.warn('WebSocket is closed now.');
			setTimeout(() => {
				createSocket();
				// toast.success('WebSocket is connectting..');
			}, 1000);
		};
	};
	if (!global.socket && company?.name) {
		createSocket();

		ws = {
			socket: global.socket,
			sendMessage: passMessage
		};
	}

	return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};
