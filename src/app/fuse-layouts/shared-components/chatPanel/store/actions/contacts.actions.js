import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { CHAT_LIST, GET_STAFF_LIST, PROJECT_LIST } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';

export const GET_CONTACTS = '[CHAT PANEL] GET CONTACTS';
export const SET_SELECTED_CONTACT_ID = '[CHAT PANEL] SET SELECTED CONTACT ID';
export const REMOVE_SELECTED_CONTACT_ID = '[CHAT PANEL] REMOVE SELECTED CONTACT ID';

export function getProjects() {
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
							type: 'project'
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
