import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
import { Icon, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import AccessibilityToggleButton from 'app/fuse-layouts/shared-components/accessibility/AccessibilityToggleButton';
import { useTranslation } from 'react-i18next';
/* 
*This TodoApp is written for Dashboard
TODO: Main action to get all tasks from all project is -> dispatch(Actions.getTodos(routeParams, false, handleSetLoading));
Main files to make changes are 
* 1. src/app/main/apps/todo/TodoListItem.js  -> used for task item
* 2. src/app/main/apps/todo/TodoActivityListItem.js  -> every task may have activity if you want to make change on activity.
*/
const useStyles = makeStyles({
	addButton: {
		position: 'fixed',
		right: 90,
		bottom: 100,
		zIndex: 999999
	}
});
function TodoApp(props) {
	const dispatch = useDispatch();
	const { t } = useTranslation('dashboard');
	const classes = useStyles(props);
	const history = useHistory();
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const upload = useSelector(({ todoApp }) => todoApp.todos.upload);
	const user = useSelector(({ auth }) => auth.user.data.company);
	const [loading, setLoading] = useState({
		loadingTodos: false
	});
	const handleSetLoading = data => {
		if (!data.loadingTodos) {
			setTimeout(() => {
				setLoading(loading => ({
					...loading,
					...data
				}));
			}, 500);
		} else {
			setLoading(loading => ({
				...loading,
				...data
			}));
		}
	};
	useEffect(() => {
		// dispatch(Actions.getFilters());
		// dispatch(Actions.getFolders());
		// dispatch(Actions.getLabels());
	}, [dispatch]);

	useDeepCompareEffect(() => {
		dispatch(Actions.getTodos(routeParams, false, handleSetLoading));
	}, [dispatch, routeParams]);
	if (loading.loadingTodos) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center">
				<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
					{t('LOADING_TASKS')}...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}
	return (
		<>
			{!!upload?.isUploading && (
				<div className="linear-progress custom-color">
					<ShowUpload progress={upload.uploadPercentage} />
				</div>
			)}
			<FusePageCarded
				classes={{
					root: 'w-full remove-box-shadow',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				contentToolbar={<TodoToolbar />}
				content={<TodoList handleSetLoading={handleSetLoading} />}
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
