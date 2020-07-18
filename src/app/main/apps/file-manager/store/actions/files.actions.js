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
export const RESET_FILES = '[FILE MANAGER APP] RESET FILES';

export function getFiles(cid) {
	return (dispatch, getState) => {
		dispatch(getPhotos(cid));
		dispatch(getVideos(cid));
		dispatch(getDocuments(cid));
		dispatch(getFolders(cid));
	};
}
export function getPhotos(cid) {
	return (dispatch, getState) => {
		apiCall(
			PHOTO_LIST(cid),
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
	};
}
export function getVideos(cid) {
	return (dispatch, getState) => {
		apiCall(
			VIDEO_LIST(cid),
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
	};
}
export function getDocuments(cid) {
	return (dispatch, getState) => {
		apiCall(
			DOCUMENT_LIST(cid),
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
	};
}
export function getFolders(cid) {
	return (dispatch, getState) => {
		apiCall(
			FOLDER_LIST(cid),
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
