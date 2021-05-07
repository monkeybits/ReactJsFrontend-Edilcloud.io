/* =============================================================================
 Todo: StatusConfirmDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for Status Confirm in dialog
*/
import MuiDialogContent from '@material-ui/core/DialogContent';
import _ from '@lodash';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, IconButton, Typography, Button } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../notes/todo/store/actions';

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

function StatusConfirmDialog() {
	const dispatch = useDispatch();

	const isStateConfirmDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.isStateConfirmDialog);

	const handleClose = () => {
		dispatch(Actions.closeStatusConfirmDialog());
	};

	return (
		<Dialog
			open={isStateConfirmDialog}
			// onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			maxWidth="xs"
			fullWidth="true"
		>
			<DialogTitle id="customized-dialog-title" onClose={handleClose}>
				Vuoi cambiare stato?
			</DialogTitle>
			<DialogContent dividers>
				<Typography className="text-lg">
					Sei sicuro di voler cambiare stato a questo post?
					{/* {userData.status == 'Deactivated' ? t('DEACTIVATE_MSG') : t('ACTIVATE_MSG')} */}
				</Typography>
				<div>
					<div className="flex mt-24 justify-end">
						<Button
							onClick={() => {
								dispatch(Actions.okStatusConfirmDialog());
							}}
							variant="contained"
							className="justify-start d-inline-block mb-20 mr-10 bg-blue-500 text-white"
						>
							Yes
							{/* {loading && <CircularProgress size={20} color="secondary" />} */}
						</Button>
						<Button
							onClick={() => {
								dispatch(Actions.closeStatusConfirmDialog());
							}}
							variant="contained"
							className="justify-start d-inline-block mb-20 bg-gray-500 text-white"
						>
							No
							{/* {loading && <CircularProgress size={20} color="secondary" />} */}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default StatusConfirmDialog;
