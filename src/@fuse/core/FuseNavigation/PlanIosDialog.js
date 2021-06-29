/* =============================================================================
 TODO: PlanFormAskDialog.js
 ===============================================================================
*This File is part of Company File manager
TODO: This File is created to view view the media file 
*/
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, IconButton, Typography, Button } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container: {
        backgroundColor: 'transparent'
    },
    root: {
        backgroundColor: 'transparent'
    }
}));

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

function PlanIosDialog({ isPlanModal, closePlanModal, onOk }) {
    const classes = useStyles();
	return (
		<Dialog
			onClose={closePlanModal}
			aria-labelledby="customized-dialog-title"
			open={isPlanModal}
			maxWidth="xs"
			fullWidth="true"
            classes={{
                container: 'popup-plan-container'
            }}
			className="popup-root"
		>
			<DialogTitle id="customized-dialog-title" onClose={closePlanModal}></DialogTitle>
			<DialogContent dividers>
				<div>ti stiamo per indirizzare alla pagine web dei pagamenti: esegui il pagamento dal browser e poi torna sull'app di edilcloud.</div>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={onOk} variant="contained" color="secondary">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}
export default PlanIosDialog;
