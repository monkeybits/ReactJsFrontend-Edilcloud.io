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
import reducer from './store/reducers';
const StatusConfirmDialog = loadable(() => import('./StatusConfirmDialog'))
const TodoHeader = loadable(() => import('./TodoHeader'))
const TodoList = loadable(() => import('./TodoList'))
const TodoSidebarContent = loadable(() => import('./TodoSidebarContent'))
const CreatePostDialog = loadable(() => import('./CreatePostDialog'))
const TaskContentDialog = loadable(() => import('./TaskContentDialog'))
const TodoDialog = loadable(() => import('./TodoDialog'))
const ShowUpload = loadable(() => import('./ShowUpload'))
const AccessibilityToggleButton = loadable(() => import('app/fuse-layouts/shared-components/accessibility/AccessibilityToggleButton'))
const PostNotificationDialog = loadable(() => import('./PostNotificationDialog'))

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
	const [folded, setFolded] = useState(true)
	const { t } = useTranslation('dashboard');
	const classes = useStyles(props);
	const history = useHistory();
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const upload = useSelector(({ todoApp }) => todoApp.todos.upload);
	const user = useSelector(({ auth }) => auth.user.data.company);
	const taskContentDialog = useSelector(({ todoApp }) => todoApp.todos.taskContentDialog);
	const navbar = useSelector(({ fuse }) => fuse.navbar);

	useEffect(() => {
		dispatch(Actions.closeDrawingContent());
	}, [dispatch]);
	
	useEffect(() => {
		if(navbar.foldedOpen) {
			setFolded(false)
		}
	}, [navbar]); 

	useEffect(() => {
		return () => {
			dispatch(Actions.getTodos()); // * It will get the tasks and activities of tasks
		};
	}, [taskContentDialog.props.open]); // * when todo dialog states changes we need to call getTodos

	const [loading, setLoading] = useState({
		// when fetching tasks we need to show user a loading screen
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
		// this is a component did mount it will call when we have dispatcher ready to dispatch the event
		dispatch(Actions.getTodos(routeParams, false, handleSetLoading));
		dispatch(ConatctActions.getContacts());
	}, [dispatch, routeParams]);
	
	if (loading.loadingTodos) {
		// when we are fetching data we will show below loading HTML
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
		// after data loaded it will return tasks
		<>
			{!!upload?.isUploading && (
				<div className="linear-progress custom-color">
					<ShowUpload progress={upload.uploadPercentage} />
				</div>
			)}
			<div className="flex w-full inner-scroll-min-ht">
				<div className="flex w-full items-center justify-between p-20">
					<div>
						<div className="flex w-full items-center justify-between">
							<Typography variant="h5">Dashboard</Typography>{' '}
						</div>
						<Typography variant="subtitle1" className="text-14 font-weight-600 ">
							Tutti le fasi di lavoro da tutti i progetti
						</Typography>
					</div>
				</div>
			</div>
			<FusePageSimple
				classes={{
					contentWrapper: 'bg-azure h-full',
					content: 'flex bg-azure flex-col h-full p-24 pb-0',
					leftSidebar: `mobile-h-full w-256 border-0 ${navbar.foldedOpen || folded ? 'ml-19' : ''}`,
					// header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					customHeader: 'flex flex-auto flex-col container z-10 h-full chat-header-bg-remove dashboard',
					wrapper: 'min-h-0 team-tab'
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				content={<TodoList pageLayout={pageLayout} {...props} />}
				leftSidebarContent={<TodoSidebarContent />}
				sidebarInner
				leftSidebarVariant
				ref={pageLayout}
				innerScroll
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
			<AccessibilityToggleButton />
			<PostNotificationDialog />
			<StatusConfirmDialog />
		</>
	);
}

export default withReducer('todoApp', reducer)(TodoApp);
