/* =============================================================================
 Todo: TaskContentDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for create timeline posts and view timeline of task
*/
import { Dialog } from '@material-ui/core';
import loadable from '@loadable/component';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

const TaskContentForm = loadable(() => import('./TaskContentForm'));
const TaskAttachment = loadable(() => import('./TaskAttachment'));

const useStyles = makeStyles(theme => ({
	paper: {
		color: theme.palette.text.primary
	}
}));

function TaskContentDialog(props) {
	const dispatch = useDispatch();
	const taskContentDialog = useSelector(({ todoApp }) => todoApp.todos.taskContentDialog);
	const openDrawingContent = useSelector(({ todoApp }) => todoApp.todos.openDrawingContent);

	const classes = useStyles(props);
	useEffect(() => {
		return () => {
			dispatch(Actions.getTodos());
		};
	}, [taskContentDialog.props.open]);
	return (
		<>
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
			<Dialog
				classes={{
					root: props.isGantt ? '' : 'custom-modal-close'
				}}
				onClose={ev => dispatch(Actions.closeDrawingContent())}
				open={openDrawingContent}
				fullWidth
				maxWidth="sm"
				className="custom-modal-new timeline-modal content-modal"
			>
				<TaskAttachment />
			</Dialog>
		</>
	);
}

export default TaskContentDialog;
