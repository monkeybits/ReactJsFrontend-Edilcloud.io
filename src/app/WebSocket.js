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
			dispatch((dispatch, getStae) => {
				if (getStae().chatPanel.state) {
					dispatch(chatPanelActions.updateChatLog(msg));
				}
				if (
					msg.message.talk.content_type_name == 'project' &&
					getStae().notesApp?.project?.projectDetail?.id == msg.message.talk.object_id
				) {
					dispatch(ProjectChatActions.updateChatLog(msg));
				} else {
					dispatch(companyChatActions.updateChatLog(msg));
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
