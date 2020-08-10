import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import { amber, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import TodoChip from './TodoChip';
import { Collapse, ListItemIcon, ListItemText, List } from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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

function TodoListItem(props) {
	const dispatch = useDispatch();
	const labels = useSelector(({ todoApp }) => todoApp.labels);
	const [open, setOpen] = React.useState(false);

	const classes = useStyles(props);
	const handleClick = () => {
		setOpen(!open);
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
					dispatch(Actions.openEditTodoDialog(props.todo));
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
						{props.todo.name}
					</Typography>

					<Typography color="textSecondary" className="todo-notes truncate">
						{_.truncate(props.todo.note?.replace(/<(?:.|\n)*?>/gm, ''), { length: 180 })}
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
							dispatch(Actions.openAddActivityTodoDialog(props.todo));
						}}
					>
						<Icon>playlist_add</Icon>
					</IconButton>
					<IconButton
						onClick={ev => {
							ev.preventDefault();
							ev.stopPropagation();
							dispatch(Actions.toggleStarred(props.todo));
						}}
					>
						<Icon>edit</Icon>
					</IconButton>
				</div>
				{open ? <Icon>expand_more </Icon> : <Icon>chevron_right </Icon>}
			</ListItem>
			{/* <Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<ListItem button className={classes.nested}>
						<ListItemIcon>
							<StarBorder />
						</ListItemIcon>
						<ListItemText primary="Starred" />
					</ListItem>
				</List>
			</Collapse> */}
		</>
	);
}

export default TodoListItem;
