import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullscreenModal({ open, setOpen, children }) {
	const classes = useStyles();
	//   const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" color="inherit" className={classes.title}>
							Tutorial
						</Typography>
						<Button autoFocus color="inherit" onClick={handleClose}>
							Skip
						</Button>
					</Toolbar>
				</AppBar>
				{children}
			</Dialog>
		</div>
	);
}
