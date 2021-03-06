import axios from 'axios';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	PHOTO_LIST,
	VIDEO_LIST,
	FOLDER_LIST,
	DOCUMENT_LIST,
	FOLDER_STRUCTURE_LIST,
	GET_FOLDERS_DETAIL
} from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';

export const GET_ALL_FILES = '[FILE MANAGER APP] GET ALL FILES';
export const DELETE_FILE = '[FILE MANAGER APP] DELETE FILE';
export const GET_PHOTOS = '[FILE MANAGER APP] GET PHOTOS';
export const GET_VIDEOS = '[FILE MANAGER APP] GET VIDEOS';
export const GET_DOCUMENTS = '[FILE MANAGER APP] GET DOCUMENTS';
export const GET_FOLDERS = '[FILE MANAGER APP] GET FOLDERS';
export const GET_FOLDERS_PATHS = '[FILE MANAGER APP] GET FOLDERS PATHS';
export const UPDATE_SPECIFIC_FOLDERS = '[FILE MANAGER APP] UPDATE SPECIFIC FOLDER';
export const SET_SEARCH_TEXT = '[FILE MANAGER APP] SET SEARCH TEXT';
export const HANDLE_UPLOAD_LOADING = '[FILE MANAGER APP] HANDLE UPLOAD LOADING';
export const RESET_FILES = '[FILE MANAGER APP] RESET FILES';
export const FILE_MOVE_OPEN_DIALOG = '[FILE MANAGER APP] FILE MOVE OPEN DIALOG';
export const FILE_MOVE_CLOSE_DIALOG = '[FILE MANAGER APP] FILE MOVE CLOSE DIALOG';
export const FILE_RENAME_OPEN_DIALOG = '[FILE MANAGER APP] FILE RENAME OPEN DIALOG';
export const FILE_RENAME_CLOSE_DIALOG = '[FILE MANAGER APP] FILE RENAME CLOSE DIALOG';
export const SET_FOLDER_PATH = '[FILE MANAGER APP] SET FOLDER PATH';

export function openRenameFileDialog(payload) {
	return {
		type: FILE_RENAME_OPEN_DIALOG,
		payload
	};
}
export function closeRenameFileDialog() {
	return {
		type: FILE_RENAME_CLOSE_DIALOG
	};
}
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
		dispatch(foldersPaths(cid, handleSetLoading));
	};
}
export function getPhotos(cid, handleSetLoading = () => '', photos) {
	handleSetLoading({
		loadingPhotos: true
	});
	return (dispatch, getState) => {
		apiCall(
			PHOTO_LIST(cid),
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
			VIDEO_LIST(cid),
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
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function getDocuments(cid, handleSetLoading = () => '') {
	return (dispatch, getState) => {
		handleSetLoading({
			loadingDocuments: true
		});
		apiCall(
			DOCUMENT_LIST(cid),
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
			FOLDER_LIST(cid),
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
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
}
export function setFolderPath(path, currentFiles) {
	return {
		type: SET_FOLDER_PATH,
		payload: path,
		currentFiles
	};
}
export function folderDetail(cid, updatedFolderValues = {}, handleSetLoading = () => '') {
	handleSetLoading({
		loadingFolders: true
	});
	return (dispatch, getState) => {
		const { folderPath } = getState().fileManagerApp.files;
		const pathdata = folderPath[folderPath.length - 1];
		if (pathdata) {
			apiCall(
				GET_FOLDERS_DETAIL(pathdata.mainId || pathdata.id),
				{},
				folders => {
					handleSetLoading({
						loadingFolders: false
					});
					dispatch({
						type: UPDATE_SPECIFIC_FOLDERS,
						payload: folders,
						updatedFolderValues
					});
				},
				err => {
					handleSetLoading({
						loadingFolders: false
					});
				},
				METHOD.GET,
				getHeaderToken()
			);
		}
	};
}
export function foldersPaths(cid, handleSetLoading = () => '') {
	handleSetLoading({
		loadingFolders: true
	});
	return (dispatch, getState) => {
		apiCall(
			FOLDER_STRUCTURE_LIST(cid),
			{},
			folders => {
				handleSetLoading({
					loadingFolders: false
				});
				dispatch({
					type: GET_FOLDERS_PATHS,
					payload: folders
				});
			},
			err => {
				handleSetLoading({
					loadingFolders: false
				});
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
		// dispatch({
		// 	type: DELETE_FILE,
		// 	payload: { id, fileType, deleteId, selectedItem }
		// });
	};
}
