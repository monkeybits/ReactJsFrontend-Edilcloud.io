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
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import moment from 'moment';
import FuseUtils from '@fuse/utils';
import { Grid, Typography } from '@material-ui/core';
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
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import FileGridItem from './FileGridItem';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import FolderSharedOutlinedIcon from '@material-ui/icons/FolderSharedOutlined';
import FolderSpecialOutlinedIcon from '@material-ui/icons/FolderSpecialOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
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
import TippyMenu from 'app/TippyMenu';
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
const useStylesList = makeStyles(theme => ({
	root: {
		borderRadius: '5%',
		backgroundColor: '#fff',
		boxShadow: '0 3px 6px #00000029'
	}
}));
function FileGrid(props) {
	const dispatch = useDispatch();
	const folders = useSelector(({ fileManagerApp }) => fileManagerApp.files?.folders);
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files?.files);
	const allFiles = useSelector(({ fileManagerApp }) => fileManagerApp.files?.allFiles);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const currentFolderPath = folderPath[folderPath.length - 1];
	const selectedItemId = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
	const [currentFolders, setCurrentFolders] = useState([]);
	const [currentFiles, setCurrentFiles] = useState([]);
	const classes = useStyles();
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const classesListItems = useStylesList();
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
		let modifyfolders = folders?.filter(
			f =>
				f.path.includes(currentFolderPath) &&
				f.path.split('/').length <= folderPath.length &&
				!folderPath.includes(f.path)
		);
		if (modifyfolders) {
			modifyfolders = modifyfolders.map(item => {
				let title = item.path.split('/');
				title = title[title.length - 1];
				return { ...item, title, type: 'folder' };
			});
			setCurrentFolders(modifyfolders);
			let tempFiles = files.filter(f => f.folder_relative_path == currentFolderPath);
			setCurrentFiles(tempFiles);
			dispatch(Actions.setAllFiles([...modifyfolders, ...tempFiles]));
		}
	};
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = event => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(null);
	};
	useEffect(() => {
		setAllFilesInit();
	}, [files, folders, files.photos, files.videos, files.documents]);
	useEffect(() => {
		dispatch(Actions.setSelectedItem(''));
		setAllFilesInit();
	}, [currentFolderPath]);
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
		let modifyfolders = folders?.filter(
			f =>
				f.path.includes(currentFolderPath) &&
				f.path.split('/').length <= folderPath.length &&
				!folderPath.includes(f.path)
		);
		if (modifyfolders) {
			modifyfolders = modifyfolders.map(item => {
				let title = item.path.split('/');
				title = title[title.length - 1];
				return { ...item, title, type: 'folder' };
			});
			dispatch(
				Actions.setAllFiles([
					...modifyfolders,
					...files.filter(f => f.folder_relative_path == currentFolderPath)
				])
			);
		}
	}, [currentFolderPath]);
	const handleDelete = tile => {
		// e.stopPropagation();
		let findIndex = 0;
		if (tile.type == 'folder') {
			findIndex = [...allFiles].findIndex(element => element.path == tile.path);
		} else {
			findIndex = [...allFiles].findIndex(element => element.mainId == tile.mainId && element.type == tile.type);
		}
		let selectedItem = allFiles[findIndex];
		console.log({
			selectedItem,
			tile,
			allFiles
		});
		const userInfo = decodeDataFromToken();
		const cid = userInfo.extra?.profile?.company;
		const fileType = selectedItem.type;
		const mainId = selectedItem.mainId;
		const url =
			fileType == 'folder'
				? FOLDER_DELETE(cid, selectedItem.path)
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
				// colseDeleteFileDialog();
			},
			err => console.log(err),
			METHOD.DELETE,
			getHeaderToken()
		);
	};
	if (allFiles.length === 0 && searchText) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no file
				</Typography>
			</div>
		);
	}
	return (
		<div className="file-folder-grid px-24 mt-12">
			{!!currentFolders.length && (
				<>
					{' '}
					<Typography variant="subtitle1" className="font-400 uppercase text-gray-600 mb-12">
						Folders
					</Typography>
					<Grid container spacing={12} className="folder-grid">
						{currentFolders.map(d => (
							<Grid
								className="px-6 mb-20"
								item
								xs={12}
								sm={6}
								md={4}
								xl={3}
								onClick={() => dispatch(Actions.setFolderPath(d.path))}
							>
								<ListItem className={clsx(classesListItems.root, 'custom-box-shadow')}>
									<ListItemIcon>
										<FolderOutlinedIcon className="text-custom-primary" />
										{/* <FolderSharedOutlinedIcon className="text-custom-danger" /> */}
										{/* <FolderSpecialOutlinedIcon className="text-custom-warning" /> */}
									</ListItemIcon>
									<ListItemText primary={d.title} secondary={null} />
									<div className="actions-dropdown file-folder-action-dropdown">
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
											outsideClick
										>
											{/* {options.map(option => ( */}
											<MenuItem
												onClick={e => {
													e.stopPropagation();
													handleDelete(d);
												}}
											>
												<ListItemIcon>
													<Icon>delete</Icon>
												</ListItemIcon>
												<Typography variant="inherit"> Delete</Typography>
											</MenuItem>
											{/* ))} */}
										</TippyMenu>
									</div>
								</ListItem>
							</Grid>
						))}
					</Grid>
				</>
			)}
			{!!currentFiles.length && (
				<>
					<Typography variant="subtitle1" className="font-400 uppercase text-gray-600 mb-12">
						Files
					</Typography>
					<Grid container spacing={12} className="file-grid">
						<FileGridItem tileData={currentFiles} {...props} handleDelete={handleDelete} />
					</Grid>
				</>
			)}
			{console.log({ currentFolderPath, files: files?.length })}
			{currentFolderPath == '' && !files?.length && !currentFolders.length && (
				<div>
					<div className="flex flex-1 items-center justify-center h-full">
						<img className="w-400" src="assets/images/errors/nofiles.png"></img>
					</div>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							Seems that there are no files yet!
						</Typography>
					</div>
					<div className="flex flex-1 mt-20 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h6">
							Create a file or a folder clicking on green + button
						</Typography>
					</div>
				</div>
			)}
		</div>
	);
}

export default FileGrid;
