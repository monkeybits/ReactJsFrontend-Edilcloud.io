import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	ADD_TASK_TO_PROJECT,
	GET_TASK_LIST,
	GET_GANTT_TASK_LIST,
	ADD_ACTIVITY_TO_TASK,
	EDIT_TASK_TO_PROJECT,
	EDIT_ACTIVITY_TO_TASK
} from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import moment from 'moment';
import { toast } from 'react-toastify';
import { changeFilters } from './filters.actions';

export const GET_TODOS = '[TODO APP] GET TODOS (PROJECT)';
export const GET_TODOS_ALERTED = '[TODO APP] GET TODOS ALERTED (PROJECT)';
export const RESET_ALL_FILTERS = '[TODO APP] RESET ALL FILTERS (PROJECT)';
export const UPDATE_TODOS = '[TODO APP] UPDATE TODOS (PROJECT)';
export const TOGGLE_STARRED = '[TODO APP] TOGGLE STARRED (PROJECT)';
export const TOGGLE_COMPLETED = '[TODO APP] TOGGLE COMPLETED (PROJECT)';
export const TOGGLE_IMPORTANT = '[TODO APP] TOGGLE IMPORTANT (PROJECT)';
export const UPDATE_TODO = '[TODO APP] UPDATE TODO (PROJECT)';
export const ADD_TODO = '[TODO APP] ADD TODO (PROJECT)';
export const REMOVE_TODO = '[TODO APP] REMOVE TODO (PROJECT)';
export const SET_SEARCH_TEXT = '[TODO APP] SET SEARCH TEXT (PROJECT)';
export const OPEN_NEW_TODO_DIALOG = '[TODO APP] OPEN NEW TODO DIALOG (PROJECT)';
export const OPEN_TASK_CONTENT_DIALOG = '[TODO APP] OPEN TASK CONTENT DIALOG (PROJECT)';
export const ADD_TASK_CONTENT_DATA = '[TODO APP] ADD TASK CONTENT DATA (PROJECT)';
export const OPEN_TIMELINE_DIALOG = '[TODO APP] OPEN TIMELINE DIALOG (PROJECT)';
export const ADD_TIMELINE_DATA = '[TODO APP] ADD TIMELINE DATA (PROJECT)';
export const CLOSE_NEW_TODO_DIALOG = '[TODO APP] CLOSE NEW TODO DIALOG (PROJECT)';
export const CLOSE_TASK_CONTENT_DIALOG = '[TODO APP] CLOSE TASK CONTENT DIALOG (PROJECT)';
export const CLOSE_TIMELINE_DIALOG = '[TODO APP] CLOSE TIMELINE DIALOG (PROJECT)';
export const OPEN_EDIT_TODO_DIALOG = '[TODO APP] OPEN EDIT TODO DIALOG (PROJECT)';
export const OPEN_ACTIVITY_TODO_DIALOG = '[TODO APP] OPEN ACTIVITY TODO DIALOG (PROJECT)';
export const CLOSE_EDIT_TODO_DIALOG = '[TODO APP] CLOSE EDIT TODO DIALOG (PROJECT)';
export const CLOSE_ACTIVITY_TODO_DIALOG = '[TODO APP] CLOSE ACTIVITY TODO DIALOG (PROJECT)';
export const TOGGLE_ORDER_DESCENDING = '[TODO APP] TOGGLE ORDER DESCENDING (PROJECT)';
export const CHANGE_ORDER = '[TODO APP] CHANGE ORDER (PROJECT)';
export const SET_UPLOAD = '[TODO APP] SET UPLOAD (PROJECT)';
export const SET_UPLOAD_PERCENTAGE = '[TODO APP] SET UPLOAD PERCENTAGE (PROJECT)';
export const SET_LOADING = '[TODO APP] SET LOADING (PROJECT)';
export const OPEN_NOTIFICATION_DIALOG = '[TODO APP] OPEN NOTIFICATION DIALOG (PROJECT)';
export const CLOSE_NOTIFICATION_DIALOG = '[TODO APP] CLOSE NOTIFICATION DIALOG (PROJECT)';
export const OPEN_STATUS_CONFIRM_DIALOG = '[TODO APP] OPEN STATUS CONFIRM DIALOG (PROJECT)';
export const CLOSE_STATUS_CONFIRM_DIALOG = '[TODO APP] CLOSE STATUS CONFIRM DIALOG (PROJECT)';
export const OK_STATUS_CONFIRM_DIALOG = '[TODO APP] OK STATUS CONFIRM DIALOG (PROJECT)';
export const OPEN_DRAWING_CONTENT_DIALOG = '[TODO APP] OPEN DRAWING CONTENT DIALOG (PROJECT)';
export const CLOSE_DRAWING_CONTENT_DIALOG = '[TODO APP] CLOSE DRAWING CONTENT DIALOG (PROJECT)';
export const REMOVE_ACTIVITY = '[TODO APP] REMOVE ACTIVITY';
export const REMOVE_TASK = '[TODO APP] REMOVE TASK';
export const EDIT_ACTIVITY = '[TODO APP] EDIT ACTIVITY';

export const EDIT_TASK_TODO_DIALOG = '[TODO APP] EDIT TASK TODO DIALOG (PROJECT)';
export const OPEN_DELETE_CONFIRM_DIALOG = '[TODO APP] OPEN DELETE CONFIRM DIALOG (PROJECT)';
export const CLOSE_EDIT_TASK_TODO_DIALOG = '[TODO APP] CLOSE EDIT TASK TODO DIALOG (PROJECT)';
export const OK_DELETE_ACTIVITY_CONFIRM_DIALOG = '[TODO APP] OK DELETE ACTIVITY CONFIRM DIALOG (PROJECT)';
export const OK_DELETE_TASK_CONFIRM_DIALOG = '[TODO APP] OK DELETE TASK CONFIRM DIALOG (PROJECT)';
export const CLOSE_DELETE_CONFIRM_DIALOG = '[TODO APP] CLOSE DELETE CONFIRM DIALOG (PROJECT)';
export const CLOSE_EDIT_ACTIVITY_TODO_DIALOG = '[TODO APP] CLOSE EDIT ACTIVITY TODO DIALOG (PROJECT)';
export const EDIT_ACTIVITY_TODO_DIALOG = '[TODO APP] EDIT ACTIVITY TODO DIALOG (PROJECT)';

function sortHolders(a, b) {
	return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
}
export function setLoading(payload) {
	return {
		type: SET_LOADING,
		payload
	};
}
export function setUpload(payload) {
	return {
		type: SET_UPLOAD,
		payload
	};
}
export function setUploadPercentage(payload) {
	return {
		type: SET_UPLOAD_PERCENTAGE,
		payload
	};
}
export function editActivityTodoDialog(todo) {
	return {
		type: EDIT_ACTIVITY_TODO_DIALOG,
		todo
	};
}
export function closeEditActivityTodoDialog() {
	return {
		type: CLOSE_EDIT_ACTIVITY_TODO_DIALOG
	};
}
export function getTodos(pid, isGantt, handleSetLoading = () => '') {
	handleSetLoading({
		loadingTodos: true
	});
	return dispatch => {
		dispatch(setLoading(true));
		apiCall(
			isGantt ? GET_GANTT_TASK_LIST(pid) : GET_TASK_LIST(pid),
			{},
			results => {
				handleSetLoading({
					loadingTodos: false
				});
				dispatch(setLoading(false));
				dispatch({
					type: GET_TODOS,
					payload: results.sort(sortHolders),
					isGantt
				});
			},
			err => {
				handleSetLoading({
					loadingTodos: false
				});
				dispatch(setLoading(false));
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
		// request.then(response =>
		// 	dispatch({
		// 		type: GET_TODOS,
		// 		routeParams: params,
		// 		payload: response.data
		// 	})
		// );
	};
}

export function getTodosAlerted(pid, isGantt, handleSetLoading = () => '') {
	handleSetLoading({
		loadingTodos: true
	});
	return dispatch => {
		dispatch(setLoading(true));
		apiCall(
			isGantt ? GET_GANTT_TASK_LIST(pid) : GET_TASK_LIST(pid),
			{},
			results => {
				handleSetLoading({
					loadingTodos: false
				});
				dispatch(setLoading(false));
				dispatch({
					type: GET_TODOS_ALERTED,
					payload: results.sort(sortHolders),
					isGantt
				});
			},
			err => {
				handleSetLoading({
					loadingTodos: false
				});
				dispatch(setLoading(false));
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}

export function updateTodos() {
	return (dispatch, getState) => {
		const { routeParams } = getState().todoApp.todos;

		const request = axios.get('/api/todo-app/todos', {
			params: routeParams
		});

		return request.then(response =>
			dispatch({
				type: UPDATE_TODOS,
				payload: response.data
			})
		);
	};
}

export function toggleCompleted(todo) {
	const newTodo = {
		...todo,
		completed: !todo.completed
	};
	return dispatch => Promise.all([dispatch({ type: TOGGLE_COMPLETED })]).then(() => dispatch(updateTodo(newTodo)));
}

export function toggleStarred(todo) {
	const newTodo = {
		...todo,
		starred: !todo.starred
	};
	return dispatch => Promise.all([dispatch({ type: TOGGLE_STARRED })]).then(() => dispatch(updateTodo(newTodo)));
}

export function toggleImportant(todo) {
	const newTodo = {
		...todo,
		important: !todo.important
	};

	return dispatch => Promise.all([dispatch({ type: TOGGLE_IMPORTANT })]).then(() => dispatch(updateTodo(newTodo)));
}

export function updateTodo(todo) {
	const request = axios.post('/api/todo-app/update-todo', todo);

	return dispatch =>
		request.then(response => {
			Promise.all([
				dispatch({
					type: UPDATE_TODO,
					payload: response.data
				})
			]).then(() => dispatch(updateTodos()));
		});
}

export function openTaskContent(data) {
	return {
		type: OPEN_TASK_CONTENT_DIALOG,
		data
	};
}

export function openDrawingContent(data) {
	return {
		type: OPEN_DRAWING_CONTENT_DIALOG,
		data
	};
}

export function closeDrawingContent() {
	return {
		type: CLOSE_DRAWING_CONTENT_DIALOG
	};
}
export function closeDeleteConfirmDialog() {
	return {
		type: CLOSE_DELETE_CONFIRM_DIALOG
	};
}
export function okDeleteTaskConfirmDialog() {
	return {
		type: OK_DELETE_TASK_CONFIRM_DIALOG
	};
}
export function okDeleteActivityConfirmDialog() {
	return {
		type: OK_DELETE_ACTIVITY_CONFIRM_DIALOG
	};
}
export function addTaskData(data) {
	return {
		type: ADD_TASK_CONTENT_DATA,
		data
	};
}
export function closeTaskContent() {
	return {
		type: CLOSE_TASK_CONTENT_DIALOG
	};
}
export function resetAllFilters() {
	return dispatch => {
		dispatch({
			type: RESET_ALL_FILTERS
		});
		dispatch(changeFilters({ activeFilter: 'genrealFilter', activeFilterKey: 'All' }));
	};
}
export function openNewTodoDialog(data) {
	return {
		type: OPEN_NEW_TODO_DIALOG,
		data
	};
}
export function openTimelineDialog(todo) {
	return {
		type: OPEN_TIMELINE_DIALOG,
		todo
	};
}
export function addTimelineData(todo) {
	return {
		type: ADD_TIMELINE_DATA,
		todo
	};
}

export function openNotificationDialog(data) {
	return {
		type: OPEN_NOTIFICATION_DIALOG,
		data
	};
}

export function closeNotificationDialog() {
	return {
		type: CLOSE_NOTIFICATION_DIALOG
	};
}

export function openStatusConfirmDialog(data) {
	return {
		type: OPEN_STATUS_CONFIRM_DIALOG,
		data
	};
}

export function closeStatusConfirmDialog() {
	return {
		type: CLOSE_STATUS_CONFIRM_DIALOG
	};
}

export function okStatusConfirmDialog() {
	return {
		type: OK_STATUS_CONFIRM_DIALOG
	};
}

export function closeNewTodoDialog() {
	return {
		type: CLOSE_NEW_TODO_DIALOG
	};
}
export function closeTimelineDialog() {
	return {
		type: CLOSE_TIMELINE_DIALOG
	};
}
export function openEditTodoDialog(data) {
	return {
		type: OPEN_EDIT_TODO_DIALOG,
		data
	};
}
export function openAddActivityTodoDialog(data) {
	return dispatch =>
		dispatch({
			type: OPEN_ACTIVITY_TODO_DIALOG,
			data
		});
}
export function editTaskTodoDialog(data) {
	return dispatch =>
		dispatch({
			type: EDIT_TASK_TODO_DIALOG,
			data
		});
}
export function openDeleteConfirmDialog(deleteType, data) {
	return {
		type: OPEN_DELETE_CONFIRM_DIALOG,
		deleteType,
		data
	};
}
export function closeEditTodoDialog() {
	return {
		type: CLOSE_EDIT_TODO_DIALOG
	};
}
export function closeActivityTodoDialog() {
	return {
		type: CLOSE_ACTIVITY_TODO_DIALOG
	};
}
export function closeEditTaskTodoDialog() {
	return dispatch =>
		dispatch({
			type: CLOSE_EDIT_TASK_TODO_DIALOG
		});
}
export function addTodo(todo, pid, todoDialogType, closeTodoDialog, isGantt) {
	return dispatch => {
		const values =
			todoDialogType == 'new'
				? {
						name: todo.title,
						note: todo.notes,
						progress: todo.progress,
						date_start: moment(todo.startDate).format('YYYY-MM-DD'),
						date_end: moment(todo.endDate).format('YYYY-MM-DD'),
						assigned_company:
							todo.company && todo.company[0] ? todo.company[0].data.profile.company.id : null
				  }
				: {
						title: todo.title,
						description: todo.notes,
						datetime_start: moment(todo.startDate).format('YYYY-MM-DD'),
						datetime_end: moment(todo.endDate).format('YYYY-MM-DD'),
						workers: todo.profile?.length ? todo.profile.map(d => d.data.profile.id) : null
				  };
		// console.log({ values });
		apiCall(
			todoDialogType == 'new' ? ADD_TASK_TO_PROJECT(pid) : ADD_ACTIVITY_TO_TASK(todo.id),
			values,
			res => {
				if (!isGantt) {
					dispatch(getTodos(pid, false));
					dispatch(getTodos(pid, true));
				} else {
					dispatch(getTodos(pid, isGantt));
				}
				// dispatch(resetAllFilters());
				closeTodoDialog();
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	};
	// const request = axios.post('/api/todo-app/new-todo', todo);

	// return dispatch =>
	// 	request.then(response =>
	// 		Promise.all([
	// 			dispatch({
	// 				type: ADD_TODO
	// 			})
	// 		]).then(() => dispatch(updateTodos()))
	// 	);
}
export function removeActivity(payload) {
	return {
		type: REMOVE_ACTIVITY,
		payload
	};
}
export function removeTask(payload) {
	return {
		type: REMOVE_TASK,
		payload
	};
}
export function editActivity(todo, pid, setLoading, isGantt, editActivityTodoDialog = false) {
	return dispatch => {
		console.log(todo, todo.profile);
		const values = {
			title: todo.title,
			description: todo.notes,
			datetime_start: moment(todo.startDate).format('YYYY-MM-DD'),
			datetime_end: moment(todo.endDate).format('YYYY-MM-DD'),
			status: todo.progress,
			workers: todo.profile?.length
				? todo.profile.map(d => (d.data.profile ? d.data.profile.id : d.data.id))
				: undefined
		};
		apiCall(
			EDIT_ACTIVITY_TO_TASK(todo.id),
			values,
			res => {
				if (isGantt) {
					dispatch(getTodos(pid, isGantt));
					dispatch(closeTimelineDialog());
				}
				if(editActivityTodoDialog) {
					dispatch({
						type: EDIT_ACTIVITY,
						payload: todo
					});
				}
				dispatch(closeEditActivityTodoDialog());
				console.log(res);
				setLoading(false);
				toast.success('Updated');
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
}

export function editActivityFromGantt(todo, pid, closeTodoDialog, isGantt, setLoading) {
	// console.log({
	// 	todo
	// });
	return dispatch => {
		console.log({ todo });
		const values = {
			title: todo.name,
			description: todo.description,
			datetime_start: moment(todo.startDate).format('YYYY-MM-DD'),
			datetime_end: moment(todo.endDate).format('YYYY-MM-DD'),
			workers: todo.profile?.length
				? todo.profile.map(d => (d.data.profile ? d.data.profile.id : d.data.id))
				: undefined
		};
		apiCall(
			EDIT_ACTIVITY_TO_TASK(todo.id),
			values,
			res => {
				console.log(res);
				toast.success('Updated');
				setLoading(false);
				if (!isGantt) {
					dispatch(getTodos(pid, false));
					dispatch(getTodos(pid, true));
				} else {
					dispatch(getTodos(pid, isGantt));
				}
				closeTodoDialog();
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
}

export function editTodo(todo, pid, todoDialogType, closeTodoDialog, isGantt, setLoading) {
	console.log({
		todo
	});
	return dispatch => {
		const values =
			todoDialogType == 'new'
				? {
						name: todo.name,
						note: todo.description,
						progress: todo.progress,
						date_start: moment(todo.startDate).format('YYYY-MM-DD'),
						date_end: moment(todo.endDate).format('YYYY-MM-DD'),
						assigned_company: todo.company[0]?.data?.profile?.company?.id
							? todo.company[0].data.profile.company.id
							: null,
						project: pid,
						date_completed: null,
						alert: false,
						starred: false
				  }
				: {
						title: todo.title,
						description: todo.notes,
						datetime_start: moment(todo.startDate).format('YYYY-MM-DD'),
						datetime_end: moment(todo.endDate).format('YYYY-MM-DD'),
						profile: todo.profile[0] ? todo.profile[0].data.profile.id : null
				  };
		// console.log({ values });
		apiCall(
			todoDialogType == 'new' ? EDIT_TASK_TO_PROJECT(todo.id) : ADD_ACTIVITY_TO_TASK(todo.id),
			values,
			res => {
				setLoading(false);
				if (!isGantt) {
					dispatch(getTodos(pid, false));
					dispatch(getTodos(pid, true));
				} else {
					dispatch(getTodos(pid, isGantt));
				}
				dispatch(resetAllFilters());
				closeTodoDialog();
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
	// const request = axios.post('/api/todo-app/new-todo', todo);

	// return dispatch =>
	// 	request.then(response =>
	// 		Promise.all([
	// 			dispatch({
	// 				type: ADD_TODO
	// 			})
	// 		]).then(() => dispatch(updateTodos()))
	// 	);
}
export function removeTodo(todoId) {
	const request = axios.post('/api/todo-app/remove-todo', todoId);

	return dispatch =>
		request.then(response =>
			Promise.all([
				dispatch({
					type: REMOVE_TODO
				})
			]).then(() => dispatch(updateTodos()))
		);
}

export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT,
		searchText: event.target.value.toLowerCase()
	};
}

export function toggleOrderDescending() {
	return {
		type: TOGGLE_ORDER_DESCENDING
	};
}

export function changeOrder(orderBy) {
	return {
		type: CHANGE_ORDER,
		orderBy
	};
}
