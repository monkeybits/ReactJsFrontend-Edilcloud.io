import React, { useState } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { IconButton, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import {
	PHOTO_DELETE,
	VIDEO_DELETE,
	DOCUMENT_DELETE,
	FOLDER_DELETE
} from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import { useParams } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const DeleteConfirmDialog = loadable(() => import('./DeleteConfirmDialog'));
const FileViewDialog = loadable(() => import('./FileViewDialog'));

function DetailSidebarHeader({ setProgress, pageLayout }) {
	const dispatch = useDispatch();
	const folders = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.folders);
	const files = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.allFiles);
	const selectedItem = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.selectedItemId);
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [isOpenViewFile, setIsOpenViewFile] = useState(false);
	const folderPath = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.folderPath);
	const routeParams = useParams();

	if (!selectedItem) {
		return null;
	}
	const openDeleteFileDialog = () => setIsOpenDeleteDialog(true);
	const colseDeleteFileDialog = () => setIsOpenDeleteDialog(false);
	const handleDelete = () => {
		const pid = routeParams.id;
		const fileType = selectedItem.type;
		const { mainId } = selectedItem;
		const url =
			fileType == 'folder'
				? FOLDER_DELETE(selectedItem.mainId || selectedItem.id)
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
					dispatch(Actions.folderDetail(routeParams.id));
				}
				if (fileType != 'folder') {
					if (fileType == 'photo') {
						dispatch(Actions.getPhotos(routeParams.id));
					} else if (fileType == 'video') {
						dispatch(Actions.getVideos(routeParams.id));
					} else {
						dispatch(Actions.getDocuments(routeParams.id));
					}
				}
				dispatch(Actions.getFolders(routeParams.id));
				dispatch(Actions.setSelectedItem(''));
				colseDeleteFileDialog();
			},
			err => {
				// console.log(err),
			},
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
				</div>
			</div>
		</>
	);
}

export default DetailSidebarHeader;
