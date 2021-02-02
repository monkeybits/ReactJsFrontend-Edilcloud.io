import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import moment from 'moment';
import FuseUtils from '@fuse/utils';
import { Typography } from '@material-ui/core';
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
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import GetAppOutlinedIcon from '@material-ui/icons/GetAppOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import * as ICONS from 'app/main/apps/constants';
import TippyMenu from 'app/TippyMenu';
import { apiCall, METHOD } from 'app/services/baseUrl';
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
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles({
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

function FileList(props) {
	const dispatch = useDispatch();
	const folders = useSelector(({ fileManagerApp }) => fileManagerApp.files?.folders);
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files?.files);
	const allFiles = useSelector(({ fileManagerApp }) => fileManagerApp.files?.allFiles);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const currentFolderPath = folderPath[folderPath.length - 1];
	const selectedItemId = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
	const menuRef = useRef(null);
	const { t } = useTranslation('filemanager');
	// const [allFiles, setAllFiles] = useState([]);
	const options = [
		{
			name: 'DELETE',
			icon: <Icon>delete</Icon>,
			handleClickEvent: (ev, n) => {
				ev.preventDefault();
				ev.stopPropagation();
				handleDelete(n);
			}
		},

		{
			name: 'DOWNLOAD',
			icon: <img className="icon mr-8" src={ICONS.DOWNLOAD_ICON_PATH} />,
			handleClickEvent: (ev, n) => {
				ev.preventDefault();
				ev.stopPropagation();
				onDownload(n);
			}
		},
		{
			name: 'MOVE_TO',
			icon: <Icon>transform</Icon>,
			handleClickEvent: (ev, n) => {
				ev.preventDefault();
				ev.stopPropagation();
				dispatch(Actions.openMoveFileDialog(n));
			}
		},
		{
			name: 'VIEW',
			icon: <Icon>info</Icon>,
			handleClickEvent: (ev, n) => {
				ev.preventDefault();
				ev.stopPropagation();
				props.pageLayout.current.toggleRightSidebar();
				dispatch(Actions.setSelectedItem(n));
			}
		},
		{
			name: 'RENAME',
			icon: <Icon>edit</Icon>,
			handleClickEvent: (ev, n) => {
				ev.preventDefault();
				ev.stopPropagation();
				dispatch(Actions.openRenameFileDialog(n));
			}
		}
	];
	const classes = useStyles();
	const checkData = data => (data ? data : '-');
	const getdate = date => moment(date).format('MMMM Do YYYY, h:mm a');
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

	const setAllFilesInit = () => {
		// let modifyfolders = folders?.filter(
		// 	f =>
		// 		f.path.includes(currentFolderPath) &&
		// 		f.path.split('/').length <= folderPath.length &&
		// 		!folderPath.includes(f.path)
		// );
		// if (modifyfolders) {
		// 	modifyfolders = modifyfolders.map(item => {
		// 		let title = item.path.split('/');
		// 		title = title[title.length - 1];
		// 		return { ...item, title, type: 'folder' };
		// 	});
		// 	dispatch(
		// 		Actions.setAllFiles([
		// 			...modifyfolders,
		// 			...files.filter(f => f.folder_relative_path == currentFolderPath)
		// 		])
		// 	);
		// }
		dispatch(Actions.setAllFiles([...folders, ...files.filter(d => d.folder == currentFolderPath.mainId)]));
		// if (Array.isArray(files)) {
		// 	let tempFiles = files.filter(d => d.folder == currentFolderPath.id);
		// 	setCurrentFiles(tempFiles);
		// } else {
		// 	setCurrentFiles([]);
		// }
	};
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	useEffect(() => {
		setAllFilesInit();
	}, [files, folders, files.photos, files.videos, files.documents]);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (searchText && searchText.length) {
			let results = getFilteredArray(allFiles, searchText);
			dispatch(Actions.setAllFiles(results));
		} else {
			setAllFilesInit();
		}
	}, [searchText]);
	useEffect(() => {
		dispatch(Actions.setSelectedItem(''));
		setAllFilesInit();
	}, [currentFolderPath]);
	const handleDelete = tile => {
		let findIndex = 0;
		if (tile.type == 'folder') {
			findIndex = [...allFiles].findIndex(element => element.path == tile.path);
		} else {
			findIndex = [...allFiles].findIndex(element => element.mainId == tile.mainId && element.type == tile.type);
		}
		let selectedItem = allFiles[findIndex];
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
				if (folderPath.length > 1) {
					dispatch(Actions.folderDetail(cid));
				}
				dispatch(Actions.getFolders(cid));
				dispatch(Actions.setSelectedItem(''));
				// colseDeleteFileDialog();
			},
			err => console.log(err),
			METHOD.DELETE,
			getHeaderToken()
		);
	};
	const onDownload = tile => {
		let findIndex = 0;
		if (tile.type == 'folder') {
			findIndex = [...allFiles].findIndex(element => element.path == tile.path);
		} else {
			findIndex = [...allFiles].findIndex(element => element.mainId == tile.mainId && element.type == tile.type);
		}
		let selectedItem = allFiles[findIndex];
		if (selectedItem) {
			props.setProgress(0);
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
						} else {
							if (window.DownloadFiles) {
								window.DownloadFiles.postMessage(selectedItem.document);
							}
							if (window.flutter_inappwebview)
								window.flutter_inappwebview.callHandler('DownloadFiles', selectedItem.document);
						}
					}
					console.log({ file });
					FileSaver.saveAs(file);
					// var file = new File([data], `${selectedItem.title}.${selectedItem.extension}`);
					// FileSaver.saveAs(file);
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
						var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						props.setProgress(percentCompleted);
					}
				},
				true
			);
		}
	};
	if (allFiles.length === 0 && searchText) {
		return (
			<div>
				<div className="flex flex-1 items-center justify-center h-full">
					<img className="w-400" src="assets/images/errors/nofiles.png"></img>
				</div>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						{t('NO_FILES_MESSAGE')}
					</Typography>
				</div>
				<div className="flex flex-1 mt-20 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h6">
						{t('CREATE_FILE_ADVICE')}
					</Typography>
				</div>
			</div>
		);
	}
	return (
		<div className="file-folder-grid px-20">
			<FuseAnimate animation="transition.slideUpIn" delay={300}>
				<Table className="bg-white rounded table-shadow">
					{(currentFolderPath != '' || !!Object.entries(allFiles).length) && (
						<TableHead>
							<TableRow>
								<TableCell className="max-w-64 w-64 p-0 text-center"> </TableCell>
								<TableCell>{t('NAME')}</TableCell>
								<TableCell className="hidden sm:table-cell">{t('TYPE')}</TableCell>
								<TableCell className="hidden sm:table-cell">{t('OWNER')}</TableCell>
								<TableCell className="text-center hidden sm:table-cell">{t('SIZE')}</TableCell>
								<TableCell className="hidden sm:table-cell">{t('MODIFIED')}</TableCell>
								{/* <TableCell></TableCell>
								<TableCell></TableCell> */}
								<TableCell>{t('ACTIONS')}</TableCell>
							</TableRow>
						</TableHead>
					)}

					<TableBody>
						{currentFolderPath != '' && (
							<TableRow>
								<TableCell onClick={() => dispatch(Actions.popFolderPath())}>
									<IconButton aria-label="back" size="small">
										<Icon>more_horiz</Icon>
									</IconButton>
								</TableCell>
								<TableCell></TableCell>
								<TableCell className="hidden sm:table-cell"></TableCell>
								<TableCell className="hidden sm:table-cell"></TableCell>
								<TableCell className="hidden sm:table-cell"></TableCell>
								<TableCell className="hidden sm:table-cell"></TableCell>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell>{t('ACTIONS')}</TableCell>
							</TableRow>
						)}
						{Object.entries(allFiles).map(([key, n]) => {
							return (
								<TableRow
									key={n.id}
									hover
									onClick={event =>
										n.type == 'folder'
											? dispatch(Actions.setFolderPath(n))
											: dispatch(Actions.setSelectedItem(n))
									}
									selected={n.id === selectedItemId}
									className="cursor-pointer"
								>
									<TableCell className="max-w-64 w-64 p-0 text-center">
										{/* <Icon className={clsx(classes.typeIcon, n.type)}>
											{n.type == 'video' ? 'movie' : n.type}{' '}
										</Icon> */}
										{n.type == 'video' ? (
											<img className="icon mr-8" src={ICONS.VIDEO_ICON_PATH} />
										) : n.type == 'photo' ? (
											<img className="icon mr-8" src={ICONS.IMAGE_ICON_PATH} />
										) : n.type == 'folder' ? (
											<Icon className={clsx(classes.typeIcon, n.type)}>folder</Icon>
										) : n.extension == 'pdf' ? (
											<img className="icon mr-8" src={ICONS.PDF_ICON_PATH} />
										) : n.extension == 'docx' ? (
											<img className="icon mr-8" src={ICONS.DOC_ICON_PATH} />
										) : n.extension == 'xlsx' ? (
											<img className="icon mr-8" src={ICONS.EXCEL_ICON_PATH} />
										) : n.extension == 'mp3' ? (
											<img className="icon mr-8" src={ICONS.AUDIO_ICON_PATH} />
										) : n.extension == 'zip' || n.extension == 'rar' ? (
											<div className="soft-icon-title">
												<img className="icon mr-8" src={ICONS.ZIP_ICON_PATH} />
											</div>
										) : n.extension == 'ppt' || n.extension == 'pptx' || n.extension == 'pptm' ? (
											<img className="icon mr-8" src={ICONS.SLIDES_ICON_PATH} />
										) : (
											<img className="icon mr-8" src={ICONS.GENERIC_ICON_PATH} />
										)}
									</TableCell>
									<TableCell>{n.title||n.name}</TableCell>
									<TableCell className="hidden sm:table-cell">{n.type}</TableCell>
									<TableCell className="hidden sm:table-cell">{checkData(n.owner)}</TableCell>
									<TableCell className="text-center hidden sm:table-cell">
										{n.size === '' ? '-' : n.size}
									</TableCell>
									<TableCell className="hidden sm:table-cell">
										{n.date_last_modify ? getdate(n.date_last_modify) : '-'}
									</TableCell>

									{/* <TableCell>
										<IconButton
											onClick={ev => {
												ev.preventDefault();
												ev.stopPropagation();
												dispatch(Actions.openMoveFileDialog(n));
											}}
											aria-label="open right sidebar"
										>
											<Icon>transform</Icon>
										</IconButton>
									</TableCell> */}

									{/* <Hidden lgUp> */}
									{/* <TableCell>
										<IconButton
											onClick={ev => {
												ev.preventDefault();
												ev.stopPropagation();
												props.pageLayout.current.toggleRightSidebar();
												dispatch(Actions.setSelectedItem(n));
											}}
											aria-label="open right sidebar"
										>
											<Icon>info</Icon>
										</IconButton>
									</TableCell> */}
									{/* </Hidden> */}
									<TableCell>
										{/* <div className="actions-dropdown relative">
											<IconButton
												aria-label="more"
												aria-controls="long-menu-table"
												aria-haspopup="true"
												onClick={handleClick}
											>
												<MoreVertIcon />
											</IconButton>
											<div className="custom-list-dropdown">
												<ul className="list-unstyled">
													<li className="py-6">
														<VisibilityOutlinedIcon />
														Preview
													</li>
													<li className="py-6">
														<EditOutlinedIcon />
														Edit
													</li>
													<li className="py-6">
														<ShareOutlinedIcon />
														Share
													</li>
													<li className="py-6">
														<InsertDriveFileOutlinedIcon />
														Move to
													</li>
													<li className="py-6">
														<ColorLensOutlinedIcon />
														Change Color
													</li>
													<li className="py-6">
														<StarBorderOutlinedIcon />
														Add to Starred
													</li>
													<li className="py-6">
														<GetAppOutlinedIcon />
														Download
													</li>
													<li className="py-6">
														<DeleteOutlineOutlinedIcon />
														Delete
													</li>
												</ul>
											</div>
										</div> */}

										<div className="actions-dropdown">
											<TippyMenu
												icon={
													<IconButton
														aria-label="more"
														aria-controls="long-menu"
														aria-haspopup="true"
														// onClick={handleClick}
													>
														<MoreVertIcon />
													</IconButton>
												}
												ref={menuRef}
												outsideClick
											>
												{options.map(({ name, icon, handleClickEvent }) =>
													name != 'DELETE' ? (
														n.type != 'folder' ? (
															<MenuItem
																key={name}
																onClick={e => {
																	// menuRef.current.handleMenuClose();
																	handleClickEvent(e, n);
																}}
															>
																<ListItemIcon>{icon}</ListItemIcon>
																<Typography variant="inherit"> {t(name)}</Typography>
															</MenuItem>
														) : null
													) : (
														<MenuItem
															key={name}
															onClick={e => {
																// menuRef.current.handleMenuClose();
																handleClickEvent(e, n);
															}}
														>
															<ListItemIcon>{icon}</ListItemIcon>
															<Typography variant="inherit"> {t(name)}</Typography>
														</MenuItem>
													)
												)}
											</TippyMenu>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseAnimate>
			{currentFolderPath == '' && !allFiles?.length && (
				<div>
					<div className="flex flex-1 items-center justify-center h-full">
						<img className="w-400" src="assets/images/errors/nofiles.png"></img>
					</div>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							{t('NO_FILES_MESSAGE')}
						</Typography>
					</div>
					<div className="flex flex-1 mt-20 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h6">
							{t('CREATE_FILE_ADVICE')}
						</Typography>
					</div>
				</div>
			)}
		</div>
	);
}

export default FileList;
