import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React, { useCallback, useEffect } from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { SYSTEM_ROLES } from '../../../constants';

const defaultFormState = {
	first_name: '',
	last_name: '',
	email: ''
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
	const dispatch = useDispatch();
	const classes = useStyles();
	const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);
	const [value, setValue] = React.useState('English');
	const [role, setRole] = React.useState('');

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (contactDialog.type === 'edit' && contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
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
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

	function closeComposeDialog() {
		return contactDialog.type === 'edit'
			? dispatch(Actions.closeEditContactDialog())
			: dispatch(Actions.closeNewContactDialog());
	}

	function canBeSubmitted() {
		return form.first_name.length > 0 && form.last_name.length > 0 && form.email.length > 3 && role && value;
	}

	function handleSubmit(event) {
		event.preventDefault();
		let newformData = { ...form, role, language: value == 'English' ? 'en' : 'it' };
		// if (contactDialog.type === 'new') {
			dispatch(Actions.addContact(newformData));
		// } else {
		// 	dispatch(Actions.updateContact(newformData));
		// }
		closeComposeDialog();
	}

	function handleRemove() {
		dispatch(Actions.removeContact(form.id));
		closeComposeDialog();
	}
	const handleRadioChange = event => {
		setValue(event.target.value);
	};
	const handleSelectChange = event => {
		setRole(event.target.value);
	};
	return (
		<Dialog
			classes={{
				paper: 'm-24'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog.type === 'new' ? 'New Contact' : 'Edit Contact'}
					</Typography>
				</Toolbar>
				<div className="flex flex-col items-center justify-center pb-24">
					<Avatar className="w-96 h-96" alt="contact avatar" src={form.avatar} />
					{contactDialog.type === 'edit' && (
						<Typography variant="h6" color="inherit" className="pt-8">
							{form.name}
						</Typography>
					)}
				</div>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
					<div className="flex">
						<div className="min-w-48 pt-20">
							<Icon color="action">account_circle</Icon>
						</div>

						<TextField
							className="mb-24"
							label="Name"
							autoFocus
							id="first_name"
							name="first_name"
							value={form.name}
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
							label="Last name"
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
							className="mb-24"
							label="Email"
							id="email"
							name="email"
							value={form.email}
							onChange={handleChange}
							variant="outlined"
							fullWidth
						/>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20" />
						<FormControl className={classes.formControl}>
							<FormLabel component="legend">Role</FormLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={role}
								onChange={handleSelectChange}
							>
								{SYSTEM_ROLES.map(role => (
									<MenuItem value={role.key}>{role.label}</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className="flex">
						<div className="min-w-48 pt-20" />
						<FormControl component="fieldset">
							<FormLabel component="legend">Language</FormLabel>
							<RadioGroup
								row
								aria-label="Language"
								name="Language1"
								value={value}
								onChange={handleRadioChange}
							>
								<FormControlLabel value="English" control={<GreenRadio />} label="English" />
								<FormControlLabel value="Italian" control={<GreenRadio />} label="Italian" />
							</RadioGroup>
						</FormControl>
					</div>
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
								Add
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
								Save
							</Button>
						</div>
						<IconButton onClick={handleRemove}>
							<Icon>delete</Icon>
						</IconButton>
					</DialogActions>
				)}
			</form>
		</Dialog>
	);
}

export default ContactDialog;
