import PropTypes from 'prop-types';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { amber, red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import { Box, Slider, withStyles } from '@material-ui/core';
import { GET_COMPANY_PROJECT_TEAM_MEMBER_LIST } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import CreatePostForm from './CreatePostForm';
import CloseIcon from '@material-ui/icons/Close';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EditActivityForm from './EditActivityForm';
import FavoriteIcon from '@material-ui/icons/Favorite';
function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`wrapped-tabpanel-${index}`}
			aria-labelledby={`wrapped-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `wrapped-tab-${index}`,
		'aria-controls': `wrapped-tabpanel-${index}`
	};
}

const defaultFormState = {
	id: '',
	title: '',
	notes: '',
	startDate: new Date(),
	dueDate: new Date(),
	completed: false,
	starred: false,
	important: false,
	deleted: false,
	labels: []
};
const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

function CreatePostDialog(props) {
	const dispatch = useDispatch();
	const todoDialog = useSelector(({ todoApp }) => todoApp.todos.todoDialog);
	const [value, setValue] = React.useState(0);
	const labels = useSelector(({ todoApp }) => todoApp.labels);
	const companies = useSelector(({ contactsApp }) => contactsApp.contacts.approvedCompanies);
	const [labelMenuEl, setLabelMenuEl] = useState(null);
	const { form, handleChange, setForm, resetForm } = useForm({ ...defaultFormState });
	const startDate = moment(form.startDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	const dueDate = moment(form.dueDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	const [company, setCompany] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [profileData, setProfileData] = useState([]);
	const [progress, setProgress] = useState(0);
	const routeParams = useParams();
	const [taskDate, setTaskDate] = useState({
		startDate: new Date(),
		endDate: undefined
	});
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (todoDialog.type === 'edit' && todoDialog.data) {
			setForm({ ...todoDialog.data });
		}
		if (todoDialog.type === 'activity' && todoDialog.data?.assigned_company) {
			getProjectCompanyTeamProfiles();
			setTaskDate({
				startDate: new Date(todoDialog.data.date_start),
				endDate: new Date(todoDialog.data.date_end)
			});
		}
		/**
		 * Dialog type: 'new'
		 */
		if (todoDialog.type === 'new') {
			setCompany([]);
			setTaskDate({
				startDate: new Date(),
				endDate: undefined
			});
			setForm({
				...defaultFormState,
				...todoDialog.data,
				id: FuseUtils.generateGUID()
			});
		}
	}, [todoDialog.data, todoDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (todoDialog.props.openTimelineDialog) {
			initDialog();
			return () => {
				resetForm();
				dispatch(Actions.getTodos(routeParams));
			};
		}
	}, [todoDialog.props.openTimelineDialog, initDialog]);

	function closeTodoDialog() {
		return dispatch(Actions.closeTimelineDialog());
	}

	function handleLabelMenuOpen(event) {
		setLabelMenuEl(event.currentTarget);
	}

	function handleLabelMenuClose(event) {
		setLabelMenuEl(null);
	}

	function handleToggleImportant() {
		setForm({
			...form,
			important: !form.important
		});
	}

	function handleToggleStarred() {
		setForm({
			...form,
			starred: !form.starred
		});
	}

	function handleToggleLabel(event, id) {
		event.stopPropagation();
		setForm(
			_.set({
				...form,
				labels: form.labels.includes(id) ? form.labels.filter(labelId => labelId !== id) : [...form.labels, id]
			})
		);
	}

	function toggleCompleted() {
		setForm({
			...form,
			completed: !form.completed
		});
	}

	function canBeSubmitted() {
		return form.title.length > 0 && taskDate.startDate && taskDate.endDate;
	}
	const getProjectCompanyTeamProfiles = value => {
		apiCall(
			GET_COMPANY_PROJECT_TEAM_MEMBER_LIST(todoDialog.data.project.id, todoDialog.data.assigned_company?.id, value),
			{},
			res => setProfiles(res),
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	const getName = profile => profile.profile.first_name + ' ' + profile.profile.last_name;
	return (
		<Dialog
			open={todoDialog.props.openTimelineDialog}
			onClose={closeTodoDialog}
			fullWidth
			maxWidth="sm"
			className="rs-dialog-sm-full custom-modal-new timeline-modal"
		>
			<div className="custom-tab-header flex justify-start relative">
				<BottomNavigation
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					showLabels
				>
					<BottomNavigationAction label="Timeline" wrapped {...a11yProps(0)} />
					<BottomNavigationAction label="Activity" {...a11yProps(1)} />
				</BottomNavigation>
				<div className="absolute right-m-12">
					<IconButton
						onClick={closeTodoDialog}
						edge="start"
						color="inherit"
						aria-label="close"
						className="close-icon"
					>
						<CloseIcon />
					</IconButton>
				</div>
			</div>
			<div className="mt-24 mx-24 sm:mx-32 todo-bg-footer p-12 px-20 rounded">
				{todoDialog.data?.task?.project && (
					<Typography variant="h6" color="inherit" className="font-size-18 font-weight-700">
						<div>{todoDialog.data?.task?.project.name}</div>
					</Typography>
				)}
				<div className="flex items-center font-size-12">
					<div className="my-4">{todoDialog.data?.task?.name}</div> <span className="mx-12">{' > '}</span>
					<div>{todoDialog.data?.todo?.title}</div>
				</div>
			</div>
			<DialogContent id="dialog-content" classes={{ root: 'p-0' }}>
				<TabPanel value={value} index={0}>
					<CreatePostForm />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<EditActivityForm />
				</TabPanel>
			</DialogContent>
		</Dialog>
	);
}

export default CreatePostDialog;
