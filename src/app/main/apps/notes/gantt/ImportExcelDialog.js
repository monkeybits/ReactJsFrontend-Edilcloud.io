import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, Dialog, IconButton, Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export default function ImportExcelDialog({ open, setOpen, setTarget, target, onImport }) {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Dialog fullWidth maxWidth="sm" className="custom-modal-new" onClose={handleClose} open={open}>
				<DialogTitle className="bg-blue text-white" id="customized-dialog-title" onClose={handleClose}>
					Import Excel
				</DialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>Download Demo File</Typography>
					<a className="xlsx-sample" href="/assets/files/DemoProject.xlsx" target="_blank">
						<FontAwesomeIcon icon={faDownload} style={{ fontSize: '1.5rem' }} />
						DemoProject.xlsx
					</a>
					<div className="mt-16 mb-16 mx-4 relative static-form-label flex-1">
						<label>Import File</label>
						<input
							type="file"
							id="excelFile"
							name="file"
							accept=".xlsx,.xls"
							onChange={e => setTarget(e.target.files[0])}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button autoFocus onClick={onImport} disabled={!target} color="primary">
						Import
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
