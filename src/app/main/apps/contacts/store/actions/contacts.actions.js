import { getUserData } from 'app/main/apps/contacts/store/actions/user.actions';
import axios from 'axios';
import {
	ADD_NEW_MEMBER,
	ADD_EXISTING_MEMBER,
	GET_STAFF_LIST,
	UPDATE_MEMBER,
	GET_REFUSED_STAFF_LIST,
	GET_WAITING_STAFF_LIST,
	GET_DISABLED_STAFF_LIST
} from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import { toast } from 'react-toastify';

export const GET_CONTACTS = '[CONTACTS APP] GET CONTACTS';
export const FILTER_BY = '[CONTACTS APP] FILTER BY';
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

export function resetContact() {
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
export function getContacts(handleSetLoading = () => '') {
	return (dispatch, getState) => {
		dispatch(getApprovedContacts(handleSetLoading));
		dispatch(getWaitingContacts(handleSetLoading));
		dispatch(getRefusedContacts(handleSetLoading));
		dispatch(getDeactivatedContacts(handleSetLoading));
	};
}
export function getApprovedContacts(handleSetLoading = () => '') {
	handleSetLoading({
		loadingApprove: true
	});
	return (dispatch, getState) => {
		return apiCall(
			GET_STAFF_LIST,
			{},
			res => {
				handleSetLoading({
					loadingApprove: false
				});
				let results = [];
				if (res.length) {
					results = res.map(d => {
						const { first_name, last_name, photo, company, position, email, phone } = d;
						return {
							...d,
							name: first_name,
							lastName: last_name,
							avatar: photo || 'assets/images/avatars/profile.jpg',
							nickname: first_name,
							company: company?.name,
							jobTitle: position,
							email,
							phone,
							address: ''
						};
					});
				}
				return dispatch({
					type: GET_CONTACTS,
					payload: results
				});
			},
			err => {
				handleSetLoading({
					loadingApprove: false
				});
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function getWaitingContacts(handleSetLoading = () => '') {
	handleSetLoading({
		loadingWaiting: true
	});
	return (dispatch, getState) => {
		return apiCall(
			GET_WAITING_STAFF_LIST,
			{},
			res => {
				handleSetLoading({
					loadingWaiting: false
				});
				let results = [];
				if (res.length) {
					results = res.map(d => {
						const { first_name, last_name, photo, company, position, email, phone } = d;
						return {
							...d,
							name: first_name,
							lastName: last_name,
							avatar: photo || 'assets/images/avatars/profile.jpg',
							nickname: first_name,
							company: company?.name,
							jobTitle: position,
							email,
							phone,
							address: ''
						};
					});
				}
				return dispatch({
					type: GET_WAITING_CONTACTS,
					payload: results
				});
			},
			err => {
				handleSetLoading({
					loadingWaiting: false
				});
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function getRefusedContacts(handleSetLoading = () => '') {
	handleSetLoading({
		loadingRefuse: true
	});
	return (dispatch, getState) => {
		return apiCall(
			GET_REFUSED_STAFF_LIST,
			{},
			res => {
				handleSetLoading({
					loadingRefuse: false
				});
				let results = [];
				if (res.length) {
					results = res.map(d => {
						const { first_name, last_name, photo, company, position, email, phone } = d;
						return {
							...d,
							name: first_name,
							lastName: last_name,
							avatar: photo || 'assets/images/avatars/profile.jpg',
							nickname: first_name,
							company: company?.name,
							jobTitle: position,
							email,
							phone,
							address: ''
						};
					});
				}
				return dispatch({
					type: GET_REFUSED_CONTACTS,
					payload: results
				});
			},
			err => {
				handleSetLoading({
					loadingRefuse: false
				});
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function getDeactivatedContacts(handleSetLoading = () => '') {
	handleSetLoading({
		loadingDeactivate: true
	});
	return (dispatch, getState) => {
		return apiCall(
			GET_DISABLED_STAFF_LIST,
			{},
			res => {
				handleSetLoading({
					loadingDeactivate: false
				});
				let results = [];
				if (res.length) {
					results = res.map(d => {
						const { first_name, last_name, photo, company, position, email, phone } = d;
						return {
							...d,
							name: first_name,
							lastName: last_name,
							avatar: photo || 'assets/images/avatars/profile.jpg',
							nickname: first_name,
							company: company?.name,
							jobTitle: position,
							email,
							phone,
							address: ''
						};
					});
				}
				return dispatch({
					type: GET_DEACTIVATED_CONTACTS,
					payload: results
				});
			},
			err => {
				handleSetLoading({
					loadingDeactivate: false
				});
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

export function openNewContactDialog(payload) {
	return {
		type: OPEN_NEW_CONTACT_DIALOG,
		payload
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
export function addContact(values, isExisting, handleSetLoading = () => '') {
	return (dispatch, getState) => {
		const formData = new FormData();
		for (const key in values) {
			if (values[key] || key == 'can_access_chat' || key == 'can_access_files') {
				formData.append(key, values[key]);
			}
		}
		apiCall(
			isExisting ? ADD_EXISTING_MEMBER(values.id) : ADD_NEW_MEMBER,
			formData,
			res => {
				dispatch(getContacts(handleSetLoading));
			},
			err => {
				toast.error(err.detail);
			},
			METHOD.POST,
			getHeaderToken()
		);
	};
}

export function updateContact(values, id, hideContectCalls, handleSetLoading = () => '', status) {
	return (dispatch, getState) => {
		const formData = new FormData();
		for (const key in values) {
			if (values[key] || key == 'can_access_chat' || key == 'can_access_files') formData.append(key, values[key]);
		}
		apiCall(
			UPDATE_MEMBER(id),
			formData,
			res => {
				if (!hideContectCalls) {
					dispatch(getContacts(handleSetLoading));
				} else if (status == 'Approved') {
					dispatch(getApprovedContacts(handleSetLoading));
				} else if (status == 'Waiting') {
					dispatch(getWaitingContacts(handleSetLoading));
				} else if (status == 'Deactivated') {
					dispatch(getDeactivatedContacts(handleSetLoading));
				} else if (status == 'Refused') {
					dispatch(getRefusedContacts(handleSetLoading));
				}
			},
			err => {
				// console.log(err)
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};
}

export function removeContacts(contactIds) {
	return (dispatch, getState) => {
		const request = axios.post('/api/contacts-app/remove-contacts', {
			contactIds
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: REMOVE_CONTACTS
				})
			]).then(() => dispatch(getContacts()))
		);
	};
}

export function toggleStarredContact(contactId) {
	return (dispatch, getState) => {
		const request = axios.post('/api/contacts-app/toggle-starred-contact', {
			contactId
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: TOGGLE_STARRED_CONTACT
				}),
				dispatch(getUserData())
			]).then(() => dispatch(getContacts()))
		);
	};
}

export function toggleStarredContacts(contactIds) {
	return (dispatch, getState) => {
		const request = axios.post('/api/contacts-app/toggle-starred-contacts', {
			contactIds
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: TOGGLE_STARRED_CONTACTS
				}),
				dispatch(getUserData())
			]).then(() => dispatch(getContacts()))
		);
	};
}

export function setContactsStarred(contactIds) {
	return (dispatch, getState) => {
		const request = axios.post('/api/contacts-app/set-contacts-starred', {
			contactIds
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: SET_CONTACTS_STARRED
				}),
				dispatch(getUserData())
			]).then(() => dispatch(getContacts()))
		);
	};
}

export function setContactsUnstarred(contactIds) {
	return (dispatch, getState) => {
		const request = axios.post('/api/contacts-app/set-contacts-unstarred', {
			contactIds
		});

		return request.then(response =>
			Promise.all([
				dispatch({
					type: SET_CONTACTS_STARRED
				}),
				dispatch(getUserData())
			]).then(() => dispatch(getContacts()))
		);
	};
}
