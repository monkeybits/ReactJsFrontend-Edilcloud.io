/* =============================================================================
 Todo: StatusConfirmDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for Status Confirm in dialog
*/
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import MuiDialogContent from '@material-ui/core/DialogContent';
import _ from '@lodash';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, IconButton, Typography, Button, ListItem, ListItemText, Icon } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { APPROVE_LIST, EDIT_POST } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import * as ChatActions from '../../chat/store/actions';
import * as Actions from '../store/actions';

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

function UpdatePlanDialog(props) {
	const dispatch = useDispatch();

	const isOpenUpgradePlan = useSelector(({ scrumboardApp }) => scrumboardApp.board.isOpenUpgradePlan);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const [loading, setLoading] = useState({
		loadingCompanyInfo: false,
		loadingGetContacts: false,
		loadingGetChat: false
	});
	const handleSetLoading = data =>
		setLoading(loading => ({
			...loading,
			...data
		}));

	useEffect(() => {
		dispatch(ChatActions.companyInfo(handleSetLoading));
	}, [dispatch]);

	const handleClose = () => {
		dispatch(Actions.closeUpgradePlanDialog());
	};

	const onConfirmPayment = () => {
		if (
			company.name === '' &&
			company.tax_code === '' &&
			company.vat_number === '' &&
			company.address === '' &&
			company.province === '' &&
			company.cap === '' &&
			company.country === '' &&
			company.pec === '' &&
			company.billing_email === ''
		) {
			props.history.push('/apps/billing');
		} else {
			window.location = `${process.env.REACT_APP_BASE_URL}/api/frontend/payments/customer-portal?customer_id=${company?.customer}`;
			// props.history.push(`https://back.edilcloud.io/api/frontend/payments/customer-portal?customer_id=${company?.customer}`);
		}
	};

	return (
		<Dialog
			open={isOpenUpgradePlan}
			// onClose={handleClose}
			aria-labelledby="customized-dialog-title"
			// maxWidth="xs"
			maxWidth="md"
			fullWidth="true"
		>
			<DialogContent dividers>
				<IconButton aria-label="close" className="absolute right-0 top-0" onClick={handleClose}>
					<CloseIcon />
				</IconButton>
				<Typography className="text-4xl font-bold text-center mt-12">Upgrade to Standard</Typography>
				<div>
					<Typography className="text-lg text-center">
						Empower your team with these additional features.
					</Typography>
					<div className="flex items-center">
						<div>
							<img className="w-400" src="assets/images/images.jpg" />
						</div>
						<div className="ml-16">
							<ListItem className="grid ">
								<Typography className="text-18 p-4 flex items-center">
									<Icon className="mr-8">fiber_manual_record_rounded</Icon> Plan your work in one
									visual timeline.
								</Typography>
								<Typography className="text-18 p-4 flex items-center">
									<Icon className="mr-8">fiber_manual_record_rounded</Icon>Share boards with people
									outside your team.
								</Typography>
								<Typography className="text-18 p-4 flex items-center">
									<Icon className="mr-8">fiber_manual_record_rounded</Icon>Filter your boards however
									you choose.
								</Typography>
								<Typography className="text-18 p-4 flex items-center">
									<Icon className="mr-8">fiber_manual_record_rounded</Icon>Send emails directly to add
									updates.
								</Typography>
								<Typography className="text-18 p-4 flex items-center">
									<Icon className="mr-8">fiber_manual_record_rounded</Icon>Connect dapulse with your
									other apps
								</Typography>
							</ListItem>
						</div>
					</div>
					<div className="flex mt-24 justify-between">
						<div className="grid justify-start">
							<Typography className="text-lg">
								For only <b>$20</b> more a month
							</Typography>
							<Typography className="text-base">you can supercharge your team's productivity.</Typography>
							<Typography className="text-8 font-bold">
								Want to add more team mates? <span className="text-blue-500">see pricing</span>
							</Typography>
						</div>
						<div className="grid">
							<Button
								onClick={onConfirmPayment}
								variant="contained"
								className="justify-center d-inline-block mb-10 bg-blue-500 text-white normal-case rounded-32 w-200"
							>
								Confirm upgrade
								{/* {loading && <CircularProgress size={20} color="secondary" />} */}
							</Button>
							<Typography className="text-12 text-center">
								Your card will be automatically charged.
							</Typography>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}

export default UpdatePlanDialog;
