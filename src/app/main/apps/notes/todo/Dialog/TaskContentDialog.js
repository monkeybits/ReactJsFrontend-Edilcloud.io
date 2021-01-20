import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskContentForm from './TaskContentForm';
import { useParams } from 'react-router';

const useStyles = makeStyles(theme => ({
	paper: {
		color: theme.palette.text.primary
	}
}));

function TaskContentDialog(props) {
	const dispatch = useDispatch();
	const taskContentDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.taskContentDialog);
	const routeParams = useParams();

	const classes = useStyles(props);
	useEffect(() => {
		return () => {
			dispatch(Actions.getTodos(routeParams.id, false));
		};
	}, [taskContentDialog.props.open]);
	return (
		<Dialog
			classes={{
				paper: clsx(classes.paper, 'max-w-lg w-full m-0 sm:m-24 max-height-100')
			}}
			onClose={ev => dispatch(Actions.closeTaskContent())}
			open={taskContentDialog.props.open}
		>
			<TaskContentForm />
		</Dialog>
	);
}

export default TaskContentDialog;
