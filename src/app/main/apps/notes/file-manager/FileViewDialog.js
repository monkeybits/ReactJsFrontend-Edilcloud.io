import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button } from '@material-ui/core';
import {
	faFilePdf,
	faFile,
	faFileExcel,
	faFileVideo,
	faFileAudio,
	faFileImage,
	faFileWord
} from '@fortawesome/free-regular-svg-icons';
import { DOWNLOAD_DOCUMENT, DOWNLOAD_PHOTO, DOWNLOAD_VIDEO } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import FileSaver from 'file-saver';
import { getHeaderToken } from 'app/services/serviceUtils';
import VideoListItem from 'app/VideoPlayer/VideoListItem';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import ReadPDF from './ReadPDF';
import FileViewer from './FileViewer';

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
	}
}))(MuiDialogActions);

function FileViewDialog({ isOpenViewFile, closeViewFile, setProgress }) {
	const { t } = useTranslation('filemanaer_project');
	const dispatch = useDispatch();
	const files = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.allFiles);
	const folderPath = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files.folderPath);
	const currentFolderPath = folderPath[folderPath.length - 1];
	const Allfiles = useSelector(({ fileManagerAppProject }) =>
		currentFolderPath == '' ? fileManagerAppProject.files?.rootFiles : fileManagerAppProject.files?.files
	);
	const item = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.selectedItemId);
	const [currentIndex, setcurrentIndex] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		console.log({ currentIndex });
		const fileData = Allfiles[currentIndex];
		setSelectedItem(fileData);
	}, [currentIndex]);
	useEffect(() => {
		if (Array.isArray(Allfiles) && item) {
			const tile = item;
			const findIndex = Allfiles.findIndex(element => element.mainId == tile.mainId && element.type == tile.type);
			console.log({ findIndex, Allfiles });
			if (findIndex >= 0) {
				setcurrentIndex(findIndex);
				const fileData = Allfiles[findIndex];
				setSelectedItem(fileData);
			}
		}
	}, [item, Allfiles, files]);
	const handlePrevious = () => {
		if (currentIndex > 0) {
			setcurrentIndex(i => i - 1);
		}
	};
	const handleNext = () => {
		if (currentIndex < Allfiles?.length - 1) {
			setcurrentIndex(i => i + 1);
		}
	};
	const handleDownload = () => {
		if (selectedItem) {
			setProgress(0);
			dispatch(Actions.onUploadHandleLoading(true));
			const apiurl =
				selectedItem.type == 'photo'
					? DOWNLOAD_PHOTO(selectedItem.mainId)
					: selectedItem.type == 'video'
					? DOWNLOAD_VIDEO(selectedItem.mainId)
					: DOWNLOAD_DOCUMENT(selectedItem.mainId);
			apiCall(
				apiurl,
				{},
				({ headers, data }) => {
					const image = btoa(
						new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), '')
					);
					const file = `data:${headers['content-type'].toLowerCase()};base64,${image}`;
					console.log({ file });
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
						}
						if (selectedItem.type == 'document') {
							if (window.DownloadFiles) {
								window.DownloadFiles.postMessage(selectedItem.document);
							}
							if (window.flutter_inappwebview)
								window.flutter_inappwebview.callHandler('DownloadFiles', selectedItem.document);
						}

						console.log('finish listenning to flutterInAppWebViewPlatformReady');
					}
					FileSaver.saveAs(file);
					// var file = new File([data], `${selectedItem.title}.${selectedItem.extension}`);
					// FileSaver.saveAs(file);
					dispatch(Actions.onUploadHandleLoading(false));
				},
				err => {
					dispatch(Actions.onUploadHandleLoading(false));
				},
				METHOD.GET,
				{
					...getHeaderToken(),
					responseType: 'arraybuffer',
					onDownloadProgress: progressEvent => {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setProgress(percentCompleted);
					}
				},
				true
			);
		}
	};
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
	return (
		<Dialog
			onClose={closeViewFile}
			aria-labelledby="customized-dialog-title"
			open={isOpenViewFile}
			// maxWidth="lg"
			fullWidth="true"
		>
			<DialogTitle id="customized-dialog-title" onClose={closeViewFile}>
				{selectedItem?.title}
			</DialogTitle>
			<DialogContent dividers>
				{selectedItem?.type == 'photo' ? (
					<LazyLoadImage delayTime={300} src={selectedItem?.photo} alt={selectedItem?.title} />
				) : selectedItem?.type == 'video' ? (
					<VideoListItem width="100%" height="100%" video_url={selectedItem?.video} />
				) : selectedItem?.extension == 'pdf' ? (
					<ReadPDF height={700} file={selectedItem.document} />
				) : (
					<FontAwesomeIcon
						icon={
							selectedItem?.type == 'document'
								? selectedItem?.extension == 'pdf'
									? faFilePdf
									: selectedItem?.extension == 'docx'
									? faFileWord
									: selectedItem?.extension == 'xlsx'
									? faFileExcel
									: selectedItem?.extension == 'mp3'
									? faFileAudio
									: faFile
								: faFile
						}
						style={{ ...getCssColor(selectedItem?.extension), fontSize: '2.4rem' }}
					/>
				)}
			</DialogContent>
			<DialogActions className="p-8">
				<Button variant="contained" color="primary" onClick={handleDownload}>
					{t('DOWNLOAD')}
				</Button>
				<Button variant="contained" color="primary" disabled={currentIndex == 0} onClick={handlePrevious}>
					{t('PREVIOUS')}
				</Button>
				<Button
					variant="contained"
					color="primary"
					disabled={currentIndex == Allfiles?.length - 1}
					onClick={handleNext}
				>
					{t('NEXT')}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
export default FileViewDialog;
