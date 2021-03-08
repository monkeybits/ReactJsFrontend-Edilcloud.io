/* =============================================================================
 TodoListItem.js
 ===============================================================================
*This File is written for Dashboard
Todo: This file is return each task item and list of activity which includes in task
*/
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import { amber, blue, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	Collapse,
	ListItemIcon,
	ListItemText,
	List,
	Slider,
	withStyles,
	CardContent,
	CardActions,
	LinearProgress,
	Divider
} from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_ACTIVITY_OF_TASK } from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
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
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TodoActivityListItem from './TodoActivityListItem';
import TodoChip from './TodoChip';
import * as Actions from './store/actions';
import TaskContentForm from './TaskContentForm';
import EditActivityPostForm from './EditActivityPostForm';

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
	const labels = useSelector(({ todoApp }) => todoApp.labels);
	const todoDialog = useSelector(({ todoApp }) => todoApp.todos.todoDialog);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const projectDetail = props.todo.project;
	const [open, setOpen] = React.useState(false);
	const [showProgress, setShowProgress] = React.useState(false);
	const [id, setId] = React.useState(null);
	const [taskDetail, setTaskDetail] = useState([]);
	const [activityId, setactivityId] = useState(null);
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const classes = useStyles(props);
	const routeParams = useParams();
	const orderBy = useSelector(({ todoApp }) => todoApp.todos.orderBy);
	const orderDescending = useSelector(({ todoApp }) => todoApp.todos.orderDescending);
	const { t } = useTranslation('dashboard');
	const taskContentDialog = useSelector(({ todoApp }) => todoApp.todos.taskContentDialog);

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

	return (
		<div className="mb-20">
			<Card
				elevation={1}
				className="flex flex-col overflow-inherit mb-6"
				onClick={() => {
					// if (getRole() == 'o' || getRole() == 'd') {
					dispatch(Actions.closeTimelineDialog());
					dispatch(Actions.openTaskContent(props.todo));
					props.setTodoId(props.todo.id);
					// }
				}}
			>
				{/* card body */}
				<div
					className="flex flex-shrink-0 items-center justify-between px-24 h-64 rounded-t"
					style={{
						background: blue[500],
						color: theme.palette.getContrastText(blue[500])
					}}
				>
					<Typography className="font-medium truncate ht-auto" color="inherit">
						{props.todo.assigned_company?.name}
					</Typography>

					<Button
						style={{
							color: theme.palette.getContrastText(
								props.todo.assigned_company?.color_project || '#D3D3D3'
							) // )
						}}
						onClick={ev => {
							ev.preventDefault();
							ev.stopPropagation();
							if (props.todo.assigned_company) {
								dispatch(Actions.openAddActivityTodoDialog(props.todo));
							}
						}}
					>
						<Icon className="mr-10">add_circle_outline</Icon>
						SOTTOFASE
					</Button>
				</div>
				<CardContent className="flex flex-col flex-auto ">
					<Typography className="text-center text-16 font-400 items-center justify-center ht-auto">
						{projectDetail?.name}
					</Typography>
					<Typography
						className="text-center text-20 font-700 items-center justify-center ht-auto mt-8"
						color="inherit"
					>
						{props.todo.name}
					</Typography>
					<div className="flex items-center flex-wrap justify-center my-12">
						{props.todo.progress == 100 ? (
							<div className={clsx('flex items-center px-8 py-4 mx-4 rounded bg-green-500 text-white')}>
								<Icon className="text-16 mt-4">check_circle</Icon>{' '}
								<span className="mx-4">Completed</span>
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
											'flex items-center px-8 py-4 rounded bg-red text-white font-size-12 ml-12'
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
				{/* </div> */}
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
									startIcon={<add_task />}
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

export default TodoListItem;
