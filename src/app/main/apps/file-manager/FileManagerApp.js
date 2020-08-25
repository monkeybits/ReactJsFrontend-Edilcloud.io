import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
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
import { ADD_PHOTO, ADD_FOLDER, ADD_VIDEO, ADD_DOCUMENT } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
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

function FileManagerApp(props) {
	//filesfolderPath
	const dispatch = useDispatch();
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
	const isUploadingFiles = useSelector(({ fileManagerApp }) => fileManagerApp.files.isUploadingFiles);
	const company = useSelector(({ chatApp }) => chatApp.company);
	const selectedItem = useSelector(({ fileManagerApp }) => files[fileManagerApp.selectedItemId]);
	const pageLayout = useRef(null);
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [fileData, setFile] = useState({
		file: null,
		fileType: null
	});
	const [radioBtnValue, setRadioBtnValue] = useState('folder');
	const [progress, setProgress] = React.useState(0);
	const [path, setPath] = useState('');
	const [filePath, setFilePath] = useState('');
	const [folderName, setFolderName] = useState(undefined);
	const [title, setTitle] = useState(undefined);
	const [description, setDescription] = useState(undefined);
	const [open, setOpen] = React.useState(false);
	const currentFolderPath = files.folders?.filter(folder => folder.path == folderPath[folderPath.length - 1]);

	const [error, seterror] = useState({
		fileError: '',
		titleError: '',
		descError: '',
		nameError: '',
		apiError: ''
	});
	const resetError = () =>
		seterror({
			fileError: '',
			titleError: '',
			descError: '',
			nameError: ''
		});
	useEffect(() => {
		if (company.can_access_files) {
			const userInfo = decodeDataFromToken();
			const cid = userInfo.extra?.profile?.company;
			dispatch(Actions.getFiles(cid));
		} else {
			props.history.push('/apps/todo/all');
		}
	}, [dispatch]);
	const addFile = event => {
		resetError();
		var files = event.target.files;
		for (var i = 0; i < files.length; i++) {
			let fileType = files[i].type?.split('/')[0];
			setFile({
				file: files[i],
				fileType
			});
		}
	};
	const handleUpload = () => {
		if (isUploading == false) {
			setIsUploading(true);
			setProgress(0);
			dispatch(Actions.onUploadHandleLoading(true));
			const { fileType, file } = fileData;
			if (!fileType && radioBtnValue == 'file') return;

			let formData = new FormData();
			let datakey = fileType == 'image' ? 'photo' : fileType == 'video' ? 'video' : 'document';
			let values =
				radioBtnValue == 'folder'
					? {
							name: title,
							path: files.folders && !!files.folders.length ? path : ''
					  }
					: { [datakey]: file, title, description, additional_path: filePath ? filePath : '' };
			for (let key in values) {
				formData.append(key, values[key]);
			}
			let apiUrl =
				radioBtnValue == 'folder'
					? ADD_FOLDER(company.id)
					: fileType == 'image'
					? ADD_PHOTO(company.id)
					: fileType == 'video'
					? ADD_VIDEO(company.id)
					: ADD_DOCUMENT(company.id);
			apiCall(
				apiUrl,
				formData,
				res => {
					const userInfo = decodeDataFromToken();
					const cid = userInfo.extra?.profile?.company;
					if (radioBtnValue == 'folder') {
						dispatch(Actions.getFolders(cid));
					} else {
						if (fileType == 'image') {
							dispatch(Actions.getPhotos(cid));
						} else if (fileType == 'video') {
							dispatch(Actions.getVideos(cid));
						} else {
							dispatch(Actions.getDocuments(cid));
						}
					}
				},
				err => {
					seterror({
						fileError: err.document ? err.document[0] : '',
						titleError: err.title ? err.title[0] : '',
						descError: err.description ? err.description[0] : '',
						nameError: err.name ? err.name[0] : '',
						apiError: err.detail ? err.detail : ''
					});
					dispatch(Actions.onUploadHandleLoading(false));
					setProgress(0);
				},
				METHOD.POST,
				{
					...getHeaderToken(),
					onUploadProgress: function (progressEvent) {
						var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setProgress(percentCompleted);
					}
				}
			);
			setIsOpenDrawer(false);
			setIsUploading(false);
			setTitle('');
		}
	};
	const handleClose = () => {
		setIsOpenDrawer(false);
	};
	const handleRadioChange = event => {
		setRadioBtnValue(event.target.value);
	};
	return (
		<>
			<FusePageSimple
				classes={{
					root: 'bg-red fileInfoSidebar',
					header: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
					sidebarHeader: 'h-96 min-h-96 sm:h-160 sm:min-h-160',
					rightSidebar: 'w-320'
				}}
				header={
					<div className="flex flex-col flex-1 p-8 sm:p-12 relative">
						<div className="flex items-center justify-between">
							<IconButton
								onClick={() => {
									pageLayout.current.toggleLeftSidebar();
								}}
								aria-label="open left sidebar"
							>
								<Icon>menu</Icon>
							</IconButton>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Paper className="flex p-4 items-center w-full max-w-512 h-48 px-8 py-4" elevation={1}>
									<Icon color="action">search</Icon>

									<Input
										placeholder="Search for anything"
										className="flex flex-1 px-16"
										disableUnderline
										fullWidth
										value={searchText}
										inputProps={{
											'aria-label': 'Search'
										}}
										onChange={ev => dispatch(Actions.setSearchText(ev))}
									/>
								</Paper>
							</FuseAnimate>
						</div>
						<TransitionAlerts open={open} setOpen={setOpen} text={error.apiError} />
						<div className="flex flex-1 items-end">
							<FuseAnimate animation="transition.expandIn" delay={600}>
								<Fab
									onClick={() => setIsOpenDrawer(true)}
									color="secondary"
									aria-label="add"
									className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
								>
									<Icon>add</Icon>
								</Fab>
							</FuseAnimate>
							<FuseAnimate delay={200}>
								<div>
									{folderPath && (
										<Breadcrumb
											selected={folderPath}
											className="flex flex-1 ltr:pl-72 rtl:pr-72 pb-12 text-16 sm:text-24"
										/>
									)}
								</div>
							</FuseAnimate>
						</div>
						{isUploadingFiles && <LinearProgressWithLabel progress={progress} />}
					</div>
				}
				content={<FileList pageLayout={pageLayout} />}
				leftSidebarVariant="temporary"
				leftSidebarHeader={<MainSidebarHeader />}
				leftSidebarContent={<MainSidebarContent />}
				rightSidebarHeader={<DetailSidebarHeader setProgress={setProgress} />}
				rightSidebarContent={<DetailSidebarContent />}
				ref={pageLayout}
				innerScroll
			/>
			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={isOpenDrawer}
				maxWidth="xs"
				fullWidth="true"
			>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Upload File
				</DialogTitle>
				<DialogContent dividers>
					<div>
						<FormControl component="fieldset">
							<RadioGroup
								row
								aria-label="position"
								name="position"
								defaultValue="folder"
								value={radioBtnValue}
								onChange={handleRadioChange}
							>
								<FormControlLabel value="folder" control={<Radio color="secondary" />} label="Folder" />
								<FormControlLabel value="file" control={<Radio color="secondary" />} label="File" />
							</RadioGroup>
						</FormControl>
					</div>

					{radioBtnValue == 'folder' ? (
						<>
							<div>
								<TextField
									error={!!error.nameError}
									name="folder"
									id="folder"
									label="Folder"
									className="mt-8 mb-16 w-full"
									value={title}
									onChange={({ target: { value } }) => {
										resetError();
										setTitle(value);
									}}
									helperText={error.nameError}
								/>
							</div>
							{files.folders && !!files.folders.length && (
								<div>
									<Autocomplete
										options={files.folders}
										style={{ width: '100%' }}
										className="mb-24"
										getOptionLabel={option => option.path}
										renderOption={(option, { selected }) => <>{option.path}</>}
										renderInput={params => <TextField {...params} label="Path" />}
										onInputChange={(e, value) => setPath(value)}
										defaultValue={
											files.folders && !!files.folders.length ? currentFolderPath?.[0] : ''
										}
									/>
								</div>
							)}
						</>
					) : (
						<>
							<div>
								<TextField
									error={!!error.titleError}
									name="title"
									id="title"
									label="Title"
									className="mt-8 mb-16 w-full"
									value={title}
									onChange={({ target: { value } }) => {
										resetError();
										setTitle(value);
									}}
									helperText={error.titleError}
								/>
							</div>
							<div>
								<TextField
									error={!!error.descError}
									name="desc"
									label="Description"
									className="mt-8 mb-16 w-full"
									multiline
									rows={4}
									onChange={({ target: { value } }) => {
										resetError();
										setDescription(value);
									}}
									helperText={error.descError}
								/>
							</div>
							<div>
								<TextField
									error={!!error.fileError}
									type="file"
									className="mt-8 mb-16 w-full"
									onChange={addFile}
									helperText={error.fileError}
								/>
							</div>
							{files.folders && !!files.folders.length && (
								<div>
									<Autocomplete
										options={files.folders}
										style={{ width: '100%' }}
										className="mb-24"
										getOptionLabel={option => option.path}
										renderOption={(option, { selected }) => <>{option.path}</>}
										renderInput={params => <TextField {...params} label="Path" />}
										onInputChange={(e, value) => setFilePath(value)}
										defaultValue={currentFolderPath?.[0]}
									/>
								</div>
							)}
						</>
					)}
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleUpload} variant="contained" color="secondary">
						{radioBtnValue == 'folder' ? 'Create' : 'Upload'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default withRouter(withReducer('fileManagerApp', reducer)(FileManagerApp));
