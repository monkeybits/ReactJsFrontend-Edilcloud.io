// ProjectReportsWebSocket.js

import React, { createContext } from 'react';
import io from 'socket.io-client';
import { WS_BASE_PROJECT_REPORT_DEV, WS_BASE_PROJECT_REPORT_LOCAL } from './config';
import { useDispatch, useSelector } from 'react-redux';
import * as companyChatActions from './main/apps/chat/store/actions';
import * as chatPanelActions from 'app/fuse-layouts/shared-components/chatPanel/store/actions';
import * as ProjectChatActions from './main/apps/notes/chat/store/actions';
import { decodeDataFromToken } from './services/serviceUtils';
import LetterAvatars from './main/documentation/material-ui-components/components/avatars/LetterAvatars';
import { toast } from 'react-toastify';
import FileSaver from 'file-saver';
// import * as chatPanelActions from '../';src/app/fuse-layouts/shared-components/chatPanel/store/actions/chat.actions.js
// import moduleName from '../../../'

const WebSocketProjectReportContext = createContext(null);

export { WebSocketProjectReportContext };

export default ({ children }) => {
	// let socket;
	let ws;
	let WS_BASE;
	const company = useSelector(({ chatApp }) => chatApp.company);
	const dispatch = useDispatch();
	if (process.env.NODE_ENV !== 'production') {
		WS_BASE = WS_BASE_PROJECT_REPORT_LOCAL;
	} else {
		WS_BASE = WS_BASE_PROJECT_REPORT_DEV;
	}
	function download_file(fileURL, fileName) {
		// for non-IE
		if (!window.ActiveXObject) {
			var save = document.createElement('a');
			save.href = fileURL;
			save.target = '_blank';
			var filename = fileURL.substring(fileURL.lastIndexOf('/') + 1);
			save.download = fileName || filename;
			if (
				navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
				navigator.userAgent.search('Chrome') < 0
			) {
				document.location = save.href;
				// window event not working here
			} else {
				var evt = new MouseEvent('click', {
					view: window,
					bubbles: true,
					cancelable: false
				});
				save.dispatchEvent(evt);
				(window.URL || window.webkitURL).revokeObjectURL(save.href);
			}
		}

		// for IE < 11
		else if (!!window.ActiveXObject && document.execCommand) {
			var _window = window.open(fileURL, '_blank');
			_window.document.close();
			_window.document.execCommand('SaveAs', true, fileName || fileURL);
			_window.close();
		}
	}
	const passMessage = msg => {
		// const findUnique_code = element => element?.unique_code == msg.message.unique_code;
		let name =
			msg.message.name && msg.message.extension ? `${msg.message.name}.${msg.message.extension}` : 'file.pdf';
		FileSaver.saveAs(msg.message.url, name);
	};
	const createSocket = () => {
		global.projectReportsWebSocket = new WebSocket(WS_BASE);
		global.projectReportsWebSocket.onmessage = function (e) {
			const data = JSON.parse(e.data);
			const userInfo = decodeDataFromToken();
			const getUserId = () => userInfo?.extra?.profile.id;
			console.log({ socketData: data, id: getUserId() });
			if (data.message.message['dest']?.['id'] === parseInt(getUserId())) {
				passMessage(data.message);
			}
		};
		global.projectReportsWebSocket.onclose = function (event) {
			console.log('Project ReportsWeb Socket is closed now.');
			// toast.warn('WebSocket is closed now.');
			setTimeout(() => {
				createSocket();
				console.log('Project Reports WebSocket is connectting..');
				// toast.success('WebSocket is connectting..');
			}, 1000);
		};
	};
	if (!global.projectReportsWebSocket && company?.name) {
		createSocket();

		ws = {
			socket: global.projectReportsWebSocket,
			sendMessage: passMessage
		};
	}

	return <WebSocketProjectReportContext.Provider value={ws}>{children}</WebSocketProjectReportContext.Provider>;
};
