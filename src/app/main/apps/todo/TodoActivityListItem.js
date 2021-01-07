import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import { amber, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import TodoChip from './TodoChip';
import { Collapse, ListItemIcon, ListItemText, List, Avatar, Popover, Paper } from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { EDIT_ACTIVITY_TO_TASK, GET_ACTIVITY_OF_TASK, GET_STAFF_LIST } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import moment from 'moment';
import MembersMenu from '../notes/todo/Dialog/toolbar/MembersMenu';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import WorkerProfiles from './WorkerProfiles';
import { useParams } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import * as ContactActions from 'app/main/apps/notes/contacts/store/actions';
import ToolbarMenu from '../notes/todo/Dialog/toolbar/ToolbarMenu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { toast } from 'react-toastify';
import { green } from '@material-ui/core/colors';

_.enhance = function (list, source) {
	return _.map(list, function (element) {
		return _.extend({}, element, source);
	});
};
const useStyles = makeStyles(theme => ({
	todoItem: {
		'&.completed': {
			background: 'rgba(0,0,0,0.03)',
			'& .todo-title, & .todo-notes': {
				textDecoration: 'line-through'
			}
		}
	},
	nested: {
		paddingLeft: theme.spacing(4)
	},
	paper: {
		marginRight: theme.spacing(2)
	},
	anchor: {
		backgroundColor: green[500],
		width: 10,
		height: 10,
		borderRadius: '50%',
		position: 'absolute'
	}
}));
const inlineStyles = {
	anchorVertical: {
		top: {
			top: -5
		},
		center: {
			top: 'calc(50% - 5px)'
		},
		bottom: {
			bottom: -5
		}
	},
	anchorHorizontal: {
		left: {
			left: -5
		},
		center: {
			left: 'calc(50% - 5px)'
		},
		right: {
			right: -5
		}
	}
};
function TodoActivityListItem(props) {
	const dispatch = useDispatch();
	const labels = useSelector(({ todoApp }) => todoApp.labels);
	const [open, setOpen] = React.useState(false);
	const [completed, setCompleted] = React.useState(props.todo.status == 'to-do' ? false : true);
	const [taskDetail, setTaskDetail] = useState([]);
	const routeParams = useParams();
	const classes = useStyles(props);
	const [anchorEl, setAnchorEl] = useState(null);
	const [members, setMembers] = useState([]);
	const [inviteMembers, setInviteMembers] = useState([]);
	const [checkedAll, setCheckedAll] = useState(false);
	const [canAssign, setCanAssign] = useState([]);
	const anchorRef = React.useRef();
	const [state, setState] = React.useState({
		open: false,
		anchorOriginVertical: 'bottom',
		anchorOriginHorizontal: 'right',
		transformOriginVertical: 'top',
		transformOriginHorizontal: 'right',
		positionTop: 200, // Just so the popover can be spotted more easily
		positionLeft: 400, // Same as above
		anchorReference: 'anchorPosition'
	});
	useEffect(() => {
		if (Array.isArray(props.todo.workers_in_activity)) {
			let workers_in_activity = _.enhance(props.todo.workers_in_activity, { is_exists: true });

			setMembers(workers_in_activity);
		}
	}, [props.todo.workers_in_activity]);
	useEffect(() => {
		if (Array.isArray(props.todo.can_assign_in_activity)) {
			let can_assign_in_activity = _.enhance(props.todo.can_assign_in_activity, { is_exists: false });
			setCanAssign(can_assign_in_activity);
		}
	}, [props.todo.can_assign_in_activity]);
	const handleClick = () => {
		setOpen(!open);
	};
	const getDetailOfTask = () => {
		if (open === false) {
			apiCall(
				GET_ACTIVITY_OF_TASK(props.todo.id),
				{},
				res => {
					setTaskDetail(res.results);
					setOpen(true);
				},
				err => console.log(err),
				METHOD.GET,
				getHeaderToken()
			);
		} else {
			setOpen(!open);
		}
	};
	const editTodoActivty = status => {
		let values = {
			title: props.todo.title,
			description: props.todo.description,
			datetime_start: props.todo.datetime_start,
			datetime_end: props.todo.datetime_end,
			workers: props.todo.workers?.length ? props.todo.workers.map(d => d.id) : undefined,
			status: status ? 'completed' : 'to-do'
		};

		// console.log({ todo, values });
		apiCall(
			EDIT_ACTIVITY_TO_TASK(props.todo.id),
			values,
			res => {},
			err => {
				setCompleted(!status);
				console.log(err);
			},
			METHOD.PUT,
			getHeaderToken()
		);
		setCompleted(status);
	};
	const editWorkers = (workers, isCanAssign) => {
		let ids = [];
		let data = isCanAssign ? members : canAssign;
		if (Array.isArray(workers)) {
			ids = [...workers, ...data].filter(w => w.is_exists);
		}

		console.log({ ids });
		let values = {
			id: props.todo.id,
			title: props.todo.title,
			description: props.todo.description,
			datetime_start: props.todo.datetime_start,
			datetime_end: props.todo.datetime_end,
			workers: ids?.length ? ids.map(d => d.profile.id) : null
		};

		apiCall(
			EDIT_ACTIVITY_TO_TASK(props.todo.id),
			values,
			res => {},
			err => {
				console.log(err);
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};
	const handleMenuOpen = event => {
		stopsEvents(event);
		setState({
			...state,
			open: true
		});
		// setAnchorEl(event.currentTarget);
		// if (!members.length) {
		// 	getCompanyApprovedContacts();
		// }
	};

	const handleMenuClose = event => {
		stopsEvents(event);
		// setAnchorEl(null);
		setState({
			...state,
			open: false
		});
		if (!members.length) {
			props.getDetailOfTask();
		}
	};
	const stopsEvents = event => {
		event.preventDefault();
		event.stopPropagation();
	};
	const handleSelectAll = event => {
		event.stopPropagation();
		setCheckedAll(event.target.checked);
		let tempMembers = [...members];
		tempMembers = tempMembers.map(d => ({ ...d, is_exists: true }));
		setMembers(tempMembers);
		editWorkers(tempMembers);
	};
	const getCompanyApprovedContacts = () => {
		apiCall(
			GET_STAFF_LIST,
			{},
			res => {
				let inviteMembers = res.results.filter(m => m.role == 'Worker');
				console.log(inviteMembers);
				setInviteMembers(inviteMembers);
			},
			err => {
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	const addMemberToProject = (event, index) => {
		event.preventDefault();
		let invited = [...inviteMembers];
		let member = invited[index];
		invited[index] = {
			...member,
			is_exists: true
		};
		setInviteMembers(invited);
		dispatch(
			ContactActions.addMemberToProject(
				props.task.project.id,
				{
					profile: member.id,
					role: member.role?.split('')?.[0]?.toLocaleLowerCase()
				},
				false
			)
		);
	};
	let mode = `
	anchorReference="${state.anchorReference}"
	anchorPosition={{ top: ${state.positionTop}, left: ${state.positionLeft} }}`;

	const jsx = `
	<Popover ${mode}
	  anchorOrigin={{
		vertical: '${state.anchorOriginVertical}',
		horizontal: '${state.anchorOriginHorizontal}',
	  }}
	  transformOrigin={{
		vertical: '${state.transformOriginVertical}',
		horizontal: '${state.transformOriginHorizontal}',
	  }}
	>
	  The content of the Popover.
	</Popover>
	`;
	return (
		<>
			<ListItem
				className={clsx(classes.todoItem, { completed }, 'border-solid border-b-1 py-8 px-0 sm:px-8 touch-ripple-effect-remove')}
				checked={completed}
				style={{ borderLeft: '4px solid', borderLeftColor: props.task.assigned_company?.color_project }}
				onClick={ev => {
					ev.preventDefault();
					dispatch(Actions.openTimelineDialog({ todo: props.todo, task: props.task }));
					// getDetailOfTask();
				}}
				dense
				button
			>
				<div className="flex flex-1 flex-col mb-8 relative overflow-hidden">
					<div className="flex items-center">
						<Checkbox
							tabIndex={-1}
							disableRipple
							checked={completed}
							onChange={e => {
								e.stopPropagation();
								// e.preventDefault();
								editTodoActivty(e.target.checked);
							}}
							onClick={ev => ev.stopPropagation()}
						/>
						<Typography
							variant="subtitle1"
							className="todo-title"
							color={completed ? 'textSecondary' : 'inherit'}
						>
							{props.todo.title}
						</Typography>
						<div className="ml-auto">
							{/* <Tooltip title="There is a issue with some tree are not clean on site" placement="top">
								<IconButton
									onClick={e => {
										e.stopPropagation();
										e.preventDefault();
									}}
								>
									<Icon>info_outlined</Icon>
								</IconButton>
							</Tooltip> */}
							{/* <IconButton
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											if (props.todo.assigned_company) {
												dispatch(Actions.openAddActivityTodoDialog(props.todo));
											}
										}}
									>
										<Icon>error</Icon>
									</IconButton> */}
						</div>
						<div className="flex items-center ml-44 mb-8">
							{/* 
						<MembersMenu
							onToggleMember={() => ''}
							members={props.todo.team_workers}
							addWorkers={editWorkers}
							// idMembers={cardForm.idMembers}
						/> */}
							<WorkerProfiles
								workers={[...members.filter(d => d.is_exists), ...canAssign.filter(d => d.is_exists)]}
							/>
							<div
								ref={anchorRef}
								className="custom-member-menu flex items-center"
								onClick={handleMenuOpen}
							>
								<Icon>person</Icon>
								{/* Assign People */}
							</div>
							<div
								className={classes.anchor}
								style={{
									...inlineStyles.anchorVertical[state.anchorOriginVertical],
									...inlineStyles.anchorHorizontal[state.anchorOriginHorizontal]
								}}
							/>
						</div>
					</div>
					<Popover
						open={state.open}
						anchorEl={anchorRef.current}
						anchorReference="anchorEl"
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
							{/* <ToolbarMenu state={anchorEl} onClose={handleMenuClose}> */}
							<>
								{!!members?.length && (
									// <Button onClick={handleSelectAll}>Select All </Button>
									<FormControlLabel
										className="px-8 pt-10 m-0 flex cusotm-checkbox-label"
										control={
											<Checkbox
												checked={
													members.every(d => d.is_exists) && canAssign.every(d => d.is_exists)
												}
												onClick={handleSelectAll}
												name="checkedB"
											/>
										}
										label="Select All"
									/>
								)}
								{!!members?.length || !!canAssign?.length ? (
									<>
										{members.map((member, index) => {
											return (
												<MenuItem onClick={stopsEvents} className="px-8" key={member.id}>
													<Checkbox
														onClick={ev => ev.stopPropagation()}
														name={member.first_name}
														checked={!!member.is_exists}
														onChange={e => {
															let tempMembers = [...members];
															tempMembers[index] = {
																...tempMembers[index],
																is_exists: e.target.checked
															};
															if ([...tempMembers, ...canAssign].some(d => d.is_exists)) {
																setMembers(tempMembers);
																editWorkers(tempMembers, false);
															} else {
																toast.error('Can not remove everyone from activity');
															}
														}}
													/>
													<Avatar className="w-32 h-32" src={member.avatar} />
													<ListItemText className="mx-8">
														{member.profile.first_name} {member.profile.last_name}
													</ListItemText>
												</MenuItem>
											);
										})}
										{canAssign.map((member, index) => {
											return (
												<MenuItem onClick={stopsEvents} className="px-8" key={member.id}>
													<Checkbox
														onClick={ev => ev.stopPropagation()}
														name={member.first_name}
														checked={!!member.is_exists}
														onChange={e => {
															let tempMembers = [...canAssign];
															tempMembers[index] = {
																...tempMembers[index],
																is_exists: e.target.checked
															};
															if ([...tempMembers, ...members].some(d => d.is_exists)) {
																setCanAssign(tempMembers);
																editWorkers(tempMembers, true);
															} else {
																toast.error('Can not remove everyone from activity');
															}
														}}
													/>
													<Avatar className="w-32 h-32" src={member.avatar} />
													<ListItemText className="mx-8">
														{member.profile.first_name} {member.profile.last_name}
													</ListItemText>
												</MenuItem>
											);
										})}
									</>
								) : (
									<>
										<Typography variant="subtitle1" className="todo-title p-8">
											{inviteMembers.length
												? 'You have no workers in your project, add from below list'
												: 'You have no workers in your company'}
										</Typography>
										{inviteMembers.map((member, index) => {
											return member.is_exists ? null : (
												<MenuItem onClick={stopsEvents} className="px-8" key={member.id}>
													<Avatar className="w-32 h-32" src={member.avatar} />
													<ListItemText className="mx-8">
														{member.first_name} {member.last_name}
													</ListItemText>
													<Button onClick={e => addMemberToProject(e, index)}>Add</Button>
												</MenuItem>
											);
										})}
									</>
								)}
							</>
							{/* </ToolbarMenu> */}
						</Paper>
					</Popover>
					{/* <div className="flex items-center mb-8 ml-32">
						<div className="flex items-center flex-wrap">
							{props.todo.progress == 100 ? (
								<div className={clsx('flex items-center px-8 py-4 rounded-sm bg-green text-white')}>
									<Icon className="text-16 mt-4">check_circle</Icon>{' '}
									<span className="mx-4">Completed</span>
								</div>
							) : moment().diff(moment(props.todo.datetime_start)) > 0 ? (
								moment().diff(moment(props.todo.datetime_end)) > 0 ? (
									<>
										<div className={clsx('flex items-center px-8 py-4 rounded font-size-12')}>
											Start: {moment(props.todo.datetime_start).format('MMM Do YY')}
										</div>
										<div
											className={clsx(
												'flex items-center px-8 py-4 rounded bg-red text-white font-size-12 ml-12'
											)}
										>
											Ends: {moment(props.todo.datetime_end).format('MMM Do YY')}
										</div>
									</>
								) : (
									<>
										<div
											className={clsx(
												'flex items-center px-8 py-4 bg-green rounded text-white font-size-12'
											)}
										>
											Start: {moment(props.todo.datetime_start).format('MMM Do YY')}
										</div>
										<div
											className={clsx(
												'flex items-center px-8 py-4 bg-custom-light-grey rounded font-size-12 ml-12'
											)}
										>
											Ends: {moment(props.todo.datetime_end).format('MMM Do YY')}
										</div>
									</>
								)
							) : (
								<>
									<div className={clsx('flex items-center px-8 py-4 rounded font-size-12')}>
										Start: {moment(props.todo.datetime_start).format('MMM Do YY')}
									</div>
									<div
										className={clsx(
											'flex items-center px-8 py-4 bg-custom-light-grey rounded font-size-12 ml-12'
										)}
									>
										Ends: {moment(props.todo.datetime_end).format('MMM Do YY')}
									</div>
								</>
							)}
						</div>
					</div> */}
					<div className={clsx(classes.labels, 'flex -mx-2')}>
						{props.todo.labels?.map(label => (
							<TodoChip
								className="mx-2 mt-4"
								title={_.find(labels, { id: label }).title}
								color={_.find(labels, { id: label }).color}
								key={label}
							/>
						))}
					</div>
				</div>

				{/* <div className="flex items-center px-8">
					<div className="custom-error-icon">
						<IconButton
							onClick={ev => {
								ev.preventDefault();
								ev.stopPropagation();
								if (props.todo.assigned_company) {
									dispatch(Actions.openAddActivityTodoDialog(props.todo));
								}
							}}
						>
							<Icon>error</Icon>
						</IconButton>
					</div>
				</div> */}
			</ListItem>
		</>
	);
}

export default TodoActivityListItem;
