import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from './Breadcrumb';
import DetailSidebarContent from './DetailSidebarContent';
import DetailSidebarHeader from './DetailSidebarHeader';
import FileList from './FileList';
import MainSidebarContent from './MainSidebarContent';
import MainSidebarHeader from './MainSidebarHeader';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { makeStyles, Button, TextField, CircularProgress, LinearProgress } from '@material-ui/core';
import {
	ADD_PHOTO,
	ADD_FOLDER,
	ADD_VIDEO,
	ADD_DOCUMENT,
	MOVE_PHOTO_FILE,
	MOVE_VIDEO_FILE,
	MOVE_DOCUMENT_FILE
} from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken, decodeDataFromToken, getCompressFile } from 'app/services/serviceUtils';
import { withRouter } from 'react-router';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import LinearProgressWithLabel from './LinearProgressWithLabel';
import TransitionAlerts from './TransitionAlerts.js';
import FloatingButtonUpload from './FloatingButtonUpload';
import imageCompression from 'browser-image-compression';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import * as ContactActions from './store/actions';
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
function MoveFileDialog(props) {
	const dispatch = useDispatch();
	const moveFileDialog = useSelector(({ fileManagerApp }) => fileManagerApp.files.moveFileDialog);
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const currentFolderPath = files.folders?.filter(folder => folder.path == folderPath[folderPath.length - 1]);
	const [error, seterror] = useState({
		fileError: '',
		titleError: '',
		descError: '',
		nameError: '',
		apiError: ''
	});
	const [path, setPath] = useState('');
	const [filePath, setFilePath] = useState('');
	const [title, setTitle] = useState(undefined);
	const [description, setDescription] = useState(undefined);
	const initDialog = useCallback(() => {
		console.log({
			moveFileDialog
		});
	}, [moveFileDialog.data, moveFileDialog.type]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
	}, [moveFileDialog.props.open]);

	function handleClose() {
		dispatch(Actions.closeMoveFileDialog());
	}

	function canBeSubmitted() {}

	const handleMoveFile = event => {
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

	function handleRemove() {}
	const resetError = () =>
		seterror({
			fileError: '',
			titleError: '',
			descError: '',
			nameError: ''
		});
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true
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
							renderOption={(option, { selected }) => <>{option.path}</>}
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
