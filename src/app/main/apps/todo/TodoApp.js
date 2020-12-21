import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';
import TodoSidebarContent from './TodoSidebarContent';
import TodoSidebarHeader from './TodoSidebarHeader';
import TodoToolbar from './TodoToolbar';
import CreatePostDialog from './CreatePostDialog';
import TaskContentDialog from './TaskContentDialog';
import TodoDialog from './TodoDialog';
import ShowUpload from './ShowUpload';
import { Icon, makeStyles } from '@material-ui/core';
import AccessibilityToggleButton from 'app/fuse-layouts/shared-components/accessibility/AccessibilityToggleButton';

const useStyles = makeStyles({
	addButton: {
		position: 'fixed',
		right: 90,
		bottom: 25,
		zIndex: 999999
	}
});
function TodoApp(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);

	const pageLayout = useRef(null);
	const routeParams = useParams();
	const upload = useSelector(({ todoApp }) => todoApp.todos.upload);

	useEffect(() => {
		// dispatch(Actions.getFilters());
		// dispatch(Actions.getFolders());
		// dispatch(Actions.getLabels());
	}, [dispatch]);

	useDeepCompareEffect(() => {
		dispatch(Actions.getTodos(routeParams));
	}, [dispatch, routeParams]);

	return (
		<>
			{!!upload?.isUploading && (
				<div className="linear-progress custom-color">
					<ShowUpload progress={upload.uploadPercentage} />
				</div>
			)}
			<FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				contentToolbar={<TodoToolbar />}
				content={<TodoList />}
				leftSidebarHeader={<TodoSidebarHeader />}
				leftSidebarContent={<TodoSidebarContent />}
				ref={pageLayout}
				innerScroll
			/>
			<TodoDialog />
			<CreatePostDialog />
			<TaskContentDialog />
			<AccessibilityToggleButton />
		</>
	);
}

export default withReducer('todoApp', reducer)(TodoApp);
