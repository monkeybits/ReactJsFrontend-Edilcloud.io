import IconButton from '@material-ui/core/IconButton';
import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import FileViewer from './FileViewer';
import { useSelector, useDispatch } from 'react-redux';

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
	const selectedItem = useSelector(({ fileManagerAppProject }) => files[fileManagerAppProject.selectedItemId]);
	const url =
		selectedItem && selectedItem.type == 'photo'
			? selectedItem.photo
			: selectedItem.type == 'video'
			? selectedItem.video
			: selectedItem.document;
	return (
		<Dialog
			onClose={closeViewFile}
			aria-labelledby="customized-dialog-title"
			open={isOpenViewFile}
			// maxWidth="lg"
			fullWidth="true"
		>
			<DialogTitle id="customized-dialog-title" onClose={closeViewFile}>
				View File
			</DialogTitle>
			<DialogContent dividers>
				<FileViewer file={url} type={selectedItem.extension} />
			</DialogContent>
		</Dialog>
	);
}
export default FileViewDialog;
