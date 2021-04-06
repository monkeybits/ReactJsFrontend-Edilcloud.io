import withReducer from 'app/store/withReducer';
import loadable from '@loadable/component';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_TASK_BY_ID, GET_ACTIVITY_BY_ID, ADD_TASK_TO_PROJECT } from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import { useTranslation } from 'react-i18next';
import axios from 'app/services/axiosConfig';
import { gantt } from 'dhtmlx-gantt';
import moment from 'moment';
import { toast } from 'react-toastify';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import TodoDialog from './TodoDialog';
import TodoList from './TodoList';
import TodoSidebarContent from './TodoSidebarContent';
import CreatePostDialog from './CreatePostDialog';
import { GET_TODOS } from './store/actions';
import TaskContentDialog from './Dialog/TaskContentDialog';
import CreateTasks from '../gantt/CreateTasks';
import ImportExcelDialog from '../gantt/ImportExcelDialog';
const PostNotificationDialog = loadable(() => import('../../todo/PostNotificationDialog'))
const StatusConfirmDialog = loadable(() => import('../../todo/StatusConfirmDialog'))

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
	const { t } = useTranslation('todo_project');
	const [folded, setFolded] = useState(true)
	const classes = useStyles(props);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const upload = useSelector(({ todoAppNote }) => todoAppNote.todos.upload);
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const [target, setTarget] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const [loading, setLoading] = useState({
		loadingTodos: false
	});
	const navbar = useSelector(({ fuse }) => fuse.navbar);
	useEffect(() => {
		if(navbar.foldedOpen) {
			setFolded(false)
		}
	}, [navbar]);

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
	// useEffect(() => {
	// 	dispatch(Actions.getFilters());
	// 	dispatch(Actions.getFolders());
	// 	dispatch(Actions.getLabels());
	// }, [dispatch]);
	useEffect(() => {
		if (
			(notificationPanel.viewing && notificationPanel.notificationData?.notification) ||
			routeParams.pid ||
			routeParams.cid
		) {
			const notification = notificationPanel.notificationData?.notification;
			if (
				notification?.content_type === 'post' ||
				notification?.content_type === 'comment' ||
				routeParams.pid ||
				routeParams.cid
			) {
				const task_id = notification?.body.task_id || routeParams.dataId;
				if (notification?.body.hasOwnProperty('activity_id') || routeParams.aid) {
					const activity_id = notification?.body.activity_id || routeParams.dataId;
					dispatch(Actions.openTimelineDialog({ todo: { id: activity_id }, task: {} }));
					apiCall(
						GET_ACTIVITY_BY_ID(activity_id),
						{},
						res => {
							dispatch(
								Actions.addTimelineData({
									todo: { id: activity_id, ...res }
								})
							);
						},
						err => console.log(err),
						METHOD.GET,
						getHeaderToken()
					);
				} else {
					dispatch(Actions.openTaskContent({ id: task_id }));
				}
				apiCall(
					GET_TASK_BY_ID(task_id),
					{},
					res => {
						if (notification?.body?.hasOwnProperty('activity_id') || routeParams.tab == 'activity') {
							dispatch(
								Actions.addTimelineData({
									task: { id: task_id, ...res }
								})
							);
						} else {
							dispatch(Actions.addTaskData(res));
						}
					},
					err => console.log(err),
					METHOD.GET,
					getHeaderToken()
				);
			}
		}
	}, [notificationPanel.viewing]);
	useEffect(() => {
		if (notificationPanel.notificationData?.notification || routeParams.pid || routeParams.cid) {
			const notification = notificationPanel.notificationData?.notification;
			if (
				notification?.project_id == routeParams.id &&
				(notification?.content_type === 'activity' || notification?.content_type === 'task')
			) {
				dispatch(Actions.getTodos(routeParams.id, false));
			}
		}
	}, [notificationPanel, routeParams]);
	useDeepCompareEffect(() => {
		dispatch(Actions.getTodos(routeParams.id, false, handleSetLoading));
		return () => {
			dispatch({
				type: GET_TODOS,
				payload: []
			});
		};
	}, [dispatch, routeParams]);
	const handleUploadListOfTasks = list => {
		const token = localStorage.getItem('jwt_access_token');
		axios
			.post(ADD_TASK_TO_PROJECT(routeParams.id), list, {
				headers: {
					Authorization: `JWT ${token}`
				}
			})
			.then(res => {
				dispatch(Actions.getTodos(routeParams.id, false));
			})
			.catch(err => console.log(err));
	};
	const importExcel = data => {
		const file = data || target;
		if (file) {
			setOpen(false);
			gantt.importFromExcel({
				server: 'https://export.dhtmlx.com/gantt',
				data: file,
				callback: project => {
					if (project) {
						try {
							const header = [];
							const headerControls = [];
							const body = [];
							const listOfData = project.map(item => ({
								name: item['Task name'],
								progress: item['Completed percentage'],
								date_start: item['Start time']
									? moment(item['Start time']).format('YYYY-MM-DD')
									: undefined,
								date_end: item['End time'] ? moment(item['End time']).format('YYYY-MM-DD') : undefined
							}));
							project.forEach(function (task) {
								let cols = [];
								if (!header.length) {
									for (const i in task) {
										header.push(i);
									}
									header.forEach(function (col, index) {
										cols.push(`<th>${col}</th>`);
										// headerControls.push(
										// 	"<td><select data-column-mapping='" +
										// 		col +
										// 		"'>" +
										// 		getOptions(index) +
										// 		'</select>'
										// );
									});
									body.push(`<tr>${cols.join('')}</tr>`);
									body.push(`<tr>${headerControls.join('')}</tr>`);
								}
								cols = [];
								header.forEach(function (col) {
									cols.push(`<td>${task[col]}</td>`);
								});
								body.push(`<tr>${cols.join('')}</tr>`);
							});

							const div = gantt.modalbox({
								title: 'Assign columns',
								type: 'excel-form',
								text: `<div class="table-responsive"> <table class="table m-0">${body.join(
									''
								)}</table> </div>`,
								buttons: [
									{ label: 'Save', css: 'link_save_btn', value: 'save' },
									{ label: 'Cancel', css: 'link_cancel_btn', value: 'cancel' }
								],
								callback: result => {
									switch (result) {
										case 'save':
											dispatch(Actions.setLoading(true));
											handleUploadListOfTasks(listOfData, () => {});
											// var selects = div.querySelectorAll(
											// 	'[data-column-mapping]'
											// );
											// var mapping = {};
											// selects.forEach(function (select) {
											// 	mapping[
											// 		select.getAttribute('data-column-mapping')
											// 	] = select.value;
											// });
											// loadTable(mapping, project);
											break;
										case 'cancel':
											// Cancel
											break;
									}
								}
							});
						} catch {
							toast.error('Not supported ');
						}
					}
				}
			});
		}
	};
	const handleClickOpen = () => {
		setOpen(true);
	};
	if (loading.loadingTodos) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center h-full">
				<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
					{t('LOADING_TASKS')}...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}
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
			{/* {isUploadingFiles && ( */}

			{/* )} */}
			<FusePageSimple
				classes={{
					contentWrapper: 'bg-azure h-full',
					content: 'flex bg-azure flex-col h-full pb-0',
					leftSidebar: `mobile-h-full w-256 border-0 ${navbar.foldedOpen || folded ? 'ml-19' : ''}`,
					// header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					customHeader: 'flex flex-auto flex-col container z-10 h-full chat-header-bg-remove',
					wrapper: 'min-h-0 team-tab'
				}}
				// header={<TodoHeader pageLayout={pageLayout} />}
				content={<TodoList pageLayout={pageLayout} {...props} />}
				leftSidebarContent={<TodoSidebarContent />}
				leftSidebarVariant
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{projectDetail.company?.id == company.id && (getRole() == 'd' || getRole() == 'o') && (
				<CreateTasks
					importExcel={ev => {
						handleClickOpen();
					}}
					createTasks={ev => dispatch(Actions.openNewTodoDialog())}
				/>
			)}
			<ImportExcelDialog {...{ open, setOpen, target, setTarget }} onImport={() => importExcel(undefined)} />
			<CreatePostDialog />
			<TodoDialog />
			<TaskContentDialog />
			<PostNotificationDialog />
			<StatusConfirmDialog />
		</>
	);
}

export default withReducer('todoAppNote', reducer)(TodoApp);
