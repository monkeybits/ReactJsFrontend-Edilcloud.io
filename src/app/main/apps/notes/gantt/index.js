import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import Gantt from './Gantt';
import * as Actions from '../todo/store/actions';
import { useParams } from 'react-router';
import CreatePostDialog from '../todo/CreatePostDialog';
import TodoDialog from '../todo/TodoDialog';
import TaskContentDialog from '../todo/Dialog/TaskContentDialog';
import useScript from './useScript';
import { Backdrop, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));
function GanttWrapper(props) {
	const classes = useStyles();
	useScript('https://export.dhtmlx.com/gantt/api.js');
	const dispatch = useDispatch();
	const routeParams = useParams();
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const [state, setState] = useState({
		device: 'computer',
		orientation: 'desktop'
	});
	useDeepCompareEffect(() => {
		dispatch(Actions.getTodos(routeParams.id, true));
		return () => {
			dispatch({
				type: Actions.GET_TODOS,
				payload: [],
				isGantt: true
			});
		};
	}, [dispatch, routeParams]);
	useEffect(() => {
		detect();
		window.addEventListener('resize', detect);
		return () => {
			window.removeEventListener('resize', detect);
		};
	}, [dispatch, routeParams, props.value]);

	const detect = () => {
		setState({
			device: !!navigator.maxTouchPoints ? 'mobile' : 'computer',
			orientation: !navigator.maxTouchPoints
				? 'desktop'
				: !window.screen.orientation.angle
				? 'portrait'
				: 'landscape'
		});
	};

	const isViewChart = state.orientation == 'desktop' || state.orientation == 'landscape';
	return (
		<div>
			<div className={!isViewChart && 'hidden'}>
				<Gantt {...{ ...props, company, projectDetail, orientation: state.orientation }} />
			</div>
			<img className={isViewChart && 'hidden'} src="/assets/images/patterns/rotate_5146697.png" />
		</div>
	);
}
export default GanttWrapper;
