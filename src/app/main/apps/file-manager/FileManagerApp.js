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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTh } from '@fortawesome/free-solid-svg-icons';
import FileGrid from './FileGrid';
import { useTranslation } from 'react-i18next';

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
	const { t } = useTranslation('filemanager');
	const dispatch = useDispatch();
	const allFolderPaths = useSelector(({ fileManagerApp }) => fileManagerApp.files.allFolderPaths);
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files);
	const folderPath = useSelector(({ fileManagerApp }) => fileManagerApp.files.folderPath);
	const searchText = useSelector(({ fileManagerApp }) => fileManagerApp.files.searchText);
	const isUploadingFiles = useSelector(({ fileManagerApp }) => fileManagerApp.files.isUploadingFiles);
	const company = useSelector(({ chatApp }) => chatApp.company);
	const allFiles = useSelector(({ fileManagerApp }) => fileManagerApp.files?.allFiles);
	const selectedItem = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
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
	const [viewTable, setViewTable] = useState(false);
	const [title, setTitle] = useState(undefined);
	const [description, setDescription] = useState(undefined);
	const [open, setOpen] = React.useState(false);
	const currentFolderPath = ''; //files.folders?.filter(folder => folder.path == folderPath[folderPath.length - 1]);
	const inputName = useRef();
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
			dispatch(Actions.getFiles(cid, handleSetLoading));
		} else {
			props.history.push('/apps/todo/all');
		}
	}, [dispatch]);
	useEffect(() => {
		setFilePath(folderPath[folderPath.length - 1]);
		setPath(folderPath[folderPath.length - 1]);
	}, [folderPath, isOpenDrawer]);
	const addFile = event => {
		resetError();
		var files = event.target.files;
		for (var i = 0; i < files.length; i++) {
			console.log(files[i]);
			if (!title) {
				let fileName = files[i].name.split('.');
				fileName.pop();
				setTitle(fileName.join(' '));
			}
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
							parent: files.folders && !!files.folders.length ? path.id : '',
							is_public: false
					  }
					: {
							[datakey]: fileType == 'image' ? await getCompressFile(file) : file,
							title,
							description,
							folder: filePath ? filePath.id : null
					  };
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
					// if (radioBtnValue == 'folder') {
					console.log({ folderPath11: folderPath });
					if (folderPath.length > 1) {
						dispatch(Actions.folderDetail(cid, handleSetLoading));
					} else {
						dispatch(Actions.getFolders(cid, handleSetLoading));
					}
					// } else {
					// 	if (fileType == 'image') {
					// 		dispatch(Actions.getPhotos(cid, handleSetLoading));
					// 	} else if (fileType == 'video') {
					// 		dispatch(Actions.getVideos(cid, handleSetLoading));
					// 	} else {
					// 		dispatch(Actions.getDocuments(cid, handleSetLoading));
					// 	}
					// }
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
	const canSubmit = () =>
		radioBtnValue == 'folder'
			? title?.length && !error.nameError
			: title?.length && fileData.file && !error.titleError;
	const isLoadingFiles = () =>
		loading.loadingVideos || loading.loadingPhotos || loading.loadingFolders || loading.loadingDocuments;
	const loadingComponent = (
		<div className="flex flex-1 flex-col items-center justify-center">
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
					root: selectedItem?.title ? 'bg-red fileInfoSidebar' : 'bg-red fileInfoSidebar hide-sidebar',
					header: 'p-24 pb-0 bg-white h-auto min-h-auto',
					sidebarHeader: '',
					rightSidebar: 'w-320'
				}}
				header={
					<>
						<div className="flex flex-col flex-1 relative z-50">
							<div className="flex w-full justify-between items-center mb-20">
								<div className="mr-20">
									<Typography variant="h5" className="mb-4">
										{t('FILES')}
									</Typography>
								</div>
							</div>
							<div className="flex items-center justify-between left-icon-btn">
								<FuseAnimate delay={200}>
									<div>
										{folderPath && (
											<Breadcrumb
												selected={folderPath}
												className="flex flex-1 filemanager-breadcumb font-700 text-24 text-default mt-6"
											/>
										)}
									</div>
								</FuseAnimate>
								{/* <IconButton
								onClick={() => {
									pageLayout.current.toggleLeftSidebar();
								}}
								aria-label="open left sidebar"
								className="h-40"
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
						<FileList setProgress={setProgress} pageLayout={pageLayout} />
					) : (
						<FileGrid setProgress={setProgress} pageLayout={pageLayout} />
					)
				}
				leftSidebarVariant="temporary"
				// leftSidebarHeader={<MainSidebarHeader />}
				// leftSidebarContent={<MainSidebarContent />}
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
										if (allFiles.find(v => v.title == value)) {
											seterror(prev => ({
												...prev,
												nameError: 'should have unique name !'
											}));
										}
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
									ref={inputName}
									error={!!error.titleError}
									name="title"
									id="title"
									label={t('TITLE')}
									className={title ? 'mt-8 mb-16 w-full custom-label-up' : 'mt-8 mb-16 w-full'}
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
									accept="image/*, video/*"
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

export default withRouter(withReducer('fileManagerApp', reducer)(FileManagerApp));
