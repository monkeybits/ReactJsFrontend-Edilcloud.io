import jwtDecode from 'jwt-decode';

export const getHeaderToken = () => {
	let token = localStorage.getItem('jwt_access_token');
	return {
		headers: {
			Authorization: `JWT ${token}`
		}
	};
};

export const getTokenOnly = () => localStorage.getItem('jwt_access_token');

export const saveToken = access_token => localStorage.setItem('jwt_access_token', access_token);

export const decodeDataFromToken = () => jwtDecode(getTokenOnly());
