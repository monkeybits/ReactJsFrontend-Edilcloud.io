export const SET_SELECTED_ITEM_ID = '[FILE MANAGER APP] SET SELECTED ITEM';
export const SET_FOLDER_PATH = '[FILE MANAGER APP] SET FOLDER PATH';
export const POP_FOLDER_PATH = '[FILE MANAGER APP] POP FOLDER PATH';
export const UPDATE_FOLDER_PATH = '[FILE MANAGER APP] UPDATE FOLDER PATH';

export function setSelectedItem(id) {
	return {
		type: SET_SELECTED_ITEM_ID,
		payload: id
	};
}
export function updateFolderPath(payload) {
	return {
		type: UPDATE_FOLDER_PATH,
		payload
	};
}
export function setFolderPath(path) {
	return {
		type: SET_FOLDER_PATH,
		payload: path
	};
}
export function popFolderPath(path) {
	return {
		type: POP_FOLDER_PATH,
		payload: path
	};
}
