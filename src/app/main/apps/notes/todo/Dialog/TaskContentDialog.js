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
				root: props.isGantt ? '' : 'custom-modal-close'
			}}
			onClose={ev => dispatch(Actions.closeTaskContent())}
			open={taskContentDialog.props.open}
			fullWidth
			maxWidth="sm"
			className="custom-modal-new timeline-modal content-modal"
		>
			<TaskContentForm />
		</Dialog>
	);
}

export default TaskContentDialog;
