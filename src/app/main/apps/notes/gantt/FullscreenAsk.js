import React from 'react';
import { Button, Dialog, DialogActions, DialogTitle, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullscreenAsk({ open, setOpen, onYes, onNeverAsk }) {
	// const [open, setOpen] = React.useState(false);

	const handleClickYes = () => {
		onYes();
		setOpen(false);
	};

	const handleClose = () => {
		onNeverAsk();
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-labelledby="alert-dialog-slide-title"
			aria-describedby="alert-dialog-slide-description"
		>
			<DialogTitle id="alert-dialog-slide-title">For a Better usage use fullscreen version</DialogTitle>
			{/* <DialogContent>
				<DialogContentText id="alert-dialog-slide-description">
					For a Better usage use full screen version
				</DialogContentText>
			</DialogContent> */}
			<DialogActions>
				<Button onClick={handleClose} color="primary">
					Never advice me again
				</Button>
				<Button onClick={handleClickYes} color="primary">
					Agree
				</Button>
			</DialogActions>
		</Dialog>
	);
}
