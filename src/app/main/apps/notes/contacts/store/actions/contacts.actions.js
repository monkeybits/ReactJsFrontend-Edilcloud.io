import { getUserData } from 'app/main/apps/contacts/store/actions/user.actions';
import axios from 'axios';
import {
	ADD_NEW_MEMBER,
	ADD_EXISTING_MEMBER,
	GET_PROJECT_STAFF_LIST,
	UPDATE_MEMBER,
	GET_REFUSED_STAFF_LIST,
	GET_WAITING_STAFF_LIST,
	GET_DISABLED_STAFF_LIST,
	ADD_TEAM_MEMBER_TO_PROJECT,
	GET_PROJECT_STAFF_WAITING_LIST,
	GET_PROJECT_STAFF_REFUSE_LIST
} from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';

export const GET_CONTACTS = '[CONTACTS APP] GET CONTACTS';
export const FILTER_BY = '[CONTACTS APP] FILTER BY';
export const FILTER_BY_KEY = '[CONTACTS APP] ADD FILTER KEY';
export const RESET_CONTACTS = '[CONTACTS APP] RESET CONTACTS';
export const GET_WAITING_CONTACTS = '[CONTACTS APP] GET WAITING CONTACTS';
export const GET_DEACTIVATED_CONTACTS = '[CONTACTS APP] GET DEACTIVATED CONTACTS';
export const GET_REFUSED_CONTACTS = '[CONTACTS APP] GET REFUSED CONTACTS';
export const SET_SEARCH_TEXT = '[CONTACTS APP] SET SEARCH TEXT';
export const OPEN_NEW_CONTACT_DIALOG = '[CONTACTS APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[CONTACTS APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[CONTACTS APP] OPEN EDIT CONTACT DIALOG';
export const OPEN_VIEW_CONTACT_DIALOG = '[CONTACTS APP] OPEN VIEW CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[CONTACTS APP] CLOSE EDIT CONTACT DIALOG';
export const CLOSE_VIEW_CONTACT_DIALOG = '[CONTACTS APP] CLOSE VIEW CONTACT DIALOG';
export const ADD_CONTACT = '[CONTACTS APP] ADD CONTACT';
export const UPDATE_CONTACT = '[CONTACTS APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[CONTACTS APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[CONTACTS APP] REMOVE CONTACTS';
export const TOGGLE_STARRED_CONTACT = '[CONTACTS APP] TOGGLE STARRED CONTACT';
export const TOGGLE_STARRED_CONTACTS = '[CONTACTS APP] TOGGLE STARRED CONTACTS';
export const SET_CONTACTS_STARRED = '[CONTACTS APP] SET CONTACTS STARRED ';

export function resetContact(routeParams) {
	return (dispatch, getState) => {
		dispatch({
			type: RESET_CONTACTS
		});
	};
}
export function removeContact(email) {
	return (dispatch, getState) => {
		dispatch({
			type: REMOVE_CONTACT,
			payload: email
		});
	};
}
export function filterByKey(filterKey) {
	return (dispatch, getState) => {
		dispatch({
			type: FILTER_BY,
			filterKey
		});
	};
}
export function addFilterByKey(filterKey) {
	return (dispatch, getState) => {
		dispatch({
			type: FILTER_BY_KEY,
			filterKey
		});
	};
}
export function getContacts(pid, handleSetLoading = () => '') {
	return (dispatch, getState) => {
		dispatch(getApprovedContacts(pid, handleSetLoading));
		dispatch(getWaitingContacts(pid, handleSetLoading));
		dispatch(getRefusedContacts(pid, handleSetLoading));
		// dispatch(getDeactivatedContacts(routeParams));
	};
}
export function getApprovedContacts(routeParams, handleSetLoading) {
	handleSetLoading({
		loadingApprove: true
	});
	return (dispatch, getState) => {
		return apiCall(
			GET_PROJECT_STAFF_LIST(routeParams),
			{},
			res => {
				handleSetLoading({
					loadingApprove: false
				});
				let results = [];
				if (res.length) {
					results = res.map(d => {
						const { first_name, last_name, photo, company, position, email, phone } = d.profile;
						return {
							...d,
							name: first_name,
							lastName: last_name,
							avatar: photo ? photo : 'assets/images/avatars/profile.jpg',
							nickname: first_name,
							company: company?.name,
							jobTitle: position,
							email: email,
							phone: phone,
							address: ''
						};
					});
				}
				return dispatch({
					type: GET_CONTACTS,
					payload: results,
					routeParams
				});
			},
			err => {
				handleSetLoading({
					loadingApprove: false
				});
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function getWaitingContacts(routeParams, handleSetLoading) {
	handleSetLoading({
		loadingWaiting: true
	});
	return (dispatch, getState) => {
		return apiCall(
			GET_PROJECT_STAFF_WAITING_LIST(routeParams),
			{},
			res => {
				handleSetLoading({
					loadingWaiting: false
				});
				let results = [];
				if (res.length) {
					results = res.map(d => {
						const { first_name, last_name, photo, company, position, email, phone } = d.profile;
						return {
							...d,
							name: first_name,
							lastName: last_name,
							avatar: photo ? photo : 'assets/images/avatars/profile.jpg',
							nickname: first_name,
							company: company?.name,
							jobTitle: position,
							email: email,
							phone: phone,
							address: ''
						};
					});
				}
				return dispatch({
					type: GET_WAITING_CONTACTS,
					payload: results,
					routeParams
				});
			},
			err => {
				handleSetLoading({
					loadingWaiting: false
				});
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}

export function getRefusedContacts(routeParams, handleSetLoading) {
	handleSetLoading({
		loadingRefuse: true
	});
	return (dispatch, getState) => {
		return apiCall(
			GET_PROJECT_STAFF_REFUSE_LIST(routeParams),
			{},
			res => {
				handleSetLoading({
					loadingRefuse: false
				});
				let results = [];
				if (res.length) {
					results = res.map(d => {
						const { first_name, last_name, photo, company, position, email, phone } = d.profile;
						return {
							...d,
							name: first_name,
							lastName: last_name,
							avatar: photo ? photo : 'assets/images/avatars/profile.jpg',
							nickname: first_name,
							company: company?.name,
							jobTitle: position,
							email: email,
							phone: phone,
							address: ''
						};
					});
				}
				return dispatch({
					type: GET_REFUSED_CONTACTS,
					payload: results,
					routeParams
				});
			},
			err => {
				handleSetLoading({
					loadingRefuse: false
				});
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function getDeactivatedContacts(routeParams) {
	return (dispatch, getState) => {
		return apiCall(
			GET_DISABLED_STAFF_LIST,
			{},
			res => {
				let results = [];
				if (res.length) {
					results = res.map(d => {
						const { first_name, last_name, photo, company, position, email, phone } = d;
						return {
							...d,
							name: first_name,
							lastName: last_name,
							avatar: photo ? photo : 'assets/images/avatars/profile.jpg',
							nickname: first_name,
							company: company?.name,
							jobTitle: position,
							email: email,
							phone: phone,
							address: ''
						};
					});
				}
				return dispatch({
					type: GET_DEACTIVATED_CONTACTS,
					payload: results,
					routeParams
				});
			},
			err => {
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT,
		searchText: event.target.value
	};
}

export function openNewContactDialog() {
	return {
		type: OPEN_NEW_CONTACT_DIALOG
	};
}

export function closeNewContactDialog() {
	return {
		type: CLOSE_NEW_CONTACT_DIALOG
	};
}

export function openEditContactDialog(data) {
	return {
		type: OPEN_EDIT_CONTACT_DIALOG,
		data
	};
}

export function closeEditContactDialog() {
	return {
		type: CLOSE_EDIT_CONTACT_DIALOG
	};
}
export function openViewContactDialog(data) {
	return {
		type: OPEN_VIEW_CONTACT_DIALOG,
		data
	};
}

export function closeViewContactDialog() {
	return {
		type: CLOSE_VIEW_CONTACT_DIALOG
	};
}

export function addMemberToProject(pid, values, is_external) {
	return dispatch => {
		// console.log({ values });
		// var formData = new FormData();
		// for (let key in values) {
		// 	if (values[key]) formData.append(key, values[key]);
		// }
		apiCall(
			ADD_TEAM_MEMBER_TO_PROJECT(pid, is_external),
			values,
			res => {
				dispatch(getContacts(pid));
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	};
}
export function addContact(values, isExisting) {
	return (dispatch, getState) => {
		const { routeParams } = getState().contactsApp.contacts;
		var formData = new FormData();
		for (let key in values) {
			if (values[key] || key == 'can_access_chat' || key == 'can_access_files') {
				formData.append(key, values[key]);
			}
		}
		apiCall(
			isExisting ? ADD_EXISTING_MEMBER(values.id) : ADD_NEW_MEMBER,
			formData,
			res => {
				dispatch(getContacts(routeParams));
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	};
}

export function updateContact(values, id) {
	return (dispatch, getState) => {
		const { routeParams } = getState().contactsApp.contacts;
		var formData = new FormData();
		for (let key in values) {
			if (values[key] || key == 'can_access_chat' || key == 'can_access_files') formData.append(key, values[key]);
		}
		apiCall(
			UPDATE_MEMBER(id),
			formData,
			res => {
				dispatch(getContacts(routeParams));
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
}

export function removeContacts(contactIds) {
	return (dispatch, getState) => {
		const { routeParams } = getState().contactsApp.contacts;

		const request = axios.post('/api/contacts-app/remove-contacts', {
			contactIds
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: REMOVE_CONTACTS
				})
			]).then(() => dispatch(getContacts(routeParams)))
		);
	};
}

export function toggleStarredContact(contactId) {
	return (dispatch, getState) => {
		const { routeParams } = getState().contactsApp.contacts;

		const request = axios.post('/api/contacts-app/toggle-starred-contact', {
			contactId
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: TOGGLE_STARRED_CONTACT
				}),
				dispatch(getUserData())
			]).then(() => dispatch(getContacts(routeParams)))
		);
	};
}

export function toggleStarredContacts(contactIds) {
	return (dispatch, getState) => {
		const { routeParams } = getState().contactsApp.contacts;

		const request = axios.post('/api/contacts-app/toggle-starred-contacts', {
			contactIds
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: TOGGLE_STARRED_CONTACTS
				}),
				dispatch(getUserData())
			]).then(() => dispatch(getContacts(routeParams)))
		);
	};
}

export function setContactsStarred(contactIds) {
	return (dispatch, getState) => {
		const { routeParams } = getState().contactsApp.contacts;

		const request = axios.post('/api/contacts-app/set-contacts-starred', {
			contactIds
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: SET_CONTACTS_STARRED
				}),
				dispatch(getUserData())
			]).then(() => dispatch(getContacts(routeParams)))
		);
	};
}

export function setContactsUnstarred(contactIds) {
	return (dispatch, getState) => {
		const { routeParams } = getState().contactsApp.contacts;

		const request = axios.post('/api/contacts-app/set-contacts-unstarred', {
			contactIds
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: SET_CONTACTS_STARRED
				}),
				dispatch(getUserData())
			]).then(() => dispatch(getContacts(routeParams)))
		);
	};
}
