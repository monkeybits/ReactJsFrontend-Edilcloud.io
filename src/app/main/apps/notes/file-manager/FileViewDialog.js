import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FileViewer from './FileViewer';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button } from '@material-ui/core';
import ReadPDF from './ReadPDF';
import {
	faFilePdf,
	faFile,
	faFileExcel,
	faFileVideo,
	faFileAudio,
	faFileImage,
	faFileWord
} from '@fortawesome/free-regular-svg-icons';
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

function FileViewDialog({ isOpenViewFile, closeViewFile }) {
	const files = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.allFiles);
	const Allfiles = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.files?.files);
	const index = useSelector(({ fileManagerAppProject }) => fileManagerAppProject.selectedItemId);
	const [currentIndex, setcurrentIndex] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		console.log({ currentIndex });
		let fileData = Allfiles[currentIndex];
		setSelectedItem(fileData);
	}, [currentIndex]);
	useEffect(() => {
		if (Array.isArray(Allfiles) && files[index]) {
			let tile = files[index];
			const findIndex = Allfiles.findIndex(element => element.mainId == tile.mainId && element.type == tile.type);
			console.log({ findIndex, Allfiles });
			if (findIndex >= 0) {
				setcurrentIndex(findIndex);
				let fileData = Allfiles[findIndex];
				setSelectedItem(fileData);
			}
		}
	}, [index, Allfiles, files]);
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
					<video autoPlay src={selectedItem?.video} />
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
				<Button variant="contained" color="primary" disabled={currentIndex == 0} onClick={handlePrevious}>
					Previous
				</Button>
				<Button
					variant="contained"
					color="primary"
					disabled={currentIndex == Allfiles?.length - 1}
					onClick={handleNext}
				>
					Next
				</Button>
			</DialogActions>
		</Dialog>
	);
}
export default FileViewDialog;
