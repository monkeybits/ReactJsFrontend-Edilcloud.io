import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	PHOTO_LIST_PROJECT,
	VIDEO_LIST_PROJECT,
	FOLDER_LIST_PROJECT,
	DOCUMENT_LIST_PROJECT
} from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';

export const GET_ALL_FILES = '[FILE MANAGER APP(PROJECT)] GET ALL FILES';
export const DELETE_FILE = '[FILE MANAGER APP(PROJECT)] DELETE FILE';
export const GET_PHOTOS = '[FILE MANAGER APP(PROJECT)] GET PHOTOS';
export const GET_VIDEOS = '[FILE MANAGER APP(PROJECT)] GET VIDEOS';
export const GET_DOCUMENTS = '[FILE MANAGER APP(PROJECT)] GET DOCUMENTS';
export const GET_FOLDERS = '[FILE MANAGER APP(PROJECT)] GET FOLDERS';
export const SET_SEARCH_TEXT = '[FILE MANAGER APP(PROJECT)] SET SEARCH TEXT';
export const HANDLE_UPLOAD_LOADING = '[FILE MANAGER APP(PROJECT)] HANDLE UPLOAD LOADING';
export const RESET_FILES = '[FILE MANAGER APP(PROJECT)] RESET FILES';
export const FILE_MOVE_OPEN_DIALOG = '[FILE MANAGER APP(PROJECT)] FILE MOVE OPEN DIALOG';
export const FILE_MOVE_CLOSE_DIALOG = '[FILE MANAGER APP(PROJECT)] FILE MOVE CLOSE DIALOG';

export function openMoveFileDialog(payload) {
	return {
		type: FILE_MOVE_OPEN_DIALOG,
		payload
	};
}
export function closeMoveFileDialog() {
	return {
		type: FILE_MOVE_CLOSE_DIALOG
	};
}
export function getFiles(cid, handleSetLoading = () => '') {
	return (dispatch, getState) => {
		dispatch(getPhotos(cid, handleSetLoading));
		dispatch(getVideos(cid, handleSetLoading));
		dispatch(getDocuments(cid, handleSetLoading));
		dispatch(getFolders(cid, handleSetLoading));
	};
}
export function getPhotos(cid, handleSetLoading = () => '') {
	handleSetLoading({
		loadingPhotos: true
	});
	return (dispatch, getState) => {
		apiCall(
			PHOTO_LIST_PROJECT(cid),
			{},
			photos => {
				handleSetLoading({
					loadingPhotos: false
				});
				dispatch({
					type: GET_PHOTOS,
					payload: photos
				});
			},
			err => {
				handleSetLoading({
					loadingPhotos: false
				});
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function getVideos(cid, handleSetLoading = () => '') {
	handleSetLoading({
		loadingVideos: true
	});
	return (dispatch, getState) => {
		apiCall(
			VIDEO_LIST_PROJECT(cid),
			{},
			videos => {
				handleSetLoading({
					loadingVideos: false
				});
				dispatch({
					type: GET_VIDEOS,
					payload: videos
				});
			},
			err => {
				handleSetLoading({
					loadingVideos: false
				});
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function getDocuments(cid, handleSetLoading = () => '') {
	handleSetLoading({
		loadingDocuments: true
	});
	return (dispatch, getState) => {
		apiCall(
			DOCUMENT_LIST_PROJECT(cid),
			{},
			documents => {
				handleSetLoading({
					loadingDocuments: false
				});
				dispatch({
					type: GET_DOCUMENTS,
					payload: documents
				});
			},
			err => {
				handleSetLoading({
					loadingDocuments: false
				});
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function getFolders(cid, handleSetLoading = () => '') {
	handleSetLoading({
		loadingFolders: true
	});
	return (dispatch, getState) => {
		apiCall(
			FOLDER_LIST_PROJECT(cid),
			{},
			folders => {
				handleSetLoading({
					loadingFolders: false
				});
				dispatch({
					type: GET_FOLDERS,
					payload: folders
				});
			},
			err => {
				handleSetLoading({
					loadingFolders: false
				});
				console.log(err);
			},
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

export function onUploadHandleLoading(isUploadingFiles) {
	return {
		type: HANDLE_UPLOAD_LOADING,
		payload: isUploadingFiles
	};
}
export function setAllFiles(payload) {
	return {
		type: GET_ALL_FILES,
		payload
	};
}
export function deleteFile(id, fileType, deleteId, selectedItem) {
	return (dispatch, getState) => {
		const userInfo = decodeDataFromToken();
		const cid = userInfo.extra?.profile?.company;
		if (fileType == 'folder') {
			dispatch(getFolders(cid));
		}
		// else if (fileType == 'photo') {
		// 	dispatch(getPhotos(cid));
		// } else if (fileType == 'video') {
		// 	dispatch(getVideos(cid));
		// } else if (fileType == 'document') {
		// 	dispatch(getDocuments(cid));
		// }
		dispatch({
			type: DELETE_FILE,
			payload: { id, fileType, deleteId, selectedItem }
		});
	};
}
