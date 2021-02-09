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
import { Slider, withStyles, CircularProgress } from '@material-ui/core';
import { GET_COMPANY_PROJECT_TEAM_MEMBER_LIST } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';

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
function TodoDialog(props) {
	const { t } = useTranslation('todo_project');
	const dispatch = useDispatch();
	const todoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.todoDialog);
	const labels = useSelector(({ todoAppNote }) => todoAppNote.labels);
	const companies = useSelector(({ contactsApp }) => contactsApp.contacts.approvedCompanies);
	const [labelMenuEl, setLabelMenuEl] = useState(null);
	const { form, handleChange, setForm, resetForm } = useForm({ ...defaultFormState });
	const startDate = moment(form.startDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	const dueDate = moment(form.dueDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	const [company, setCompany] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [profileData, setProfileData] = useState([]);
	const [progress, setProgress] = useState(0);
	const [loading, setLoading] = useState(false);
	const routeParams = useParams();
	const [taskDate, setTaskDate] = useState({
		startDate: new Date(),
		endDate: undefined
	});
	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		console.log({ assigned_company: todoDialog.data });

		if (todoDialog.type === 'edit' && todoDialog.data) {
			setForm({ ...todoDialog.data });
		}
		if (todoDialog.type === 'activity' && todoDialog.data?.assigned_company) {
			resetForm();
			setProfileData([]);
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
		// console.log({ todoDialog });
		if (todoDialog.props.open) {
			initDialog();
			return () => {
				resetForm();
			};
		}
	}, [todoDialog.props.open]);

	function closeTodoDialog() {
		setLoading(false);
		return todoDialog.type === 'activity'
			? dispatch(Actions.closeActivityTodoDialog())
			: todoDialog.type === 'edit'
			? dispatch(Actions.closeEditTodoDialog())
			: dispatch(Actions.closeNewTodoDialog());
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
		console.log(routeParams.id, todoDialog.data.assigned_company.id, value);
		apiCall(
			GET_COMPANY_PROJECT_TEAM_MEMBER_LIST(routeParams.id, todoDialog.data.assigned_company?.id, value),
			{},
			profiles => {
				setProfiles(profiles);
				setProfileData(
					profiles
						.filter(profile => profile.role == 'Owner' || profile.role == 'Delegate') //.filter(profile => profile.role != 'Worker')
						.map(profile => ({
							data: profile,
							value: getName(profile),
							label: <span className="flex items-center pl-12">{getName(profile)}</span>
						}))
				);
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	const getName = profile => profile.profile.first_name + ' ' + profile.profile.last_name;
	return (
		<Dialog {...todoDialog.props} onClose={closeTodoDialog} fullWidth maxWidth="sm" className="custom-modal-new">
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex">
					<Typography variant="h6" color="inherit">
						{todoDialog.type === 'new'
							? t('NEW_TODO')
							: todoDialog.type === 'activity'
							? t('NEW_ACTIVITY')
							: t('EDIT_TODO')}
					</Typography>
					<div className="absolute right-m-12">
						<IconButton onClick={closeTodoDialog} edge="start" color="inherit" aria-label="close">
							<CloseIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-0' }}>
				{/* <div className="mb-16">
					<div className="flex items-center justify-between p-12">
						<div className="flex">
							<Checkbox
								tabIndex={-1}
								checked={form.completed}
								onChange={toggleCompleted}
								onClick={ev => ev.stopPropagation()}
							/>
						</div>

						<div className="flex items-center justify-start" aria-label="Toggle star">
							<IconButton onClick={handleToggleImportant}>
								{form.important ? (
									<Icon style={{ color: red[500] }}>error</Icon>
								) : (
									<Icon>error_outline</Icon>
								)}
							</IconButton>

							<IconButton onClick={handleToggleStarred}>
								{form.starred ? (
									<Icon style={{ color: amber[500] }}>star</Icon>
								) : (
									<Icon>star_outline</Icon>
								)}
							</IconButton>
							<div>
								<IconButton
									aria-owns={labelMenuEl ? 'label-menu' : null}
									aria-haspopup="true"
									onClick={handleLabelMenuOpen}
								>
									<Icon>label</Icon>
								</IconButton>
								<Menu
									id="label-menu"
									anchorEl={labelMenuEl}
									open={Boolean(labelMenuEl)}
									onClose={handleLabelMenuClose}
								>
									{labels.length > 0 &&
										labels.map(label => (
											<MenuItem onClick={ev => handleToggleLabel(ev, label.id)} key={label.id}>
												<ListItemIcon className="min-w-24">
													<Icon color="action">
														{form.labels.includes(label.id)
															? 'check_box'
															: 'check_box_outline_blank'}
													</Icon>
												</ListItemIcon>
												<ListItemText
													className="mx-8"
													primary={label.title}
													disableTypography
												/>
												<ListItemIcon className="min-w-24">
													<Icon style={{ color: label.color }} color="action">
														label
													</Icon>
												</ListItemIcon>
											</MenuItem>
										))}
								</Menu>
							</div>
						</div>
					</div>
					<Divider className="mx-24" />
				</div> */}

				{/* {form.labels.length > 0 && (
					<div className="flex flex-wrap w-full px-12 sm:px-20 mb-16">
						{form.labels.map(label => (
							<Chip
								avatar={
									<Avatar classes={{ colorDefault: 'bg-transparent' }}>
										<Icon
											className="text-20"
											style={{ color: _.find(labels, { id: label }).color }}
										>
											label
										</Icon>
									</Avatar>
								}
								label={_.find(labels, { id: label }).title}
								onDelete={ev => handleToggleLabel(ev, label)}
								className="mx-4 my-4"
								classes={{ label: 'px-8' }}
								key={label}
							/>
						))}
					</div>
				)} */}
				<div className="px-20 sm:mb-24 mt-16 sm:mt-20 sm:px-32">
					<FormControl className="mt-8 mb-16" required fullWidth>
						<TextField
							label={t('TASK_TITLE')}
							autoFocus
							name="title"
							value={form.title}
							onChange={handleChange}
							required
							variant="outlined"
						/>
					</FormControl>

					{todoDialog.type === 'activity' ? (
						<div className="mt-8 mb-16 select-dropdown">
							<FuseChipSelect
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
									setProfileData(value);
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
						company &&
						!!companies.length && (
							<div className="mt-8 mb-16 select-dropdown">
								<FuseChipSelect
									className=""
									placeholder={t('SELECT_COMPANY')}
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
									options={companies.map(companyData => {
										return {
											data: companyData,
											value: companyData?.profile?.company?.name,
											label: (
												<span className="flex items-center">
													<Icon
														className="list-item-icon mx-6 text-20"
														style={{ color: companyData?.profile?.company?.color_project }}
														color="action"
													>
														label
													</Icon>{' '}
													{companyData?.profile?.company.name}
												</span>
											)
										};
									})}
								/>
							</div>
						)
					)}

					<FormControl className="mt-8 mb-16" required fullWidth>
						<TextField
							label={t('NOTES')}
							name="notes"
							multiline
							rows="6"
							value={form.notes}
							onChange={handleChange}
							variant="outlined"
						/>
					</FormControl>
					<div className="flex -mx-4">
						<div className="mt-8 mb-16 mx-4 relative static-form-label flex-1">
							<label>{t('START_DATE')}</label>
							<DatePicker
								dateFormat="dd/MM/yyyy"
								selected={taskDate.startDate}
								// minDate={taskDate.startDate}
								onChange={startDate => {
									setTaskDate({
										...taskDate,
										startDate
									});
								}}
							/>
							<Icon className="icon">calendar_today</Icon>
						</div>
						<div className="mt-8 mb-16 mx-4 relative static-form-label flex-1">
							<label>{t('END_DATE')}</label>
							<DatePicker
								dateFormat="dd/MM/yyyy"
								selected={taskDate.endDate}
								minDate={taskDate.startDate}
								onChange={endDate => {
									setTaskDate({
										...taskDate,
										endDate
									});
								}}
							/>
							<Icon className="icon">calendar_today</Icon>
						</div>
					</div>
					<div className="w-full zoom-125">
						<label>
							<small>{t('TASK_PROGRESS')}</small>
						</label>
						<div className="mx-8 mt-32 custom-ios-slider">
							<IOSSlider
								aria-label="ios slider"
								defaultValue={0}
								marks={marks}
								onChange={(e, v) => setProgress(v)}
								valueLabelDisplay="on"
							/>
						</div>
					</div>
				</div>
			</DialogContent>

			{todoDialog.type === 'new' || todoDialog.type === 'activity' ? (
				<DialogActions className="p-16 pb-24 px-44">
					<Button
						variant="contained"
						color="primary"
						size="large"
						onClick={() => {
							setLoading(true);
							dispatch(
								Actions.addTodo(
									{
										...form,
										id: todoDialog.data?.id,
										company,
										profile: profileData,
										progress,
										...taskDate
									},
									routeParams.id,
									todoDialog.type,
									closeTodoDialog,
									todoDialog.data?.isGantt
								)
							);
						}}
						disabled={!canBeSubmitted()}
					>
						{t('ADD')} {loading && <CircularProgress size={15} color="secondary" />}
					</Button>
				</DialogActions>
			) : (
				<DialogActions className="justify-between p-8">
					<div className="px-16">
						<Button
							variant="contained"
							color="primary"
							size="large"
							// onClick={() => {
							// 	dispatch(Actions.updateTodo(form));
							// 	closeTodoDialog();
							// }}
							// disabled={!canBeSubmitted()}
						>
							{t('SAVE')}
						</Button>
					</div>
					<IconButton
						className="min-w-auto"
						// onClick={() => {
						// 	dispatch(Actions.removeTodo(form.id));
						// 	closeTodoDialog();
						// }}
					>
						<Icon>delete</Icon>
					</IconButton>
				</DialogActions>
			)}
		</Dialog>
	);
}

export default TodoDialog;
