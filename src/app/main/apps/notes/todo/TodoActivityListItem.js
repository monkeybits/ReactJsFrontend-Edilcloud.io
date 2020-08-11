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
	const labels = useSelector(({ todoApp }) => todoApp.labels);
	const [open, setOpen] = React.useState(false);
	const [taskDetail, setTaskDetail] = useState([]);
	const classes = useStyles(props);
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
				className={clsx(
					classes.todoItem,
					{ completed: props.todo.completed },
					'border-solid border-b-1 py-16 px-0 sm:px-8'
				)}
				onClick={ev => {
					ev.preventDefault();
					// dispatch(Actions.openEditTodoDialog(props.todo));
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

				<div className="flex flex-1 flex-col relative overflow-hidden px-8">
					<Typography
						variant="subtitle1"
						className="todo-title truncate"
						color={props.todo.completed ? 'textSecondary' : 'inherit'}
					>
						{props.todo.title}
					</Typography>

					<Typography color="textSecondary" className="todo-notes truncate">
						{_.truncate(props.todo.description?.replace(/<(?:.|\n)*?>/gm, ''), { length: 180 })}
					</Typography>

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

				<div className="px-8">
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
					<IconButton
						onClick={ev => {
							ev.preventDefault();
							ev.stopPropagation();
							// dispatch(Actions.toggleStarred(props.todo));
						}}
					>
						<Icon>edit</Icon>
					</IconButton>
				</div>
			</ListItem>
		</>
	);
}

export default TodoActivityListItem;
