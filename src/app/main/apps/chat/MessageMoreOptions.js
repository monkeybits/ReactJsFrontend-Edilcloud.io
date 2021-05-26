import React, { useState } from 'react';
import { MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { DOWNLOAD_PHOTO, DOWNLOAD_VIDEO, DOWNLOAD_DOCUMENT } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import FileSaver from 'file-saver';
import * as Actions from './store/actions';

const TippyMenu = loadable(() => import('app/TippyMenu'));
const FileViewDialog = loadable(() => import('./FileViewDialog'));

export default function SimpleMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [isOpenViewFile, setIsOpenViewFile] = useState(false);
	const dispatch = useDispatch();
	const { t } = useTranslation('chat');

	const [visible, setVisible] = useState(false);
	const show = () => setVisible(true);
	const hide = () => setVisible(false);
	// const handleClose = event => {
	// 	event.stopPropagation();
	// 	hide();
	// 	// setAnchorEl(false);
	// };

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleDelete = () => {
		dispatch(props.deleteMessage(props.item.id));
		handleClose();
	};

	const handleDownload = () => {
		const selectedItem = props.item.files[0];
		if (selectedItem) {
			props.setProgress(0);
			dispatch(Actions.onUploadHandleLoading(true));
			const apiurl =
				selectedItem.extension === '.jpg' || selectedItem.extension === '.png'
					? DOWNLOAD_PHOTO(selectedItem.id)
					: selectedItem.extension == '.mp3' || selectedItem.extension == '.mp4'
					? DOWNLOAD_VIDEO(selectedItem.id)
					: DOWNLOAD_DOCUMENT(selectedItem.id);
			apiCall(
				apiurl,
				{},
				({ headers, data }) => {
					const image = btoa(
						new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), '')
					);
					const file = `data:${headers['content-type'].toLowerCase()};base64,${image}`;
					if (window) {
						if (window.DownloadFiles) {
							window.DownloadFiles.postMessage(selectedItem.media_url);
						}
						if (window.flutter_inappwebview)
							window.flutter_inappwebview.callHandler('DownloadFiles', selectedItem.media_url);
					}
					FileSaver.saveAs(file);
					dispatch(Actions.onUploadHandleLoading(false));
				},
				err => {
					dispatch(Actions.onUploadHandleLoading(false));
					props.setProgress(0);
				},
				METHOD.GET,
				{
					...getHeaderToken(),
					responseType: 'arraybuffer',
					onDownloadProgress: progressEvent => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						props.setProgress(percentCompleted);
					}
				},
				true
			);
		}
	};

	const openViewFile = () => setIsOpenViewFile(true);
	const closeViewFile = event => {
		setIsOpenViewFile(false);
		// handleClose(event);
	};
	return (
		<div className={props.className}>
			<TippyMenu
				icon={
					<>
						<IconButton
							aria-label="more"
							aria-controls="long-menu"
							aria-haspopup="true"
							onClick={handleClick}
						>
							<MoreVertIcon />
						</IconButton>
					</>
				}
				outsideClick
			>
				<MenuItem onClick={handleDelete}>{t('DELETE')}</MenuItem>
				{props.item.files.length > 0 && (
					<>
						<MenuItem onClick={handleDownload}>{t('DOWNLOAD')}</MenuItem>
						<MenuItem onClick={openViewFile}>{t('VIEW')}</MenuItem>
					</>
				)}
			</TippyMenu>
			<FileViewDialog
				isOpenViewFile={isOpenViewFile}
				closeViewFile={closeViewFile}
				setProgress={props.setProgress}
				selectedItem={props.item.files[0]}
			/>
		</div>
	);
}
