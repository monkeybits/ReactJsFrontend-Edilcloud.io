import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import {
	DOWNLOAD_PHOTO,
	DOWNLOAD_VIDEO,
	DOWNLOAD_DOCUMENT,
	PHOTO_DELETE,
	VIDEO_DELETE,
	DOCUMENT_DELETE,
	FOLDER_DELETE_PROJECT
} from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import FileSaver from 'file-saver';
import * as Actions from './store/actions';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import FileViewDialog from './FileViewDialog';
import { useParams } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

function DetailSidebarHeader({ setProgress, pageLayout }) {
	const dispatch = useDispatch();
	const folders = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.folders);
	const files = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.allFiles);
	const selectedItem = useSelector(({ fileManagerAppProject }) => files[fileManagerAppProject.selectedItemId]);
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [isOpenViewFile, setIsOpenViewFile] = useState(false);
	const routeParams = useParams();

	if (!selectedItem) {
		return null;
	}
	const onDownload = () => {
		if (selectedItem) {
			setProgress(0);
			dispatch(Actions.onUploadHandleLoading(true));
			let apiurl =
				selectedItem.type == 'photo'
					? DOWNLOAD_PHOTO(selectedItem.mainId)
					: selectedItem.type == 'video'
					? DOWNLOAD_VIDEO(selectedItem.mainId)
					: DOWNLOAD_DOCUMENT(selectedItem.mainId);
			apiCall(
				apiurl,
				{},
				({ headers, data }) => {
					var file = new File([data], `${selectedItem.title}.${selectedItem.extension}`);
					if (window) {
						console.log('listenning to flutterInAppWebViewPlatformReady');
						console.log(window.flutter_inappwebview)
						if (selectedItem.type == 'photo') {
							if (window.DownloadFiles) {
								window.DownloadFiles.postMessage(selectedItem.photo);
							}
							window.flutter_inappwebview.callHandler('DownloadFiles', selectedItem.photo);
						}
						if (selectedItem.type == 'video') {
							if (window.DownloadFiles) {
								window.DownloadFiles.postMessage(selectedItem.video);
							}
							window.flutter_inappwebview.callHandler('DownloadFiles', selectedItem.video);
						}
						if (selectedItem.type == 'document') {
							if (window.DownloadFiles) {
								window.DownloadFiles.postMessage(selectedItem.document);
							}
							window.flutter_inappwebview.callHandler('DownloadFiles', selectedItem.document);
						}
						
						console.log('finish listenning to flutterInAppWebViewPlatformReady');
					}
					FileSaver.saveAs(file);
					dispatch(Actions.onUploadHandleLoading(false));
				},
				err => {
					dispatch(Actions.onUploadHandleLoading(false));
				},
				METHOD.GET,
				{
					...getHeaderToken(),
					responseType: 'blob',
					onDownloadProgress: progressEvent => {
						var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setProgress(percentCompleted);
					}
				},
				true
			);
		}
	};
	const openDeleteFileDialog = () => setIsOpenDeleteDialog(true);
	const colseDeleteFileDialog = () => setIsOpenDeleteDialog(false);
	const handleDelete = () => {
		const pid = routeParams.id;
		const fileType = selectedItem.type;
		const mainId = selectedItem.mainId;
		const url =
			fileType == 'folder'
				? FOLDER_DELETE_PROJECT(pid, selectedItem.path)
				: fileType == 'photo'
				? PHOTO_DELETE(selectedItem.mainId)
				: fileType == 'video'
				? VIDEO_DELETE(selectedItem.mainId)
				: DOCUMENT_DELETE(selectedItem.mainId);
		apiCall(
			url,
			{},
			res => {
				if (fileType == 'folder') {
					dispatch(Actions.deleteFile(selectedItem.id, fileType, selectedItem.path, selectedItem));
				} else {
					dispatch(Actions.deleteFile(selectedItem.id, fileType, mainId, selectedItem));
				}
				colseDeleteFileDialog();
			},
			err => console.log(err),
			METHOD.DELETE,
			getHeaderToken()
		);
	};
	const openViewFile = () => setIsOpenViewFile(true);
	const closeViewFile = () => setIsOpenViewFile(false);
	const url =
		selectedItem.type == 'photo'
			? selectedItem.photo
			: selectedItem.type == 'video'
			? selectedItem.video
			: selectedItem.document;
	return (
		<>
			<DeleteConfirmDialog
				text="Are you sure want to delete ?"
				isOpenDeleteDialog={isOpenDeleteDialog}
				colseDeleteFileDialog={colseDeleteFileDialog}
				onYes={handleDelete}
				onNo={colseDeleteFileDialog}
			/>
			<FileViewDialog isOpenViewFile={isOpenViewFile} closeViewFile={closeViewFile} />
			<div className="flex flex-col justify-between">
				{/* <div className="toolbar flex align-center justify-end">
					<FuseAnimate animation="transition.expandIn" delay={200}>
						<IconButton onClick={openDeleteFileDialog}>
							<Icon>delete</Icon>
						</IconButton>
					</FuseAnimate>
					<FuseAnimate animation="transition.expandIn" delay={200}>
						<IconButton onClick={onDownload}>
							<Icon>cloud_download</Icon>
						</IconButton>
					</FuseAnimate>
					<IconButton onClick={openViewFile}>
						<Icon>visibility</Icon>
					</IconButton>
				</div> */}

				<div className="flex items-center justify-between border-b-1 px-20 py-6">
					<FuseAnimate delay={200}>
						<Typography variant="subtitle1" className="font-700">
							{selectedItem.title}
						</Typography>
					</FuseAnimate>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="close"
						className="close-icon list-view-icon"
						onClick={() => {
							pageLayout.current.toggleRightSidebar();
							dispatch(Actions.setSelectedItem(''));
						}}
					>
						<CloseIcon />
					</IconButton>

					{/* <FuseAnimate delay={300}>
						<Typography variant="caption" className="">
							<span>Edited</span>
							<span>: {moment(selectedItem.date_last_modify).format('MMMM Do YYYY, h:mm a')}</span>
						</Typography>
					</FuseAnimate> */}
				</div>
			</div>
		</>
	);
}

export default DetailSidebarHeader;
