import { useForm } from '@fuse/hooks';
import { AppBar, Avatar, Dialog, DialogContent, Toolbar, Typography } from '@material-ui/core';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { SYSTEM_ROLES } from 'app/constants';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';

const defaultFormState = {
	first_name: '',
	last_name: '',
	email: ''
};

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));
function ViewContactDialog(props) {
	const { t } = useTranslation('contacts_project');
	const dispatch = useDispatch();
	const classes = useStyles();
	const contactDialog = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.contactDialog);
	const [value, setValue] = React.useState('English');
	const [role, setRole] = React.useState('');

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type get dialog data
		 */
		if (contactDialog.type === 'view' && contactDialog.data.profile) {
			setForm({ ...contactDialog.data.profile });
			setRole(contactDialog.data.profile.role);
			setValue(contactDialog.data.profile.language == 'en' ? 'English' : 'Italian');
		}
	}, [contactDialog.data, contactDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (contactDialog.props.view) {
			initDialog();
		}
	}, [contactDialog.props.view, initDialog]);

	function closeComposeDialog() {
		return dispatch(Actions.closeViewContactDialog());
	}

	function canBeSubmitted() {
		return form.first_name?.length > 0 && form.last_name?.length > 0 && form.email?.length > 3 && role && value;
	}

	function handleSubmit(event) {
		event.preventDefault();
		const allData = {
			...form,
			role: SYSTEM_ROLES.filter(d => d.label == role)[0].key,
			language: value == 'English' ? 'en' : 'it'
		};
		if (contactDialog.type === 'new') {
			dispatch(Actions.addContact({ ...allData, id: undefined }));
		} else {
			const { first_name, last_name, email, id } = allData;
			const newformData = {
				first_name,
				last_name,
				email,
				role: SYSTEM_ROLES.filter(d => d.label == role)[0].key,
				language: value == 'English' ? 'en' : 'it'
			};
			dispatch(Actions.updateContact(newformData, id));
		}
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(Actions.removeContact(form.id));
		closeComposeDialog();
	}
	// const handleRadioChange = event => {
	// 	setValue(event.target.value);
	// };
	const handleSelectChange = event => {
		setRole(event.target.value);
	};
	
	return (
		<Dialog
			classes={{
				paper: 'm-24'
			}}
			{...contactDialog.props}
			open={contactDialog.props.view}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full border-0">
					<Typography variant="subtitle1" color="inherit">
						{t('VIEW_CONTACT')}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					<Avatar className="w-96 h-96" alt="contact avatar" src={form.photo} />
					{contactDialog.type === 'view' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{form.first_name}
						</Typography>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex flex-auto justify-between items-center w-full container p-0 lg:px-16 mb-12">
						<div className="min-w-96">
							<Typography className="text-base">{t('NAME')}</Typography>
						</div>
						<Typography variant="h6" className="text-base">
							{form.first_name}
						</Typography>
					</div>

					<div className="flex flex-auto justify-between items-center w-full container p-0 lg:px-16 mb-12">
						<div className="min-w-96 ">
							<Typography className="text-base">{t('LAST_NAME')}</Typography>
						</div>
						<Typography variant="h6" className="text-base">
							{form.last_name}
						</Typography>
					</div>
					<div className="flex flex-auto justify-between items-center w-full container p-0 lg:px-16 mb-12">
						<div className="min-w-96 ">
							<Typography className="text-base">{t('EMAIL')}</Typography>
						</div>

						<Typography variant="h6" className="text-base view-contact-popup-link">
							<a href={`mailto:${form.email}`}>{form.email}</a>
						</Typography>
					</div>
					{form.phone && (
						<div className="flex flex-auto justify-between items-center w-full container p-0 lg:px-16 mb-12">
							<div className="min-w-96 ">
								<Typography className="text-base">{t('PHONE')}</Typography>
							</div>

							<Typography variant="h6" className="text-base view-contact-popup-link">
								<a href={`tel:${form.phone}`}>{form.phone}</a>
							</Typography>
						</div>
					)}
					<div className="flex flex-auto justify-between items-center w-full container p-0 lg:px-16 mb-12">
						<div className="min-w-96 ">
							<Typography className="text-base">{t('ROLE')}</Typography>
						</div>
						<Typography variant="h6" className="text-base">
							{form.role}
						</Typography>
					</div>
					<div className="flex flex-auto justify-between items-center w-full container p-0 lg:px-16 mb-12">
						<div className="min-w-96 ">
							<Typography className="text-base">{t('LANGUAGE')}</Typography>
						</div>
						<Typography variant="h6" className="text-base">
							{value}
						</Typography>
					</div>
				</DialogContent>
			</form>
		</Dialog>
	);
}

export default ViewContactDialog;
