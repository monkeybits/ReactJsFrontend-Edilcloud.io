import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import Gantt from './Gantt';
import * as Actions from '../todo/store/actions';
import { useParams } from 'react-router';
import CreatePostDialog from '../todo/CreatePostDialog';
import TodoDialog from '../todo/TodoDialog';
import TaskContentDialog from '../todo/Dialog/TaskContentDialog';

function GanttWrapper(props) {
	const dispatch = useDispatch();
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(Actions.getTodos(routeParams.id));
		return () => {
			dispatch({
				type: Actions.GET_TODOS,
				payload: []
			});
		};
	}, [dispatch, routeParams]);
	return (
		<>
			<Gantt {...props} />
			<CreatePostDialog />
			<TodoDialog />
			<TaskContentDialog />
		</>
	);
}
export default GanttWrapper;
