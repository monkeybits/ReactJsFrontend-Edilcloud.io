/* =============================================================================
 ContactDialogContent.js
 ===============================================================================
*This file is created for ContactsApp
TODO: dialog to create new company team member
*/
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import {
	AppBar,
	Avatar,
	Button,
	DialogActions,
	DialogContent,
	Icon,
	IconButton,
	TextField,
	Toolbar,
	Typography,
	Checkbox,
	Radio
} from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EditIcon from '@material-ui/icons/Edit';
import { SEARCH_USER_BY_EMAIL } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken, decodeDataFromToken, getCompressFile } from 'app/services/serviceUtils';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import { SYSTEM_ROLES } from '../../../constants';
import * as Actions from './store/actions';
// import loadable from '@loadable/component';
const ImageCropper = React.lazy(() => import('app/main/mainProfile/ImageCropper'));
const AsyncAutocomplete = React.lazy(() => import('./AsyncAutocomplete'));

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const defaultFormState = {
	first_name: '',
	last_name: '',
	email: '',
	position: '',
	phone: ''
};
const GreenRadio = withStyles({
	root: {
		color: green[400],
		'&$checked': {
			color: green[600]
		}
	},
	checked: {}
})(props => <Radio color="default" {...props} />);

const useStyles = makeStyles(theme => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));
function ContactDialog(props) {
	const { t } = useTranslation('contacts');
	const dispatch = useDispatch();
	const classes = useStyles();
	const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);
	const [value, setValue] = useState('English');
	const [role, setRole] = useState('');
	const [canTryWithExisting, setCanTryWithExisting] = useState(true);
	const inputFile = useRef(null);
	const [permission, setPermission] = useState({
		can_access_chat: true,
		can_access_files: true
	});
	const { form, handleChange, setForm, resetForm } = useForm(defaultFormState);
	const [image, setImage] = useState(null);
	const [viewCroper, setViewCroper] = useState(false);
	const [isExisting, setIsExisting] = useState(false);
	const [fileData, setFile] = useState({
		file: undefined,
		imagePreviewUrl: undefined
	});
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const getPhoto = fileData => {
		const reader = new FileReader();

		reader.onloadend = () => {
			setFile({
				file: fileData,
				imagePreviewUrl: reader.result
			});
		};

		reader.readAsDataURL(fileData);
	};
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (contactDialog.type === 'edit' && contactDialog.data) {
			setForm({ ...contactDialog.data });
			setRole(contactDialog.data.role);
			setValue(contactDialog.data.language == 'en' ? 'English' : 'Italian');
			setPermission({
				can_access_chat: contactDialog.data.can_access_chat,
				can_access_files: contactDialog.data.can_access_files
			});
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
			setPermission({
				can_access_chat: true,
				can_access_files: true
			});
			setForm({
				...defaultFormState,
				...contactDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [contactDialog.data, contactDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		setCanTryWithExisting(true);
		if (contactDialog.props.open) {
			initDialog();
			return () => {
				resetForm();
				setForm({});
				setValue('English');
				setRole('');
				setFile({
					file: undefined,
					imagePreviewUrl: undefined
				});
				setViewCroper(false);
				setIsExisting(false);
				setPermission({
					can_access_chat: true,
					can_access_files: true
				});
				setCanTryWithExisting(true);
			};
		}
	}, [contactDialog.props.open]);

	function closeComposeDialog() {
		setFile({
			file: undefined,
			imagePreviewUrl: undefined
		});
		return contactDialog.type === 'edit'
			? dispatch(Actions.closeEditContactDialog())
			: dispatch(Actions.closeNewContactDialog());
	}

	function canBeSubmitted() {
		if (isExisting || contactDialog.type !== 'new') {
			return form.first_name?.length > 0 && form.last_name?.length > 0 && form.email?.length > 3 && role && value;
		}
		if (form.email) {
			apiCall(
				SEARCH_USER_BY_EMAIL(String(form.email)),
				{},
				res => {
					if (res && res.length) {
						setCanTryWithExisting(false);
					} else {
						setCanTryWithExisting(true);
					}
				},
				err => {},
				METHOD.GET,
				getHeaderToken()
			);
		}
		return (
			canTryWithExisting &&
			form.first_name?.length > 0 &&
			form.last_name?.length > 0 &&
			form.email?.length > 3 &&
			role &&
			value
		);
	}

	const handleSubmit = async event => {
		// fields accept in the api
		// 'first_name', 'last_name', 'email',
		// 'language', 'position', 'user', 'phone',
		// 'fax', 'mobile', 'note', 'role', 'photo'
		event.preventDefault();
		const allData = {
			...form,
			role: SYSTEM_ROLES.filter(d => d.label == role)[0].key,
			language: value == 'English' ? 'en' : 'it'
		};
		const { first_name, last_name, email, id, company, position, phone } = allData;
		const newformData = {
			id,
			first_name,
			last_name,
			email,
			role: SYSTEM_ROLES.filter(d => d.label == role)[0].key,
			language: value == 'English' ? 'en' : 'it',
			photo: await getCompressFile(fileData.file),
			position,
			phone,
			...permission
		};
		if (contactDialog.type === 'new') {
			dispatch(
				Actions.addContact(
					{
						...newformData,
						photo: await getCompressFile(fileData.file),
						id: isExisting ? newformData.id : undefined
					},
					isExisting,
					props.handleSetLoading
				)
			);
		} else {
			dispatch(Actions.updateContact(newformData, id, true, undefined, contactDialog.data.status));
		}
		closeComposeDialog();
	};

	function handleRemove() {
		dispatch(Actions.removeContact(form.id));
		closeComposeDialog();
	}

	function handleOpenFileClick(e) {
		inputFile.current.click();
	}
	const [state, setState] = React.useState({
		checkedA: true,
		checkedB: true
	});

	return viewCroper ? (
		<ImageCropper image={image} viewCroper={viewCroper} onCrop={getPhoto} onHide={() => setViewCroper(false)} />
	) : (
		<>
			<AppBar position="static" elevation={1}>
				<Toolbar className="border-0">
					<div className="absolute top-0 right-0 mr-4">
						<IconButton onClick={closeComposeDialog} edge="start" color="inherit" aria-label="close">
							<CloseIcon />
						</IconButton>
					</div>
					<Typography variant="subtitle1" className="block mx-auto mb-8" color="inherit">
						{contactDialog.type === 'new' ? t('ADD_TEAM_MEMBER') : t('EDIT_TEAM_MEMBER')}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					<div className="relative">
						<Avatar
							className="w-96 h-96 cursor-pointer"
							alt="contact avatar"
							src={
								fileData.imagePreviewUrl
									? fileData.imagePreviewUrl
									: form.photo
									? form.photo
									: form.avatar
							}
							onClick={handleOpenFileClick}
						/>
						<a onClick={handleOpenFileClick} className="edit-icon text-center rounded-full cursor-pointer">
							<EditIcon fontSize="small" />
						</a>
						{/* <a onClick={handleOpenFileClick} className="delete-icon text-center rounded-full cursor-pointer" >
							<DeleteIcon fontSize="small"  />
						</a> */}
					</div>
					<input
						type="file"
						id="file"
						ref={inputFile}
						onChange={e => {
							setImage(URL.createObjectURL(e.currentTarget.files[0]));
							setViewCroper(true);
						}}
						style={{ display: 'none' }}
					/>

					{contactDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{form.name}
						</Typography>
					)}
				</div>
				<div className="mb-24 block mx-auto">
					<Button
						variant={permission.can_access_files ? 'contained' : 'outlined'}
						disabled={getRole() == 'm' || getRole() == 'w'}
						size="small"
						color="secondary"
						className="mr-8"
						onClick={() =>
							setPermission(prev => ({
								...prev,
								can_access_files: !prev.can_access_files
							}))
						}
					>
						{t('ACCESS_FILE')}
					</Button>
					<Button
						variant={permission.can_access_chat ? 'contained' : 'outlined'}
						size="small"
						color="secondary"
						disabled={getRole() == 'm' || getRole() == 'w'}
						onClick={() =>
							setPermission(prev => ({
								...prev,
								can_access_chat: !prev.can_access_chat
							}))
						}
					>
						{t('ACCESS_CHAT')}
					</Button>
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					{contactDialog.type === 'new' && contactDialog.name === 'Search' && (
						<div className="flex">
							<div className="min-w-48 pt-20">
								<Icon color="action">search</Icon>
							</div>
							<AsyncAutocomplete
								placeholder={t('EXISTING_MEMBER_SEARCH')}
								onSelect={item => {
									setFile({});
									setIsExisting(true);
									setRole(item.role);
									setValue(item.language == 'en' ? 'English' : 'Italian');
									setForm({ ...item });
									// role: undefined, language: undefined
								}}
							/>
						</div>
					)}
					{contactDialog.name !== 'Search' && (
						<>
							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">account_circle</Icon>
								</div>

								<TextField
									className="mb-24"
									label={t('NAME')}
									id="first_name"
									name="first_name"
									value={form.first_name}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
							</div>

							<div className="flex">
								<div className="min-w-48 pt-20" />
								<TextField
									className="mb-24"
									label={t('LAST_NAME')}
									id="last_name"
									name="last_name"
									value={form.last_name}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>

							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">email</Icon>
								</div>
								<TextField
									error={!isExisting && !canTryWithExisting}
									className="mb-24"
									label={t('EMAIL')}
									id="email"
									name="email"
									value={form.email}
									onChange={e => {
										handleChange(e);
									}}
									helperText={!isExisting && !canTryWithExisting && 'Try with existing users'}
									variant="outlined"
									fullWidth
								/>
							</div>
							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">nature_people</Icon>
								</div>
								<Autocomplete
									options={SYSTEM_ROLES}
									style={{ width: '100%' }}
									className="mb-24"
									disabled={(contactDialog.type != 'new' && getRole() == 'm') || getRole() == 'w'}
									getOptionLabel={option => option.label}
									renderOption={(option, { selected }) => (
										<>
											<Checkbox
												icon={icon}
												checkedIcon={checkedIcon}
												style={{ marginRight: 8 }}
												checked={selected}
											/>
											{option.label}
										</>
									)}
									defaultValue={
										SYSTEM_ROLES.filter(d => d.label == role).length &&
										SYSTEM_ROLES.filter(d => d.label == role)[0]
									}
									inputValue={role}
									renderInput={params => (
										<TextField {...params} variant="outlined" label={t('ROLE')} />
									)}
									onInputChange={(e, value) => setRole(value)}
								/>
							</div>
							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">translate</Icon>
								</div>
								<Autocomplete
									className="mb-24"
									options={['English', 'Italian']}
									style={{ width: '100%' }}
									disableCloseOnSelect
									getOptionLabel={option => option}
									renderOption={(option, { selected }) => (
										<>
											<Checkbox
												icon={icon}
												checkedIcon={checkedIcon}
												style={{ marginRight: 8 }}
												checked={selected}
											/>
											{option}
										</>
									)}
									defaultValue={value}
									inputValue={value}
									renderInput={params => (
										<TextField {...params} variant="outlined" label={t('LANGUAGE')} />
									)}
									onInputChange={(e, value) => setValue(value)}
								/>
							</div>
							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">work</Icon>
								</div>
								<TextField
									className="mb-24"
									disabled={getRole() == 'm' || getRole() == 'w'}
									label={t('JOB_TITLE')}
									id="position"
									name="position"
									value={form.position}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>
							<div className="flex">
								<div className="min-w-48 pt-20">
									<Icon color="action">phone</Icon>
								</div>
								<TextField
									className="mb-24"
									label={t('PHONE')}
									id="phone"
									name="phone"
									value={form.phone}
									onChange={handleChange}
									variant="outlined"
									fullWidth
								/>
							</div>
						</>
					)}{' '}
				</DialogContent>

				{contactDialog.type === 'new' ? (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={!canBeSubmitted()}
							>
								{t('ADD')}
							</Button>
						</div>
					</DialogActions>
				) : (
					<DialogActions className="justify-between p-8">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								type="submit"
								onClick={handleSubmit}
								disabled={!canBeSubmitted()}
							>
								{t('SAVE')}
							</Button>
						</div>
						<IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</>
	);
}

export default ContactDialog;
