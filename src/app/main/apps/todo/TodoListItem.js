/* =============================================================================
 TodoListItem.js
 ===============================================================================
*This File is written for Dashboard
Todo: This file is return each task item and list of activity which includes in task
*/
import _ from '@lodash';
import loadable from '@loadable/component';
import { blue } from '@material-ui/core/colors';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	List,
	Slider,
	withStyles,
	CardContent,
	CardActions,
	LinearProgress,
	Divider,
	Typography,
	Icon,
	Card,
	Button,
	Avatar,
	IconButton,
	MenuItem,
	ListItemText,
	CircularProgress,
	Popover,
	MenuList,
	Paper
} from '@material-ui/core';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_ACTIVITY_OF_TASK, DELETE_TASK_OF_PROJECT } from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import moment from 'moment';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import * as ContactActions from 'app/main/apps/notes/contacts/store/actions';
import withReducer from 'app/store/withReducer';
import reducer from 'app/main/apps/notes/contacts/store/reducers';
import * as Actions from './store/actions';

const TodoActivityListItem = loadable(() => import('./TodoActivityListItem'));
const TippyMenu = loadable(() => import('app/TippyMenu'));

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));
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

function TodoListItem(props) {
	const theme = useTheme();
	const dispatch = useDispatch();
	// const labels = useSelector(({ todoApp }) => todoApp.labels);
	const todoDialog = useSelector(({ todoApp }) => todoApp?.todos?.todoDialog);
	const deleteConfirmDialog = useSelector(({ todoApp }) => todoApp?.todos?.deleteConfirmDialog);
	const okDeleteTaskConfirmDialog = useSelector(({ todoApp }) => todoApp?.todos?.okDeleteTaskConfirmDialog);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const projectDetail = props.todo.project;
	const [open, setOpen] = React.useState(false);
	const [showProgress, setShowProgress] = React.useState(false);
	const [id, setId] = React.useState(null);
	const [taskDetail, setTaskDetail] = useState([]);
	const [activityId, setactivityId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const anchorRef = React.useRef();
	const [state, setState] = React.useState({
		open: false,
		anchorOriginVertical: 'bottom',
		anchorOriginHorizontal: 'left',
		transformOriginVertical: 'top',
		transformOriginHorizontal: 'left',
		positionTop: 200, // Just so the popover can be spotted more easily
		positionLeft: 400, // Same as above
		anchorReference: 'anchorEl'
	});
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const classes = useStyles(props);
	const routeParams = useParams();
	const { t } = useTranslation('dashboard');

	const handleClick = () => {
		setOpen(!open);
	};

	useEffect(() => {
		setTaskDetail(props.todo.activities);
	}, [props.todo.activities]);

	useEffect(() => {
		if(okDeleteTaskConfirmDialog && deleteConfirmDialog.data !== null) {
			apiCall(
				DELETE_TASK_OF_PROJECT(deleteConfirmDialog.data.id),
				{},
				res => {
					dispatch(Actions.removeTask(deleteConfirmDialog.data));
					dispatch(Actions.closeDeleteConfirmDialog());
				},
				err => {
					// console.log(err);
				},
				METHOD.DELETE,
				getHeaderToken()
			);
		}
	}, [okDeleteTaskConfirmDialog, deleteConfirmDialog]);

	const stopsEvents = event => {
		event.preventDefault();
		event.stopPropagation();
	};
	const handleMenuOpen = event => {
		stopsEvents(event);
		setState({
			...state,
			open: true
		});
	};
	const handleSubmit = (event, company) => {
		setLoading(true);
		stopsEvents(event);
		setAnchorEl(null);
		const { id, name, note, project } = props.todo;
		dispatch(
			Actions.editTodo(
				{
					name,
					description: note,
					id,
					company: [
						{
							data: company || {
								profile: {
									company: company || props.todo.assigned_company
								}
							}
						}
					],
					startDate: props.todo.date_start,
					endDate: props.todo.date_end,
					description: props.todo.note
				},
				project.id,
				'new',
				() => {
					// dispatch(Actions.closeTaskContent());
				},
				false,
				setLoading
			)
		);
	};

	const handleMenuClose = event => {
		stopsEvents(event);
		setState({
			...state,
			open: false
		});
	};

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (
			todoDialog !== undefined &&
			todoDialog.type === 'activity' &&
			todoDialog.props.open &&
			todoDialog.data.id == props.todo.id
		) {
			setId(todoDialog.data.id);
		}

		if (
			todoDialog !== undefined &&
			todoDialog.type === 'activity' &&
			todoDialog.props.open == false &&
			props.todo.id == id
		) {
			getDetailOfTask();
			setId(null);
		}
	}, [todoDialog?.props?.open]);
	useEffect(() => {
		if (
			todoDialog !== undefined &&
			todoDialog.props.openTimelineDialog == true &&
			todoDialog.data.task.id == props.todo.id
		) {
			setId(todoDialog.data.task.id);
		}
		if (todoDialog !== undefined && todoDialog.props.openTimelineDialog == false && props.todo.id == id) {
			getDetailOfTask();
			setId(null);
		}
	}, [todoDialog?.props?.openTimelineDialog]);
	const getDetailOfTask = () => {
		apiCall(
			GET_ACTIVITY_OF_TASK(props.todo.id),
			{},
			results => {
				setTaskDetail(results);
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	const getdate = date => (date ? moment(date).format('DD-MM-YYYY') : undefined);

	return (
		<div className="mb-20">
			<Card
				elevation={1}
				className="flex flex-col bordergrey overflow-inherit mb-6"
				onClick={e => {
					dispatch(Actions.closeDrawingContent());
					// if (getRole() == 'o' || getRole() == 'd') {
					e.preventDefault();
					e.stopPropagation();
					dispatch(Actions.closeTimelineDialog());
					dispatch(Actions.openTaskContent(props.todo));
					props.setTodoId(props.todo.id);
					dispatch(ContactActions.getApprovedContacts(props.todo.project.id));
					// }
				}}
			>
				{/* card body */}
				<div
					className="flex flex-shrink-0 items-center justify-between px-24 h-64 rounded-t"
					style={{
						background: '#1b2330',
						color: theme.palette.getContrastText(blue[500])
					}}
				>
					{props.todo.assigned_company !== null ? (
						<>
							<div className="flex items-center">
								<Avatar className="mr-10" src={props.todo.assigned_company?.logo} />
								<Typography className="font-medium truncate ht-auto" color="inherit">
									{props.todo.assigned_company?.name}
								</Typography>
							</div>

							<div className="flex justify-between">
								<IconButton
									// aria-owns={moreMenuEl ? 'chats-more-menu' : null}
									aria-haspopup="true"
									onClick={e => {
										e.preventDefault();
										e.stopPropagation();
										dispatch(Actions.openDrawingContent(props.todo));
										dispatch(Actions.closeTimelineDialog());
										// dispatch(Actions.openTaskContent(props.todo));
										props.setTodoId(props.todo.id);
										dispatch(ContactActions.getApprovedContacts(props.todo.project.id));
									}}
									className="text-white opacity-60"
								>
									<Icon>attach_file</Icon>
								</IconButton>
								<TippyMenu
									icon={
										<>
											<IconButton
												// aria-owns={moreMenuEl ? 'chats-more-menu' : null}
												aria-haspopup="true"
												// onClick={handleMoreMenuClick}
												className="text-white opacity-60"
											>
												<Icon>more_vert</Icon>
											</IconButton>
										</>
									}
									outsideClick
								>
									<MenuItem
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											if (props.todo.assigned_company) {
												dispatch(Actions.openAddActivityTodoDialog(props.todo));
											}
										}}
									>
										<Button>
											<Icon className="mr-10">add_circle_outline</Icon>
											SOTTOFASE
										</Button>
									</MenuItem>
									<MenuItem
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											dispatch(Actions.editTaskTodoDialog(props.todo));
										}}
									>
										<Button>
											<Icon className="mr-10">edit</Icon>
											Edit
										</Button>
									</MenuItem>
									<MenuItem
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											dispatch(Actions.openDeleteConfirmDialog('Task', props.todo));
											// deleteTaskOfProject(props.todo);
										}}
									>
										<Button>
											<Icon className="mr-10">delete</Icon>
											Delete
										</Button>
									</MenuItem>
								</TippyMenu>
							</div>
						</>
					) : getRole() == 'd' || getRole() == 'o' ? (
						<>
							<div ref={anchorRef} onClick={handleMenuOpen}>
								<IconButton className="text-white">
									<Icon>business</Icon>
									<Typography className="ml-10">Assign to a company</Typography>
								</IconButton>
								{loading && <CircularProgress size={15} color="secondary" />}
							</div>
							<Popover
								open={state.open}
								anchorEl={anchorRef.current}
								anchorReference={state.anchorReference}
								anchorPosition={{ top: state.positionTop, left: state.positionLeft }}
								onClose={handleMenuClose}
								anchorOrigin={{
									vertical: state.anchorOriginVertical,
									horizontal: state.anchorOriginHorizontal
								}}
								transformOrigin={{
									vertical: state.transformOriginVertical,
									horizontal: state.transformOriginHorizontal
								}}
							>
								<Paper className={classes.paper}>
									<MenuList>
										{props.companies?.length &&
											props.companies.map((item, index) => {
												return (
													<MenuItem
														onClick={e => handleSubmit(e, item)}
														className="px-8"
														key={item.id}
													>
														<Avatar
															className="w-32 h-32"
															src={item.profile?.company?.logo}
														/>
														<ListItemText className="mx-8">{item.company}</ListItemText>
													</MenuItem>
												);
											})}
									</MenuList>
								</Paper>
							</Popover>
							<TippyMenu
									icon={
										<>
											<IconButton
												// aria-owns={moreMenuEl ? 'chats-more-menu' : null}
												aria-haspopup="true"
												// onClick={handleMoreMenuClick}
												className="text-white opacity-60"
											>
												<Icon>more_vert</Icon>
											</IconButton>
										</>
									}
									outsideClick
								>
									{/* <MenuItem
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											if (props.todo.assigned_company) {
												dispatch(Actions.openAddActivityTodoDialog(props.todo));
											}
										}}
									>
										<Button>
											<Icon className="mr-10">add_circle_outline</Icon>
											SOTTOFASE
										</Button>
									</MenuItem> */}
									<MenuItem
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											dispatch(Actions.editTaskTodoDialog(props.todo));
										}}
									>
										<Button>
											<Icon className="mr-10">edit</Icon>
											Edit
										</Button>
									</MenuItem>
									{/* <MenuItem
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											dispatch(Actions.openDeleteConfirmDialog('Task', props.todo));
											// deleteTaskOfProject(props.todo);
										}}
									>
										<Button>
											<Icon className="mr-10">delete</Icon>
											Delete
										</Button>
									</MenuItem> */}
								</TippyMenu>
						</>
					) : (
						<Typography className="font-medium truncate ht-auto" color="inherit">
							{props.todo.assigned_company?.name}
						</Typography>
					)}
				</div>
				<CardContent className="flex flex-col flex-auto ">
					<div className="flex items-center flex-wrap justify-center my-12">
						{props.todo.progress == 100 ? (
							<div className={clsx('flex items-center px-8 py-4 mx-4 rounded bg-green-500 text-white')}>
								<Icon className="text-12">check_circle</Icon> <span className="mx-4">Completata</span>
							</div>
						) : moment().diff(moment(props.todo.date_start)) > 0 ? (
							moment().diff(moment(props.todo.date_end)) > 0 ? (
								<>
									<div className={clsx('flex items-center px-8 py-4 rounded font-size-12')}>
										{/* <Icon className="text-16">access_time</Icon> */}
										{/* <span className="mx-4"> */}
										{t('START')} {moment(props.todo.date_start).format('MMM Do YY')}
										{/* </span> */}
									</div>
									<div
										className={clsx(
											'flex items-center px-8 py-4 rounded bg-red-500 text-white font-size-12 ml-12'
										)}
									>
										{/* <Icon className="text-16">access_time</Icon> */}
										{/* <span className="mx-4"> */}
										{t('ENDS')} {moment(props.todo.date_end).format('MMM Do YY')}
										{/* </span> */}
									</div>
								</>
							) : (
								<>
									<div
										className={clsx(
											'flex items-center px-8 py-4 bg-green-500 rounded text-white font-size-12'
										)}
									>
										{/* <Icon className="text-16">access_time</Icon> */}
										{/* <span className="mx-4"> */}
										{t('START')} {moment(props.todo.date_start).format('MMM Do YY')}
										{/* </span> */}
									</div>
									<div
										className={clsx(
											'flex items-center px-8 py-4 bg-custom-light-grey rounded font-size-12 ml-12'
										)}
									>
										{/* <Icon className="text-16">access_time</Icon> */}
										{/* <span className="mx-4"> */}
										{t('ENDS')} {moment(props.todo.date_end).format('MMM Do YY')}
										{/* </span> */}
									</div>
								</>
							)
						) : (
							<>
								<div className={clsx('flex items-center px-8 py-4 rounded font-size-12')}>
									{/* <Icon className="text-16">access_time</Icon> */}
									{/* <span className="mx-4"> */}
									{t('START')} {moment(props.todo.date_start).format('MMM Do YY')}
									{/* </span> */}
								</div>
								<div
									className={clsx(
										'flex items-center px-8 py-4 bg-custom-light-grey rounded font-size-12 ml-12'
									)}
								>
									{/* <Icon className="text-16">access_time</Icon> */}
									{/* <span className="mx-4"> */}
									{t('ENDS')} {moment(props.todo.date_end).format('MMM Do YY')}
									{/* </span> */}
								</div>
							</>
						)}
					</div>
					<Typography className="text-center text-16 font-400 items-center justify-center ht-auto">
						{projectDetail?.name}
					</Typography>
					<Typography
						className="text-center text-18 font-600 items-center justify-center ht-auto mt-8"
						color="inherit"
					>
						{props.todo.name}
					</Typography>
					{props.todo.assigned_company?.id == company.id && getRole() != 'w' && (
						<div className="flex items-center justify-center mt-8">
							<div>
								{/* <Tooltip
											title="There is a issue with some tree are not clean on site"
											placement="top"
										>
											<IconButton
												onClick={e => {
													e.stopPropagation();
													e.preventDefault();
												}}
											>
												<Icon>info_outlined</Icon>
											</IconButton>
										</Tooltip> */}
							</div>
							{/* <div className="custom-outlined-btn"> */}
							{/* <Button
											variant="outlined"
											color="primary"
											className={classes.button}
											startIcon={<PlaylistAddOutlinedIcon />}
											onClick={ev => {
												ev.preventDefault();
												ev.stopPropagation();
												if (props.todo.assigned_company) {
													dispatch(Actions.openAddActivityTodoDialog(props.todo));
												}
											}}
										>
											Add
										</Button> */}

							{/* </div> */}
						</div>
					)}
				</CardContent>
				<Divider />
				{/* <div className="flex flex-col justify-items-end"> */}
				<CardActions className="justify-center">
					<div className="custom-progress-chart">
						<div className="flex justify-end relative">
							<Button
								disabled={
									props.todo.assigned_company?.id != company.id ||
									getRole() == 'w' ||
									getRole() == 'm'
								}
								onClick={ev => {
									ev.preventDefault();
									ev.stopPropagation();
									if (props.todo.assigned_company?.id == company.id) {
										setShowProgress(prev => !prev);
									}
								}}
								className="justify-start px-32"
							>
								progress {props.todo.progress}%
							</Button>

							{showProgress && (
								<div className="custom-ios-slider-dropdown page-dashboard zoom-125">
									<small className="block mb-24">{t('SET_TASK_PROGRESS')}</small>
									<div>
										<IOSSlider
											aria-label="ios slider"
											defaultValue={props.todo.progress}
											marks={marks}
											onChangeCommitted={(e, v) => {
												e.stopPropagation();
												e.preventDefault();
												dispatch(
													Actions.editTodo(
														{
															id: props.todo.id,
															name: props.todo.name,
															company: [{ data: props.todo.assigned_company }],
															progress: v,
															startDate: props.todo.date_start,
															endDate: props.todo.date_end,
															description: props.todo.note
														},
														projectDetail.id,
														'new',
														() => {},
														false,
														() => {
															setShowProgress(prev => !prev);
														}
													)
												);
											}}
											onClick={e => {
												e.stopPropagation();
												e.preventDefault();
											}}
											valueLabelDisplay="on"
										/>
									</div>
								</div>
							)}
						</div>
					</div>
				</CardActions>
				<LinearProgress
					className="w-full"
					variant="determinate"
					value={props.todo.progress}
					color="secondary"
				/>
			</Card>
			{/* <Collapse in={open} timeout="auto" unmountOnExit> */}
			{props.todo.assigned_company?.id == company.id && (
				<List className="p-0">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						{taskDetail &&
							!!taskDetail.length &&
							_.orderBy(
								taskDetail,
								['id'],
								// orderBy == 'date_start'
								// 	? ['datetime_start']
								// 	: orderBy == 'date_end'
								// 	? ['datetime_end']
								// 	: [orderBy],
								'asc' //	[orderDescending ? 'desc' : 'asc']
							).map(todo => (
								<TodoActivityListItem
									setTodoId={props.setTodoId}
									getDetailOfTask={getDetailOfTask}
									task={props.todo}
									todo={todo}
									key={todo.id}
								/>
							))}
					</FuseAnimateGroup>
				</List>
			)}
			{/* </Collapse> */}
		</div>
	);
}

export default withReducer('contactsApp', reducer)(TodoListItem);
