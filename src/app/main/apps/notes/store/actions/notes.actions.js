import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { PROJECT_LIST, PROJECT_DETAIL, PROJECT_INVIATION_LIST, DELETE_PROJECT } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';

export const GET_NOTES = '[NOTES APP] GET NOTES';
export const GET_PROJECTS = '[PROJECTS APP] GET PROJECTS';
export const RESET_PROEJECTS = '[PROJECTS APP] RESET PROJECTS';
export const TOGGLE_PROJECT_STATUS = '[PROJECTS APP] TOGGLE PROJECT STATUS';
export const GET_PROJECT_DETAIL = '[PROJECTS APP] GET PROJECTS DETAIL';
export const DELETE_PROJECT_ACTION = '[PROJECTS APP] DELETE_PROJECT';
export const GET_PROJECT_LIST = '[PROJECTS APP] GET PROJECTS LIST';
export const SET_SEARCH_TEXT = '[NOTES APP] SET SEARCH TEXT';
export const OPEN_NOTE_DIALOG = '[NOTES APP] OPEN NOTE DIALOG';
export const CLOSE_NOTE_DIALOG = '[NOTES APP] CLOSE NOTE DIALOG';
export const CREATE_NOTE = '[NOTES APP] CREATE NOTE';
export const UPDATE_NOTE = '[NOTES APP] UPDATE NOTE';
export const REMOVE_NOTE = '[NOTES APP] REMOVE NOTE';
export const TOGGLE_VARIATE_DESC_SIZE = '[NOTES APP] TOGGLE VARIATE DESC SIZE';
export const OPEN_CONFIRM_DELETE_DIALOG = '[NOTES APP] OPEN CONFIRM DELETE DIALOG';
export const CLOSE_CONFIRM_DELETE_DIALOG = '[NOTES APP] CLOSE CONFIRM DELETE DIALOG';
export const OK_CONFIRM_DELETE_DIALOG = '[NOTES APP] OK CONFIRM DELETE DIALOG';

export function getProjects(handleSetLoading = () => '') {
	handleSetLoading({
		loadingProjects: true
	});
	return (dispatch, getState) => {
		apiCall(
			PROJECT_LIST,
			{},
			results => {
				console.log('results???????????????', results);
				const { company } = getState().chatApp;
				if (Array.isArray(results)) {
					dispatch({
						type: GET_PROJECTS,
						payload: results.map(d => ({
							...d,
							isApproved: true
						})),
						company
					});
				}
				handleSetLoading({
					loadingProjects: false
				});
			},
			err => {
				handleSetLoading({
					loadingProjects: false
				});
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}

export function getRequest(handleSetLoading) {
	handleSetLoading({
		loadingProjectRequest: true
	});
	return dispatch => {
		apiCall(
			PROJECT_INVIATION_LIST,
			{},
			({ results }) => {
				if (Array.isArray(results)) {
					dispatch({
						type: GET_PROJECTS,
						payload: results.map(d => ({
							...d,
							...d.project,
							mainId: d.id,
							isApproved: false
						}))
					});
				}
				handleSetLoading({
					loadingProjectRequest: false
				});
			},
			err => {
				handleSetLoading({
					loadingProjectRequest: false
				});
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function getProjectDetail(pid) {
	return dispatch => {
		apiCall(
			PROJECT_DETAIL(pid),
			{},
			res => {
				dispatch({
					type: GET_PROJECT_DETAIL,
					payload: res
				});
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function deleteProject(pid) {
	return dispatch => {
		apiCall(
			DELETE_PROJECT(pid),
			{},
			res => {
				dispatch(deleteFromStore(pid));
			},
			err => console.log(err),
			METHOD.DELETE,
			getHeaderToken()
		);
	};
}

export function openConfirmDeleteDialog() {
	return {
		type: OPEN_CONFIRM_DELETE_DIALOG
	};
}

export function closeConfirmDeleteDialog() {
	return {
		type: CLOSE_CONFIRM_DELETE_DIALOG
	};
}

export function okConfirmDeleteDialog() {
	return {
		type: OK_CONFIRM_DELETE_DIALOG
	};
}

export function deleteFromStore(pid) {
	return {
		type: DELETE_PROJECT_ACTION,
		pid
	};
}

export function toggleProjectStatus(index) {
	return {
		type: TOGGLE_PROJECT_STATUS,
		index
	};
}
export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT,
		searchText: event.target.value
	};
}
export function updateProjectDetail(payload) {
	return dispatch => {
		dispatch({
			type: GET_PROJECT_DETAIL,
			payload
		});
	};
}
export function updateProjectList(payload) {
	return dispatch => {
		dispatch({
			type: GET_PROJECT_LIST,
			payload
		});
	};
}
export function resetSearchText() {
	return {
		type: SET_SEARCH_TEXT,
		searchText: ''
	};
}

export function toggleVariateDescSize() {
	return {
		type: TOGGLE_VARIATE_DESC_SIZE
	};
}

export function openNoteDialog(id) {
	return {
		type: OPEN_NOTE_DIALOG,
		payload: id
	};
}

export function closeNoteDialog() {
	return {
		type: CLOSE_NOTE_DIALOG
	};
}

export function createNote(note) {
	const request = axios.post('/api/notes-app/create-note', {
		note
	});
	return dispatch =>
		request.then(response => {
			dispatch({
				type: CREATE_NOTE,
				note: response.data
			});
		});
}

export function updateNote(note) {
	const request = axios.post('/api/notes-app/update-note', {
		note
	});

	return dispatch =>
		request.then(response =>
			dispatch({
				type: UPDATE_NOTE,
				note: response.data
			})
		);
}

export function removeNote(noteId) {
	const request = axios.post('/api/notes-app/remove-note', {
		noteId
	});
	return dispatch =>
		request.then(() => {
			dispatch({
				type: REMOVE_NOTE,
				id: noteId
			});
		});
}
