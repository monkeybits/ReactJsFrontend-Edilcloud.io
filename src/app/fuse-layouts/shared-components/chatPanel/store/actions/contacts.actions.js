import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { CHAT_LIST, GET_STAFF_LIST, PROJECT_LIST } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';

export const GET_CONTACTS = '[CHAT PANEL] GET CONTACTS';
export const SET_SELECTED_CONTACT_ID = '[CHAT PANEL] SET SELECTED CONTACT ID';
export const REMOVE_SELECTED_CONTACT_ID = '[CHAT PANEL] REMOVE SELECTED CONTACT ID';

export function getContacts() {
	apiCall(
		CHAT_LIST,
		{},
		({ results }) => {
			if (Array.isArray(results)) {
				results.map(item => localStorage.setItem(item.content_type_name, item.code));
			}
		},
		err => console.log(err),
		METHOD.GET,
		getHeaderToken()
	);
	// return (dispatch, getState) => {
	// 	return apiCall(
	// 		GET_STAFF_LIST,
	// 		{},
	// 		res => {
	// 			let results = [];
	// 			if (res.results.length) {
	// 				results = res.results.map(d => {
	// 					const { first_name, last_name, photo, company, position, email, phone } = d;
	// 					return {
	// 						...d,
	// 						name: first_name,
	// 						photo: d.photo ? d.photo : 'assets/images/avatars/profile.jpg',
	// 						status: 'online',
	// 						mood: '',
	// 						unread: '0'
	// 						// contactNameColor: getRandomColor()
	// 					};
	// 				});
	// 			}
	// 			return dispatch({
	// 				type: GET_CONTACTS,
	// 				payload: results
	// 			});
	// 		},
	// 		err => {
	// 			console.log(err);
	// 		},
	// 		METHOD.GET,
	// 		getHeaderToken()
	// 	);
	// };
}
export function getProjects() {
	apiCall(
		CHAT_LIST,
		{},
		({ results }) => {
			if (Array.isArray(results)) {
				results.map(item => localStorage.setItem(item.content_type_name, item.code));
			}
		},
		err => console.log(err),
		METHOD.GET,
		getHeaderToken()
	);
	return dispatch => {
		apiCall(
			PROJECT_LIST,
			{},
			({ results }) => {
				if (Array.isArray(results)) {
					dispatch({
						type: GET_CONTACTS,
						payload: results.map(d => ({
							...d,
							isApproved: true,
							type:'project'
						}))
					});
				}
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function setselectedContactId(contactId) {
	return {
		type: SET_SELECTED_CONTACT_ID,
		payload: contactId
	};
}

export function removeSelectedContactId() {
	return {
		type: REMOVE_SELECTED_CONTACT_ID
	};
}
