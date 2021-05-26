import { Typography, TextField, Button, CircularProgress } from '@material-ui/core';
import { useForm } from '@fuse/hooks';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { USER_EDIT_COMPANY } from 'app/services/apiEndPoints';
import { toast } from 'react-toastify';
import axios from '../../../services/axiosConfig';

function BillingContent(props) {
	const dispatch = useDispatch();
	const [formValidate, setFormValidate] = useState(true);
	const [loading, setLoading] = useState(false);

	// const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	const { t } = useTranslation('setting_app');
	const company = useSelector(({ chatApp }) => chatApp?.company);

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
		if (company) {
			setForm({
				name: company.name,
				tax_code: company.tax_code,
				vat_number: company.vat_number,
				address: company.address,
				province: company.province,
				cap: company.cap,
				country: company.country,
				pec: company.pec,
				billing_email: company.billing_email,
				sdi: company.sdi
			});
		}
	}, [company]);

	const onSave = () => {
		setLoading(true);
		const formData = new FormData();
		const token = localStorage.getItem('jwt_access_token');
		for (const key in company) {
			if (company[key] && !(key in form) && key !== 'logo') {
				formData.append(key, company[key]);
			}
		}
		for (const key in form) {
			if (form[key]) formData.append(key, form[key]);
		}

		axios
			.put(USER_EDIT_COMPANY(company.id), formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `JWT ${token}`
				}
			})
			.then(res => {
				if (res) {
					setLoading(false);
					toast.success('Successfully saved!');

					if (document.referrer.includes('apps/companies')) {
						window.location = `https://back.edilcloud.io/api/frontend/payments/customer-portal?customer_id=${company?.customer}`;
					}
				}
			})
			.catch(error => {
				setLoading(false);
				toast.warn('Something went wrong.');
			});
	};

	return (
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
	);
}

export default BillingContent;
