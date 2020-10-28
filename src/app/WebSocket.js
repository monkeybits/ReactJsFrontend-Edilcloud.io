// WebSocket.js

import React, { createContext } from 'react';
import io from 'socket.io-client';
import { WS_BASE_LOCAL, WS_BASE_DEV } from './config';
import { useDispatch, useSelector } from 'react-redux';
import * as companyChatActions from './main/apps/chat/store/actions';
import * as chatPanelActions from 'app/fuse-layouts/shared-components/chatPanel/store/actions';
import * as ProjectChatActions from './main/apps/notes/chat/store/actions';
import { decodeDataFromToken } from './services/serviceUtils';
import LetterAvatars from './main/documentation/material-ui-components/components/avatars/LetterAvatars';
// import * as chatPanelActions from '../';src/app/fuse-layouts/shared-components/chatPanel/store/actions/chat.actions.js
// import moduleName from '../../../'

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
	// let socket;
	let ws;
	let WS_BASE;
	const dispatch = useDispatch();
	if (window.location.host.includes('localhost')) {
		WS_BASE = WS_BASE_LOCAL
	} else {
		WS_BASE = WS_BASE_DEV
	}
	const passMessage = msg => {
		console.log({ msg });
		dispatch((dispatch, getState) => {
			if (getState().chatPanel.state) { // chat panel
				const getChats = () => getState().chatPanel.chat.chats;
				const findUnique_code = element => element?.unique_code == msg.message.unique_code;
				let chats = getChats();
				const index = chats.findIndex(findUnique_code);

				if (chats[index]) {
					chats[index] = msg.message;
					dispatch({
						type: chatPanelActions.GET_CHAT,
						chat: chats,
						userChatData: {}
					});
				}
			}
			if (msg.message.talk.content_type_name == 'project') { // project chat sidebar update count
				dispatch(chatPanelActions.updateContactCount(msg));
			}
			else{ // company chat sidebar update count
				dispatch(companyChatActions.updateContactCount(msg));
			}
			if (
				msg.message.talk.content_type_name == 'project' &&
				getState().notesApp?.project?.projectDetail?.id == msg.message.talk.object_id &&
				getState().chatAppProject.chat
			) {
				const getChats = () => getState().chatAppProject.chat.chats;
				const findUnique_code = element => element?.unique_code == msg.message.unique_code;
				let chats = getChats();
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
			} else {
				const getChats = () => getState().chatApp.chat?.chats;
				const findUnique_code = element => element?.unique_code == msg.message.unique_code;
				let chats = getChats();
				if (chats) {
					let index = chats.findIndex(findUnique_code);
					console.log({
						chats,
						index
					});
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

	if (!global.socket) {
		global.socket = new WebSocket(WS_BASE);
		global.socket.onmessage = function (e) {
			const data = JSON.parse(e.data);
			const userInfo = decodeDataFromToken();
			const getUserId = () => userInfo?.extra?.profile.id;
			console.log({ socketData: data, id: getUserId() });
			if (data.message.message['dest']?.['id'] === parseInt(getUserId())) {
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
			console.log('WebSocket is closed now.');
			setTimeout(function () {
				global.socket = new WebSocket(WS_BASE);
			}, 1000);
		};

		ws = {
			socket: global.socket,
			sendMessage: passMessage
		};
	}

	return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};
