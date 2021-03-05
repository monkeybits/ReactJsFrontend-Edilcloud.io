/* =============================================================================
 Todo: TaskContentDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for create timeline posts and view timeline of task
*/
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
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
				root: 'custom-lg-hidden'
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
