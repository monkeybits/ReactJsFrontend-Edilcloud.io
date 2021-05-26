import { apiCall, METHOD } from 'app/services/baseUrl';
import { PROJECT_LIST } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';

export const GET_CONTACTS = '[CHAT PANEL] GET CONTACTS';
export const SET_SELECTED_CONTACT_ID = '[CHAT PANEL] SET SELECTED CONTACT ID';
export const UPDATE_CONTECT_COUNT = '[CHAT PANEL] UPDATE_CONTECT_COUNT';
export const REMOVE_SELECTED_CONTACT_ID = '[CHAT PANEL] REMOVE SELECTED CONTACT ID';
export const REMOVE_SELECTED_CONTACTS = '[CHAT PANEL] REMOVE SELECTED CONTACTS';

export function getProjects() {
	return dispatch => {
		apiCall(
			PROJECT_LIST,
			{},
			results => {
				if (Array.isArray(results)) {
					dispatch({
						type: GET_CONTACTS,
						payload: results.map(d => ({
							...d,
							isApproved: true,
							type: 'project'
						}))
					});
					// if (global.socket) {
					// 	results.map(d => {
					// 		let code = d.talks?.[d.talks?.length - 1]?.code;
					// 		if (code) {
					// 			global.socket.emit('join', {
					// 				room: code,
					// 				name: ''
					// 			});
					// 		}
					// 	});
					// }
				}
			},
			err => {
				// console.log(err)
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function updateContactCount(contactMessage) {
	return {
		type: UPDATE_CONTECT_COUNT,
		payload: contactMessage
	};
}
export function setselectedContactId(contactId) {
	return {
		type: SET_SELECTED_CONTACT_ID,
		payload: contactId
	};
}
export function removeContacts() {
	return {
		type: REMOVE_SELECTED_CONTACTS
	};
}
export function removeSelectedContactId() {
	return {
		type: REMOVE_SELECTED_CONTACT_ID
	};
}
