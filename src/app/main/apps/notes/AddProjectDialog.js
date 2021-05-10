/* =============================================================================
 TODO: AddProjectDialog.js
 ===============================================================================
*This file is part of project list page 
TODO: This File is to show Dialog in add project form
*/
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, IconButton, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from 'app/main/apps/notes/store/actions';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
const AddProjectForm = loadable(() => import('./AddProjectForm'));

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
	const { t } = useTranslation('projects');
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
				{projectApp.dialogType == 'new' ? t('ADD_PROJECT') : t('EDIT_PROJECT')}{' '}
			</DialogTitle>
			<AddProjectForm />
		</Dialog>
	);
}
