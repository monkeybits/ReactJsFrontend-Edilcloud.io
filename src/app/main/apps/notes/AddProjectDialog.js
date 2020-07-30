import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AddProjectForm from './AddProjectForm';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from 'app/main/apps/notes/store/actions';
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

export default function CustomizedDialogs() {
	const dispatch = useDispatch();
	const [open, setOpen] = React.useState(true);
	const projectApp = useSelector(({ notesApp }) => notesApp.project);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		dispatch(Actions.closeProjectDialog());
	};

	return (
		<Dialog
			maxWidth="sm"
			fullWidth="true"
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			open={projectApp.projectDialog}
		>
			<DialogTitle id="customized-dialog-title" onClose={handleClose}>
				Add Project
			</DialogTitle>
			<AddProjectForm />
		</Dialog>
	);
}
