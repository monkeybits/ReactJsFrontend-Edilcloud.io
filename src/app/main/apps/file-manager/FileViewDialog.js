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
import { Button } from '@material-ui/core';

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
	const [currentIndex, setcurrentIndex] = useState(0);
	const files = useSelector(({ fileManagerApp }) => fileManagerApp.files?.allFiles);
	const Allfiles = useSelector(({ fileManagerApp }) => fileManagerApp.files?.files);
	const index = useSelector(({ fileManagerApp }) => fileManagerApp.selectedItemId);
	const [selectedItem, setSelectedItem] = useState(null);
	useEffect(() => {
		setcurrentIndex(index);
	}, [index]);
	useEffect(() => {
		if (Array.isArray(Allfiles) && files[currentIndex]) {
			let fileIndex = Allfiles.findIndex(element => element?.mainId == files[currentIndex].mainId);
			// console.log('selectedItem', fileIndex, files[currentIndex]);
			// if (selectedItem) {
			// 	setSelectedItem(Allfiles[index]);
			// } else if (fileIndex >= 0) {
			// 	setSelectedItem(Allfiles[fileIndex]);
			// }
			setSelectedItem(files[currentIndex]);
		}
	}, [currentIndex, Allfiles]);
	console.log({ selectedItem });
	console.log('selectedItem', selectedItem, files);
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
	const url =
		selectedItem && selectedItem?.type == 'photo'
			? selectedItem?.photo
			: selectedItem?.type == 'video'
			? selectedItem?.video
			: selectedItem?.document;
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
					<img src={selectedItem?.photo} />
				) : selectedItem?.type == 'video' ? (
					<video autoPlay src={selectedItem?.video} />
				) : (
					<FileViewer file={url} type={selectedItem?.extension} />
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
