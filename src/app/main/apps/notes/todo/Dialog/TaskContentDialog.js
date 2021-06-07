import React, { useEffect } from 'react';
import { Dialog } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as Actions from '../store/actions';
import loadable from '@loadable/component';
const TaskAttachment = loadable(() => import('../TaskAttachment'));
const TaskContentForm = loadable(() => import('./TaskContentForm'));

const useStyles = makeStyles(theme => ({
	paper: {
		color: theme.palette.text.primary
	}
}));

function TaskContentDialog(props) {
	const dispatch = useDispatch();
	const taskContentDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.taskContentDialog);
	const openDrawingContent = useSelector(({ todoAppNote }) => todoAppNote.todos.openDrawingContent);
	const routeParams = useParams();

	const classes = useStyles(props);
	useEffect(() => {
		return () => {
			dispatch(Actions.getTodos(routeParams.id, false));
		};
	}, [taskContentDialog.props.open]);
	return (
		<>
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
