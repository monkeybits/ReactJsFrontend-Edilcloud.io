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
			<FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136 custom-bg'
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				contentToolbar={<TodoToolbar />}
				content={<TodoList />}
				leftSidebarHeader={<TodoSidebarHeader />}
				leftSidebarContent={<TodoSidebarContent />}
				ref={pageLayout}
				innerScroll
			/>
			{projectDetail.company?.id == company.id && (
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Fab
						color="primary"
						aria-label="add"
						className={classes.addButton}
						onClick={ev => dispatch(Actions.openNewTodoDialog())}
					>
						<Icon>add</Icon>
					</Fab>
				</FuseAnimate>
			)}
			<CreatePostDialog />
			<TodoDialog />
			<TaskContentDialog />
		</>
	);
}

export default withReducer('todoAppNote', reducer)(TodoApp);
