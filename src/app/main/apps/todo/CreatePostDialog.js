/* =============================================================================
 Todo: CreatePostDialog.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for Edit activity view in dialog
*/
import _ from '@lodash';
import loadable from '@loadable/component';
import { Dialog } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

const EditActivityPostForm = loadable(() => import('./EditActivityPostForm'));

function CreatePostDialog() {
	const dispatch = useDispatch();
	const todoDialog = useSelector(({ todoApp }) => todoApp.todos.todoDialog);

	// this Method will be used to close the post dialog
	function closeTodoDialog() {
		return dispatch(Actions.closeTimelineDialog());
	}

	return (
		<Dialog
			classes={{
				root: 'custom-modal-close'
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
