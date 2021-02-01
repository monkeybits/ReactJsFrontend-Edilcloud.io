import axios from 'axios';
const instance = axios.create({
	baseURL:
		process.env.NODE_ENV !== 'production' ? process.env.REACT_APP_BASE_URL_LOCAL : process.env.REACT_APP_BASE_URL
});
export default instance;
