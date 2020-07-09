import FuseUtils from '@fuse/utils/FuseUtils';
import axios from '../axiosConfig';
import jwtDecode from 'jwt-decode';
import { USER_LOGIN, USER_TOKEN_VERIFY, USER_REGISTRATION } from '../apiEndPoints';
import { authUserData } from 'app/auth/store/actions';
import { saveToken } from '../serviceUtils';
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
	init() {
		this.setInterceptors();
		this.handleAuthentication();
	}

	setInterceptors = () => {
		axios.interceptors.response.use(
			response => {
				return response;
			},
			err => {
				return new Promise((resolve, reject) => {
					if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
						// if you ever get an unauthorized response, logout the user
						this.emit('onAutoLogout', 'Invalid access_token');
						this.setSession(null);
					}
					throw err;
				});
			}
		);
	};

	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	createUser = data => {
		return new Promise((resolve, reject) => {
			axios
				.post(USER_REGISTRATION, data)
				.then(response => {
					if (response.data) {
						// this.setSession(response.data.access_token);
						resolve(response.data);
					} else {
						reject(response.data);
					}
				})
				.catch(error => {
					const { username, email } = error.response.data;
					reject({ username, email });
				});
		});
	};

	signInWithEmailAndPassword = (email, password) => {
		return new Promise((resolve, reject) => {
			axios
				.post(USER_LOGIN, {
					username_or_email: email,
					password
				})
				.then(response => {
					const { token } = response.data;
					if (response.data) {
						this.setSession(token);
						resolve(response.data);
					} else {
						reject(response.data);
					}
				})
				.catch(error => {
					reject(error.response.data);
				});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.post(USER_TOKEN_VERIFY, {
					token: this.getAccessToken()
				})
				.then(response => {
					const currentTime = Date.now() / 1000;
					if (response.exp < currentTime) {
						this.logout();
						reject(new Error('Failed to login with token.'));
						console.warn('access token expired');
					} else {
						resolve(response.data);
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			saveToken(access_token)
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new JwtService();

export default instance;
