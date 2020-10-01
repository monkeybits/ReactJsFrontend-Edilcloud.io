import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import { amber, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import TodoChip from './TodoChip';
import { Collapse, ListItemIcon, ListItemText, List } from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_ACTIVITY_OF_TASK } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import moment from 'moment';
import MembersMenu from './Dialog/toolbar/MembersMenu';

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
	const [completed, setCompleted] = React.useState(false);
	const [taskDetail, setTaskDetail] = useState([]);
	const classes = useStyles(props);
	let members = [
		{
			id: '56027c1930450d8bf7b10758',
			name: 'Alice Freeman',
			avatar: 'assets/images/avatars/alice.jpg'
		},
		{
			id: '26027s1930450d8bf7b10828',
			name: 'Danielle Obrien',
			avatar: 'assets/images/avatars/danielle.jpg'
		},
		{
			id: '76027g1930450d8bf7b10958',
			name: 'James Lewis',
			avatar: 'assets/images/avatars/james.jpg'
		},
		{
			id: '36027j1930450d8bf7b10158',
			name: 'John Doe',
			avatar: 'assets/images/avatars/Velazquez.jpg'
		}
	];
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
	return (
		<>
			<ListItem
				className={clsx(classes.todoItem, { completed }, 'border-solid border-b-1 py-16 px-0 sm:px-8')}
				checked={completed}
				onChange={() => setCompleted(prev => !prev)}
				onClick={ev => {
					ev.preventDefault();
					dispatch(Actions.openTimelineDialog({ todo: props.todo, task: props.task }));
					// getDetailOfTask();
				}}
				dense
				button
			>
				<Checkbox
					tabIndex={-1}
					disableRipple
					checked={props.todo.completed}
					// onChange={() => dispatch(Actions.toggleCompleted(props.todo))}
					onClick={ev => ev.stopPropagation()}
				/>

				<div className="flex flex-1 flex-col mb-8 relative overflow-hidden px-8">
					<Typography
						variant="subtitle1"
						className="todo-title"
						color={props.todo.completed ? 'textSecondary' : 'inherit'}
					>
						{props.todo.title}
					</Typography>

					<div className="flex items-center mb-8">
						{props.todo.progress == 100 ? (
							<div className={clsx('flex items-center px-8 py-4 rounded-sm bg-green text-white')}>
								<Icon className="text-16 mt-4">check_circle</Icon>{' '}
								<span className="mx-4">Completed</span>
							</div>
						) : moment().diff(moment(props.todo.datetime_start)) > 0 ? (
							moment().diff(moment(props.todo.datetime_end)) > 0 ? (
								<>
									<div className={clsx('flex items-center px-8 py-4 rounded-sm text-white')}>
										<Icon className="text-16">access_time</Icon>
										<span className="mx-4">
											{moment(props.todo.datetime_start).format('MMM Do YY')}
										</span>
									</div>
									<div className={clsx('flex items-center px-8 py-4 rounded-sm bg-red text-white')}>
										<Icon className="text-16">access_time</Icon>
										<span className="mx-4">
											{moment(props.todo.datetime_end).format('MMM Do YY')}
										</span>
									</div>
								</>
							) : (
								<>
									<div className={clsx('flex items-center px-8 py-4 bg-green rounded-sm text-white')}>
										<Icon className="text-16">access_time</Icon>
										<span className="mx-4">
											{moment(props.todo.datetime_start).format('MMM Do YY')}
										</span>
									</div>
									<div className={clsx('flex items-center px-8 py-4 rounded-sm text-white')}>
										<Icon className="text-16">access_time</Icon>
										<span className="mx-4">
											{moment(props.todo.datetime_end).format('MMM Do YY')}
										</span>
									</div>
								</>
							)
						) : (
							<>
								<div className={clsx('flex items-center px-8 py-4 rounded-sm text-white')}>
									<Icon className="text-16">access_time</Icon>
									<span className="mx-4">
										{moment(props.todo.datetime_start).format('MMM Do YY')}
									</span>
								</div>
								<div className={clsx('flex items-center px-8 py-4 rounded-sm text-white')}>
									<Icon className="text-16">access_time</Icon>
									<span className="mx-4">{moment(props.todo.datetime_end).format('MMM Do YY')}</span>
								</div>
							</>
						)}
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

				<div className="flex items-center px-8">
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
					<div className="custom-edit-icon">
						<MembersMenu
							onToggleMember={() => ''}
							members={props.todo.team_workers}
							// idMembers={cardForm.idMembers}
						/>
					</div>
				</div>
			</ListItem>
		</>
	);
}

export default TodoActivityListItem;
