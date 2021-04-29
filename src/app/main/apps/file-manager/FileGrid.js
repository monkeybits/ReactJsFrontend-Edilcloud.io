/* =============================================================================
 TODO: FileGrid.js
 ===============================================================================
*This File is part of Company File manager
TODO: Grid is part of view we have 2 views grid and list
*/
import { Dialog, Button, Icon, IconButton, ListItem, ListItemIcon, ListItemText, MenuItem, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import FuseUtils from '@fuse/utils';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	PHOTO_DELETE,
	VIDEO_DELETE,
	DOCUMENT_DELETE,
	FOLDER_DELETE
} from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
const TippyMenu = loadable(() => import('app/TippyMenu'))
const FileGridItem = loadable(() => import('./FileGridItem'))

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		flexGrow: 1
	}
}))(MuiDialogContent);

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
	const { t } = useTranslation('filemanager');
	const dispatch = useDispatch();
	const folders = useSelector(({ fileManagerApp }) => fileManagerApp.files?.folders);
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files?.files);
	const rootFiles = useSelector(({ fileManagerApp }) => fileManagerApp.files?.rootFiles);
	const allFiles = useSelector(({ fileManagerApp }) => fileManagerApp.files?.allFiles);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const currentFolderPath = folderPath[folderPath.length - 1];
	const selectedItemId = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
	const [currentFolders, setCurrentFolders] = useState([]);
	const [currentFiles, setCurrentFiles] = useState([]);
	const [deleteConfirm, setDeleteConfirm] = useState(false);
	const [tile, setTile] = useState('');
	const classes = useStyles();
	const [, updateState] = React.useState();
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const classesListItems = useStylesList();
	const checkData = data => data || '-';
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
		console.log({ currentFolderPath, rootFiles });
		if (currentFolderPath == '' && Array.isArray(rootFiles)) {
			setCurrentFiles(rootFiles);
		} else if (Array.isArray(files)) {
			const tempFiles = files.filter(d => d.folder == currentFolderPath.id);
			setCurrentFiles(tempFiles);
		} else {
			setCurrentFiles([]);
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
	}, [files, folders, files.photos, files.videos, files.documents, rootFiles]);
	
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
			const results = getFilteredArray(allFiles, searchText);
			dispatch(Actions.setAllFiles(results));
		} else {
			setAllFilesInit();
		}
	}, [searchText]);

	const handleFolderDelete = () => {
		const findIndex = 0;
		const selectedItem = tile; // allFiles[findIndex];

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
				// if (fileType == 'folder') {
				// 	dispatch(Actions.deleteFile(selectedItem.id, fileType, selectedItem.path, selectedItem));
				// } else {
				// 	dispatch(Actions.deleteFile(selectedItem.id, fileType, mainId, selectedItem));
				// }
				// colseDeleteFileDialog();
			},
			err => console.log(err),
			METHOD.DELETE,
			getHeaderToken()
		);
		setDeleteConfirm(false)
	}

	const handleDelete = tile => {
		// e.stopPropagation();
		setDeleteConfirm(true)
		setTile(tile)
	};
	
	if (allFiles.length === 0 && searchText) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					{t('NO_FILES_MESSAGE')}
				</Typography>
			</div>
		);
	}

	return (
		<div className="file-folder-grid px-24 mt-12">
			{!!folders?.length && (
				<>
					{' '}
					<Typography variant="subtitle1" className="font-400 uppercase text-gray-600 mb-12">
						{t('FOLDERS')}
					</Typography>
					<Grid container spacing={12} className="folder-grid">
						{folders?.map(d => {
							return <Grid
								className="px-6 mb-20"
								item
								xs={12}
								sm={6}
								md={4}
								xl={3}
								onClick={() => {
									dispatch(Actions.setFolderPath(d, currentFiles))
								}}
							>
								<ListItem className={clsx(classesListItems.root, 'custom-box-shadow')}>
									<ListItemIcon>
										<FolderOutlinedIcon className="text-custom-primary" />
										{/* <FolderSharedOutlinedIcon className="text-custom-danger" /> */}
										{/* <FolderSpecialOutlinedIcon className="text-custom-warning" /> */}
									</ListItemIcon>
									<ListItemText primary={d.name} secondary={null} />
									{(getRole() == 'o' || getRole() == 'd') && (
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
													<Typography variant="inherit"> {t('DELETE')}</Typography>
												</MenuItem>
												<MenuItem
													onClick={e => {
														e.stopPropagation();
														dispatch(Actions.openRenameFileDialog(d));
													}}
												>
													<ListItemIcon>
														<Icon>edit</Icon>
													</ListItemIcon>
													<Typography variant="inherit"> {t('RENAME')}</Typography>
												</MenuItem>
												<MenuItem
													onClick={ev => {
														ev.preventDefault();
														ev.stopPropagation();
														dispatch(Actions.openMoveFileDialog(d));
													}}
												>
													<ListItemIcon>
														<Icon>transform</Icon>
													</ListItemIcon>
													<Typography variant="inherit"> {t('MOVE_TO')}</Typography>
												</MenuItem>
												{/* ))} */}
											</TippyMenu>
										</div>
									)}
								</ListItem>
							</Grid>
						}
						)}
					</Grid>
				</>
			)}
			{currentFiles && currentFiles.length > 0 &&
				<>
					<Typography variant="subtitle1" className="font-400 uppercase text-gray-600 mb-12">
						{t('FILES')}
					</Typography>
					<Grid container spacing={12} className="file-grid">
						<FileGridItem tileData={currentFiles} {...props} handleDelete={handleDelete} />
					</Grid>
				</>
			}
			{
				(currentFiles && currentFiles.length === 0 && folders && folders.length === 0) &&
				<div>
					<div className="flex flex-1 items-center justify-center h-full">
						<img className="w-400" src="assets/images/errors/nofiles.png" />
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
			}
			<Dialog
				open={deleteConfirm}
				// onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				maxWidth="xs"
				fullWidth="true"
			>
				<DialogTitle id="customized-dialog-title" onClose={() => {
					setDeleteConfirm(false)
				}}>Remove?</DialogTitle>
				<DialogContent dividers>
					<Typography className="text-lg">
						Are you sure that you want to delete this?
					</Typography>
					<div>
						<div className="flex mt-24 justify-end">
							<Button
								onClick={handleFolderDelete}
								variant="contained"
								className="justify-start d-inline-block mb-20 mr-10 bg-blue-500 text-white"
							>
								Yes
								{/* {loading && <CircularProgress size={20} color="secondary" />} */}
							</Button>
							<Button
								onClick={() => {
									setDeleteConfirm(false)
								}}
								variant="contained"
								className="justify-start d-inline-block mb-20 bg-gray-500 text-white"
							>
								No
								{/* {loading && <CircularProgress size={20} color="secondary" />} */}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
}

export default FileGrid;
