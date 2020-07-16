import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { PHOTO_LIST, VIDEO_LIST, FOLDER_LIST, DOCUMENT_LIST } from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';

export const GET_FILES = '[FILE MANAGER APP] GET FILES';
export const GET_PHOTOS = '[FILE MANAGER APP] GET PHOTOS';
export const GET_VIDEOS = '[FILE MANAGER APP] GET VIDEOS';
export const GET_DOCUMENTS = '[FILE MANAGER APP] GET DOCUMENTS';
export const GET_FOLDERS = '[FILE MANAGER APP] GET FOLDERS';
export const SET_SEARCH_TEXT = '[FILE MANAGER APP] SET SEARCH TEXT';

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
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
}

export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT,
		searchText: event.target.value
	};
}