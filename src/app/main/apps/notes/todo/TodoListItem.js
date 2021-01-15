import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import { amber, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import TodoChip from './TodoChip';
import {
	Collapse,
	ListItemIcon,
	ListItemText,
	List,
	Slider,
	withStyles,
	MenuList,
	Paper,
	Popover
} from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_ACTIVITY_OF_TASK } from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import TodoActivityListItem from './TodoActivityListItem';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Button from '@material-ui/core/Button';
import PlaylistAddOutlinedIcon from '@material-ui/icons/PlaylistAddOutlined';
import { useParams } from 'react-router';
import PostList from './PostList';
import ToolbarMenu from './Dialog/toolbar/ToolbarMenu';
import MenuItem from '@material-ui/core/MenuItem';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},
	paper: {
		marginRight: theme.spacing(2)
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
	const dispatch = useDispatch();
	const labels = useSelector(({ todoAppNote }) => todoAppNote.labels);
	const todoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.todoDialog);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const [open, setOpen] = React.useState(props.isPdf ? true : false);
	const [showProgress, setShowProgress] = React.useState(false);
	const [id, setId] = React.useState(null);
	const [taskDetail, setTaskDetail] = useState([]);
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const classes = useStyles(props);
	const routeParams = useParams();
	const [anchorEl, setAnchorEl] = useState(null);
	const [hasRender, setHasRender] = React.useState(false);
	const [loading, setLoading] = useState(false);
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const scrollRef = useRef(null);
	const hasNotifcationOnThisItem = notificationPanel.notificationData?.notification?.object_id == props.todo.id;
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
	useEffect(() => {
		if (hasNotifcationOnThisItem) {
			setTimeout(() => {
				setHasRender(true);
			}, 300);
		} else {
			setHasRender(true);
		}
	}, [props.todo, hasNotifcationOnThisItem]);

	useEffect(() => {
		let notification = notificationPanel.notificationData?.notification;
		if (notificationPanel.viewing && notification?.content_type == 'task' && hasRender && scrollRef.current) {
			dispatch(notificationActions.removeFrmViewNotification());
			scrollRef.current.scrollIntoView(false);
			scrollRef.current.classList.add('bg-yellow-200');
			setTimeout(() => {
				if (scrollRef.current) {
					scrollRef.current.classList.remove('bg-yellow-200');
				}
			}, 5000);
		}
	}, [notificationPanel.viewing, scrollRef, hasRender]);
	const handleClick = () => {
		setOpen(!open);
	};
	useEffect(() => {
		setTaskDetail(props.todo.activities);
	}, [props.todo.activities]);
	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (todoDialog.type === 'activity' && todoDialog.props.open && todoDialog.data.id == props.todo.id) {
			setId(todoDialog.data.id);
		}

		if (todoDialog.type === 'activity' && todoDialog.props.open == false && props.todo.id == id) {
			getDetailOfTask();
			setId(null);
		}
	}, [todoDialog.props.open]);
	useEffect(() => {
		if (todoDialog.props.openTimelineDialog == true && todoDialog.data.task.id == props.todo.id) {
			setId(todoDialog.data.task.id);
		}
		if (todoDialog.props.openTimelineDialog == false && props.todo.id == id) {
			getDetailOfTask();
			setId(null);
		}
	}, [todoDialog.props.openTimelineDialog]);
	const getDetailOfTask = () => {
		// if (open === false) {

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
		// }
	};
	const getdate = date => (date ? moment(date).format('DD-MM-YYYY') : undefined);
	const stopsEvents = event => {
		event.preventDefault();
		event.stopPropagation();
	};
	const handleMenuOpen = event => {
		stopsEvents(event);
		// setAnchorEl(event.currentTarget);
		setState({
			...state,
			open: true
		});
		// if (!members.length) {
		// 	getCompanyApprovedContacts();
		// }
	};
	useEffect(() => {
		if (
			notificationPanel.notificationData?.notification?.content_type === 'activity' &&
			notificationPanel.notificationData?.notification?.body?.task_id == props.todo.id
		) {
			setOpen(true);
		}
	}, [notificationPanel.notificationData]);
	const handleMenuClose = event => {
		stopsEvents(event);
		// setAnchorEl(null);
		setState({
			...state,
			open: false
		});
		// if (!members.length) {
		// 	props.getDetailOfTask();
		// }
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
							data: {
								profile: {
									company: props.todo.assigned_company
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
	return (
		<>
			<Card
				ref={notificationPanel.notificationData?.notification?.object_id == props.todo.id ? scrollRef : null}
				className={clsx(classes.card, 'w-full rounded-4 custom-task cursor-pointer border-1 shadow-none ')}
				onClick={() =>
					getRole() == 'o' || getRole() == 'd' ? dispatch(Actions.openTaskContent(props.todo)) : ''
				}
			>
				{/* card body */}
				<div className="p-16 flex items-center justify-content-between">
					{/* lebels are below */}
					<div className="flex-fill mr-12">
						{/*<div className="flex flex-wrap mb-8 -mx-4">
							{props.todo.assigned_company?.name && (
								<Tooltip title={props.todo.assigned_company.name}>
									<div
										className={clsx('text-white', 'w-32  h-6 rounded-6 mx-4 mb-6')}
										style={{ borderColor: props.todo.assigned_company.color_project }}
									/>
								</Tooltip>
							)}
							 <Tooltip title={'hello'}>
							<div className={clsx('bg-orange text-white', 'w-32  h-6 rounded-6 mx-4 mb-6')} />
						</Tooltip> */}

						{/* <Tooltip title={'hello'}>
							<div className={clsx('bg-orange text-white', 'w-32  h-6 rounded-6 mx-4 mb-6')} />
						</Tooltip>
						</div>
						{/* content can be below */}
						<div className="flex items-center mb-12">
							{props.todo.assigned_company && (
								<TodoChip
									title={props.todo.assigned_company?.name}
									color={props.todo.assigned_company?.color_project}
								/>
							)}
						</div>
						{!props.todo.assigned_company && (
							<div
								ref={anchorRef}
								className="custom-member-menu flex items-center"
								onClick={handleMenuOpen}
							>
								<Icon> business</Icon>
								Assign Company {loading && <CircularProgress size={15} color="secondary" />}
							</div>
						)}
						<div className="flex items-center flex-wrap">
							<Typography className="MuiTypography-root todo-title truncate MuiTypography-h6 MuiTypography-colorInherit font-semibold ">
								{' '}
								{props.todo.name}{' '}
							</Typography>
							{props.todo.assigned_company?.id == company.id && (
								<div className="flex items-center px-8 py-4">
									<Button
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
									</Button>
								</div>
							)}
						</div>

						<Typography className="MuiTypography-root todo-title truncate MuiTypography-body MuiTypography-colorInherit  mb-12">
							Responsabile: Mandelli Roberto
						</Typography>

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
													<Avatar className="w-32 h-32" src={item.profile?.company?.logo} />
													<ListItemText className="mx-8">{item.company}</ListItemText>
												</MenuItem>
											);
										})}
								</MenuList>
							</Paper>
						</Popover>

						{/* dates below */}
						<div className="flex items-center flex-wrap">
							{props.todo.progress == 100 ? (
								<div className={clsx('flex items-center px-8 py-4 rounded bg-green text-white')}>
									<Icon className="text-16 mt-4">check_circle</Icon>{' '}
									<span className="mx-4">Completed</span>
								</div>
							) : moment().diff(moment(props.todo.date_start)) > 0 ? (
								moment().diff(moment(props.todo.date_end)) > 0 ? (
									<>
										<div
											className={clsx(
												'flex items-center px-8 border-grey py-4 rounded font-size-12'
											)}
										>
											{/* <Icon className="text-16">access_time</Icon> */}
											{/* <span className="mx-4"> */}
											Start: {moment(props.todo.date_start).format('MMM Do YY')}
											{/* </span> */}
										</div>
										<div
											className={clsx(
												'flex items-center px-8 py-4 rounded bg-red text-white font-size-12 ml-12'
											)}
										>
											{/* <Icon className="text-16">access_time</Icon> */}
											{/* <span className="mx-4"> */}
											Ends: {moment(props.todo.date_end).format('MMM Do YY')}
											{/* </span> */}
										</div>
									</>
								) : (
									<>
										<div
											className={clsx(
												'flex items-center px-8 py-4 bg-green rounded text-white font-size-12'
											)}
										>
											{/* <Icon className="text-16">access_time</Icon> */}
											{/* <span className="mx-4"> */}
											Start: {moment(props.todo.date_start).format('MMM Do YY')}
											{/* </span> */}
										</div>
										<div
											className={clsx(
												'flex items-center px-8 py-4 border-grey rounded font-size-12 ml-12'
											)}
										>
											{/* <Icon className="text-16">access_time</Icon> */}
											{/* <span className="mx-4"> */}
											Ends: {moment(props.todo.date_end).format('MMM Do YY')}
											{/* </span> */}
										</div>
									</>
								)
							) : (
								<>
									<div
										className={clsx('flex items-center px-8 py-4 border-grey rounded font-size-12')}
									>
										{/* <Icon className="text-16">access_time</Icon> */}
										{/* <span className="mx-4"> */}
										Start: {moment(props.todo.date_start).format('MMM Do YY')}
										{/* </span> */}
									</div>
									<div
										className={clsx(
											'flex items-center px-8 py-4 border-grey rounded font-size-12 ml-12'
										)}
									>
										{/* <Icon className="text-16">access_time</Icon> */}
										{/* <span className="mx-4"> */}
										Ends: {moment(props.todo.date_end).format('MMM Do YY')}
										{/* </span> */}
									</div>
								</>
							)}
						</div>
					</div>
					<div className="custom-progress-chart">
						<div className="flex justify-end relative">
							<Box
								onClick={ev => {
									ev.preventDefault();
									ev.stopPropagation();
									setShowProgress(prev => !prev);
								}}
								position="relative"
								display="inline-flex"
							>
								<CircularProgress
									className="w-70 h-70"
									color="secondary"
									variant="static"
									value={props.todo.progress}
								/>
								<Box
									top={0}
									left={0}
									bottom={0}
									right={0}
									position="absolute"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<Typography variant="caption" component="div" color="textSecondary">
										{props.todo.progress}%
									</Typography>
								</Box>
							</Box>
							{showProgress && (
								<div className="custom-ios-slider-dropdown page zoom-125">
									<small className="block mb-24">Set Task Progress</small>
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
															company: [
																{
																	data: {
																		profile: {
																			company: props.todo.assigned_company
																		}
																	}
																}
															],
															progress: v,
															startDate: props.todo.date_start,
															endDate: props.todo.date_end,
															description: props.todo.note
														},
														routeParams.id,
														'new',
														() => {},
														false,
														() => {}
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
						{props.todo.assigned_company?.id == company.id && (
							<div className="flex items-center mt-8">
								{/* <div>
									<Tooltip
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
									</Tooltip>
								</div> */}
								<div className="custom-outlined-btn">
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
									{/* <IconButton
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											if (props.todo.assigned_company) {
												dispatch(Actions.openAddActivityTodoDialog(props.todo));
											}
										}}
									>
										<Icon>playlist_add</Icon>
										
									</IconButton>
									Add */}
								</div>
							</div>
						)}
					</div>
					{/* <div className="flex items-center mb-12 -mx-4">
						{moment().diff(moment(props.todo.date_end)) > 0 && (
							<div className="flex items-center px-8 py-4 mx-4 rounded bg-red text-white">
								<Icon className="text-16">access_time</Icon>
								<span className="mx-4">{moment(props.todo.date_end).format('MMM Do YY')}</span>
							</div>
						)}
					</div> */}

					{/* members list who involved in this 
					<div className="flex flex-wrap mb-12 -mx-4">
						<Tooltip title={'James Lewis'}>
							<Avatar className="mx-4 w-32 h-32" src={'/assets/images/avatars/james.jpg'} />
						</Tooltip>
						<Tooltip title={'James Lewis'}>
							<Avatar className="mx-4 w-32 h-32" src={'/assets/images/avatars/james.jpg'} />
						</Tooltip>
					</div>*/}
				</div>

				{/* footer */}
				{/* <div
					className="flex h-48 px-16 border-t-1 todo-bg-footer"
					onClick={ev => {
						if (open) {
							ev.preventDefault();
							ev.stopPropagation();
							setOpen(!open);
						} else {
							ev.preventDefault();
							ev.stopPropagation();
							if (props.todo.assigned_company?.id == company.id) {
								setOpen(true);
							}
						}
					}}
				> */}
				{/* left side footer */}
				{/* <div className="flex items-center mr-16">
						<div className="flex items-center px-8 py-4 mx-4 rounded bg-grey-700 text-white">
							<Icon className="text-16">check_circle</Icon>
							<span className="mx-4">2/7</span>
						</div>
					</div> */}
				{/* right side footer */}
				{/* <div className="flex items-center">
						{props.todo.assigned_company?.id == company.id && (
							<div className="flex items-center font-600">
								<span className="mx-4 underline">Task Activities</span>
								<span className="mx-4"> (0/{taskDetail?.length})</span>

								{open ? <Icon>expand_more </Icon> : <Icon>chevron_right </Icon>}
								<Button
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
								</Button>
							</div>
						)}
					</div> */}
				{/* </div> */}
			</Card>
			{props.isPdf ? props.postlist : null}
			{/* <Collapse in={open} timeout="auto" unmountOnExit> */}
			<List className="p-0">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					{taskDetail &&
						!!taskDetail.length &&
						taskDetail.map(todo => (
							<TodoActivityListItem
								{...props}
								getDetailOfTask={getDetailOfTask}
								task={props.todo}
								todo={todo}
								key={todo.id}
								postlist={<PostList tempAuthor={{}} posts={todo.post_set} />}
							/>
						))}
				</FuseAnimateGroup>
			</List>
			{/* </Collapse> */}
		</>
	);
}

export default TodoListItem;
