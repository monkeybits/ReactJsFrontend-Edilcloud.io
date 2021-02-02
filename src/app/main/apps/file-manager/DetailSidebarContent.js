import FuseAnimate from '@fuse/core/FuseAnimate';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import ReadPDF from './ReadPDF';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFilePdf,
	faFile,
	faFileExcel,
	faFileVideo,
	faFileAudio,
	faFileImage,
	faFileWord
} from '@fortawesome/free-regular-svg-icons';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
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
import * as Actions from './store/actions';
import FileSaver from 'file-saver';
import DeleteConfirmDialog from './DeleteConfirmDialog';
import FileViewDialog from './FileViewDialog';
import * as ICONS from 'app/main/apps/constants';

import Menu from '@material-ui/core/Menu';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import { Paper } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation('filemanager');
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files?.allFiles);
	const selectedItem = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [isOpenViewFile, setIsOpenViewFile] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(false);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const handleClick = event => {
		event.preventDefault();
		event.stopPropagation();
		show();
		// setAnchorEl(event.currentTarget);
	};
	const [visible, setVisible] = useState(false);
	const show = () => setVisible(true);
	const hide = () => setVisible(false);
	const handleClose = event => {
		event.stopPropagation();
		hide();
		// setAnchorEl(false);
	};
	if (!selectedItem) {
		return null;
	}
	const getdate = date => moment(date).format('MMMM Do YYYY, h:mm a');
	const checkData = data => (data ? data : '-');
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
					let image = btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
					var file = `data:${headers['content-type'].toLowerCase()};base64,${image}`;
					console.log({ file });
					if (window) {
						console.log('listenning to flutterInAppWebViewPlatformReady');
						console.log(window.flutter_inappwebview);
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

						console.log('finish listenning to flutterInAppWebViewPlatformReady');
					}
					FileSaver.saveAs(file);
					// var file = new File([data], `${selectedItem.title}.${selectedItem.extension}`);
					// FileSaver.saveAs(file);
					dispatch(Actions.onUploadHandleLoading(false));
				},
				err => {
					dispatch(Actions.onUploadHandleLoading(false));
				},
				METHOD.GET,
				{
					...getHeaderToken(),
					responseType: 'arraybuffer',
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
		const userInfo = decodeDataFromToken();
		const cid = userInfo.extra?.profile?.company;
		const fileType = selectedItem.type;
		const mainId = selectedItem.mainId;
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
				const userInfo = decodeDataFromToken();
				const cid = userInfo.extra?.profile?.company;
				if (folderPath.length > 1) {
					dispatch(Actions.folderDetail(cid));
				}
				dispatch(Actions.getFolders(cid));
				dispatch(Actions.setSelectedItem(''));
				// if (fileType == 'folder') {
				// 	dispatch(Actions.deleteFile(selectedItem.id, fileType, selectedItem.path, selectedItem));
				// } else {
				// 	dispatch(Actions.deleteFile(selectedItem.id, fileType, mainId, selectedItem));
				// }
				colseDeleteFileDialog();
			},
			err => console.log(err),
			METHOD.DELETE,
			getHeaderToken()
		);
	};
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
					<div className="file-details p-16 sm:p-24">
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
					<div className="px-10 py-12 border-b-1 border-t-1">
						<MenuList className="flex items-center actions-dropdown p-0 small">
							<MenuItem onClick={onDownload}>
								<img className="icon mr-8" src={ICONS.DOWNLOAD_ICON_PATH} />

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
					<div className="px-24 py-12 border-b-1">
						<Typography variant="subtitle1" className="py-10 uppercase text-gray-500">
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
