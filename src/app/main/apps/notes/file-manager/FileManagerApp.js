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
import FileGrid from './FileGrid';
import MainSidebarContent from './MainSidebarContent';
import MainSidebarHeader from './MainSidebarHeader';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { makeStyles, Button, TextField, CircularProgress, LinearProgress } from '@material-ui/core';
import {
	ADD_PHOTO_PROJECT,
	ADD_FOLDER_PROJECT,
	ADD_VIDEO_PROJECT,
	ADD_DOCUMENT_PROJECT
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
import MoveFileDialog from './MoveFileDialog';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@material-ui/lab/Pagination';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

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
	const files = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files);
	const folderPath = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.folderPath);
	const searchText = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.searchText);
	const isUploadingFiles = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.isUploadingFiles);
	const company = useSelector(({ chatApp }) => chatApp.company);
	const selectedItem = useSelector(({ fileManagerAppProject }) => files[fileManagerAppProject.selectedItemId]);
	const pageLayout = useRef(null);
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [fileData, setFile] = useState({
		file: null,
		fileType: null
	});
	const [viewTable, setViewTable] = useState(false);

	const [radioBtnValue, setRadioBtnValue] = useState('folder');
	const [progress, setProgress] = React.useState(0);
	const [path, setPath] = useState('');
	const [filePath, setFilePath] = useState('');
	const [title, setTitle] = useState(undefined);
	const [description, setDescription] = useState(undefined);
	const [open, setOpen] = React.useState(false);
	const currentFolderPath = files.folders?.filter(folder => folder.path == folderPath[folderPath.length - 1]);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const routeParams = useParams();
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
		if (routeParams) {
			dispatch(Actions.getFiles(routeParams.id));
		}
	}, [dispatch, routeParams]);
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
	const resetOpenForm = () => {
		setFile({
			file: null,
			fileType: null
		});
		setTitle(undefined);
		setFilePath('');
		setDescription(undefined);
		seterror({
			fileError: '',
			titleError: '',
			descError: '',
			nameError: ''
		});
	};
	const handleUpload = async () => {
		if (isUploading == false) {
			setIsUploading(true);
			setProgress(0);
			dispatch(Actions.onUploadHandleLoading(true));

			const { fileType, file } = fileData;

			if (!fileType && radioBtnValue == 'file') return;
			handleClose();
			let formData = new FormData();
			let datakey = fileType == 'image' ? 'photo' : fileType == 'video' ? 'video' : 'document';
			let values =
				radioBtnValue == 'folder'
					? {
							name: title,
							path: files.folders && !!files.folders.length ? path : ''
					  }
					: {
							[datakey]: fileType == 'image' ? await getCompressFile(file) : file,
							title,
							description,
							additional_path: filePath ? filePath : ''
					  };
			for (let key in values) {
				formData.append(key, values[key]);
			}
			let apiUrl =
				radioBtnValue == 'folder'
					? ADD_FOLDER_PROJECT(routeParams.id)
					: fileType == 'image'
					? ADD_PHOTO_PROJECT(routeParams.id)
					: fileType == 'video'
					? ADD_VIDEO_PROJECT(routeParams.id)
					: ADD_DOCUMENT_PROJECT(routeParams.id);
			apiCall(
				apiUrl,
				formData,
				res => {
					if (radioBtnValue == 'folder') {
						dispatch(Actions.getFolders(routeParams.id));
					} else {
						if (fileType == 'image') {
							dispatch(Actions.getPhotos(routeParams.id));
						} else if (fileType == 'video') {
							dispatch(Actions.getVideos(routeParams.id));
						} else {
							dispatch(Actions.getDocuments(routeParams.id));
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

			setIsUploading(false);
			setTitle('');
		}
	};
	const handleClose = () => {
		resetOpenForm();
		setIsOpenDrawer(false);
	};
	const handleRadioChange = event => {
		setRadioBtnValue(event.target.value);
	};
	const canSubmit = () => (radioBtnValue == 'folder' ? title?.length : title?.length && fileData.file);
	return (
		<>
			<FusePageSimple
				classes={{
					root: 'fileInfoSidebar',
					header: 'p-24 pb-0 bg-body h-auto min-h-auto block',
					sidebarHeader: '',
					rightSidebar: 'w-320'
				}}
				header={
					<>
						{/* <div className="flex w-full justify-between items-center">
							<div className="mr-20">
								<Typography variant="h5" className="mb-4">
									File
								</Typography>
								<FuseAnimate animation="transition.slideLeftIn" delay={300}>
									<Typography variant="subtitle1" className="font-weight-700 mb-4">
										{projectDetail.name}
									</Typography>
								</FuseAnimate>
								<Typography variant="subtitle1" className="text-14 font-weight-600 text-muted">
									Nuernbergerstrasse 45, Elsfleth, Niedersachsen, 26931
								</Typography>
							</div>
							<Button className="badge-btn" color="secondary">
								Open Details
							</Button>
						</div> */}

						<div className="flex flex-col flex-1 relative z-50 mt-10">
							<div className="flex items-center justify-between left-icon-btn">
								<FuseAnimate delay={200}>
									<div>
										{folderPath && (
											<Breadcrumb
												selected={folderPath}
												className="flex flex-1 flex-wrap filemanager-breadcumb font-700 text-24 text-default mt-6"
											/>
										)}
									</div>
								</FuseAnimate>
								{/* <IconButton
								onClick={() => {
									pageLayout.current.toggleLeftSidebar();
								}}
								aria-label="open left sidebar"
							>
								<Icon>menu</Icon>
							</IconButton> */}
								{/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Paper className="flex p-4 items-center w-full h-40 px-8 py-4 bg-white search-white-box" elevation={1}>
									<Icon className="text-20" color="action">search</Icon>

									<Input
										placeholder="Search for anything"
										className="flex flex-1 px-12"
										disableUnderline
										fullWidth
										value={searchText}
										inputProps={{
											'aria-label': 'Search'
										}}
										onChange={ev => dispatch(Actions.setSearchText(ev))}
									/>
								</Paper>
							</FuseAnimate> */}
								<div className="flex two-btn rounded h-40 ml-10">
									<IconButton
										onClick={() => setViewTable(false)}
										className={!viewTable ? 'text-default' : ''}
									>
										<FontAwesomeIcon icon={faTh} />
									</IconButton>
									<IconButton onClick={() => setViewTable(true)}>
										<FontAwesomeIcon icon={faList} className={viewTable ? 'text-default' : ''} />
									</IconButton>
								</div>
							</div>
							<TransitionAlerts open={open} setOpen={setOpen} text={error.apiError} />
							{/* <div className="flex flex-1 items-end"> */}
							{/* <FuseAnimate animation="transition.expandIn" delay={600}>
								<Fab
									onClick={() => setIsOpenDrawer(true)}
									color="secondary"
									aria-label="add"
									className="absolute bottom-0 ltr:left-0 rtl:right-0 mx-16 -mb-28 z-999"
								>
									<Icon>add</Icon>
								</Fab>
							</FuseAnimate> */}

							{/* </div> */}
							{isUploadingFiles && (
								<div className="linear-progress custom-color">
									<LinearProgressWithLabel progress={progress} />
								</div>
							)}
						</div>
					</>
				}
				content={
					<div>{viewTable ? <FileList pageLayout={pageLayout} /> : <FileGrid pageLayout={pageLayout} />}</div>
				}
				leftSidebarVariant="temporary"
				leftSidebarHeader={<MainSidebarHeader />}
				leftSidebarContent={<MainSidebarContent />}
				rightSidebarHeader={<DetailSidebarHeader pageLayout={pageLayout} setProgress={setProgress} />}
				rightSidebarContent={<DetailSidebarContent setProgress={setProgress} />}
				ref={pageLayout}
				innerScroll
			/>
			<FuseAnimate animation="transition.expandIn" delay={600}>
				<FloatingButtonUpload
					color="secondary"
					className=" ltr:left-0 rtl:right-0 mx-16 z-999"
					callAction={name => {
						setIsOpenDrawer(true);
						return name == 'Folder' ? setRadioBtnValue('folder') : setRadioBtnValue('file');
					}}
				/>
			</FuseAnimate>
			<MoveFileDialog />

			<Dialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={isOpenDrawer}
				maxWidth="xs"
				fullWidth="true"
			>
				{/* <DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Upload File
				</DialogTitle> */}
				<AppBar position="static" className="border-0" elevation={1}>
					<Toolbar>
						<div className="absolute right-0">
							<IconButton onClick={handleClose} edge="start" color="inherit" aria-label="close">
								<CloseIcon />
							</IconButton>
						</div>
						<Typography variant="subtitle1" color="inherit">
							Upload File
						</Typography>
					</Toolbar>
				</AppBar>
				<DialogContent dividers>
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
									variant="outlined"
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
										variant="outlined"
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
									variant="outlined"
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
									variant="outlined"
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
									className="mt-8 mb-16 w-full custom-fileinput"
									onChange={addFile}
									variant="outlined"
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
										variant="outlined"
									/>
								</div>
							)}
						</>
					)}
				</DialogContent>
				<DialogActions className="p-16">
					<Button
						autoFocus
						disabled={!canSubmit()}
						onClick={handleUpload}
						variant="contained"
						color="secondary"
					>
						{radioBtnValue == 'folder' ? 'Create' : 'Upload'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default withRouter(withReducer('fileManagerAppProject', reducer)(FileManagerApp));
