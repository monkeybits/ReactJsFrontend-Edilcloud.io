/* =============================================================================
 TODO: DetailSidebarHeader.js
 ===============================================================================
*This File is part of Company File manager
TODO: This is Header of right sidebar check company file manager UI 
*/
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
	FOLDER_DELETE
} from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import FileSaver from 'file-saver';
import CloseIcon from '@material-ui/icons/Close';
import * as Actions from './store/actions';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import FileViewDialog from './FileViewDialog';

function DetailSidebarHeader({ setProgress, pageLayout }) {
	const dispatch = useDispatch();
	const folders = useSelector(({ fileManagerApp }) => fileManagerApp.files?.folders);
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files?.allFiles);
	const selectedItem = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [isOpenViewFile, setIsOpenViewFile] = useState(false);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);

	if (!selectedItem) {
		return null;
	}
	const openDeleteFileDialog = () => setIsOpenDeleteDialog(true);
	const colseDeleteFileDialog = () => setIsOpenDeleteDialog(false);
	const handleDelete = () => {
		const userInfo = decodeDataFromToken();
		const cid = userInfo.extra?.profile?.company;
		const fileType = selectedItem.type;
		const { mainId } = selectedItem;
		const url =
			fileType == 'folder'
				? FOLDER_DELETE(selectedItem.mainId)
				: fileType == 'photo'
				? PHOTO_DELETE(selectedItem.mainId)
				: fileType == 'video'
				? VIDEO_DELETE(selectedItem.mainId)
				: DOCUMENT_DELETE(selectedItem.mainId);
		apiCall(
			url,
			{},
			res => {
				if (folderPath.length > 1) {
					dispatch(Actions.folderDetail(cid));
				}
				if (fileType != 'folder') {
					if (fileType == 'photo') {
						dispatch(Actions.getPhotos(cid));
					} else if (fileType == 'video') {
						dispatch(Actions.getVideos(cid));
					} else {
						dispatch(Actions.getDocuments(cid));
					}
				}

				dispatch(Actions.getFolders(cid));
				dispatch(Actions.setSelectedItem(''));
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
