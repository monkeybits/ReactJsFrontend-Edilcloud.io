import _ from '@lodash';
import loadable from '@loadable/component';
import { Checkbox, IconButton, Icon, ListItem, Typography, ListItemText, Avatar, Paper, Button, MenuItem, FormControlLabel } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { EDIT_ACTIVITY_TO_TASK, GET_ACTIVITY_OF_TASK, GET_STAFF_LIST, DELETE_ACTIVITY_OF_TASK } from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import { useParams } from 'react-router';
import * as ContactActions from 'app/main/apps/notes/contacts/store/actions';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import { toast } from 'react-toastify';
import Tippy from '@tippyjs/react';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import FuseUtils from '@fuse/utils';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/light-border.css';
const TippyMenu = loadable(() => import('app/TippyMenu'));
const WorkerProfiles = loadable(() => import('./WorkerProfiles'));

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
	const { t } = useTranslation('todo_project');
	const dispatch = useDispatch();
	const labels = useSelector(({ todoAppNote }) => todoAppNote.labels);
	const [open, setOpen] = React.useState(false);
	const [completed, setCompleted] = React.useState(props.todo.status != 'to-do');
	const deleteConfirmDialog = useSelector(({ todoAppNote }) => todoAppNote?.todos?.deleteConfirmDialog);
	const okDeleteActivityConfirmDialog = useSelector(({ todoAppNote }) => todoAppNote?.todos?.okDeleteActivityConfirmDialog);
	const [taskDetail, setTaskDetail] = useState([]);
	const routeParams = useParams();
	const company = useSelector(({ chatApp }) => chatApp?.company);
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
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
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
		if(okDeleteActivityConfirmDialog && deleteConfirmDialog.data !== null) {
			apiCall(
				DELETE_ACTIVITY_OF_TASK(deleteConfirmDialog.data.id),
				{},
				res => {
					dispatch(Actions.removeActivity(deleteConfirmDialog.data));
					dispatch(Actions.closeDeleteConfirmDialog());
				},
				err => {
					// console.log(err);
				},
				METHOD.DELETE,
				getHeaderToken()
			);
		}
	}, [okDeleteActivityConfirmDialog, deleteConfirmDialog]);

	useEffect(() => {
		if (props.todo?.status && props.todo.status == 'completed') {
			setCompleted(true);
		} else {
			setCompleted(false);
		}
	}, [props.todo?.status]);
	useEffect(() => {
		const notification = notificationPanel.notificationData?.notification;
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
			FuseUtils.notificationBackrondColor(scrollRef, 'custom-notification-bg');
		}
	}, [notificationPanel.viewing, scrollRef, hasRender]);

	useEffect(() => {
		if (Array.isArray(props.todo.workers_in_activity)) {
			const workers_in_activity = _.enhance(props.todo.workers_in_activity, { is_exists: true });

			setMembers(workers_in_activity);
		}
	}, [props.todo.workers_in_activity]);
	useEffect(() => {
		if (Array.isArray(props.todo.workers_in_activity)) {
			const can_assign_in_activity = _.enhance(props.todo.can_assign_in_activity, { is_exists: false });
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
				err => {
					// console.log(err),
				},
				METHOD.GET,
				getHeaderToken()
			);
		} else {
			setOpen(!open);
		}
	};
	const editTodoActivty = status => {
		const values = {
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
			res => {
				dispatch(Actions.editActivityByList({
					...values,
					task: props.todo.task,
					id: props.todo.id,
					workers: props.todo.workers?.length ? props.todo.workers : undefined,
				}));
			},
			err => {
				setCompleted(!status);
			},
			METHOD.PUT,
			getHeaderToken()
		);
		setCompleted(status);
	};
	const editWorkers = (workers, isCanAssign) => {
		let ids = [];
		const data = isCanAssign ? members : canAssign;
		if (Array.isArray(workers)) {
			ids = [...workers, ...data].filter(w => w.is_exists);
		}
		const values = {
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
			res => { },
			err => {
				// console.log(err);
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
			const membersTemp = _.enhance(members, { is_exists: true });
			const canAssignTemp = _.enhance(canAssign, { is_exists: true });
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
				const inviteMembers = res.results.filter(m => m.role == 'Worker');
				setInviteMembers(inviteMembers);
			},
			err => {
				// console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	const addMemberToProject = (event, index) => {
		event.preventDefault();
		const invited = [...inviteMembers];
		const member = invited[index];
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
					'border-solid border-b-1 mt-10 custom-activity bg-white px-0 sm:px-8 touch-ripple-effect-remove'
				)}
				checked={completed}
				style={{ borderLeft: '4px solid', borderLeftColor: props.task.assigned_company?.color_project }}
				onClick={ev => {
					ev.preventDefault();
					dispatch(Actions.closeTaskContent());
					dispatch(Actions.openTimelineDialog({ todo: props.todo, task: props.task }));
					props.setTodoId(props.task.id); // getDetailOfTask();
				}}
				dense
				button
			>
				<div className="flex relative overflow-hidden w-full justify-between">
					<div className="flex-col">
						<div>
							<div className="flex items-center">
								<Checkbox
									disabled={
										props.task.assigned_company?.id != company.id ||
										getRole() == 'w' ||
										getRole() == 'm'
									}
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
							</div>
						</div>
						<div className="flex items-center">
							{props.task.assigned_company?.id == company.id && (getRole() == 'd' || getRole() == 'o') && (
								<Tippy
									theme="light"
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
														label={t('SELECT_ALL')}
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
																			const tempMembers = [...members];
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
																	<Avatar
																		className="w-32 h-32"
																		src={member.profile.photo}
																	/>
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
																			const tempMembers = [...canAssign];
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
																	<Avatar
																		className="w-32 h-32"
																		src={member.profile.photo}
																	/>
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
																	<Avatar
																		className="w-32 h-32"
																		src={member.profile.photo}
																	/>
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
										<Icon className="bg-custom-primary text-white">person_add</Icon>
									</div>
								</Tippy>
							)}
							<WorkerProfiles
								workers={[...members.filter(d => d.is_exists), ...canAssign.filter(d => d.is_exists)]}
							/>
						</div>
					</div>
				</div>

				<div className="flex ml-auto items-end h-full mb-auto">
					<TippyMenu
						icon={
							<>
								<IconButton
									// aria-owns={moreMenuEl ? 'chats-more-menu' : null}
									aria-haspopup="true"
								// onClick={handleMoreMenuClick}
								// className="text-white opacity-60"
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
								dispatch(Actions.editActivityTodoDialog({ todo: props.todo, task: props.task }));
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
								dispatch(Actions.openDeleteConfirmDialog('Activity', props.todo));
							}}
						>
							<Button>
								<Icon className="mr-10">delete</Icon>
									Delete
								</Button>
						</MenuItem>
					</TippyMenu>
				</div>
			</ListItem>
			{props.isPdf ? props.postlist : null}
		</>
	);
}

export default TodoActivityListItem;
