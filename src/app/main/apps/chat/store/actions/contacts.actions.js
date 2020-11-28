import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import { GET_STAFF_LIST } from 'app/services/apiEndPoints';

export const GET_CONTACTS = '[CHAT APP] GET CONTACTS';
export const SET_SELECTED_CONTACT_ID = '[CHAT APP] SET SELECTED CONTACT ID';
export const REMOVE_SELECTED_CONTACT_ID = '[CHAT APP] REMOVE SELECTED CONTACT ID';

function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export function getContacts() {
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
							photo: d.photo ? d.photo : 'assets/images/avatars/profile.jpg',
							status: 'online',
							mood: '',
							unread: '0',
							contactNameColor: getRandomColor()
						};
					});
				}
				return dispatch({
					type: GET_CONTACTS,
					payload: results
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
