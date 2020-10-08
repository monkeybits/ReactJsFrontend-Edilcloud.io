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
export const GET_TODOS = '[TODO APP] GET TODOS (PROJECT)';
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
export const OPEN_TIMELINE_DIALOG = '[TODO APP] OPEN TIMELINE DIALOG (PROJECT)';
export const CLOSE_NEW_TODO_DIALOG = '[TODO APP] CLOSE NEW TODO DIALOG (PROJECT)';
export const CLOSE_TASK_CONTENT_DIALOG = '[TODO APP] CLOSE TASK CONTENT DIALOG (PROJECT)';
export const CLOSE_TIMELINE_DIALOG = '[TODO APP] CLOSE TIMELINE DIALOG (PROJECT)';
export const OPEN_EDIT_TODO_DIALOG = '[TODO APP] OPEN EDIT TODO DIALOG (PROJECT)';
export const OPEN_ACTIVITY_TODO_DIALOG = '[TODO APP] OPEN ACTIVITY TODO DIALOG (PROJECT)';
export const CLOSE_EDIT_TODO_DIALOG = '[TODO APP] CLOSE EDIT TODO DIALOG (PROJECT)';
export const CLOSE_ACTIVITY_TODO_DIALOG = '[TODO APP] CLOSE ACTIVITY TODO DIALOG (PROJECT)';
export const TOGGLE_ORDER_DESCENDING = '[TODO APP] TOGGLE ORDER DESCENDING (PROJECT)';
export const CHANGE_ORDER = '[TODO APP] CHANGE ORDER (PROJECT)';

export function getTodos(pid, isGantt) {
	// const request = axios.get('/api/todo-app/todos', { params });

	return dispatch => {
		apiCall(
			isGantt ? GET_GANTT_TASK_LIST(pid) : GET_TASK_LIST(pid),
			{},
			results => {
				dispatch({
					type: GET_TODOS,
					payload: results
				});
			},
			err => console.log(err),
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
export function closeTaskContent() {
	return {
		type: CLOSE_TASK_CONTENT_DIALOG
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
export function addTodo(todo, pid, todoDialogType, closeTodoDialog, isGantt) {
	// console.log({
	// 	todo
	// });
	return dispatch => {
		let values =
			todoDialogType == 'new'
				? {
						name: todo.title,
						note: todo.notes,
						progress: todo.progress,
						date_start: moment(todo.startDate).format('YYYY-MM-DD'),
						date_end: moment(todo.endDate).format('YYYY-MM-DD'),
						assigned_company: todo.company[0] ? todo.company[0].data.profile.company.id : undefined
				  }
				: {
						title: todo.title,
						description: todo.notes,
						datetime_start: moment(todo.startDate).format('YYYY-MM-DD'),
						datetime_end: moment(todo.endDate).format('YYYY-MM-DD'),
						workers: todo.profile?.length ? todo.profile.map(d => d.data.profile.id) : undefined
				  };
		// console.log({ values });
		apiCall(
			todoDialogType == 'new' ? ADD_TASK_TO_PROJECT(pid) : ADD_ACTIVITY_TO_TASK(todo.id),
			values,
			res => {
				dispatch(getTodos(pid, isGantt));
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
export function editActivity(todo, pid, setLoading, isGantt) {
	// console.log({
	// 	todo
	// });
	return dispatch => {
		console.log({ todo });
		let values = {
			title: todo.title,
			description: todo.notes,
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
				if (isGantt) {
					dispatch(getTodos(pid, isGantt));
					dispatch(closeTimelineDialog());
				}
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
		let values = {
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
				dispatch(getTodos(pid, isGantt));
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
		let values =
			todoDialogType == 'new'
				? {
						name: todo.name,
						note: todo.description,
						progress: todo.progress,
						date_start: moment(todo.startDate).format('YYYY-MM-DD'),
						date_end: moment(todo.endDate).format('YYYY-MM-DD'),
						assigned_company: todo.company[0] ? todo.company[0].data.profile.company.id : undefined,
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
		// console.log({ values });
		apiCall(
			todoDialogType == 'new' ? EDIT_TASK_TO_PROJECT(todo.id) : ADD_ACTIVITY_TO_TASK(todo.id),
			values,
			res => {
				setLoading(false);
				dispatch(getTodos(pid, isGantt));
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
