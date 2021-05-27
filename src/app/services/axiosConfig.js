import axios from 'axios';

const instance = axios.create({
	// baseURL: 'https://back-test.edilcloud.io'
	baseURL: process.env.NODE_ENV === 'production'
		? process.env.REACT_APP_BASE_URL_PROD
		: process.env.REACT_APP_BASE_URL
});
export default instance;
