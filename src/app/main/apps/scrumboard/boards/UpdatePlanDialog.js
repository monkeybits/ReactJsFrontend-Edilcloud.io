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
import { COMPANY_DETAIL_BY_ID } from 'app/services/apiEndPoints';
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
	const upgradePlanDetail = useSelector(({ scrumboardApp }) => scrumboardApp.board.upgradePlanDetail);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const [loading, setLoading] = useState({
		loadingCompanyInfo: false,
		loadingGetContacts: false,
		loadingGetChat: false
	});
	const [companyInfo, setCompanyInfo] = useState({});

	const handleSetLoading = data =>
		setLoading(loading => ({
			...loading,
			...data
		}));

	const handleClose = () => {
		dispatch(Actions.closeUpgradePlanDialog());
	};

	useEffect(() => {
		if('id' in upgradePlanDetail) {
			apiCall(
				COMPANY_DETAIL_BY_ID(upgradePlanDetail.id),
				{},
				company => {
					setCompanyInfo(company)
				},
				err => {
					console.log('Err', err)
				},
				METHOD.GET,
				getHeaderToken()
			);
		}
	}, [upgradePlanDetail]);

	const onConfirmPayment = () => {
		if (
			companyInfo.name !== '' &&
			companyInfo.tax_code !== '' &&
			companyInfo.vat_number !== '' &&
			companyInfo.address !== '' &&
			companyInfo.province !== '' &&
			companyInfo.cap !== '' &&
			companyInfo.country !== '' &&
			companyInfo.pec !== '' &&
			companyInfo.billing_email !== ''
		) {
			window.location = `${process.env.REACT_APP_BASE_URL}/api/frontend/payments/customer-portal?customer_id=${companyInfo.customer}`;
			// props.history.push(`https://back.edilcloud.io/api/frontend/payments/customer-portal?customer_id=${company?.customer}`);
		} else {
			dispatch(Actions.showBillingFormDialog());
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
				<Typography className="text-xl sm:text-4xl font-bold text-center mt-12">Upgrade to Standard</Typography>
				<div>
					<Typography className="text-md sm:text-lg text-center">
						Empower your team with these additional features.
					</Typography>
					<div className="sm:flex items-center">
						<div>
							<img className="w-400 mx-auto" src="assets/images/images.jpg" />
						</div>
						<div className="ml-16">
							<ListItem className="grid justify-center">
								<Typography className="text-15 xs:text-18 sm:text-15 md:text-18 p-4 flex items-center">
									<Icon className="mr-8">fiber_manual_record_rounded</Icon> Plan your work in one
									visual timeline.
								</Typography>
								<Typography className="text-15 xs:text-18 sm:text-15 md:text-18 p-4 flex items-center">
									<Icon className="mr-8">fiber_manual_record_rounded</Icon>Share boards with people
									outside your team.
								</Typography>
								<Typography className="text-15 xs:text-18 sm:text-15 md:text-18 p-4 flex items-center">
									<Icon className="mr-8">fiber_manual_record_rounded</Icon>Filter your boards however
									you choose.
								</Typography>
								<Typography className="text-15 xs:text-18 sm:text-15 md:text-18 p-4 flex items-center">
									<Icon className="mr-8">fiber_manual_record_rounded</Icon>Send emails directly to add
									updates.
								</Typography>
								<Typography className="text-15 xs:text-18 sm:text-15 md:text-18 p-4 flex items-center">
									<Icon className="mr-8">fiber_manual_record_rounded</Icon>Connect dapulse with your
									other apps
								</Typography>
							</ListItem>
						</div>
					</div>
					<div className="flex mt-24 justify-between">
						<div className="grid justify-start">
							<Typography className="sm:text-lg">
								For only <b>$20</b> more a month
							</Typography>
							<Typography className="sm:text-base">you can supercharge your team's productivity.</Typography>
							<Typography className="sm:text-8 font-bold">
								Want to add more team mates? <span className="text-blue-500">see pricing</span>
							</Typography>
						</div>
						<div className="grid">
							<Button
								onClick={onConfirmPayment}
								variant="contained"
								className="justify-center d-inline-block mb-10 bg-blue-500 text-white normal-case rounded-32 sm:w-200 text-12 sm:text-14 p-0"
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
