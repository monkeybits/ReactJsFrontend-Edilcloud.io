import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import imageCompression from 'browser-image-compression';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import Pagination from '@material-ui/lab/Pagination';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import { useTranslation } from 'react-i18next';
import MoveFileDialog from './MoveFileDialog';
import FloatingButtonUpload from './FloatingButtonUpload';
import TransitionAlerts from './TransitionAlerts.js';
import LinearProgressWithLabel from './LinearProgressWithLabel';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import MainSidebarHeader from './MainSidebarHeader';
import MainSidebarContent from './MainSidebarContent';
import FileGrid from './FileGrid';
import FileList from './FileList';
import DetailSidebarHeader from './DetailSidebarHeader';
import DetailSidebarContent from './DetailSidebarContent';
import Breadcrumb from './Breadcrumb';

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
	// filesfolderPath
	const { t } = useTranslation('filemanaer_project');
	const dispatch = useDispatch();
	const allFolderPaths = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.allFolderPaths);
	const files = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files);
	const folderPath = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.folderPath);
	const searchText = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.searchText);
	const isUploadingFiles = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.isUploadingFiles);
	const company = useSelector(({ chatApp }) => chatApp.company);
	const allFiles = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.allFiles);
	const selectedItem = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.selectedItemId);
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
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const [error, seterror] = useState({
		fileError: '',
		titleError: '',
		descError: '',
		nameError: '',
		apiError: ''
	});
	const [loading, setLoading] = useState({
		loadingPhotos: false,
		loadingVideos: false,
		loadingDocuments: false,
		loadingFolders: false
	});
	const handleSetLoading = data =>
		setLoading(loading => ({
			...loading,
			...data
		}));
	const resetError = () =>
		seterror({
			fileError: '',
			titleError: '',
			descError: '',
			nameError: ''
		});
	useEffect(() => {
		setFilePath(folderPath[folderPath.length - 1]);
		setPath(folderPath[folderPath.length - 1]);
	}, [folderPath, isOpenDrawer]);
	useEffect(() => {
		if (routeParams) {
			dispatch(Actions.getFiles(routeParams.id, handleSetLoading));
		}
	}, [dispatch, routeParams]);
	const addFile = event => {
		resetError();
		const { files } = event.target;
		for (let i = 0; i < files.length; i++) {
			console.log(files[i]);
			if (!title) {
				const fileName = files[i].name.split('.');
				fileName.pop();
				setTitle(fileName.join(' '));
			}
			const fileType = files[i].type?.split('/')[0];
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
			const datakey = fileType == 'image' ? 'photo' : fileType == 'video' ? 'video' : 'document';
			const values =
				radioBtnValue == 'folder'
					? {
							name: title,
							parent: path?.id ? path.id : null,
							is_public: false
					  }
					: {
							[datakey]: fileType == 'image' ? await getCompressFile(file) : file,
							title,
							description,
							folder: filePath ? filePath.mainId || filePath.id : null
					  };
			if (radioBtnValue == 'folder') {
				formData = values;
			} else {
				for (const key in values) {
					if (values[key]) formData.append(key, values[key]);
				}
			}
			const apiUrl =
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
					const userInfo = decodeDataFromToken();
					const cid = userInfo.extra?.profile?.company;
					if (radioBtnValue == 'folder') {
						dispatch(Actions.foldersPaths(routeParams.id, handleSetLoading));
					}
					if (folderPath.length > 1) {
						dispatch(Actions.folderDetail(cid, handleSetLoading));
					} else if (radioBtnValue != 'folder') {
						if (fileType == 'image') {
							dispatch(Actions.getPhotos(routeParams.id, handleSetLoading));
						} else if (fileType == 'video') {
							dispatch(Actions.getVideos(routeParams.id, handleSetLoading));
						} else {
							dispatch(Actions.getDocuments(routeParams.id, handleSetLoading));
						}
					}
					dispatch(Actions.getFolders(routeParams.id, handleSetLoading));
					dispatch(Actions.onUploadHandleLoading(false));
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
					onUploadProgress(progressEvent) {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
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
	const isLoadingFiles = () =>
		loading.loadingVideos || loading.loadingPhotos || loading.loadingFolders || loading.loadingDocuments;
	const loadingComponent = (
		<div className="flex flex-1 flex-col items-center justify-center h-full">
			<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
				{t('LOADING_FILES')}...
			</Typography>
			<LinearProgress className="w-xs" color="secondary" />
		</div>
	);
	if (isLoadingFiles()) return loadingComponent;
	return (
		<>
			<FusePageSimple
				classes={{
					root: selectedItem?.title ? 'fileInfoSidebar' : 'bg-red fileInfoSidebar hide-sidebar',
					header: 'p-24 pb-0 bg-white h-auto min-h-auto block',
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
					viewTable ? (
						<FileList viewTable={viewTable} pageLayout={pageLayout} setProgress={setProgress} />
					) : (
						<FileGrid viewTable={viewTable} pageLayout={pageLayout} setProgress={setProgress} />
					)
				}
				leftSidebarVariant="temporary"
				leftSidebarHeader={<MainSidebarHeader />}
				leftSidebarContent={<MainSidebarContent />}
				rightSidebarHeader={<DetailSidebarHeader pageLayout={pageLayout} setProgress={setProgress} />}
				rightSidebarContent={<DetailSidebarContent setProgress={setProgress} />}
				ref={pageLayout}
				innerScroll
			/>
			{(getRole() == 'o' || getRole() == 'd') && (
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
			)}
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
							{t('UPLOAD_FILE')}
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
									label={t('FOLDER')}
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
							{allFolderPaths && !!allFolderPaths.length && (
								<div>
									<Autocomplete
										options={allFolderPaths}
										style={{ width: '100%' }}
										className="mb-24"
										getOptionLabel={option => option.path}
										renderOption={(option, { selected }) => <>{option.path}</>}
										renderInput={params => <TextField {...params} label={t('PATH')} />}
										onChange={(e, value) => {
											setPath(value);
										}}
										variant="outlined"
										defaultValue={path}
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
									label={t('TITLE')}
									className={title ? 'mt-8 mb-16 w-full custom-label-up' : 'mt-8 mb-16 w-full'}
									value={title}
									onChange={({ target: { value } }) => {
										resetError();
										setTitle(value);
									}}
									variant="outlined"
									helperText={error.titleError}
								/>
							</div>
							{/* <div>
								<TextField
									error={!!error.descError}
									name="desc"
									label={t('DESCRIPTION')}
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
							</div> */}
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
							{allFolderPaths && !!allFolderPaths.length && (
								<div>
									<Autocomplete
										options={allFolderPaths}
										style={{ width: '100%' }}
										className="mb-24"
										getOptionLabel={option => option.path}
										renderOption={(option, { selected }) => <>{option.path}</>}
										renderInput={params => <TextField {...params} label={t('PATH')} />}
										onChange={(e, value) => {
											setFilePath(value);
										}}
										variant="outlined"
										defaultValue={filePath}
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
						{radioBtnValue == 'folder' ? t('CREATE') : t('UPLOAD')}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}

export default withRouter(withReducer('fileManagerAppProject', reducer)(FileManagerApp));
