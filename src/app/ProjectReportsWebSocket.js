// ProjectReportsWebSocket.js
import React, { createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileSaver from 'file-saver';
import { WS_BASE_PROJECT_REPORT_DEV, WS_BASE_PROJECT_REPORT_LOCAL } from './config';
import { decodeDataFromToken } from './services/serviceUtils';

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
			const save = document.createElement('a');
			save.href = fileURL;
			save.target = '_blank';
			const filename = fileURL.substring(fileURL.lastIndexOf('/') + 1);
			save.download = fileName || filename;
			if (
				navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) &&
				navigator.userAgent.search('Chrome') < 0
			) {
				document.location = save.href;
				// window event not working here
			} else {
				const evt = new MouseEvent('click', {
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
			const _window = window.open(fileURL, '_blank');
			_window.document.close();
			_window.document.execCommand('SaveAs', true, fileName || fileURL);
			_window.close();
		}
	}
	const passMessage = msg => {
		// const findUnique_code = element => element?.unique_code == msg.message.unique_code;
		const name =
			msg.message.name && msg.message.extension ? `${msg.message.name}.${msg.message.extension}` : 'file.pdf';
		FileSaver.saveAs(msg.message.url, name);
	};
	const createSocket = () => {
		global.projectReportsWebSocket = new WebSocket(WS_BASE);
		global.projectReportsWebSocket.onmessage = function (e) {
			const data = JSON.parse(e.data);
			const userInfo = decodeDataFromToken();
			const getUserId = () => userInfo?.extra?.profile.id;
			if (data.message.message.dest?.['id'] === parseInt(getUserId())) {
				if (window.DownloadFiles) {
					window.DownloadFiles.postMessage(data.message.message.url);
				}
				passMessage(data.message);
			}
		};
		global.projectReportsWebSocket.onclose = function (event) {
			// toast.warn('WebSocket is closed now.');
			setTimeout(() => {
				createSocket();
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
