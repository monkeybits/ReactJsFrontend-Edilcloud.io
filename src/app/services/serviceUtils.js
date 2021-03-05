import jwtDecode from 'jwt-decode';
import imageCompression from 'browser-image-compression';

export const getCompressFile = async fileToCompress => {
	if (fileToCompress) {
		const compressedFile = await imageCompression(fileToCompress, {
			maxSizeMB: 1,
			maxWidthOrHeight: 1024,
			useWebWorker: true
		});
		return new File([compressedFile], compressedFile.name);
	}
	return undefined;
};

export const getHeaderToken = () => {
	const token = localStorage.getItem('jwt_access_token');
	return {
		headers: {
			Authorization: `JWT ${token}`
		}
	};
};
export const getChatToken = key => {
	const token = localStorage.getItem(key);
	return {
		headers: {
			Authorization: `JWT ${token}`
		}
	};
};
export const getTokenOnly = () => localStorage.getItem('jwt_access_token');

export const saveToken = access_token => localStorage.setItem('jwt_access_token', access_token);
export const saveMainProfileId = main_profile => localStorage.setItem('main_profile', main_profile);
export const getMainProfileId = () => localStorage.getItem('main_profile');

export const decodeDataFromToken = () => {
	try {
		if (getTokenOnly()) {
			return jwtDecode(getTokenOnly());
		}
	} catch (e) {
		console.log(e);
		return null;
	}
};
