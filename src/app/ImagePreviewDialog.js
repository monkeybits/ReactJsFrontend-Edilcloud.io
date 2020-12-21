import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
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
import VideoListItem from 'app/VideoPlayer/VideoListItem';
import FileSaver from 'file-saver';
import { DOWNLOAD_DOCUMENT, DOWNLOAD_PHOTO, DOWNLOAD_VIDEO } from './services/apiEndPoints';
import { apiCall, METHOD } from './services/baseUrl';
import { getHeaderToken } from './services/serviceUtils';
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

function ImagePreviewDialog({ isOpenViewFile, closeViewFile, activtStep, imagesArray }) {
	const [step, setStep] = useState(activtStep);
	useEffect(() => {
		setStep(activtStep);
	}, [activtStep]);

	const handlePrevious = () => {
		if (step != 0) {
			setStep(p => p - 1);
		}
	};
	const handleNext = () => {
		if (step != imagesArray.length - 1) {
			setStep(p => p + 1);
		}
	};
	if (!imagesArray[step]) {
		return null;
	}
	const handleDownload = () => {
		const item = imagesArray[step];
		let type = () => (item.type ? item.type.split('/')[0] : '');

		let apiurl =
			type() == 'image'
				? DOWNLOAD_PHOTO(item.id)
				: type() == 'video'
				? DOWNLOAD_VIDEO(item.id)
				: DOWNLOAD_DOCUMENT(item.id);
		apiCall(
			apiurl,
			{},
			({ headers, data }) => {
				let image = btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
				var file = `data:${headers['content-type'].toLowerCase()};base64,${image}`;
				console.log({ file });
				FileSaver.saveAs(file);
				// var file = new File([data], `${selectedItem.title}.${selectedItem.extension}`);
				// FileSaver.saveAs(file);
			},
			err => {},
			METHOD.GET,
			{
				...getHeaderToken(),
				responseType: 'arraybuffer',
				onDownloadProgress: progressEvent => {
					var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					// setProgress(percentCompleted);
				}
			},
			true
		);
	};
	const getPreviewByType = item => {
		let type = () => (item.type ? item.type.split('/')[0] : '');
		switch (type()) {
			case 'image': {
				return <img src={item.media_url} />;
			}
			case 'audio': {
				return <audio controls src={item.media_url} />;
			}
			case 'video': {
				return <VideoListItem width="100%" height="100%" video_url={item.media_url} />;
			}
			case 'application': {
				return item.extension == '.xlsx' || item.extension == '.xls' ? (
					<FontAwesomeIcon icon={faFileExcel} style={{ color: 'green', fontSize: '6.4rem' }} />
				) : (
					<FontAwesomeIcon icon={faFile} style={{ color: 'red', fontSize: '6.4rem' }} />
				);
			}

			default: {
				return <FontAwesomeIcon icon={faFile} style={{ color: 'red', fontSize: '6.4rem' }} />;
			}
		}
	};
	return (
		<Dialog
			onClose={closeViewFile}
			aria-labelledby="customized-dialog-title"
			open={isOpenViewFile}
			maxWidth="lg"
			className="chat-slider-modal"
		>
			<DialogTitle id="customized-dialog-title" onClose={closeViewFile}>
				View File
			</DialogTitle>
			<DialogContent dividers className="chat-slider-modal-height">
				{getPreviewByType(imagesArray[step])}
			</DialogContent>
			<DialogActions>
				<Button variant="contained" color="primary" onClick={handleDownload}>
					Download
				</Button>
				<Button disabled={step == 0} onClick={handlePrevious}>
					previous
				</Button>
				<Button disabled={step == imagesArray.length - 1} onClick={handleNext}>
					Next
				</Button>
			</DialogActions>
		</Dialog>
	);
}
export default ImagePreviewDialog;
