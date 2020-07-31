import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { COMPANY_STAFF_LIST } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import { SYSTEM_ROLES } from 'app/constants';
import * as Actions from 'app/main/apps/notes/store/actions';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import * as ContactActions from './store/actions';
import { useRouteMatch } from 'react-router';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const defaultFormState = {
	first_name: '',
	last_name: '',
	email: '',
	position: '',
	phone: ''
};

function AddTeamMemberToProject() {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);
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
			return () => {
				setMember([]);
			};
		}
	}, [contactDialog.props.open]);

	function closeComposeDialog() {
		setFile({
			file: undefined,
			imagePreviewUrl: undefined
		});
		dispatch(ContactActions.closeNewContactDialog());
	}

	function canBeSubmitted() {
		return member && member.length && role;
	}

	function handleSubmit(event) {
		// fields accept in the api
		// 'first_name', 'last_name', 'email',
		// 'language', 'position', 'user', 'phone',
		// 'fax', 'mobile', 'note', 'role', 'photo'
		event.preventDefault();

		// if (contactDialog.type === 'new') {
		dispatch(
			ContactActions.addMemberToProject(match.params.id, {
				profile: member[0].data.id,
				role: SYSTEM_ROLES.filter(d => d.label == role)[0].key
			})
		);
		closeComposeDialog();
	}

	const [] = React.useState({
		checkedA: true,
		checkedB: true
	});
	function retrieveDataAsynchronously(searchText) {
		apiCall(
			COMPANY_STAFF_LIST(String(searchText)),
			{},
			res => {
				setFilteredData(res.results);
			},
			() => {
				setFilteredData([]);
			},
			METHOD.GET,
			getHeaderToken()
		);
	}
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
						{contactDialog.type === 'new' ? 'Add Team Member to Project' : 'Edit Team Member to Project'}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col mt-16 md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24 pb-4' }}>
					<div className="flex mb-10">
						<div className="min-w-48 pt-20">
							<Icon color="action">search</Icon>
						</div>
						<FuseChipSelect
							className="custom-dropdown w-full"
							onChange={value => {
								setMember(value.splice(value.length - 1));
							}}
							isMulti
							value={member}
							placeholder="Search Project coordinators"
							textFieldProps={{
								onChange: e => retrieveDataAsynchronously(e.target.value),
								variant: 'outlined'
							}}
							options={filteredData.map(member => ({
								data: member,
								value: member.first_name,
								label: (
									<span className="flex items-center">
										<Avatar className="w-32 h-32" src={member.photo} />
										<span className="mx-8">{getItemValue(member)}</span>
									</span>
								)
							}))}
							variant="outlined"
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
							renderInput={params => <TextField {...params} variant="outlined" label="Role" />}
							onInputChange={(e, value) => setRole(value)}
						/>
					</div>
				</DialogContent>
			</form>
			<DialogActions className="justify-between p-8">
				<div className="px-16 mb-20">
					<Button
						variant="contained"
						color="primary"
						onClick={handleSubmit}
						type="submit"
						disabled={!canBeSubmitted()}
					>
						Add
					</Button>
				</div>
			</DialogActions>
		</Dialog>
	);
}

export default AddTeamMemberToProject;
