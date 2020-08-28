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
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import TodoActivityListItem from './TodoActivityListItem';

const useStyles = makeStyles(theme => ({
	todoItem: {
		borderLeftColor: 'transparent',
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

function TodoListItem(props) {
	const dispatch = useDispatch();
	const labels = useSelector(({ todoApp }) => todoApp.labels);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
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
					'border-solid border-l-4 py-16 px-0 sm:px-8 border-bottom'
				)}
				style={{ borderColor: props.todo.assigned_company?.color_project }}
				onClick={ev => {
					ev.preventDefault();
					ev.stopPropagation();
					if (props.todo.assigned_company?.id == company.id) {
						getDetailOfTask();
					}
				}}
				dense
				button
			>
				<div className="flex flex-1 flex-col relative overflow-hidden px-8">
					<Typography color="textSecondary" className="todo-notes truncate">
						{projectDetail?.name}
					</Typography>
					<Typography
						variant="subtitle1"
						className="todo-title truncate"
						color={props.todo.completed ? 'textSecondary' : 'inherit'}
					>
						{props.todo.name}
					</Typography>
					{props.todo.assigned_company && (
						<div className={clsx(classes.labels, 'flex -mx-2')}>
							<TodoChip
								className="mx-2 mt-4"
								title={props.todo.assigned_company?.name}
								color={props.todo.assigned_company?.color_project}
							/>
						</div>
					)}
				</div>

				<div className="px-8">
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
					{projectDetail.company?.id == company.id && (
						<IconButton
							onClick={ev => {
								ev.preventDefault();
								ev.stopPropagation();
								// dispatch(Actions.openEditTodoDialog(props.todo));
							}}
						>
							<Icon>edit</Icon>
						</IconButton>
					)}
				</div>

				{props.todo.assigned_company?.id == company.id && (
					<>{open ? <Icon>expand_more </Icon> : <Icon>chevron_right </Icon>}</>
				)}
			</ListItem>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List className="p-0">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						{taskDetail &&
							!!taskDetail.length &&
							taskDetail.map(todo => <TodoActivityListItem todo={todo} key={todo.id} />)}
					</FuseAnimateGroup>
				</List>
			</Collapse>
		</>
	);
}

export default TodoListItem;
