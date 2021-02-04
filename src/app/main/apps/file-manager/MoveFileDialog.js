import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { Button, TextField } from '@material-ui/core';
import {
	MOVE_PHOTO_FILE,
	MOVE_VIDEO_FILE,
	MOVE_DOCUMENT_FILE,
	PHOTO_EDIT,
	VIDEO_EDIT,
	DOCUMENT_EDIT,
	FOLDER_EDIT
} from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { useTranslation } from 'react-i18next';

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	},
	rightSidebar: {
		'&.fileInfoSidebar': {
			backgroundColor: '#fff'
		}
	}
}))(MuiDialogActions);
function MoveFileDialog() {
	const { t } = useTranslation('filemanager');
	const dispatch = useDispatch();
	const allFolderPaths = useSelector(({ fileManagerApp }) => fileManagerApp.files.allFolderPaths);
	const moveFileDialog = useSelector(({ fileManagerApp }) => fileManagerApp.files.moveFileDialog);
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const currentFolderPath = ''; //files.folders?.filter(folder => folder.path == folderPath[folderPath.length - 1]);
	const [title, setTitle] = useState(undefined);
	const allFiles = useSelector(({ fileManagerApp }) => fileManagerApp.files?.allFiles);
	const [error, seterror] = useState({
		fileError: '',
		titleError: '',
		descError: '',
		nameError: '',
		apiError: ''
	});
	const [path, setPath] = useState({});

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
	}, [moveFileDialog.props.open]);
	useEffect(() => {
		if (moveFileDialog.data.name || moveFileDialog.data.title) {
			setTitle(moveFileDialog.data.name || moveFileDialog.data.title);
		}
	}, [moveFileDialog.data]);
	function handleClose() {
		dispatch(Actions.closeMoveFileDialog());
	}

	const handleMoveFile = () => {
		let fileType = moveFileDialog.data.type;
		let fileId = moveFileDialog.data.mainId;
		let relative_path = moveFileDialog.data.folder_relative_path;
		let apiUrl =
			fileType == 'folder'
				? FOLDER_EDIT(fileId)
				: fileType == 'photo'
				? PHOTO_EDIT(fileId)
				: fileType == 'video'
				? VIDEO_EDIT(fileId)
				: DOCUMENT_EDIT(fileId);
		let values = {
			from: relative_path,
			to: path
		};
		if (moveFileDialog.type === 'rename') {
			if (fileType == 'folder') {
				values = {
					name: title,
					parent: moveFileDialog.data.parent
				};
			} else {
				values = {
					title
				};
			}
		} else {
			if (fileType == 'folder') {
				values = {
					name: title,
					parent: path.id ? path.id : null
				};
			} else {
				values = {
					title,
					folder: path.id ? path.id : null
				};
			}
		}
		// var formData = new FormData();
		// for (let key in values) {
		// 	formData.append(key, values[key]);
		// }
		apiCall(
			apiUrl,
			values,
			res => {
				const userInfo = decodeDataFromToken();
				const cid = userInfo.extra?.profile?.company;
				if (fileType == 'folder') {
					dispatch(Actions.foldersPaths(cid));
				}
				// if (fileType == 'folder') {
				console.log({ folderPath11: folderPath });
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
				handleClose();
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
	const resetError = () =>
		seterror({
			fileError: '',
			titleError: '',
			descError: '',
			nameError: ''
		});
	const { relative_path } = moveFileDialog.data;
	return (
		<Dialog
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={moveFileDialog.props.open}
			maxWidth="xs"
			fullWidth="true"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar>
					<div className="absolute right-0">
						<IconButton onClick={handleClose} edge="start" color="inherit" aria-label="close">
							<CloseIcon />
						</IconButton>
					</div>
					<Typography variant="subtitle1" color="inherit">
						{moveFileDialog.type === 'rename' ? t('RENAME') : t('MOVE_FILE')}
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent dividers>
				<div>
					{moveFileDialog.type === 'rename' ? (
						<TextField
							error={!!error.titleError}
							name="title"
							id="title"
							label={t('TITLE')}
							className="mt-8 mb-16 w-full"
							value={title}
							onChange={({ target: { value } }) => {
								resetError();
								if (allFiles.find(v => v.title == value)) {
									seterror(prev => ({
										...prev,
										titleError: 'should have unique name !'
									}));
								}
								setTitle(value);
							}}
							variant="outlined"
							helperText={error.titleError}
						/>
					) : (
						<TextField
							id="folder"
							className="mt-8 mb-16 w-full"
							value={title}
							disabled
							variant="outlined"
						/>
					)}
				</div>
				{moveFileDialog.type !== 'rename' && allFolderPaths && !!allFolderPaths.length && (
					<div>
						<Autocomplete
							options={allFolderPaths}
							style={{ width: '100%' }}
							className="mb-24"
							getOptionLabel={option => option.path}
							renderOption={(option, { selected }) => <>{option.path}</>}
							renderInput={params => <TextField {...params} label={t('PATH')} />}
							onChange={(e, value) => setPath(value)}
							variant="outlined"
						/>
					</div>
				)}
			</DialogContent>
			<DialogActions className="p-16">
				<Button autoFocus onClick={handleMoveFile} variant="contained" color="secondary">
					{moveFileDialog.type === 'rename' ? t('RENAME') : t('MOVE')}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default MoveFileDialog;
