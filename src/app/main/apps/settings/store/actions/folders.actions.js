import { GET_SETTINGS_PREFERENCES } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import axios from 'axios';

export const GET_SETTINGS = '[SETTINGS APP] GET SETTINGS';

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
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	// request.then(response =>

	// );
}
