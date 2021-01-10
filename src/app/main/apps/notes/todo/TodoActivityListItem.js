import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import { amber, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import TodoChip from './TodoChip';
import { Collapse, ListItemIcon, ListItemText, List, Avatar, Paper } from '@material-ui/core';
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
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
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
	const [canAssign, setCanAssign] = useState([]);
	const [inviteMembers, setInviteMembers] = useState([]);
	const [checkedAll, setCheckedAll] = useState(false);
	const [hasRender, setHasRender] = React.useState(false);
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const scrollRef = useRef(null);
	const [visible, setVisible] = useState(false);
	const show = () => setVisible(true);
	const hide = () => setVisible(false);
	const hasNotifcationOnThisItem = notificationPanel.notificationData?.notification?.object_id == props.todo.id;
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
		if (
			notificationPanel.viewing &&
			notification?.content_type == 'activity' &&
			notification.body.hasOwnProperty('task_id') &&
			hasRender &&
			scrollRef.current
		) {
			dispatch(notificationActions.removeFrmViewNotification());
			scrollRef.current.scrollIntoView({
				block: 'center'
			});
			scrollRef.current.classList.add('bg-yellow-200');
			setTimeout(() => {
				if (scrollRef.current) {
					scrollRef.current.classList.remove('bg-yellow-200');
				}
			}, 5000);
		}
	}, [notificationPanel.viewing, scrollRef, hasRender]);

	useEffect(() => {
		if (Array.isArray(props.todo.workers_in_activity)) {
			let workers_in_activity = _.enhance(props.todo.workers_in_activity, { is_exists: true });

			setMembers(workers_in_activity);
		}
	}, [props.todo.workers_in_activity]);
	useEffect(() => {
		if (Array.isArray(props.todo.workers_in_activity)) {
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
		show();
		if (!members.length) {
			getCompanyApprovedContacts();
		}
	};

	const handleMenuClose = event => {
		stopsEvents(event);
		// setAnchorEl(null);
		hide();
		if (!members.length) {
			props.getDetailOfTask();
		}
	};
	const stopsEvents = event => {
		if (event.preventDefault && event.stopPropagation) {
			event.preventDefault();
			event.stopPropagation();
		}
	};
	const handleSelectAll = event => {
		event.stopPropagation();
		setCheckedAll(event.target.checked);
		if (event.target.checked) {
			let membersTemp = _.enhance(members, { is_exists: true });
			let canAssignTemp = _.enhance(canAssign, { is_exists: true });
			setMembers(membersTemp);
			setCanAssign(canAssignTemp);
			editWorkers(canAssignTemp, true);
		}
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
				ref={notificationPanel.notificationData?.notification?.object_id == props.todo.id ? scrollRef : null}
				id={props.todo.id}
				className={clsx(
					classes.todoItem,
					{ completed },
					'border-solid border-b-1 mt-10 custom-activity px-0 sm:px-8 touch-ripple-effect-remove'
				)}
				checked={completed}
				style={{ borderLeft: '0px solid', borderLeftColor: props.task.assigned_company?.color_project }}
				onClick={ev => {
					ev.preventDefault();
					dispatch(Actions.openTimelineDialog({ todo: props.todo, task: props.task }));
					// getDetailOfTask();
				}}
				dense
				button
			>
				<div className="flex flex-1 flex-col relative overflow-hidden">
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
							<WorkerProfiles
								workers={[...members.filter(d => d.is_exists), ...canAssign.filter(d => d.is_exists)]}
							/>
							<Tippy
								className="custom-tippy"
								allowHTML
								placement="bottom-start"
								content={
									<Paper className={classes.paper}>
										<>
											{!!members?.length && (
												// <Button onClick={handleSelectAll}>Select All </Button>
												<FormControlLabel
													className="px-8 pt-10 m-0 flex cusotm-checkbox-label"
													control={
														<Checkbox
															checked={
																members.every(d => d.is_exists) &&
																canAssign.every(d => d.is_exists)
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
															<MenuItem
																onClick={stopsEvents}
																className="px-8"
																key={member.id}
															>
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
																		if (
																			[...tempMembers, ...canAssign].some(
																				d => d.is_exists
																			)
																		) {
																			setMembers(tempMembers);
																			editWorkers(tempMembers, false);
																		} else {
																			toast.error(
																				'Can not remove everyone from activity'
																			);
																		}
																	}}
																/>
																<Avatar className="w-32 h-32" src={member.avatar} />
																<ListItemText className="mx-8">
																	{member.profile.first_name}{' '}
																	{member.profile.last_name}
																</ListItemText>
															</MenuItem>
														);
													})}
													{canAssign.map((member, index) => {
														return (
															<MenuItem
																onClick={stopsEvents}
																className="px-8"
																key={member.id}
															>
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
																		if (
																			[...tempMembers, ...members].some(
																				d => d.is_exists
																			)
																		) {
																			setCanAssign(tempMembers);
																			editWorkers(tempMembers, true);
																		} else {
																			toast.error(
																				'Can not remove everyone from activity'
																			);
																		}
																	}}
																/>
																<Avatar className="w-32 h-32" src={member.avatar} />
																<ListItemText className="mx-8">
																	{member.profile.first_name}{' '}
																	{member.profile.last_name}
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
															<MenuItem
																onClick={stopsEvents}
																className="px-8"
																key={member.id}
															>
																<Avatar className="w-32 h-32" src={member.avatar} />
																<ListItemText className="mx-8">
																	{member.first_name} {member.last_name}
																</ListItemText>
																<Button onClick={e => addMemberToProject(e, index)}>
																	Add
																</Button>
															</MenuItem>
														);
													})}
												</>
											)}
										</>
									</Paper>
								}
								visible={visible}
								// onClickOutside={handleMenuClose}
							>
								<div
									className="custom-member-menu flex items-center"
									onClick={visible ? handleMenuClose : handleMenuOpen}
								>
									<Icon>person</Icon>
								</div>
							</Tippy>
						</div>
					</div>

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
