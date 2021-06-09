/* =============================================================================
 TodoActivityListItem.js
 ===============================================================================
This is part of dashboard 
TODO: This file is created for activity list item 
*/
import loadable from '@loadable/component';
import _ from '@lodash';
import { green } from '@material-ui/core/colors';
import {
	Checkbox,
	Icon,
	ListItem,
	Typography,
	ListItemText,
	Avatar,
	Paper,
	Button,
	MenuItem,
	FormControlLabel,
	IconButton
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as ContactActions from 'app/main/apps/notes/contacts/store/actions';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { EDIT_ACTIVITY_TO_TASK, GET_ACTIVITY_OF_TASK, GET_STAFF_LIST, DELETE_ACTIVITY_OF_TASK } from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import { useParams } from 'react-router';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';

const WorkerProfiles = loadable(() => import('./WorkerProfiles'));
const TodoChip = loadable(() => import('./TodoChip'));
const TippyMenu = loadable(() => import('app/TippyMenu'));

_.enhance = function (list, source) {
	return _.map(list, function (element) {
		return _.extend({}, element, source);
	});
};
const useStyles = makeStyles(theme => ({
	root: {
		zoom: '110%'
	},
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
	const labels = useSelector(({ todoApp }) => todoApp.labels); // to get the labels
	const [open, setOpen] = React.useState(false);
	const [completed, setCompleted] = React.useState(props.todo.status != 'to-do'); // to set task compalted or not
	const deleteConfirmDialog = useSelector(({ todoApp }) => todoApp?.todos?.deleteConfirmDialog);
	const okDeleteActivityConfirmDialog = useSelector(({ todoApp }) => todoApp?.todos?.okDeleteActivityConfirmDialog);
	const [taskDetail, setTaskDetail] = useState([]);
	const routeParams = useParams();
	const classes = useStyles(props);
	const [anchorEl, setAnchorEl] = useState(null);
	const [members, setMembers] = useState([]);
	const [inviteMembers, setInviteMembers] = useState([]);
	const [checkedAll, setCheckedAll] = useState(false);
	const [canAssign, setCanAssign] = useState([]);
	const anchorRef = React.useRef();
	const [visible, setVisible] = useState(false);
	const [ariaExpanded, setAriaExpanded] = useState(false);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const show = () => setVisible(true);
	const hide = () => setVisible(false);
	const { t } = useTranslation('dashboard');
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	useEffect(() => {
		if (props.todo?.status && props.todo.status == 'completed') {
			setCompleted(true);
		} else {
			setCompleted(false);
		}
	}, [props.todo?.status]);

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
		if (Array.isArray(props.todo.workers_in_activity)) {
			const workers_in_activity = _.enhance(props.todo.workers_in_activity, { is_exists: true });

			setMembers(workers_in_activity);
		}
	}, [props.todo.workers_in_activity]);

	useEffect(() => {
		if (Array.isArray(props.todo.can_assign_in_activity)) {
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
					// console.log(err)
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
		event.stopPropagation();
		event.preventDefault();
		stopsEvents(event);
		show();
		// setState({
		// 	...state,
		// 	open: true
		// });
		// setAnchorEl(event.currentTarget);
		// if (!members.length) {
		// 	getCompanyApprovedContacts();
		// }
	};

	const handleMenuClose = event => {
		stopsEvents(event);
		// setAnchorEl(null);
		hide();
		// setState({
		// 	...state,
		// 	open: false
		// });
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
		event.preventDefault();
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
				props.task.project.id,
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
				className={clsx(
					classes.todoItem,
					{ completed },
					'border-solid border-b-1 mt-10 bordergrey bg-white px-0 custom-activity sm:px-8 touch-ripple-effect-remove'
				)}
				checked={completed}
				style={{ borderLeft: '0px solid', borderLeftColor: props.task.assigned_company?.color_project }}
				onClick={ev => {
					ev.preventDefault();
					dispatch(Actions.closeTaskContent()); // we need to close the task conennt dialog to open activity dialog
					dispatch(Actions.openTimelineDialog({ todo: props.todo, task: props.task })); // when open activity dialog we need to pass the task and current activity
					props.setTodoId(props.task.id); // we are passing this ID to parent component to we can compare the id and we can open one actvity dialo only else all dialog will be opened
					// getDetailOfTask();
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
										props.task.assigned_company?.id != company.id || getRole() == 'w' // we have to disbale check box for some roles or for other comapnies
									}
									tabIndex={-1}
									disableRipple
									checked={completed}
									onChange={e => {
										e.stopPropagation();
										// e.preventDefault();
										editTodoActivty(e.target.checked); // call the API to Edit Activity
									}}
									onClick={ev => ev.stopPropagation()}
								/>
								<Typography
									variant="subtitle1"
									className="todo-title"
									color={completed ? 'textSecondary' : 'inherit'} // in change of activity change styles
								>
									{props.todo.title}
								</Typography>
								<div className="ml-auto">
								</div>
							</div>
						</div>
						<div className="flex items-center">
							{props.task.assigned_company?.id == company.id && (getRole() == 'd' || getRole() == 'o') && (
								<Tippy
									className="custom-tippy"
									placement="bottom"
									animation="fade"
									arrow
									theme="light-border"
									trigger="click"
									// Need to ensure it can be tabbed to directly after with no clipping issues
									// appendTo="parent"
									onMount={() => setAriaExpanded('true')}
									onHide={() => setAriaExpanded('false')}
									// interactive
									// hideOnClick={false}
									onClickOutside={handleMenuClose}
									content={
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
																		onClick={stopsEvents}
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
											{/* </ToolbarMenu> */}
										</Paper>
									}
								// onClickOutside={handleMenuClose}
								>
									<div
										ref={anchorRef}
										className="custom-member-menu flex items-center"
										onClick={visible ? handleMenuClose : handleMenuOpen}
										aria-haspopup="true"
										aria-expanded={ariaExpanded}
									>
										<Icon className="bg-custom-primary text-white">person_add</Icon>
										{/* Assign People */}
									</div>
								</Tippy>
							)}
							{/* <JSXContent /> */}
							<WorkerProfiles
								workers={[...members.filter(d => d.is_exists), ...canAssign.filter(d => d.is_exists)]}
							/>
						</div>
					</div>

					<div className="flex ml-auto items-end">
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
			</ListItem>
		</>
	);
}

export default TodoActivityListItem;
