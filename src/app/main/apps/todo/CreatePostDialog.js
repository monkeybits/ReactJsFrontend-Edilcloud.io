import _ from '@lodash';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import EditActivityPostForm from './EditActivityPostForm';

function CreatePostDialog() {
	const dispatch = useDispatch();
	const todoDialog = useSelector(({ todoApp }) => todoApp.todos.todoDialog);

	function closeTodoDialog() {
		return dispatch(Actions.closeTimelineDialog());
	}

	return (
		<Dialog
		classes={{
			root:'md:hidden'
		}}
			open={todoDialog.props.openTimelineDialog}
			onClose={closeTodoDialog}
			fullWidth
			maxWidth="sm"
			className="rs-dialog-sm-full custom-modal-new timeline-modal"
		>
			<EditActivityPostForm />
		</Dialog>
	);
}

export default CreatePostDialog;
