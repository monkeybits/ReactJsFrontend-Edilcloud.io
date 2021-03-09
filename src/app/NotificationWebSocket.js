// WebSocket.js
import React, { createContext } from 'react';
import { useDispatch } from 'react-redux';
import * as notificationPanelActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import { WS_BASE_NOTIFICATION_DEV, WS_BASE_NOTIFICATION_LOCAL } from './config';
import { decodeDataFromToken } from './services/serviceUtils';

const WebSocketNotificationContext = createContext(null);

export { WebSocketNotificationContext };

export default ({ children }) => {
	// let socket;
	let ws;
	let WS_BASE;
	const dispatch = useDispatch();
	if (process.env.NODE_ENV !== 'production') {
		WS_BASE = WS_BASE_NOTIFICATION_LOCAL;
	} else {
		WS_BASE = WS_BASE_NOTIFICATION_DEV;
	}
	const passMessage = ({ message }) => {
		dispatch((dispatch, getState) => {
			console.log({ notificationPanelState: getState().notificationPanel?.state, message });
			// if (getState().notificationPanel?.state) {
			dispatch(notificationPanelActions.pushNotificationData({ notification: message }));
			// }
		});
	};
	const createSocket = () => {
		global.notificationSocket = new WebSocket(WS_BASE);
		global.notificationSocket.onmessage = function (e) {
			const data = JSON.parse(e.data);
			const userInfo = decodeDataFromToken();
			const getUserId = () => userInfo?.extra?.profile.id;
			console.log({ socketData: data, id: data.message.message.dest?.['id'] === parseInt(getUserId()) });
			if (data.message.message.dest?.['id'] === parseInt(getUserId())) {
				dispatch(notificationPanelActions.incrementNotificationCount());
				passMessage(data.message);
				// global.notificationSocket.send(
				// 	JSON.stringify({
				// 		message: {
				// 			read_check: true,
				// 			message: data.message.message
				// 		}
				// 	})
				// );
			}
		};
		global.notificationSocket.onclose = function (event) {
			console.log('WebSocket is closed now.');
			// toast.warn('WebSocket is closed now.');
			setTimeout(() => {
				createSocket();
				console.log('WebSocket is connectting..');
				// toast.success('WebSocket is connectting..');
			}, 1000);
		};
	};
	if (!global.notificationSocket) {
		createSocket();

		ws = {
			socket: global.notificationSocket,
			sendMessage: passMessage
		};
	}

	return <WebSocketNotificationContext.Provider value={ws}>{children}</WebSocketNotificationContext.Provider>;
};
