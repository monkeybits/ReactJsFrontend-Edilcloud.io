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
import { Collapse, ListItemIcon, ListItemText, List, Avatar } from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { EDIT_ACTIVITY_TO_TASK, GET_ACTIVITY_OF_TASK, GET_STAFF_LIST } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import moment from 'moment';
import MembersMenu from './Dialog/toolbar/MembersMenu';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import WorkerProfiles from './WorkerProfiles';
import { useParams } from 'react-router';
import ToolbarMenu from './Dialog/toolbar/ToolbarMenu';
import MenuItem from '@material-ui/core/MenuItem';
import * as ContactActions from 'app/main/apps/notes/contacts/store/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
	}
}));

function TodoActivityListItem(props) {
	const dispatch = useDispatch();
	const labels = useSelector(({ todoAppNote }) => todoAppNote.labels);
	const [open, setOpen] = React.useState(false);
	const [completed, setCompleted] = React.useState(props.todo.status == 'to-do' ? false : true);
	const [taskDetail, setTaskDetail] = useState([]);
	const routeParams = useParams();
	const classes = useStyles(props);
	const [anchorEl, setAnchorEl] = useState(null);
	const [members, setMembers] = useState([]);
	const [inviteMembers, setInviteMembers] = useState([]);
	const [checkedAll, setCheckedAll] = useState(false);
	useEffect(() => {
		setMembers(props.todo.team_workers);
	}, [props.todo.team_workers]);
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
	const editWorkers = workers => {
		let ids = [];
		let profileIds = [];
		if (Array.isArray(workers)) {
			ids = workers.filter(w => w.is_exists);
		}
		console.log({ ids });
		if (Array.isArray(props.todo.workers)) {
			profileIds = props.todo.workers;
		}
		ids = [...ids, ...profileIds];
		console.log({ ids });
		let values = {
			id: props.todo.id,
			title: props.todo.title,
			description: props.todo.description,
			datetime_start: props.todo.datetime_start,
			datetime_end: props.todo.datetime_end,
			workers: ids?.length ? ids.map(d => d.id) : null
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
		setAnchorEl(event.currentTarget);
		if (!members.length) {
			getCompanyApprovedContacts();
		}
	};

	const handleMenuClose = event => {
		stopsEvents(event);
		setAnchorEl(null);
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
				routeParams.id,
				{
					profile: member.id,
					role: member.role?.split('')?.[0]?.toLocaleLowerCase()
				},
				false
			)
		);
	};
	return (
		<>
			<ListItem
				className={clsx(classes.todoItem, { completed }, 'border-solid border-b-1 py-8 px-0 sm:px-8')}
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
							onClick={ev => ev.stopPropagation()}
							checked={completed}
							onChange={e => {
								e.stopPropagation();
								// e.preventDefault();
								editTodoActivty(e.target.checked);
							}}
						/>
						<Typography
							variant="subtitle1"
							className="todo-title"
							color={completed ? 'textSecondary' : 'inherit'}
						>
							{props.todo.title}
						</Typography>
						<div className="ml-auto">
							<Tooltip title="There is a issue with some tree are not clean on site" placement="top">
								<IconButton
									onClick={e => {
										e.stopPropagation();
										e.preventDefault();
									}}
								>
									<Icon>info_outlined</Icon>
								</IconButton>
							</Tooltip>
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
					</div>
					<div className="flex items-center ml-44 mb-8">
						<div className="custom-member-menu flex items-center" onClick={handleMenuOpen}>
							<Icon>person</Icon>
							Assign People
						</div>
						{/* 
						 {...{ value, setValue }}
						<MembersMenu
							onToggleMember={() => ''}
							members={props.todo.team_workers}
							addWorkers={editWorkers}
							// idMembers={cardForm.idMembers}
						/> */}
						<WorkerProfiles workers={props.todo.workers} />
					</div>
					<ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
						<>
							{!!members?.length && 
								// <Button onClick={handleSelectAll}>Select All </Button>
								<FormControlLabel className="px-8 pt-10 m-0 flex cusotm-checkbox-label"
									control={
									<Checkbox
										// checked={state.checkedB}
										onClick={handleSelectAll}
										name="checkedB"
									/>
									}
									label="Select All"
								/>
							}
							{!!members?.length ? (
								members.map((member, index) => {
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
													setMembers(tempMembers);
													editWorkers(tempMembers);
												}}
											/>
											<Avatar className="w-32 h-32" src={member.avatar} />
											<ListItemText className="mx-8">
												{member.first_name} {member.last_name}
											</ListItemText>
										</MenuItem>
									);
								})
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
					</ToolbarMenu>
					<div className="flex items-center mb-8 ml-32">
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
											{/* <Icon className="text-16">access_time</Icon> */}
											{/* <span className="mx-4"> */}
											Start: {moment(props.todo.datetime_start).format('MMM Do YY')}
											{/* </span> */}
										</div>
										<div
											className={clsx(
												'flex items-center px-8 py-4 rounded bg-red text-white font-size-12 ml-12'
											)}
										>
											{/* <Icon className="text-16">access_time</Icon> */}
											{/* <span className="mx-4"> */}
											Ends: {moment(props.todo.datetime_end).format('MMM Do YY')}
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
											Start: {moment(props.todo.datetime_start).format('MMM Do YY')}
											{/* </span> */}
										</div>
										<div
											className={clsx(
												'flex items-center px-8 py-4 bg-custom-light-grey rounded font-size-12 ml-12'
											)}
										>
											{/* <Icon className="text-16">access_time</Icon> */}
											{/* <span className="mx-4"> */}
											Ends: {moment(props.todo.datetime_end).format('MMM Do YY')}
											{/* </span> */}
										</div>
									</>
								)
							) : (
								<>
									<div className={clsx('flex items-center px-8 py-4 rounded font-size-12')}>
										{/* <Icon className="text-16">access_time</Icon> */}
										{/* <span className="mx-4"> */}
										Start: {moment(props.todo.datetime_start).format('MMM Do YY')}
										{/* </span> */}
									</div>
									<div
										className={clsx(
											'flex items-center px-8 py-4 bg-custom-light-grey rounded font-size-12 ml-12'
										)}
									>
										{/* <Icon className="text-16">access_time</Icon> */}
										{/* <span className="mx-4"> */}
										Ends: {moment(props.todo.datetime_end).format('MMM Do YY')}
										{/* </span> */}
									</div>
								</>
							)}
						</div>
						{/* <div className="custom-outlined-btn ml-auto">
								<Button
									variant="outlined"
									color="primary"
									className={classes.button}
									startIcon={<AddIcon />}
								>
									Add
								</Button>
							</div> */}
					</div>
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
			{props.isPdf ? props.postlist : null}
		</>
	);
}

export default TodoActivityListItem;
