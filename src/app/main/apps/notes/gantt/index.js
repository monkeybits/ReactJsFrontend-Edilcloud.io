import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import Gantt from './Gantt';
import * as Actions from '../todo/store/actions';
import { useParams } from 'react-router';

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
	return <Gantt {...props} />;
}
export default GanttWrapper;
