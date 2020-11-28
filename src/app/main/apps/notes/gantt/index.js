import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import Gantt from './Gantt';
import * as Actions from '../todo/store/actions';
import { useParams } from 'react-router';
import CreatePostDialog from '../todo/CreatePostDialog';
import TodoDialog from '../todo/TodoDialog';
import TaskContentDialog from '../todo/Dialog/TaskContentDialog';
import useScript from './useScript';

function GanttWrapper(props) {
	useScript("https://export.dhtmlx.com/gantt/api.js");
	const dispatch = useDispatch();
	const routeParams = useParams();
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	useDeepCompareEffect(() => {
		dispatch(Actions.getTodos(routeParams.id, true));
		return () => {
			dispatch({
				type: Actions.GET_TODOS,
				payload: []
			});
		};
	}, [dispatch, routeParams]);
	return (
		<>
			<Gantt {...{ ...props, company, projectDetail }} />
		</>
	);
}
export default GanttWrapper;
