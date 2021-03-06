import axios from 'axios';
import {
	ADD_ACTIVITY_TO_TASK,
	EDIT_ACTIVITY_TO_TASK,
	EDIT_TASK_TO_PROJECT,
	GET_ALL_PROJECT_TASKS
} from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import moment from 'moment';
import { toast } from 'react-toastify';

export const GET_TODOS = '[TODO APP] GET TODOS';
export const UPDATE_TODOS = '[TODO APP] UPDATE TODOS';
export const TOGGLE_STARRED = '[TODO APP] TOGGLE STARRED';
export const TOGGLE_COMPLETED = '[TODO APP] TOGGLE COMPLETED';
export const TOGGLE_IMPORTANT = '[TODO APP] TOGGLE IMPORTANT';
export const UPDATE_TODO = '[TODO APP] UPDATE TODO';
export const ADD_TODO = '[TODO APP] ADD TODO';
export const REMOVE_TODO = '[TODO APP] REMOVE TODO';
export const SET_SEARCH_TEXT = '[TODO APP] SET SEARCH TEXT';
export const OPEN_NEW_TODO_DIALOG = '[TODO APP] OPEN NEW TODO DIALOG';
export const CLOSE_NEW_TODO_DIALOG = '[TODO APP] CLOSE NEW TODO DIALOG';
export const OPEN_EDIT_TODO_DIALOG = '[TODO APP] OPEN EDIT TODO DIALOG';
export const CLOSE_EDIT_TODO_DIALOG = '[TODO APP] CLOSE EDIT TODO DIALOG';
export const TOGGLE_ORDER_DESCENDING = '[TODO APP] TOGGLE ORDER DESCENDING';
export const CHANGE_ORDER = '[TODO APP] CHANGE ORDER';
export const OPEN_TASK_CONTENT_DIALOG = '[TODO APP] OPEN TASK CONTENT DIALOG';
export const CLOSE_TASK_CONTENT_DIALOG = '[TODO APP] CLOSE TASK CONTENT DIALOG';
export const OPEN_DRAWING_CONTENT_DIALOG = '[TODO APP] OPEN DRAWING CONTENT DIALOG';
export const CLOSE_DRAWING_CONTENT_DIALOG = '[TODO APP] CLOSE DRAWING CONTENT DIALOG';
export const OPEN_DELETE_CONFIRM_DIALOG = '[TODO APP] OPEN DELETE CONFIRM DIALOG';
export const CLOSE_DELETE_CONFIRM_DIALOG = '[TODO APP] CLOSE DELETE CONFIRM DIALOG';
export const OK_DELETE_TASK_CONFIRM_DIALOG = '[TODO APP] OK DELETE TASK CONFIRM DIALOG';
export const OK_DELETE_ACTIVITY_CONFIRM_DIALOG = '[TODO APP] OK DELETE ACTIVITY CONFIRM DIALOG';
export const REMOVE_ACTIVITY = '[TODO APP] REMOVE ACTIVITY';
export const REMOVE_TASK = '[TODO APP] REMOVE TASK';
export const EDIT_ACTIVITY = '[TODO APP] EDIT ACTIVITY';

export const OPEN_TIMELINE_DIALOG = '[TODO APP] OPEN TIMELINE DIALOG';
export const CLOSE_TIMELINE_DIALOG = '[TODO APP] CLOSE TIMELINE DIALOG';
export const OPEN_ACTIVITY_TODO_DIALOG = '[TODO APP] OPEN ACTIVITY TODO DIALOG';
export const CLOSE_ACTIVITY_TODO_DIALOG = '[TODO APP] CLOSE ACTIVITY TODO DIALOG';
export const EDIT_TASK_TODO_DIALOG = '[TODO APP] EDIT TASK TODO DIALOG';
export const SET_UPLOAD = '[TODO APP] SET UPLOAD ';
export const SET_UPLOAD_PERCENTAGE = '[TODO APP] SET UPLOAD PERCENTAGE';
export const CLOSE_EDIT_TASK_TODO_DIALOG = '[TODO APP] CLOSE EDIT TASK TODO DIALOG';
export const EDIT_ACTIVITY_TODO_DIALOG = '[TODO APP] EDIT ACTIVITY TODO DIALOG';
export const CLOSE_EDIT_ACTIVITY_TODO_DIALOG = '[TODO APP] CLOSE EDIT ACTIVITY TODO DIALOG';

function sortHolders(a, b) {
	return a.id > b.id ? 1 : a.id < b.id ? -1 : 0;
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
export function editTaskTodoDialog(data) {
	return dispatch =>
		dispatch({
			type: EDIT_TASK_TODO_DIALOG,
			data
		});
}
export function closeEditTaskTodoDialog() {
	return dispatch =>
		dispatch({
			type: CLOSE_EDIT_TASK_TODO_DIALOG
		});
}
export function getTodos(params, isGantt = false, handleSetLoading = () => '') {
	handleSetLoading({
		loadingTodos: true
	});
	return (dispatch, getState) => {
		const companyId = getState().auth.user.data.extra?.profile.company;
		apiCall(
			GET_ALL_PROJECT_TASKS,
			{},
			results => {
				handleSetLoading({
					loadingTodos: false
				});
				dispatch({
					type: GET_TODOS,
					payload: results.sort(sortHolders),
					companyId
				});
			},
			err => {
				handleSetLoading({
					loadingTodos: false
				});
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
export function closeTimelineDialog() {
	return {
		type: CLOSE_TIMELINE_DIALOG
	};
}
export function closeActivityTodoDialog() {
	return {
		type: CLOSE_ACTIVITY_TODO_DIALOG
	};
}
export function closeTaskContent() {
	return {
		type: CLOSE_TASK_CONTENT_DIALOG
	};
}
export function closeDeleteConfirmDialog() {
	return {
		type: CLOSE_DELETE_CONFIRM_DIALOG
	};
}
export function openDeleteConfirmDialog(deleteType, data) {
	return {
		type: OPEN_DELETE_CONFIRM_DIALOG,
		deleteType,
		data
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
export function editActivityByList(payload) {
	return {
		type: EDIT_ACTIVITY,
		payload
	};
}
export function editActivity(todo, pid, setLoading, isGantt, editActivityTodoDialog = false) {
	return dispatch => {
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
						payload: {
							...todo,
							status: todo.progress
						}
					});
				}
				dispatch(closeEditActivityTodoDialog());
				setLoading(false);
				toast.success('Updated');
			},
			err => {
				// console.log(err)
			},
			METHOD.PUT,
			getHeaderToken()
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

export function openNewTodoDialog() {
	return {
		type: OPEN_NEW_TODO_DIALOG
	};
}

export function closeNewTodoDialog() {
	return {
		type: CLOSE_NEW_TODO_DIALOG
	};
}

export function openEditTodoDialog(data) {
	return {
		type: OPEN_EDIT_TODO_DIALOG,
		data
	};
}

export function closeEditTodoDialog() {
	return {
		type: CLOSE_EDIT_TODO_DIALOG
	};
}

export function addTodo(todo) {
	const request = axios.post('/api/todo-app/new-todo', todo);

	return dispatch =>
		request.then(response =>
			Promise.all([
				dispatch({
					type: ADD_TODO
				})
			]).then(() => dispatch(updateTodos()))
		);
}
export function openAddActivityTodoDialog(data) {
	return dispatch =>
		dispatch({
			type: OPEN_ACTIVITY_TODO_DIALOG,
			data
		});
}

export function editTodo(todo, pid, todoDialogType, closeTodoDialog, isGantt, setLoading, handleSetLoading) {
	return dispatch => {
		const values =
			todoDialogType == 'new'
				? {
						name: todo.name,
						note: todo.description,
						progress: todo.progress,
						date_start: moment(todo.startDate).format('YYYY-MM-DD'),
						date_end: moment(todo.endDate).format('YYYY-MM-DD'),
						assigned_company: todo.company[0].data?.profile?.company
							? todo.company[0].data.profile.company.id
							: todo.company[0].data?.id
							? todo.company[0].data.id
							: undefined,
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
						profile: todo.profile[0] ? todo.profile[0].data.profile.id : undefined
				  };
		apiCall(
			todoDialogType == 'new' ? EDIT_TASK_TO_PROJECT(todo.id) : ADD_ACTIVITY_TO_TASK(todo.id),
			values,
			res => {
				setLoading(false);
				dispatch(getTodos(pid, isGantt, handleSetLoading));
				closeTodoDialog();
			},
			err => {
				// console.log(err)
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};
}
export function openTimelineDialog(todo) {
	return {
		type: OPEN_TIMELINE_DIALOG,
		todo
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
