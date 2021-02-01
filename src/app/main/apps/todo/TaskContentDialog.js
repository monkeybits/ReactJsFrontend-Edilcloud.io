import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import * as Actions from './store/actions';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TaskContentForm from './TaskContentForm';

const useStyles = makeStyles(theme => ({
	paper: {
		color: theme.palette.text.primary
	}
}));

function TaskContentDialog(props) {
	const dispatch = useDispatch();
	const taskContentDialog = useSelector(({ todoApp }) => todoApp.todos.taskContentDialog);

	const classes = useStyles(props);
	useEffect(() => {
		return () => {
			dispatch(Actions.getTodos());
		};
	}, [taskContentDialog.props.open]);
	return (
		<Dialog
			classes={{
				root:'md:hidden',
				paper: clsx(classes.paper, 'custom-modal-new timeline-modal content-modal')
			}}
			onClose={ev => dispatch(Actions.closeTaskContent())}
			open={taskContentDialog.props.open}
			fullWidth
			maxWidth="sm"
		>
			<TaskContentForm />
		</Dialog>
	);
}

export default TaskContentDialog;
