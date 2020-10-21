// WebSocket.js

import React, { createContext } from 'react';
import io from 'socket.io-client';
import { WS_BASE } from './config';
import { useDispatch, useSelector } from 'react-redux';
import * as companyChatActions from './main/apps/chat/store/actions';
import * as chatPanelActions from 'app/fuse-layouts/shared-components/chatPanel/store/actions';
import * as ProjectChatActions from './main/apps/notes/chat/store/actions';
// import * as chatPanelActions from '../';src/app/fuse-layouts/shared-components/chatPanel/store/actions/chat.actions.js
// import moduleName from '../../../'

const WebSocketContext = createContext(null);

export { WebSocketContext };

export default ({ children }) => {
	// let socket;
	let ws;
	const dispatch = useDispatch();

	const sendMessage = message => {
		// const payload = {
		// 	roomId: roomId,
		// 	data: message
		// };
		global.socket.emit('chat_channel', message);
		// dispatch(updateChatLog(payload));
	};

	if (!global.socket) {
		global.socket = io.connect(WS_BASE);
		global.socket.on('chat_channel', msg => {
			console.log({ msg });
			dispatch((dispatch, getState) => {
				if (getState().chatPanel.state) {
					dispatch(chatPanelActions.updateChatLog(msg));
				}
				if (msg.message.talk.content_type_name == 'project') {
					dispatch(chatPanelActions.updateContactCount(msg));
				}
				if (
					msg.message.talk.content_type_name == 'project' &&
					getState().notesApp?.project?.projectDetail?.id == msg.message.talk.object_id
				) {
					const getChats = () => getState().chatAppProject.chat.chats;
					const findUnique_code = element => element?.unique_code == msg.message.unique_code;
					let chats = getChats();
					const index = chats.findIndex(findUnique_code);
				
					if (chats[index]) {
						chats[index] = msg.message
						dispatch({
							type: ProjectChatActions.GET_CHAT,
							chat: chats,
							userChatData: {}
						});
					}
				} else {
					const getChats = () => getState().chatApp.chat.chats;
					const findUnique_code = element => element?.unique_code == msg.message.unique_code;
					let chats = getChats();
					let index = chats.findIndex(findUnique_code);
					console.log({
						chats,
						index
					});
					if (chats[index]) {
						chats[index] = msg.message
						dispatch({
							type: companyChatActions.GET_CHAT,
							chat: chats,
							userChatData: {}
						});
					}
					// dispatch(companyChatActions.updateChatLog(msg));
				}
			});
		});

		ws = {
			socket: global.socket,
			sendMessage
		};
	}

	return <WebSocketContext.Provider value={ws}>{children}</WebSocketContext.Provider>;
};
