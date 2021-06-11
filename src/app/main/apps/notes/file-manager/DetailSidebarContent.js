import FuseAnimate from '@fuse/core/FuseAnimate';
import { Icon, Typography, MenuList, MenuItem, ListItemIcon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { apiCall, METHOD } from 'app/services/baseUrl';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {
	DOWNLOAD_PHOTO,
	DOWNLOAD_VIDEO,
	DOWNLOAD_DOCUMENT,
	PHOTO_DELETE,
	VIDEO_DELETE,
	DOCUMENT_DELETE,
	FOLDER_DELETE
} from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import FileSaver from 'file-saver';
import * as ICONS from 'app/main/apps/constants';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import * as Actions from './store/actions';
import ReadPDF from './ReadPDF';
import loadable from '@loadable/component';
const DeleteConfirmDialog = loadable(() => import('./DeleteConfirmDialog'));
const FileViewDialog = loadable(() => import('./FileViewDialog'));

const useStyles = makeStyles({
	table: {
		'& th': {
			padding: '16px 0'
		}
	},
	typeIcon: {
		'&.folder:before': {
			content: "'folder'",
			color: '#FFB300'
		},
		'&.document:before': {
			content: "'insert_drive_file'",
			color: '#1565C0'
		},
		'&.spreadsheet:before': {
			content: "'insert_chart'",
			color: '#4CAF50'
		}
	}
});

function DetailSidebarContent({ setProgress }) {
	const { t } = useTranslation('filemanaer_project');
	const files = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.allFiles);
	const selectedItem = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.selectedItemId);
	const folderPath = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.folderPath);
	const dispatch = useDispatch();
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const routeParams = useParams();
	const [isOpenViewFile, setIsOpenViewFile] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(false);
	const handleClick = event => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = event => {
		event.stopPropagation();
		setAnchorEl(false);
	};
	const classes = useStyles();

	if (!selectedItem) {
		return null;
	}
	const getdate = date => moment(date).format('MMMM Do YYYY, h:mm a');
	const checkData = data => data || '-';
	const getCssColor = fileType =>
		fileType == 'pdf'
			? { color: 'red' }
			: fileType == 'video'
			? { color: 'red' }
			: fileType == 'mp3'
			? { color: 'brown' }
			: fileType == 'docx'
			? { color: 'blue' }
			: fileType == 'xlsx'
			? { color: 'green' }
			: {};

	const onDownload = () => {
		if (selectedItem) {
			setProgress(0);
			dispatch(Actions.onUploadHandleLoading(true));
			const apiurl =
				selectedItem.type == 'photo'
					? DOWNLOAD_PHOTO(selectedItem.mainId)
					: selectedItem.type == 'video'
					? DOWNLOAD_VIDEO(selectedItem.mainId)
					: DOWNLOAD_DOCUMENT(selectedItem.mainId);
			apiCall(
				apiurl,
				{},
				({ headers, data }) => {
					const file = new File([data], `${selectedItem.title}.${selectedItem.extension}`);
					if (window) {
						// console.log('listenning to flutterInAppWebViewPlatformReady');
						// console.log(window.flutter_inappwebview);
						if (selectedItem.type == 'photo') {
							if (window.DownloadFiles) {
								window.DownloadFiles.postMessage(selectedItem.photo);
							}
							if (window.flutter_inappwebview)
								window.flutter_inappwebview.callHandler('DownloadFiles', selectedItem.photo);
						}
						if (selectedItem.type == 'video') {
							if (window.DownloadFiles) {
								window.DownloadFiles.postMessage(selectedItem.video);
							}
							if (window.flutter_inappwebview)
								window.flutter_inappwebview.callHandler('DownloadFiles', selectedItem.video);
						}
						if (selectedItem.type == 'document') {
							if (window.DownloadFiles) {
								window.DownloadFiles.postMessage(selectedItem.document);
							}
							if (window.flutter_inappwebview)
								window.flutter_inappwebview.callHandler('DownloadFiles', selectedItem.document);
						}

						// console.log('finish listenning to flutterInAppWebViewPlatformReady');
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
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
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
		const userInfo = decodeDataFromToken();
		const cid = userInfo.extra?.profile?.company;
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
	const closeViewFile = event => {
		setIsOpenViewFile(false);
		handleClose(event);
	};
	const openMenu = Boolean(anchorEl);
	return (
		<>
			<DeleteConfirmDialog
				text="Are you sure want to delete ?"
				isOpenDeleteDialog={isOpenDeleteDialog}
				colseDeleteFileDialog={colseDeleteFileDialog}
				onYes={handleDelete}
				onNo={colseDeleteFileDialog}
			/>
			<FuseAnimate animation="transition.slideUpIn" delay={600}>
				<div>
					<div className="file-details p-24 border-b-1">
						<div className="preview h-128 sm:h-256 file-icon flex items-center justify-center custom-pdf">
							{selectedItem.type == 'photo' ? (
								<img className="h-128 sm:h-256 object-contain" src={selectedItem.photo} />
							) : selectedItem.extension == 'pdf' ? (
								<ReadPDF height={256} width={270} file={selectedItem.document} />
							) : selectedItem.type == 'video' ? (
								<img className="icon mr-8" src={ICONS.VIDEO_ICON_PATH} />
							) : selectedItem.extension == 'pdf' ? (
								<img className="icon mr-8" src={ICONS.PDF_ICON_PATH} />
							) : selectedItem.extension == 'docx' ? (
								<img className="icon mr-8" src={ICONS.DOC_ICON_PATH} />
							) : selectedItem.extension == 'xlsx' ? (
								<img className="icon mr-8" src={ICONS.EXCEL_ICON_PATH} />
							) : selectedItem.extension == 'mp3' ? (
								<img className="icon mr-8" src={ICONS.AUDIO_ICON_PATH} />
							) : selectedItem.extension == 'zip' || selectedItem.extension == 'rar' ? (
								<div className="soft-icon-title">
									<img className="icon mr-8" src={ICONS.ZIP_ICON_PATH} />
								</div>
							) : selectedItem.extension == 'ppt' ||
							  selectedItem.extension == 'pptx' ||
							  selectedItem.extension == 'pptm' ? (
								<img className="icon mr-8" src={ICONS.SLIDES_ICON_PATH} />
							) : (
								<img className="icon mr-8" src={ICONS.GENERIC_ICON_PATH} />
							)}
						</div>
					</div>
					<div className="px-10 py-12 border-b-1">
						<MenuList className="flex items-center actions-dropdown p-0 small">
							<MenuItem onClick={onDownload}>
								<Icon className="mr-8">cloud_download</Icon>
								<Typography variant="inherit">{t('DOWNLOAD')}</Typography>
							</MenuItem>
							<MenuItem onClick={openDeleteFileDialog}>
								<ListItemIcon>
									<DeleteOutlineOutlinedIcon fontSize="medium" />
								</ListItemIcon>
								<Typography variant="inherit">{t('DELETE')}</Typography>
							</MenuItem>
							<MenuItem onClick={openViewFile}>
								<ListItemIcon>
									<Icon>visibility</Icon>
								</ListItemIcon>
								<Typography variant="inherit">{t('VIEW')}</Typography>
							</MenuItem>
						</MenuList>
					</div>
					<FileViewDialog
						isOpenViewFile={isOpenViewFile}
						closeViewFile={closeViewFile}
						setProgress={setProgress}
					/>
					<div className="px-24 py-12 border-b-1 pb-76">
						<Typography variant="subtitle2" className="py-10 uppercase text-gray-500">
							{t('INFO')}
						</Typography>
						<table className={clsx(classes.table, 'w-full text-justify')}>
							<tbody>
								<tr className="type">
									<th>{t('TYPE')}</th>
									<td>{checkData(selectedItem.type)}</td>
								</tr>

								<tr className="size">
									<th>{t('SIZE')}</th>
									<td>{selectedItem.size === '' ? '-' : selectedItem.size}</td>
								</tr>

								<tr className="location">
									<th>{t('LOCATION')}</th>
									<td>{checkData(selectedItem.location)}</td>
								</tr>

								<tr className="owner">
									<th>{t('OWNER')}</th>
									<td>{checkData(selectedItem.owner)}</td>
								</tr>

								<tr className="modified">
									<th>{t('MODIFIED')}</th>
									<td>{getdate(selectedItem.date_last_modify)}</td>
								</tr>

								<tr className="opened">
									<th>{t('OPENED')}</th>
									<td>{checkData(selectedItem.opened)}</td>
								</tr>

								<tr className="created">
									<th>{t('CREATED')}</th>
									<td>{getdate(selectedItem.date_create)}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</FuseAnimate>
		</>
	);
}

export default DetailSidebarContent;
