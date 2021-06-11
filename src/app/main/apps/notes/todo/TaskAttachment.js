/* =============================================================================
 TODO: TaskContentForm.js
 ===============================================================================
This is part of dashboard 
TODO: This file is created edit task / attchments / timeline
*/
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import { useForm } from '@fuse/hooks';
import _ from '@lodash';
import {
	DialogContent,
	Icon,
	IconButton,
	Box,
	Typography,
	makeStyles,
	Slider,
	withStyles
} from '@material-ui/core';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import * as Actions from './store/actions';

const CreateAttachments = loadable(() => import('app/main/apps/notes/todo/Dialog/attachment/CreateAttachments'));

function TabPanel(props) {
	/**
	 * Tab panel is used for show tab
	 */
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

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		minHeight: '100%',
		backgroundColor: theme.palette.background.paper
	}
}));
/**
 * marks for set progress
 */
const marks = [
	{
		value: 0
	},
	{
		value: 10
	},
	{
		value: 20
	},
	{
		value: 30
	},
	{
		value: 40
	},
	{
		value: 50
	},
	{
		value: 60
	},
	{
		value: 70
	},
	{
		value: 80
	},
	{
		value: 90
	},
	{
		value: 100
	}
];
const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
/**
 * set progress from Slider
 */
const IOSSlider = withStyles({
	root: {
		color: '#3880ff',
		height: 2,
		padding: '15px 0'
	},
	thumb: {
		height: 28,
		width: 28,
		backgroundColor: '#fff',
		boxShadow: iOSBoxShadow,
		marginTop: -14,
		marginLeft: -14,
		'&:focus, &:hover, &$active': {
			boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				boxShadow: iOSBoxShadow
			}
		}
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 12px)',
		top: -22,
		'& *': {
			background: 'transparent',
			color: '#000'
		}
	},
	track: {
		height: 2
	},
	rail: {
		height: 2,
		opacity: 0.5,
		backgroundColor: '#bfbfbf'
	},
	mark: {
		backgroundColor: '#bfbfbf',
		height: 8,
		width: 1,
		marginTop: -3
	},
	markActive: {
		opacity: 1,
		backgroundColor: 'currentColor'
	}
})(Slider);

function TaskAttachment(props) {
	const { t } = useTranslation('dashboard'); // translate dashbord
	const dispatch = useDispatch();
	const upload = useSelector(({ todoAppNote }) => todoAppNote.todos.upload);
	const taskContent = useSelector(({ todoAppNote }) => todoAppNote.todos.taskContentDialog);
	const taskContentData = useSelector(({ todoAppNote }) => todoAppNote.todos.taskContentDialog?.data);
	const openDrawingContent = useSelector(({ todoAppNote }) => todoAppNote.todos.openDrawingContent);
	const companies = useSelector(({ contactsApp }) => contactsApp.contacts.approvedCompanies);
	const [profileData, setProfileData] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [company, setCompany] = useState([]);
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(false);
	const routeParams = useParams();
	const companyDetail = useSelector(({ chatApp }) => chatApp?.company);
	const projectDetail = taskContentData?.project;
	const [taskDate, setTaskDate] = useState({
		startDate: new Date(),
		endDate: undefined
	});
	const [value, setValue] = React.useState(0);
	const getName = profile => `${profile.first_name} ${profile.last_name}`;

	useEffect(() => {
		if (openDrawingContent) {
			setValue(1);
			a11yProps(1);
		}
	}, [openDrawingContent]);

	useEffect(() => {
		if (companies && companies.length && taskContentData) {
			const company = [...companies]
				.filter(company => company.profile?.company?.id == taskContentData?.assigned_company?.id)
				.map(company => ({
					data: company,
					value: company.profile?.company?.name,
					label: (
						<span className="flex items-center">
							<Icon
								className="list-item-icon mx-6 text-20"
								style={{ color: company.profile.company?.color_project }}
								color="action"
							>
								label
							</Icon>{' '}
							{company.profile.company.name}
						</span>
					)
				}));
			setCompany(company);
		}
		if (taskContentData) {
			if (taskContentData.isGantt) {
				if (taskContentData.parent == 1) {
					// parrent 1 means its activty
					setTaskDate({
						startDate: new Date(taskContentData.datetime_start),
						endDate: new Date(taskContentData.datetime_end)
					});
					setProgress(taskContentData.progress);
					setProfileData(
						taskContentData.workers.map(profile => ({
							data: profile,
							value: getName(profile),
							label: <span className="flex items-center">{getName(profile)}</span>
						}))
					);
					getProjectCompanyTeamProfiles();
				} else {
					setTaskDate({
						startDate: new Date(taskContentData.date_start),
						endDate: new Date(taskContentData.date_end)
					});
					setProgress(taskContentData.progress);
					setCompany([{ data: taskContentData.assigned_company }]);
				}
			} else {
				setTaskDate({
					startDate: new Date(taskContentData.date_start),
					endDate: new Date(taskContentData.date_end)
				});
				setProgress(taskContentData.progress);
				setCompany([{ data: taskContentData.assigned_company }]);
			}
		}
	}, [companies, taskContentData]);
	useEffect(() => {
		setValue(0);
	}, [taskContentData]);
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;

	const { form: cardForm, handleChange, setForm, setInForm } = useForm({
		name: taskContentData?.parent == 1 ? taskContentData?.title : taskContentData?.name,
		description: taskContentData?.parent == 1 ? taskContentData?.description : taskContentData?.note
	});

	const dueDate = cardForm && cardForm.due ? moment(cardForm.due).format(moment.HTML5_FMT.DATE) : '';

	const isFormInvalid = () => cardForm.name && cardForm.name.length > 0 && taskDate.startDate && taskDate.endDate;

	const handleSubmit = () => {
		setLoading(true);
		dispatch(
			Actions.editTodo(
				{
					...cardForm,
					id: taskContentData.id,
					company,
					profile: profileData,
					progress,
					...taskDate
				},
				taskContentData.project.id,
				taskContent.type,
				() => {
					dispatch(Actions.closeTaskContent());
				},
				taskContentData.isGantt,
				setLoading
			)
		);
	};

	const getIsDisabled = () =>
		taskContentData?.assigned_company?.id != companyDetail.id || getRole() == 'w' || getRole() == 'm';

	const getProjectCompanyTeamProfiles = value => {
		// apiCall(
		// 	GET_COMPANY_PROJECT_TEAM_MEMBER_LIST(routeParams.id, taskContentData.assigned_company.id, value),
		// 	{},
		// 	res => setProfiles(res),
		// 	err => console.log(err),
		// 	METHOD.GET,
		// 	getHeaderToken()
		// );
	};

	return (
		<div className="w-full custom-task-content mt-20">
			<div className="absolute right-m-12">
				<IconButton
					onClick={ev => dispatch(Actions.closeDrawingContent())}
					edge="start"
					color="inherit"
					aria-label="close"
					className="close-icon"
				>
					<CloseIcon />
				</IconButton>
			</div>
			<DialogContent id="dialog-content" className="p-0">
				<div className="sm:mx-12">
					<CreateAttachments taskId={taskContentData?.id} attachments={taskContentData?.media_set} />
				</div>
			</DialogContent>
		</div>
	);
}

export default TaskAttachment;
