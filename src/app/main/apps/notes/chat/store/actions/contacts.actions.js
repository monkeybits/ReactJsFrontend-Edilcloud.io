import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import { GET_STAFF_LIST, GET_PROJECT_STAFF_LIST } from 'app/services/apiEndPoints';

export const GET_CONTACTS = '[CHAT APP] GET CONTACTS (PROJECT)';
export const SET_SELECTED_CONTACT_ID = '[CHAT APP] SET SELECTED CONTACT ID (PROJECT)';
export const REMOVE_SELECTED_CONTACT_ID = '[CHAT APP] REMOVE SELECTED CONTACT ID (PROJECT)';

function getRandomColor() {
	const letters = '0123456789ABCDEF';
	let color = '#';
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

export function getContacts(routeParams, handleSetLoading = () => '') {
	handleSetLoading({
		loadingGetUserData: true
	});
	return (dispatch, getState) => {
		return apiCall(
			GET_PROJECT_STAFF_LIST(routeParams),
			{},
			res => {
				handleSetLoading({
					loadingGetUserData: false
				});
				let results = [];
				if (res.length) {
					results = res.map(d => {
						const { first_name, last_name, photo, company, position, email, phone } = d.profile;
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
				handleSetLoading({
					loadingGetUserData: false
				});
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
