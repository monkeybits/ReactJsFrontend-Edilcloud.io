import { GET_SETTINGS_PREFERENCES } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';

export const FILTER_BY = '[SETTINGS APP] FILTER BY';
export const GET_SETTINGS = '[SETTINGS APP] GET SETTINGS';
export const UPDATE_SETTINGS = '[SETTINGS APP] UPDATE SETTINGS';
export const UPDATE_FULL_ARRAY_SETTINGS = '[SETTINGS APP] UPDATE FULL ARRAY SETTINGS';

export function getSettings() {
	return dispatch =>
		apiCall(
			GET_SETTINGS_PREFERENCES,
			{},
			res => {
				dispatch({
					type: GET_SETTINGS,
					payload: res
				});
			},
			err => {
				// console.log(err)
			},
			METHOD.GET,
			getHeaderToken()
		);
	// request.then(response =>

	// );
}
export function updateByIndex(index, bool, isEmail) {
	return dispatch =>
		dispatch({
			type: UPDATE_SETTINGS,
			payload: { index, bool, isEmail }
		});
}
export function filterByKey(filterKey) {
	return dispatch => {
		dispatch({
			type: FILTER_BY,
			filterKey
		});
	};
}
export function updateFullArray(bool, isEmail) {
	return dispatch =>
		dispatch({
			type: UPDATE_FULL_ARRAY_SETTINGS,
			payload: { bool, isEmail }
		});
}
