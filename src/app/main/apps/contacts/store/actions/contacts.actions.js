import { getUserData } from 'app/main/apps/contacts/store/actions/user.actions';
import axios from 'axios';
import { ADD_NEW_MEMBER, ADD_EXISTING_MEMBER, GET_STAFF_LIST, UPDATE_MEMBER } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';

export const GET_CONTACTS = '[CONTACTS APP] GET CONTACTS';
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

export function getContacts(routeParams) {
	return (dispatch, getState) => {
		return apiCall(
			GET_STAFF_LIST,
			{},
			res => {
				let results = [];
				if (res.results.length) {
					results = res.results.map(d => {
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
					type: GET_CONTACTS,
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

export function removeContact(contactId) {
	return (dispatch, getState) => {
		const { routeParams } = getState().contactsApp.contacts;

		const request = axios.post('/api/contacts-app/remove-contact', {
			contactId
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: REMOVE_CONTACT
				})
			]).then(() => dispatch(getContacts(routeParams)))
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
