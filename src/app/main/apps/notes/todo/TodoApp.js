import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import TodoDialog from './TodoDialog';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoSidebarContent from './TodoSidebarContent';
import TodoSidebarHeader from './TodoSidebarHeader';
import TodoToolbar from './TodoToolbar';
import CreatePostDialog from './CreatePostDialog';
import { GET_TODOS } from './store/actions';
import { makeStyles } from '@material-ui/core';
import TaskContentDialog from './Dialog/TaskContentDialog';
import FusePageSimple from '@fuse/core/FusePageSimple';
import clsx from 'clsx';

const useStyles = makeStyles({
	addButton: {
		position: 'fixed',
		right: 90,
		bottom: 65,
		zIndex: 999999
	}
});
function TodoApp(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const pageLayout = useRef(null);
	const routeParams = useParams();

	// useEffect(() => {
	// 	dispatch(Actions.getFilters());
	// 	dispatch(Actions.getFolders());
	// 	dispatch(Actions.getLabels());
	// }, [dispatch]);

	useDeepCompareEffect(() => {
		dispatch(Actions.getTodos(routeParams.id));
		return () => {
			dispatch({
				type: GET_TODOS,
				payload: []
			});
		};
	}, [dispatch, routeParams]);

	return (
		<>
			{/* <FusePageCarded
				classes={{
					root: 'w-full header-bg-remove todo-spacing',
					header: 'items-center custom-bg h-auto min-h-auto'
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				// contentToolbar={<TodoToolbar />}
				// leftSidebarContent={<TodoSidebarContent />}
				content={<div className="todo-sidebar flex flex-wrap">  <TodoSidebarContent className="mr-16" /> <TodoList pageLayout={pageLayout} {...props}/> </div>}
				// content={<TodoList pageLayout={pageLayout} {...props} />}
				// leftSidebarHeader={<TodoSidebarHeader />}
				ref={pageLayout}
				innerScroll
			/> */}
			<FusePageSimple
				classes={{
					contentWrapper: 'h-full',
					content: 'flex flex-col h-full p-20',
					leftSidebar: 'w-256 border-0',					
					header: 'flex-col  h-full',
					customHeader:"flex flex-auto flex-col container z-10 h-full chat-header-bg-remove",
					wrapper: 'min-h-0 team-tab '
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				content={<TodoList pageLayout={pageLayout} {...props} />}
				leftSidebarContent={<TodoSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{projectDetail.company?.id == company.id && (
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Fab
						color="primary"
						aria-label="add"
						// className={classes.addButton }
						className={clsx('speeddial-btn diff-place')}
						onClick={ev => dispatch(Actions.openNewTodoDialog())}
					>
						<Icon>add</Icon>
					</Fab>
				</FuseAnimate>
			)}
			{/* <CreatePostDialog />
			<TodoDialog />
			<TaskContentDialog /> */}
		</>
	);
}

export default withReducer('todoAppNote', reducer)(TodoApp);
