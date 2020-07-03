import axios from 'axios';

const config = {
	baseURL: 'http://ec2-3-9-170-59.eu-west-2.compute.amazonaws.com:8000/'
};
export const METHOD = {
	POST: 'post',
	GET: 'get',
	PUT: 'put',
	DELETE: 'delete',
	PATCH: 'patch'
};

export const apiCall = (endpoint, params = {}, onSuccess, onFailure, method = METHOD.POST, DyanamicConfig = {}) => {
	let request = {};
	switch (method) {
		case METHOD.POST:
			request = axios.post(endpoint, params, { ...config, ...DyanamicConfig });
			break;
		case METHOD.GET:
			request = axios.get(endpoint, { ...config, ...DyanamicConfig });
			break;
		case METHOD.DELETE:
			request = axios.delete(endpoint, { ...config, ...DyanamicConfig });
			break;
		case METHOD.PUT:
			request = axios.put(endpoint, { ...params }, { ...config, ...DyanamicConfig });
			break;
		case METHOD.PATCH:
			request = axios.patch(endpoint, { ...params }, { ...config, ...DyanamicConfig });
			break;
	}
	request
		.then(response => {
			if (response.status == 200 || response.status == 201 || response.data) {
				onSuccess(response.data);
			} else {
				onFailure('Something went wrong');
			}
		})
		.catch(error => {
			if (error && error.response) {
				switch (error.response.status) {
					case 401:
						onFailure(
							error.response.data && typeof error.response.data.detail
								? error.response.data.detail
								: 'Session expired'
						);
						break;

					default:
						onFailure(error && typeof error === 'string' ? error : 'Something went wrong');
						break;
				}
			} else onFailure && onFailure('Something went wrong');
		});
};
