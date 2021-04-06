/* =============================================================================
 TODO: TaskContentForm.js
 ===============================================================================
This is part of dashboard 
TODO: This file is created edit task / attchments / timeline
*/
import PropTypes from 'prop-types';
import loadable from '@loadable/component';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useForm } from '@fuse/hooks';
import _ from '@lodash';
import { DialogContent, Icon, IconButton, InputAdornment, Box, TextField, Typography, Button, makeStyles, Slider, withStyles, CircularProgress, BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import moment from 'moment';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	KeyboardDatePicker
  } from '@material-ui/pickers';
import { useParams } from 'react-router';
import * as Actions from './store/actions';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
const ShowUpload = loadable(() => import('../notes/todo/ShowUpload'))
const CreatePostForm = loadable(() => import('./CreatePostForm'))
const CreateAttachments = loadable(() => import('app/main/apps/notes/todo/Dialog/attachment/CreateAttachments'))
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

function TaskContentForm(props) {
	const { t } = useTranslation('dashboard'); // translate dashbord
	const dispatch = useDispatch();
	const upload = useSelector(({ todoApp }) => todoApp.todos.upload);
	const taskContent = useSelector(({ todoApp }) => todoApp.todos.taskContentDialog);
	const taskContentData = useSelector(({ todoApp }) => todoApp.todos.taskContentDialog?.data);
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
		console.log('openDrawingContent?????????????????????????', openDrawingContent)
		if (openDrawingContent) {
			setValue(1);
			a11yProps(1)
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
			console.log({ taskContentData, date_start: taskContentData.date_start });
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

	// useUpdateEffect(() => {
	// 	updateCard(board.id, cardForm);
	// }, [dispatch, board.id, cardForm, updateCard]);

	function removeDue() {
		setInForm('due', null);
	}

	function toggleLabel(labelId) {
		// setInForm('idLabels', _.xor(cardForm.idLabels, [labelId]));
	}

	function toggleMember(memberId) {
		// setInForm('idMembers', _.xor(cardForm.idMembers, [memberId]));
	}

	function addCheckList(newList) {
		// setInForm('checklists', [...cardForm.checklists, newList]);
	}

	function removeCover() {
		setInForm('idAttachmentCover', '');
	}

	function removeAttachment(attachmentId) {
		setForm({
			...cardForm,
			attachments: _.reject(cardForm.attachments, { id: attachmentId }),
			idAttachmentCover: cardForm.idAttachmentCover === attachmentId ? '' : cardForm.idAttachmentCover
		});
	}

	const handleCheckListChange = useCallback(
		(item, index) => {
			setInForm(`checklists[${index}]`, item);
		},
		[setInForm]
	);

	function removeCheckList(id) {
		setInForm('checklists', _.reject(cardForm.checklists, { id }));
	}

	function commentAdd(comment) {
		// return setInForm('activities', [comment, ...cardForm.activities]);
	}
	const handleTabChange = (event, newValue) => {
		setValue(newValue);
	};
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
	console.log({
		getIsDisabled: getIsDisabled(),
		projectDetail,
		companyDetail: companyDetail.id,
		getRole: getRole()
	});

	const getProjectCompanyTeamProfiles = value => {
		console.log(routeParams.id, taskContentData, value);
		// apiCall(
		// 	GET_COMPANY_PROJECT_TEAM_MEMBER_LIST(routeParams.id, taskContentData.assigned_company.id, value),
		// 	{},
		// 	res => setProfiles(res),
		// 	err => console.log(err),
		// 	METHOD.GET,
		// 	getHeaderToken()
		// );
	};

	console.log('company>>>>>>>>>>>>>>>>>>>', company)
	console.log('company>>>>>>>>>>>>>>>>>>>', companies)

	return (
		<div className="w-full custom-task-content">
			<div className="custom-tab-header bg-white h-64 flex relative">
				<BottomNavigation
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					showLabels
					className="w-full h-64"
				>
					<BottomNavigationAction className="min-w-auto max-w-full font-bold" label="Contents" wrapped {...a11yProps(0)} />
					{/* <BottomNavigationAction className="min-w-auto max-w-full font-bold" label="Drawings" {...a11yProps(1)} /> */}
					<BottomNavigationAction className="min-w-auto max-w-full font-bold" label="Edit" {...a11yProps(2)} />
				</BottomNavigation>
				<div className="absolute right-m-12">
					<IconButton
						onClick={ev => dispatch(Actions.closeTaskContent())}
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
				{taskContentData?.project && (
					<Typography variant="h6" color="inherit" className="font-size-14 ">
						<div>
							{t('PROJECT')}: {taskContentData?.project.name}
						</div>
					</Typography>
				)}
				<div className="flex items-center font-weight-700 font-size-18">
					<div className="my-4">
						{' '}
						{t('TASK')}: {taskContentData?.name}{' '}
					</div>
				</div>
			</div>

			<DialogContent id="dialog-content" className="p-0">
				<TabPanel value={value} index={0} class="write-post-img-full">
					<CreatePostForm taskId={taskContentData?.id} isTask />
				</TabPanel>
				<TabPanel value={value} index={1} className="bg-white">
					<div className="sm:mx-12">
						<CreateAttachments taskId={taskContentData?.id} attachments={taskContentData?.media_set} />
					</div>
					{/* <div className="mb-24">
						<div className="flex items-center mt-16">
							<Icon className="text-20" color="inherit">
								list
							</Icon>
							<Typography className="font-600 text-16 mx-8">Activity</Typography>
						</div>
						<List className="">
							{activities.map(item => (
								<CardActivity item={item} key={item.id} members={members} />
							))}
						</List>
					</div>
				 */}
					{/* <div className="mb-24">
						<div className="flex items-center mt-16 mb-12">
							<Icon className="text-20" color="inherit">
								comment
							</Icon>
							<Typography className="font-600 text-16 mx-8">Comment</Typography>
						</div>
						<div>
							<CardComment members={members} onCommentAdd={commentAdd} />
						</div>
					</div>
			 */}
				</TabPanel>

				<TabPanel value={value} index={2} className="bg-white">
					<div className="sm:mx-12">
						{getIsDisabled() && (
							<div className="flex items-center mb-24">
								<Icon>lock</Icon> only company owner can change this details
							</div>
						)}
						<div className="flex items-center mb-24">
							<TextField
								label={t('TITLE')}
								disabled={getIsDisabled()}
								type="text"
								name="name"
								variant="outlined"
								value={cardForm.name}
								onChange={handleChange}
								fullWidth
								required
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<Icon className="text-20" color="action">
												remove_red_eye
											</Icon>
										</InputAdornment>
									)
								}}
							/>
						</div>
						{taskContentData?.isGantt && taskContentData?.parent == 1 ? (
							<div className="mt-8 mb-16 select-dropdown">
								<FuseChipSelect
									isDisabled={getIsDisabled()}
									placeholder={t('SELECT_PROFILE')}
									variant="fixed"
									isMulti
									textFieldProps={{
										label: 'Profile',
										InputLabelProps: {
											shrink: true
										},
										variant: 'outlined'
										// onChange: e => getProjectCompanyTeamProfiles(e.target.value)
									}}
									onChange={value => {
										setProfileData(value.splice(value.length - 1));
									}}
									value={profileData}
									options={profiles.map(profile => ({
										data: profile,
										value: getName(profile),
										label: <span className="flex items-center">{getName(profile)}</span>
									}))}
								/>
							</div>
						) : (
							companies &&
							!!companies.length && (
								<div className="mt-8 mb-16 select-dropdown">
									<FuseChipSelect
										className=""
										placeholder={t('SELECT_COMPANY')}
										isDisabled={getIsDisabled()}
										variant="fixed"
										isMulti
										textFieldProps={{
											label: 'Company',
											InputLabelProps: {
												shrink: true
											},
											variant: 'outlined'
										}}
										onChange={value => {
											setCompany(value.splice(value.length - 1));
										}}
										value={company}
										options={companies.map(company => ({
											data: company,
											value: company.company,
											label: (
												<span className="flex items-center">
													<Icon
														className="list-item-icon mx-6 text-20"
														style={{
															color: company.color
														}}
														color="action"
													>
														label
													</Icon>{' '}
													{company.company}
												</span>
											)
										}))}
									/>
								</div>
							)
						)}
						<div className="w-full mb-24">
							<TextField
								label={t('DESCRIPTION')}
								name="description"
								value={cardForm.description}
								disabled={getIsDisabled()}
								onChange={handleChange}
								multiline
								rows="4"
								variant="outlined"
								fullWidth
							/>
						</div>
						<div className="flex -mx-4">
							<div className="mt-8 mb-16 mx-4 relative static-form-label flex-1">
								<KeyboardDatePicker
									label={t('START_DATE')}
									inputVariant="outlined"
									format="DD/MM/yyyy"
									value={taskDate.startDate}
									onChange={startDate => {
										setTaskDate({
											...taskDate,
											startDate
										});
									}}
									className="mt-8 mb-16 w-full"
								/>
							</div>
							<div className="mt-8 mb-16 mx-4 relative static-form-label flex-1">
								<KeyboardDatePicker
									label={t('END_DATE')}
									inputVariant="outlined"
									format="DD/MM/yyyy"
									value={taskDate.endDate}
									onChange={endDate => {
										setTaskDate({
											...taskDate,
											endDate
										});
									}}
									className="mt-8 mb-16 w-full"
									disabled={getIsDisabled()}
									minDate={taskDate.startDate}
								/>
							</div>
						</div>
						{taskContentData?.isGantt && taskContentData?.parent == 1 ? null : (
							<div className="mt-24 mx-12 zoom-125">
								<IOSSlider
									aria-label="ios slider"
									disabled={getIsDisabled()}
									defaultValue={0}
									marks={marks}
									onChange={(e, v) => setProgress(v)}
									value={progress}
									valueLabelDisplay="on"
								/>
							</div>
						)}
						<div className="flex justify-end mt-16">
							<Button
								aria-label="save"
								variant="contained"
								color="secondary"
								type="submit"
								size="small"
								disabled={!isFormInvalid() || getIsDisabled()}
								onClick={getIsDisabled() ? () => '' : handleSubmit}
							>
								{t('SAVE')} {loading && <CircularProgress size={15} color="secondary" />}
							</Button>
						</div>
					</div>
				</TabPanel>

				{/* <TabPanel value={value} index={1}>
					<div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center mb-24">
						<div className="mb-16 sm:mb-0 flex items-center">
							<Typography>{'board.name'}</Typography>
							<Icon className="text-20" color="inherit">
								chevron_right
							</Icon>
							<Typography>Hello</Typography>
							<Typography>Hello1</Typography>
						</div>

						<TextField
							label="Due date"
							type="date"
							name="due"
							placeholder=" Choose a due date"
							className="w-full sm:w-auto"
							InputLabelProps={{
								shrink: true
							}}
							variant="outlined"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<Icon color="action">today</Icon>
									</InputAdornment>
								)
							}}
						/>
					</div>
					<div className="flex flex-col sm:flex-row -mx-8">
						<div className="flex-1 mb-24 mx-8">
							<div className="flex items-center mt-16 mb-12">
								<Icon className="text-20" color="inherit">
									label
								</Icon>
								<Typography className="font-600 text-16 mx-8">Labels</Typography>
							</div>
							<FuseChipSelect
								placeholder="Select multiple Labels"
								isMulti
								textFieldProps={{
									variant: 'outlined'
								}}
								options={labels.map(label => ({
									value: label.id,
									label: label.name,
									class: label.class
								}))}
							/>
						</div>

						<div className="flex-1 mb-24 mx-8">
							<div className="flex items-center mt-16 mb-12">
								<Icon className="text-20" color="inherit">
									supervisor_account
								</Icon>
								<Typography className="font-600 text-16 mx-8">Members</Typography>
							</div>
							<FuseChipSelect
								className=""
								placeholder="Select multiple Members"
								isMulti
								textFieldProps={{
									variant: 'outlined'
								}}
								options={members.map(member => ({
									value: member.id,
									label: (
										<span className="flex items-center">
											<Avatar className="w-32 h-32" src={member.avatar} />
											<span className="mx-8">{member.name}</span>
										</span>
									)
								}))}
								variant="fixed"
							/>
						</div>
					</div>
					<div className="mb-24">
						<div className="flex items-center mt-16 mb-12">
							<Icon className="text-20" color="inherit">
								attachment
							</Icon>
							<Typography className="font-600 text-16 mx-8">Attachments</Typography>
						</div>
						<div className="flex flex-col sm:flex-row flex-wrap -mx-16">
							{attachments.map(item => (
								<CardAttachment
									item={item}
									card={cardForm}
									// makeCover={makeCover}
									// removeCover={removeCover}
									// removeAttachment={removeAttachment}
									key={item.id}
								/>
							))}
						</div>
					</div>
					{checklists.map((checklist, index) => (
						<CardChecklist
							key={checklist.id}
							checklist={checklist}
							index={index}
							// onCheckListChange={handleCheckListChange}
							// onRemoveCheckList={() => removeCheckList(checklist.id)}
						/>
					))}
				</TabPanel> */}
			</DialogContent>
		</div>
	);
}

export default TaskContentForm;
