import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { ADD_TASK_TO_PROJECT, GET_TASK_LIST, ADD_ACTIVITY_TO_TASK } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import moment from 'moment';
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
export const OPEN_ACTIVITY_TODO_DIALOG = '[TODO APP] OPEN ACTIVITY TODO DIALOG';
export const CLOSE_EDIT_TODO_DIALOG = '[TODO APP] CLOSE EDIT TODO DIALOG';
export const CLOSE_ACTIVITY_TODO_DIALOG = '[TODO APP] CLOSE ACTIVITY TODO DIALOG';
export const TOGGLE_ORDER_DESCENDING = '[TODO APP] TOGGLE ORDER DESCENDING';
export const CHANGE_ORDER = '[TODO APP] CHANGE ORDER';

export function getTodos(pid) {
	// const request = axios.get('/api/todo-app/todos', { params });

	return dispatch => {
		apiCall(
			GET_TASK_LIST(pid),
			{},
			res => {
				dispatch({
					type: GET_TODOS,
					payload: res.results
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
export function openAddActivityTodoDialog(data) {
	return {
		type: OPEN_ACTIVITY_TODO_DIALOG,
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
export function addTodo(todo, pid, todoDialogType) {
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
						profile: todo.profile[0] ? todo.profile[0].data.profile.profile.id : undefined
				  };
		// console.log({ values });
		apiCall(
			todoDialogType == 'new' ? ADD_TASK_TO_PROJECT(pid) : ADD_ACTIVITY_TO_TASK(todo.id),
			values,
			res => console.log(res),
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
