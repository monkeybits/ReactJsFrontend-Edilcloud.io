import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Button, Dialog, IconButton } from '@material-ui/core';
import FileSaver from 'file-saver';
import * as ICONS from 'app/main/apps/constants';
import { useTranslation } from 'react-i18next';
import {  DOWNLOAD_DOCUMENT, DOWNLOAD_PHOTO, DOWNLOAD_VIDEO, ATTACHMENT_DOWNLOAD } from './services/apiEndPoints';
import { apiCall, METHOD } from './services/baseUrl';
import { getHeaderToken } from './services/serviceUtils';

const VideoListItem = loadable(() => import('app/VideoPlayer/VideoListItem'));

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

function ImagePreviewDialog({ isOpenViewFile, closeViewFile, activtStep, imagesArray, nameSpace = 'chat' }) {
	const [step, setStep] = useState(activtStep);
	const [downloadDisable, setDownloadDisable] = useState(false);
	useEffect(() => {
		setStep(activtStep);
	}, [activtStep]);
	const { t } = useTranslation(nameSpace);

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
		setDownloadDisable(true)
		const item = imagesArray[step];
		const type = () => (item.type ? item.type.split('/')[0] : '');
		const apiurl =
			type() == 'image'
				? DOWNLOAD_PHOTO(item.id)
				: type() == 'video'
				? DOWNLOAD_VIDEO(item.id)
				: DOWNLOAD_DOCUMENT(item.id);
		apiCall(
			item?.task ? ATTACHMENT_DOWNLOAD(item.task, item.id) : apiurl,
			{},
			({ headers, data }) => {
				const image = btoa(new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
				const file = `data:${headers['content-type'].toLowerCase()};base64,${image}`;
				if (window) {
					if (type() == 'image') {
						if (window.DownloadFiles) {
							window.DownloadFiles.postMessage(item.media_url);
						}
						if (window.flutter_inappwebview)
							window.flutter_inappwebview.callHandler('DownloadFiles', item.media_url);
					}
					if (type() == 'video') {
						if (window.DownloadFiles) {
							window.DownloadFiles.postMessage(item.media_url);
						}
						if (window.flutter_inappwebview)
							window.flutter_inappwebview.callHandler('DownloadFiles', item.media_url);
					} else {
						if (window.DownloadFiles) {
							window.DownloadFiles.postMessage(item.media_url);
						}
						if (window.flutter_inappwebview)
							window.flutter_inappwebview.callHandler('DownloadFiles', item.media_url);
					}
				}
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
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					// setProgress(percentCompleted);
				}
			},
			true
		);
		setDownloadDisable(false)
	};

	const getPreviewByType = item => {
		const type = () => (item.type ? item.type.split('/')[0] : '');
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
					<img className="mr-8" src={ICONS.EXCEL_ICON_PATH} />
				) : (
					<img src={ICONS.GENERIC_ICON_PATH} />
				);
			}

			default: {
				return <img src={ICONS.GENERIC_ICON_PATH} />;
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
				{t('VIEW_FILE')}
			</DialogTitle>
			<DialogContent dividers className="chat-slider-modal-height">
				{getPreviewByType(imagesArray[step])}
			</DialogContent>
			<DialogActions>
				<Button disabled={downloadDisable} variant="contained" color="primary" onClick={handleDownload}>
					{t('DOWNLOAD')}
				</Button>
				<Button disabled={step == 0} onClick={handlePrevious}>
					{t('PREVIOUS')}
				</Button>
				<Button disabled={step == imagesArray.length - 1} onClick={handleNext}>
					{t('NEXT')}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
export default ImagePreviewDialog;
