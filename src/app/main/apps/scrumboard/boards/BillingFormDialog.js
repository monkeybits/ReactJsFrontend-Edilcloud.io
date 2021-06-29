/* =============================================================================
 Todo: StatusConfirmDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for Status Confirm in dialog
*/
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import MuiDialogContent from '@material-ui/core/DialogContent';
import _ from '@lodash';
import { useForm } from '@fuse/hooks';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, IconButton, Typography, Button, TextField, CircularProgress } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { COMPANY_DETAIL_BY_ID, USER_EDIT_COMPANY } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import * as ChatActions from '../../chat/store/actions';
import * as Actions from '../store/actions';
import { toast } from 'react-toastify';
import axios from '../../../../services/axiosConfig';

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

function BillingFormDialog(props) {
	const { t } = useTranslation('setting_app');
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [formValidate, setFormValidate] = useState(true);
	const showBillingFormDialog = useSelector(({ scrumboardApp }) => scrumboardApp.board.showBillingFormDialog);
	const upgradePlanDetail = useSelector(({ scrumboardApp }) => scrumboardApp.board.upgradePlanDetail);
	const [companyInfo, setCompanyInfo] = useState({});

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

	const { form, handleChange, resetForm, setForm } = useForm({
		name: '',
		tax_code: '',
		vat_number: '',
		address: '',
		province: '',
		cap: '',
		country: '',
		pec: '',
		billing_email: '',
		sdi: ''
	});

	useEffect(() => {
		if (
			form.name !== '' &&
			form.tax_code !== '' &&
			form.vat_number !== '' &&
			form.address !== '' &&
			form.province !== '' &&
			form.cap !== '' &&
			form.country !== '' &&
			form.pec !== '' &&
			form.billing_email !== ''
		) {
			setFormValidate(false);
		} else {
			setFormValidate(true);
		}
	}, [form]);

	useEffect(() => {
		if (companyInfo) {
			setForm({
				name: companyInfo.name,
				tax_code: companyInfo.tax_code,
				vat_number: companyInfo.vat_number,
				address: companyInfo.address,
				province: companyInfo.province,
				cap: companyInfo.cap,
				country: companyInfo.country,
				pec: companyInfo.pec,
				billing_email: companyInfo.billing_email,
				sdi: companyInfo.sdi
			});
		}
	}, [companyInfo]);

	const handleClose = () => {
		dispatch(Actions.closeBillingFormDialog());
	};

	const onSave = () => {
		setLoading(true);
		const formData = new FormData();
		const token = localStorage.getItem('jwt_access_token');
		for (const key in companyInfo) {
			if (companyInfo[key] && !(key in form) && key !== 'logo' && key !== 'slug') {
				formData.append(key, companyInfo[key]);
			}
		}
		for (const key in form) {
			if (form[key]) formData.append(key, form[key]);
		}

		axios
			.put(USER_EDIT_COMPANY(companyInfo.id), formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `JWT ${token}`
				}
			})
			.then(res => {
				if (res) {
					setLoading(false);
					toast.success('Successfully saved!');

					if(res.status === 200) {
						window.location = `${process.env.REACT_APP_BASE_URL}/api/frontend/payments/customer-portal?customer_id=${companyInfo?.customer}`;
					}
				}
			})
			.catch(error => {
				setLoading(false);
				toast.warn('Something went wrong.');
			});
	};

	return (
		<Dialog
			open={showBillingFormDialog}
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
				<form name="billingForm" className="flex flex-col justify-center w-md">
					<Typography className="text-black text-24 mb-16">Billing</Typography>
					<TextField
						// error={error.name.length}
						// helperText={!!error.name.length && error.name[0]}
						className="my-8 bg-white"
						label={t('BUSINESS_NAME')}
						autoFocus
						type="text"
						name="name"
						value={form.name}
						onChange={handleChange}
						variant="outlined"
						required
						fullWidth
					/>
					<TextField
						className="my-8 bg-white"
						label={t('COMPANY_TAX_CODE')}
						autoFocus
						type="text"
						name="tax_code"
						value={form.tax_code}
						onChange={handleChange}
						variant="outlined"
						required
						fullWidth
					/>
					<TextField
						className="my-8 bg-white"
						label={t('COMPANY_VAT_NUMBER')}
						type="text"
						name="vat_number"
						value={form.vat_number}
						onChange={handleChange}
						variant="outlined"
						required
						fullWidth
					/>
					<TextField
						className="my-8 bg-white"
						label={t('ADDRESS')}
						type="text"
						name="address"
						value={form.address}
						onChange={handleChange}
						variant="outlined"
						required
						fullWidth
					/>
					<TextField
						className="my-8 bg-white"
						label={t('PROVINCE')}
						type="text"
						name="province"
						value={form.province}
						onChange={handleChange}
						variant="outlined"
						required
						fullWidth
					/>
					<TextField
						className="my-8 bg-white"
						label={t('POSTAL_CODE')}
						type="text"
						name="cap"
						value={form.cap}
						onChange={handleChange}
						variant="outlined"
						required
						fullWidth
					/>
					<TextField
						className="my-8 bg-white"
						label={t('NATION')}
						type="text"
						name="country"
						value={form.country}
						onChange={handleChange}
						variant="outlined"
						required
						fullWidth
					/>
					<TextField
						className="my-8 bg-white"
						label={t('PEC_EMAIL_ADDRESS')}
						type="text"
						name="pec"
						value={form.pec}
						onChange={handleChange}
						variant="outlined"
						required
						fullWidth
					/>
					<TextField
						className="my-8 bg-white"
						label={t('BILLING_EMAIL')}
						type="text"
						name="billing_email"
						value={form.billing_email}
						onChange={handleChange}
						variant="outlined"
						required
						fullWidth
					/>
					<TextField
						className="my-8 bg-white"
						label={t('SDI_CODE')}
						type="text"
						name="sdi"
						value={form.sdi}
						onChange={handleChange}
						variant="outlined"
						fullWidth
					/>

					<div className="inline-block">
						<Button
							onClick={onSave}
							variant="contained"
							color="primary"
							size="small"
							aria-label="save"
							className="justify-center d-inline-block mt-10"
							disabled={formValidate}
						>
							{t('SAVE')}
							{loading && <CircularProgress size={15} color="white" className="ml-6" />}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default BillingFormDialog;
