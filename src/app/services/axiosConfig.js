import axios from 'axios';

const instance = axios.create({
	// baseURL: 'https://back.edilcloud.io'
	baseURL: process.env.REACT_APP_BASE_URL
	// baseURL:
	// 	process.env.NODE_ENV !== 'production' 
	// 	? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_BASE_URL
});

export default instance;
