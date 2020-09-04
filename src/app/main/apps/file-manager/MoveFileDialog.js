import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { Button, TextField } from '@material-ui/core';
import { MOVE_PHOTO_FILE, MOVE_VIDEO_FILE, MOVE_DOCUMENT_FILE } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';

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
	const dispatch = useDispatch();
	const moveFileDialog = useSelector(({ fileManagerApp }) => fileManagerApp.files.moveFileDialog);
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const currentFolderPath = files.folders?.filter(folder => folder.path == folderPath[folderPath.length - 1]);
	const [error] = useState({
		fileError: '',
		titleError: '',
		descError: '',
		nameError: '',
		apiError: ''
	});
	const [path, setPath] = useState('');

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
	}, [moveFileDialog.props.open]);

	function handleClose() {
		dispatch(Actions.closeMoveFileDialog());
	}

	const handleMoveFile = () => {
		let fileType = moveFileDialog.data.type;
		let fileId = moveFileDialog.data.id;
		let relative_path = moveFileDialog.data.relative_path;
		let apiUrl =
			fileType == 'photo'
				? MOVE_PHOTO_FILE(fileId)
				: fileType == 'video'
				? MOVE_VIDEO_FILE(fileId)
				: MOVE_DOCUMENT_FILE(fileId);
		apiCall(
			apiUrl,
			{
				from: relative_path,
				to: path
			},
			res => console.log(res),
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};

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
						Move File
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent dividers>
				<div>
					<TextField
						error={!!error.nameError}
						id="folder"
						className="mt-8 mb-16 w-full"
						value={relative_path}
						disabled
						helperText={error.nameError}
						variant="outlined"
					/>
				</div>
				{files.folders && !!files.folders.length && (
					<div>
						<Autocomplete
							options={files.folders.filter(f => f.path != currentFolderPath?.[0]?.path)}
							style={{ width: '100%' }}
							className="mb-24"
							getOptionLabel={option => option.path}
							renderOption={option => <>{option.path}</>}
							renderInput={params => <TextField {...params} label="Path" />}
							onInputChange={(e, value) => setPath(value)}
							variant="outlined"
						/>
					</div>
				)}
			</DialogContent>
			<DialogActions className="p-16">
				<Button autoFocus onClick={handleMoveFile} variant="contained" color="secondary">
					Move
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default MoveFileDialog;
