import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useForm } from '@fuse/hooks';
import { Avatar, Button, Dialog, DialogActions, DialogContent, Icon, Toolbar, AppBar, IconButton, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { STAFF_LIST, COMPANY_STAFF_LIST } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import CloseIcon from '@material-ui/icons/Close';
import { useRouteMatch } from 'react-router';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import * as ContactActions from './store/actions';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const defaultFormState = {
	first_name: '',
	last_name: '',
	email: '',
	position: '',
	phone: ''
};

function AddTeamMemberToProject(props) {
	const dispatch = useDispatch();
	const { t } = useTranslation('contacts_project');
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const contactDialog = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.contactDialog);
	const match = useRouteMatch();
	const [, setValue] = useState('English');
	const [role, setRole] = useState('');
	const [, setCanTryWithExisting] = useState(true);
	const [, setPermission] = useState({
		can_access_chat: true,
		can_access_files: true
	});
	const [filteredData, setFilteredData] = useState([]);
	const { setForm, resetForm } = useForm(defaultFormState);
	const [] = useState(null);
	const [, setViewCroper] = useState(false);
	const [member, setMember] = useState([]);
	const [, setIsExisting] = useState(false);
	const [, setFile] = useState({
		file: undefined,
		imagePreviewUrl: undefined
	});
	function getItemValue(item) {
		return `${item.first_name} ${item.last_name} ${item.company?.name ? `(${item.company.name})` : ''}`;
	}

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (contactDialog.props.open) {
			if (company.name) {
				retrieveDataAsynchronously();
			}
			return () => {
				setMember([]);
				setFilteredData([]);
			};
		}
	}, [contactDialog.props.open, company]);

	function closeComposeDialog() {
		setFile({
			file: undefined,
			imagePreviewUrl: undefined
		});
		dispatch(ContactActions.closeNewContactDialog());
	}

	function canBeSubmitted() {
		return member && member.length;
	}

	function handleSubmit(event) {
		// fields accept in the api
		// 'first_name', 'last_name', 'email',
		// 'language', 'position', 'user', 'phone',
		// 'fax', 'mobile', 'note', 'role', 'photo'
		event.preventDefault();

		// if (contactDialog.type === 'new') {
		let name = '';
		member.map((item, i) =>
			dispatch(
				ContactActions.addMemberToProject(
					match.params.id,
					{
						profile: item.data.id,
						role: item.data.role?.split('')?.[0]?.toLocaleLowerCase()
					},
					company.id != item.data.company?.id,
					i === member.length - 1,
					(err, showError) => {
						if (err) {
							name += `${getItemValue(item.data)}, `;
						}
						if (showError) {
							toast.error(`error occured during add ${name}`);
						}
					},
					props.handleSetLoading,
					name
				)
			)
		);
		closeComposeDialog();
	}

	const [] = React.useState({
		checkedA: true,
		checkedB: true
	});
	function retrieveDataAsynchronously(searchText) {
		const url =
			contactDialog.name === 'External'
				? STAFF_LIST(String(searchText), match.params.id)
				: COMPANY_STAFF_LIST(String(company.name), match.params.id);
		apiCall(
			url,
			{},
			res => {
				if (contactDialog.name === 'External') {
					setFilteredData(filterByValue(res.results, 'name', company.name));
				} else {
					setFilteredData(res);
				}
			},
			() => {
				setFilteredData([]);
			},
			METHOD.GET,
			getHeaderToken()
		);
	}
	const getString = strArg => strArg || '';
	const filterByValue = (arr = [], key, value) => arr.filter(item => item?.company?.[key] != value);
	return (
		<Dialog
			disableBackdropClick
			classes={{
				paper: 'm-24'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar>
					<div className="absolute right-0">
						<IconButton onClick={closeComposeDialog} edge="start" color="inherit" aria-label="close">
							<CloseIcon />
						</IconButton>
					</div>
					<Typography variant="subtitle1" color="inherit">
						{contactDialog.type === 'new'
							? t('ADD_TEAM_MEMBER_TO_PROJECT')
							: t('EDIT_TEAM_MEMBER_TO_PROJECT')}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col mt-16 md:overflow-hidden">
				<DialogContent classes={{ root: 'px-24 pt-24 pb-0 height-dialogcontent' }}>
					<div className="flex mb-10">
						<div className="min-w-48 pt-20">
							<Icon color="action">search</Icon>
						</div>
						<FuseChipSelect
							variant="fixed"
							className="custom-dropdown w-full"
							onChange={value => {
								setMember(value);
							}}
							isMulti
							value={member}
							placeholder={
								contactDialog.name === 'External' ? t('EXTERNAL_MEMBER') : t('INTERNAL_MEMBER')
							}
							textFieldProps={{
								onChange: e => retrieveDataAsynchronously(e.target.value),
								variant: 'outlined'
							}}
							options={filteredData.map(member => ({
								data: member,
								value: getItemValue(member),
								label: (
									<span className="flex items-center">
										<Avatar className="w-32 h-32" src={member.photo} />
										<span className="mx-8">{getItemValue(member)}</span>
									</span>
								)
							}))}
						/>
					</div>
					<div>
						<div className="flex flex-1 items-center justify-center h-full px-52 pt-12">
							<Typography color="textSecondary" variant="subtitle1" className="text-center">
								search for One or multiple existent profile in edilcloud ( owner or delegate ) and add to this project for collaborare in Cloud
							</Typography>
						</div>
						<div className="flex flex-1 items-center justify-center h-full">
							<img className="w-400" src="assets/images/errors/nofiles.png" />
						</div>
						{/* <div className="flex flex-1 mt-20 items-center justify-center h-full">
							<Typography color="textSecondary" variant="h6">
								{t('CREATE_FILE_ADVICE')}
							</Typography>
						</div> */}
					</div>
				</DialogContent>
			</form>
			<DialogActions className="p-24">
				<Button
					variant="contained"
					color="primary"
					onClick={handleSubmit}
					type="submit"
					disabled={!canBeSubmitted()}
				>
					Add
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default AddTeamMemberToProject;
