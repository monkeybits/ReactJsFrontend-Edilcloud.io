import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { PHOTO_LIST, VIDEO_LIST, FOLDER_LIST, DOCUMENT_LIST } from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';

export const GET_FILES = '[FILE MANAGER APP] GET FILES';
export const GET_PHOTOS = '[FILE MANAGER APP] GET PHOTOS';
export const GET_VIDEOS = '[FILE MANAGER APP] GET VIDEOS';
export const GET_DOCUMENTS = '[FILE MANAGER APP] GET DOCUMENTS';
export const GET_FOLDERS = '[FILE MANAGER APP] GET FOLDERS';

export function getFiles() {
	return (dispatch, getState) => {
		const userInfo = decodeDataFromToken();
		apiCall(
			PHOTO_LIST(userInfo.extra.profile.company),
			{},
			photos => {
				dispatch({
					type: GET_PHOTOS,
					payload: photos
				});
				// console.log({
				// 	PHOTO_LIST: photos
				// });
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
		apiCall(
			VIDEO_LIST(userInfo.extra.profile.company),
			{},
			videos => {
				dispatch({
					type: GET_VIDEOS,
					payload: videos
				});
				// console.log({
				// 	VIDEO_LIST: videos
				// });
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
		apiCall(
			DOCUMENT_LIST(userInfo.extra.profile.company),
			{},
			documents => {
				dispatch({
					type: GET_DOCUMENTS,
					payload: documents
				});
				// console.log({
				// 	DOCUMENT_LIST: documents
				// });
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
		apiCall(
			FOLDER_LIST(userInfo.extra.profile.company),
			{},
			folders => {
				dispatch({
					type: GET_FOLDERS,
					payload: folders
				});
				// console.log({
				// 	FOLDER_LIST: folders
				// });
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
		const request = axios.get('/api/file-manager-app/files');
		request.then(response =>
			dispatch({
				type: GET_FILES,
				payload: response.data
			})
		);
	};
}
