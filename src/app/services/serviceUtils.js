export const getHeaderToken = () => {
	let token = localStorage.getItem('jwt_access_token');
	return {
		headers: {
			Authorization: `JWT ${token}`
		}
	};
};
