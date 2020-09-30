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
	return (
		<Dialog
			onClose={closeViewFile}
			aria-labelledby="customized-dialog-title"
			open={isOpenViewFile}
			maxWidth="lg"
			fullWidth="true"
		>
			<DialogTitle id="customized-dialog-title" onClose={closeViewFile}>
				View File
			</DialogTitle>
			<DialogContent dividers>
				<img src={imagesArray[step].media_url} />
			</DialogContent>
			<DialogActions>
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
