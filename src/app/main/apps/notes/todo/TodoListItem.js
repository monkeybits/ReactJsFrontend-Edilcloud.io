import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import { amber, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import TodoChip from './TodoChip';
import { Collapse, ListItemIcon, ListItemText, List } from '@material-ui/core';
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

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function TodoListItem(props) {
	const dispatch = useDispatch();
	const labels = useSelector(({ todoAppNote }) => todoAppNote.labels);
	const todoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.todoDialog);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const [open, setOpen] = React.useState(false);
	const [id, setId] = React.useState(null);
	const [taskDetail, setTaskDetail] = useState([]);
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const classes = useStyles(props);
	const handleClick = () => {
		setOpen(!open);
	};
	useEffect(() => {
		console.log({
			activities: props.todo.activities
		});
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
		<>
			<Card
				className={clsx(classes.card, 'w-full mt-10 rounded-4 cursor-pointer border-1')}
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
						<div className="flex items-center mb-6 -mx-4">
							{props.todo.assigned_company && (
								<TodoChip
									title={props.todo.assigned_company?.name}
									color={props.todo.assigned_company?.color_project}
								/>
							)}
						</div>
						<Typography className="MuiTypography-root todo-title truncate MuiTypography-subtitle1 MuiTypography-colorInherit uppercase">
							{' '}
							{props.todo.name}{' '}
						</Typography>
						<Typography className="MuiTypography-root todo-notes truncate mb-8 MuiTypography-body1 MuiTypography-colorTextSecondary">
							{projectDetail?.name}
						</Typography>

						{/* dates below */}
						<div className="flex items-center mb-8">
							{props.todo.progress == 100 ? (
								<div
									className={clsx('flex items-center px-8 py-4 mx-4 rounded-sm bg-green text-white')}
								>
									<Icon className="text-16 mt-4">check_circle</Icon>{' '}
									<span className="mx-4">Completed</span>
								</div>
							) : moment().diff(moment(props.todo.date_start)) > 0 ? (
								moment().diff(moment(props.todo.date_end)) > 0 ? (
									<>
										<div className={clsx('flex items-center px-8 py-4 rounded-sm text-white')}>
											<Icon className="text-16">access_time</Icon>
											<span className="mx-4">
												{moment(props.todo.date_start).format('MMM Do YY')}
											</span>
										</div>
										<div
											className={clsx(
												'flex items-center px-8 py-4 mx-4 rounded-sm bg-red text-white'
											)}
										>
											<Icon className="text-16">access_time</Icon>
											<span className="mx-4">
												{moment(props.todo.date_end).format('MMM Do YY')}
											</span>
										</div>
									</>
								) : (
									<>
										<div
											className={clsx(
												'flex items-center px-8 py-4 bg-green rounded-sm text-white'
											)}
										>
											<Icon className="text-16">access_time</Icon>
											<span className="mx-4">
												{moment(props.todo.date_start).format('MMM Do YY')}
											</span>
										</div>
										<div className={clsx('flex items-center px-8 py-4 mx-4 rounded-sm text-white')}>
											<Icon className="text-16">access_time</Icon>
											<span className="mx-4">
												{moment(props.todo.date_end).format('MMM Do YY')}
											</span>
										</div>
									</>
								)
							) : (
								<>
									<div className={clsx('flex items-center px-8 py-4 mx-4 rounded-sm text-white')}>
										<Icon className="text-16">access_time</Icon>
										<span className="mx-4">
											{moment(props.todo.date_start).format('MMM Do YY')}
										</span>
									</div>
									<div className={clsx('flex items-center px-8 py-4 mx-4 rounded-sm text-white')}>
										<Icon className="text-16">access_time</Icon>
										<span className="mx-4">{moment(props.todo.date_end).format('MMM Do YY')}</span>
									</div>
								</>
							)}
						</div>
					</div>
					<div className="flex items-center -mt-12">
						<Box position="relative" display="inline-flex">
							<CircularProgress color="secondary" variant="static" value={props.todo.progress} />
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
					</div>
					{/* <div className="flex items-center mb-12 -mx-4">
						{moment().diff(moment(props.todo.date_end)) > 0 && (
							<div className="flex items-center px-8 py-4 mx-4 rounded-sm bg-red text-white">
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
				<div className="flex justify-between h-48 px-16 border-t-1">
					{/* left side footer */}
					<div className="flex items-center -mx-6">
						<div className="flex items-center px-8 py-4 mx-4 rounded-sm bg-grey-700 text-white">
							<Icon className="text-16">check_circle</Icon>
							<span className="mx-4">2/7</span>
						</div>
					</div>

					{/* right side footer */}
					<div className="flex items-center justify-end -mx-6">
						{props.todo.assigned_company?.id == company.id && (
							<IconButton
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
						)}
						{props.todo.assigned_company?.id == company.id && (
							<div
								className="flex items-center px-8 py-4 mx-4 rounded-sm bg-grey-700 text-white"
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
							>
								<Icon className="text-16">check_circle</Icon>
								<span className="mx-4">Open Activities list</span>
								<span className="mx-4"> 0/{taskDetail?.length}</span>

								{open ? <Icon>expand_more </Icon> : <Icon>chevron_right </Icon>}
							</div>
						)}
					</div>
				</div>
			</Card>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List className="p-0">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						{taskDetail &&
							!!taskDetail.length &&
							taskDetail.map(todo => (
								<TodoActivityListItem task={props.todo} todo={todo} key={todo.id} />
							))}
					</FuseAnimateGroup>
				</List>
			</Collapse>
		</>
	);
}

export default TodoListItem;
