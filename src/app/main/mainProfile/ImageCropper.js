import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

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
export default class ImageCropper extends React.Component {
	handleCrop = () => {
		const fileName = `${new Date().getTime()}.png`;
		this.cropper.getCroppedCanvas().toBlob(a => {
			this.blobToFile(a, fileName);
		});
	};

	blobToFile(theBlob, fileName) {
		// A Blob() is almost a File() - it's just missing the two properties below which we will add
		theBlob.lastModifiedDate = new Date();
		theBlob.name = fileName;
		this.props.onCrop(theBlob);
		this.props.onHide();
		return theBlob;
	}

	render() {
		return (
			<Dialog onClose={this.props.onHide} aria-labelledby="customized-dialog-title" open={this.props.viewCroper}>
				<DialogTitle id="customized-dialog-title" onClose={this.props.onHide}>
					Crop Image
				</DialogTitle>
				<DialogContent dividers>
					<Cropper
						ref={cropper => {
							this.cropper = cropper;
						}}
						src={this.props.image}
						style={{ height: 300, width: '100%' }}
						aspectRatio={15 / 15}
						guides={false}
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="primary" onClick={this.handleCrop} c>
						Crop
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}
