export const SET_SELECTED_ITEM_ID = '[FILE MANAGER APP(PROJECT)] SET SELECTED ITEM';
export const SET_FOLDER_PATH = '[FILE MANAGER APP(PROJECT)] SET FOLDER PATH';
export const POP_FOLDER_PATH = '[FILE MANAGER APP(PROJECT)] POP FOLDER PATH';

export function setSelectedItem(id) {
	return {
		type: SET_SELECTED_ITEM_ID,
		payload: id
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