/* =============================================================================
 Todo: DeleteConfirmDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for Delete Confirm in dialog
*/
import MuiDialogContent from '@material-ui/core/DialogContent';
import _ from '@lodash';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, IconButton, Typography, Button } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

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
		padding: theme.spacing(2),
		flexGrow: 1
	}
}))(MuiDialogContent);

function DeleteConfirmDialog() {
	const dispatch = useDispatch();

	const isDeleteConfirmDialog = useSelector(({ todoApp }) => todoApp.todos.isDeleteConfirmDialog);
	const deleteConfirmDialog = useSelector(({ todoApp }) => todoApp.todos.deleteConfirmDialog);

	const handleClose = () => {
		dispatch(Actions.closeDeleteConfirmDialog());
	};

	return (
		<Dialog
			open={isDeleteConfirmDialog}
			onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			maxWidth="xs"
			fullWidth="true"
		>
			<DialogTitle id="customized-dialog-title" onClose={handleClose}>
                Vuoi rimuovere?
			</DialogTitle>
			<DialogContent dividers>
				<Typography className="text-lg">
                    Sei sicuro di voler rimuovere queste attività?
				</Typography>
				<div>
					<div className="flex mt-24 justify-end">
						<Button
							onClick={() => {
                                if(deleteConfirmDialog.type === 'Task') {
                                    dispatch(Actions.okDeleteTaskConfirmDialog());
                                }
                                if(deleteConfirmDialog.type === 'Activity') {
                                    dispatch(Actions.okDeleteActivityConfirmDialog());
                                }
							}}
							variant="contained"
							className="justify-start d-inline-block mb-20 mr-10 bg-blue-500 text-white"
						>
							Yes
						</Button>
						<Button
							onClick={handleClose}
							variant="contained"
							className="justify-start d-inline-block mb-20 bg-gray-500 text-white"
						>
							No
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default DeleteConfirmDialog;
