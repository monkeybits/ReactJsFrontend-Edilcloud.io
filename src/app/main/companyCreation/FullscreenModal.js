import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, Slide } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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
						<Typography variant="h6" className={classes.title}>
							Sound
						</Typography>
						<Button autoFocus color="inherit" onClick={handleClose}>
							save
						</Button>
					</Toolbar>
				</AppBar>
				{children}
			</Dialog>
		</div>
	);
}
