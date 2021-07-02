/* =============================================================================
 TodoApp.js
 ===============================================================================
*This TodoApp is written for Dashboard
TODO: Main action to get all tasks from all project is -> dispatch(Actions.getTodos(routeParams, false, handleSetLoading));
Main files to make changes are 
* 1. src/app/main/apps/todo/TodoListItem.js  -> used for task item
* 2. src/app/main/apps/todo/TodoActivityListItem.js  -> every task may have activity if you want to make change on activity.
*/
import loadable from '@loadable/component';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FusePageSimple from '@fuse/core/FusePageSimple';
import * as Actions from './store/actions';
import * as ConatctActions from '../contacts/store/actions';
import * as NotificationActions from '../../../fuse-layouts/shared-components/notification/store/actions';
import reducer from './store/reducers';

const StatusConfirmDialog = loadable(() => import('./StatusConfirmDialog'));
const TodoHeader = loadable(() => import('./TodoHeader'));
const TodoList = loadable(() => import('./TodoList'));
const TodoSidebarContent = loadable(() => import('./TodoSidebarContent'));
const CreatePostDialog = loadable(() => import('./CreatePostDialog'));
const TaskContentDialog = loadable(() => import('./TaskContentDialog'));
const TodoDialog = loadable(() => import('./TodoDialog'));
const ShowUpload = loadable(() => import('./ShowUpload'));
const AccessibilityToggleButton = loadable(() =>
	import('app/fuse-layouts/shared-components/accessibility/AccessibilityToggleButton')
);
const PostNotificationDialog = loadable(() => import('./PostNotificationDialog'));
const EditTaskTodoDialog = loadable(() => import('./EditTaskTodoDialog'));
const EditActivityTodoDialog = loadable(() => import('./EditActivityTodoDialog'));
const DeleteConfirmDialog = loadable(() => import('./DeleteConfirmDialog'));

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
	const [defaultMenu, setDefaultMenu] = useState(false);
	const [foldedAndOpened, setFoldedAndOpened] = useState(false);
	const { t } = useTranslation('dashboard');
	const classes = useStyles(props);
	const history = useHistory();
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const upload = useSelector(({ todoApp }) => todoApp.todos.upload);
	const user = useSelector(({ auth }) => auth.user.data.company);
	const taskContentDialog = useSelector(({ todoApp }) => todoApp.todos.taskContentDialog);
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const navbar = useSelector(({ fuse }) => fuse.navbar);
	const toggleSidebarMenu = useSelector(({ fuse }) => fuse.settings.toggleSidebarMenu);
	const { folded } = config.navbar;

	useEffect(() => {
		let isUrlCheck = window.location.href.includes("apps/todo/all/notification");
		if(isUrlCheck) {
			dispatch(NotificationActions.toggleNotification())
		}
	}, []);

	useEffect(() => {
		if (toggleSidebarMenu) {
			setDefaultMenu(false);
		}
		//  else {
		// 	setDefaultMenu(true);
		// }
	}, [toggleSidebarMenu]);

	const foldedAndClosed = folded && !navbar.foldedOpen;
	useEffect(() => {
		const foldedAndOpened = folded && navbar.foldedOpen;
		setTimeout(() => {
			if (foldedAndOpened) {
				setDefaultMenu(false);
				setFoldedAndOpened(foldedAndOpened);
			}
		}, 200);
		if (!foldedAndOpened) {
			setFoldedAndOpened(foldedAndOpened);
		}
	}, [folded, navbar]);

	useEffect(() => {
		dispatch(Actions.closeDrawingContent());
	}, [dispatch]);

	useEffect(() => {
		return () => {
			dispatch(Actions.getTodos());
		};
	}, [taskContentDialog.props.open]);

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

	useDeepCompareEffect(() => {
		dispatch(Actions.getTodos(routeParams, false, handleSetLoading));
		dispatch(ConatctActions.getContacts());
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

			<FusePageSimple
				classes={{
					contentWrapper: 'bg-azure h-full',
					content: 'flex bg-azure flex-col h-full p-24 pb-0',
					leftSidebar: `mobile-h-full w-350 border-0 ${foldedAndOpened || defaultMenu ? 'ml-19' : ''}`,
					wrapper: 'min-h-0 team-tab'
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				content={<TodoList pageLayout={pageLayout} {...props} />}
				leftSidebarContent={<TodoSidebarContent pageLayout={pageLayout} />}
				sidebarInner
				leftSidebarVariant
				ref={pageLayout}
			/>

			{/**
			 * ======================================================
			 * 1. <TodoDialog />
			 * To create task or activity .
			 * ======================================================
			 * 2. 	<CreatePostDialog />
			 * To edit activity or see timeline of activity
			 * ======================================================
			 * 3.<TaskContentDialog />
			 * To see task timeine or create attchments on task or edit task
			 * ======================================================
			 * 4. <AccessibilityToggleButton />
			 * it have dummy data it created to let user understand platform but haven't implemented yet.
			 */}
			<TodoDialog />
			<CreatePostDialog />
			<TaskContentDialog />
			{/* <AccessibilityToggleButton /> */}
			<PostNotificationDialog />
			<StatusConfirmDialog />
			<EditTaskTodoDialog />
			<EditActivityTodoDialog />
			<DeleteConfirmDialog />
		</>
	);
}

export default withReducer('todoApp', reducer)(TodoApp);
