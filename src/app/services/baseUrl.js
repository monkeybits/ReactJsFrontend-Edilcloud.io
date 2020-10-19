import axios from './axiosConfig';

export const METHOD = {
	POST: 'post',
	GET: 'get',
	PUT: 'put',
	DELETE: 'delete',
	PATCH: 'patch'
};

export const apiCall = (
	endpoint,
	params = {},
	onSuccess,
	onFailure,
	method = METHOD.POST,
	DyanamicConfig = {},
	isNeedFullResponse = false,
	unique_code = undefined
) => {
	let request = {};
	switch (method) {
		case METHOD.POST:
			request = axios.post(endpoint, params, { ...DyanamicConfig });
			break;
		case METHOD.GET:
			request = axios.get(endpoint, { ...DyanamicConfig });
			break;
		case METHOD.DELETE:
			request = axios.delete(endpoint, { ...DyanamicConfig });
			break;
		case METHOD.PUT:
			request = axios.put(endpoint, params, { ...DyanamicConfig });
			break;
		case METHOD.PATCH:
			request = axios.patch(endpoint, params, { ...DyanamicConfig });
			break;
	}
	request
		.then(response => {
			console.log({ myResponse: response });

			if (isNeedFullResponse) {
				onSuccess(response);
			} else if (response.status == 200 || response.status == 201 || response.status == 204 || response.data) {
				onSuccess(response.data);
			} else {
				onFailure('Something went wrong', unique_code);
			}
		})
		.catch(error => {
			console.log({ myError: error });
			if (error && error.response) {
				switch (error.response.status) {
					case 401:
						onFailure(
							error.response.data && typeof error.response.data.detail
								? error.response.data.detail
								: 'Session expired',
							unique_code
						);
						break;

					default:
						onFailure(error.response.data ? error.response.data : 'Something went wrong', unique_code);
						break;
				}
			} else onFailure && onFailure('Something went wrong', unique_code);
		});
};
