/* =============================================================================
 TODO: DeleteConfirmDialog.js
 ===============================================================================
*This File is part of Company File manager
TODO: when we delete something from file manager this dialog will be displayed 
*/
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { Button, TextField } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useTranslation } from 'react-i18next';

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

function DeleteConfirmDialog({ isOpenDeleteDialog, colseDeleteFileDialog, onYes, onNo, text }) {
	const { t } = useTranslation('filemanager');
	return (
		<Dialog
			onClose={colseDeleteFileDialog}
			aria-labelledby="customized-dialog-title"
			open={isOpenDeleteDialog}
			maxWidth="xs"
			fullWidth="true"
		>
			<DialogTitle id="customized-dialog-title" onClose={colseDeleteFileDialog}>
				{t('DELETE')}
			</DialogTitle>
			<DialogContent dividers>
				<div>{text}</div>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={onYes} variant="contained" color="secondary">
					{t('YES')}
				</Button>
				<Button autoFocus onClick={onNo} variant="contained" color="secondary">
					{t('NO')}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
export default DeleteConfirmDialog;
