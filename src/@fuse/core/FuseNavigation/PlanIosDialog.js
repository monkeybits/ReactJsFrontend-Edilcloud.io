/* =============================================================================
 TODO: PlanFormAskDialog.js
 ===============================================================================
*This File is part of Company File manager
TODO: This File is created to view view the media file 
*/
import React, {useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, IconButton, Typography, Button, Link } from '@material-ui/core';
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
		padding: theme.spacing(2),
		padding: '2.8rem'
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

function PlanIosDialog({ isPlanModal, closePlanModal, onOk, from = '' }) {
    const classes = useStyles();
	const [deviceType, setDeviceType] = React.useState('');

	useEffect(() => {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			setDeviceType('window phone')
		}

		if (/android/i.test(userAgent)) {
			setDeviceType('android')
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			setDeviceType('ios')
		}

		const iPad = (userAgent.match(/(iPad)/)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
		if (iPad !== false) {
			setDeviceType('ios')
		}
	}, []);

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
			// className="popup-root"
		>
			<DialogTitle id="customized-dialog-title" onClose={closePlanModal}></DialogTitle>
			<DialogContent>
				<div>{from === 'menu' ? 'You can update your account manager on ' : 'You need to update your account manager at '}<span>
					{
						deviceType === 'android' &&
						<Button
							color="primary"
							className="text-blue-500 underline p-0 normal-case"
							onClick={() => {
								if (window.RedirectSubdomain?.postMessage) {
									window.RedirectSubdomain.postMessage(`https://account.edilcloud.io`);
								}
							}}
						>
							account.edilcloud.io
						</Button>
					}
					{
						deviceType === 'ios' &&
						<Button
							color="primary"
							className="text-blue-500 underline p-0 normal-case"
							onClick={() => {
								try {
									if (window.webkit.messageHandlers) {
										window.webkit.messageHandlers.copyButtonTapped.postMessage(`https://account.edilcloud.io`);
									}
								} catch (e) {
									// console.log('error', e);
								}
							}}
						>
							account.edilcloud.io
						</Button>
					}
					{
						deviceType !== 'ios' && deviceType !== 'android' &&
						<Link className="text-blue-500 underline p-0 normal-case custom-link-popup" target="_blank" href='https://account.edilcloud.io'>account.edilcloud.io</Link>
					}
				</span></div>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={onOk} color="white" className="bg-blue-500 text-white hover:bg-blue-500">
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
}
export default PlanIosDialog;
