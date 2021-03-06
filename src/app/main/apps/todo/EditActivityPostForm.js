/* =============================================================================
 Todo: EditActivityPostForm.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for Edit activity show timeline of Activity
*/
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import {
	DialogContent,
	IconButton,
	Typography,
	Box,
	BottomNavigation,
	BottomNavigationAction
} from '@material-ui/core';
import moment from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { GET_COMPANY_PROJECT_TEAM_MEMBER_LIST } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';

const EditActivityForm = loadable(() => import('./EditActivityForm'));
const ShowUpload = loadable(() => import('../notes/todo/ShowUpload'));
const CreatePostForm = loadable(() => import('./CreatePostForm'));
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

function EditActivityPostForm(props) {
	const dispatch = useDispatch();
	const { t } = useTranslation('dashboard');
	const todoDialog = useSelector(({ todoApp }) => todoApp.todos.todoDialog);
	const upload = useSelector(({ todoApp }) => todoApp.todos.upload);
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
		setValue(0);
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
	/**
	 * getProjectCompanyTeamProfiles: get external & company team mates
	 */
	const getProjectCompanyTeamProfiles = value => {
		apiCall(
			GET_COMPANY_PROJECT_TEAM_MEMBER_LIST(
				todoDialog.data.project.id,
				todoDialog.data.assigned_company?.id,
				value
			),
			{},
			res => setProfiles(res),
			err => {
				// console.log(err)
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	const getName = profile => `${profile.profile.first_name} ${profile.profile.last_name}`;
	return (
		<div className="w-full custom-task-content">
			<div className="custom-tab-header2 flex justify-start relative">
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
				{!!upload?.isUploading && (
					<div className="linear-progress custom-color">
						<ShowUpload progress={upload.uploadPercentage} label={t('PROCESSING_UPLOADING_POST')} />
					</div>
				)}
			</div>
			<div className="my-24 todo-bg-footer p-12 px-20 rounded">
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
			{/**
			 * ======================================================
			 * 1.<CreatePostForm />
			 * To create timelien  or view posts on activity timeline
			 * ======================================================
			 * 2. 	<EditActivityForm />
			 * To edit activity
			 */}
			<DialogContent id="dialog-content" classes={{ root: 'p-0' }}>
				<TabPanel value={value} index={0} className="activity-pad write-post-img-full">
					<CreatePostForm />
				</TabPanel>
				<TabPanel value={value} index={1} className="bg-white">
					<EditActivityForm />
				</TabPanel>
			</DialogContent>
		</div>
	);
}

export default EditActivityPostForm;
