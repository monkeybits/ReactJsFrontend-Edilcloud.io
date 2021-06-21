import _ from '@lodash';
import * as Actions from '../actions';

const initialState = () => ({
	rootFiles: [],
	allFolderPaths: [],
	allFiles: [],
	differenceFiles: [],
	updatedFolderValues: {},
	photos: [],
	videos: [],
	documents: [],
	files: [],
	searchText: '',
	folderPath: [''],
	isUploadingFiles: false,
	moveFileDialog: {
		type: 'moveFile',
		props: {
			open: false
		},
		data: {}
	}
});

function formatBytes(a, b = 2) {
	if (a === 0) return '0 Bytes';
	const c = b < 0 ? 0 : b;
	const d = Math.floor(Math.log(a) / Math.log(1024));
	return `${parseFloat((a / Math.pow(1024, d)).toFixed(c))} ${
		['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
	}`;
}

const addTypeInArray = (arr = [], type) => arr.map((d, i) => ({ ...d, mainId: d.id, type, size: formatBytes(d.size) }));
const mergeArray = (oldArr = [], newArr = []) =>
	[...newArr, ...oldArr].reduce((arr, current) => {
		const x = arr.find(item => item.mainId === current.mainId && item.type === current.type);
		if (!x) {
			return arr.concat([current]);
		}
		return arr;
	}, []);
function sortByProperty(array, property, order = 'ASC') {
	return array.sort((a, b) =>
		order === 'ASC'
			? a[property] > b[property]
				? 1
				: a[property] < b[property]
				? -1
				: 0
			: a[property] > b[property]
			? -1
			: a[property] < b[property]
			? 1
			: 0
	);
}

function searchFolder(nameKey, array) {
	for (let i = 0; i < array.length; i++) {
		if (typeof array[i] === 'object') {
			if (array[i].id === nameKey) {
				return true;
			}
			return false;
		}
	}
}

function searchFolderById(nameKey, array) {
	for (let i = 0; i < array.length; i++) {
		if (typeof array[i] === 'object') {
			if (array[i].folder === nameKey) {
				return true;
			}
		}
	}
}

const chnageIds = (arr = []) => arr.map((d, i) => ({ ...d, id: i }));
const deleteFileOrFolder = (fileType, state, indexId, deleteId, selectedItem) => {
	if (fileType == 'folder') {
		return {
			...state,
			allFiles: chnageIds(
				sortByProperty(
					state.allFiles.filter(f => f.id != indexId),
					'title'
				)
			),
			folders: state.folders.filter(f => f.path != deleteId),
			files: state.files.filter(f => !f.folder_relative_path.includes(deleteId)),
			photos: {
				...state.photos,
				results: state.photos.results.filter(f => !f.folder_relative_path.includes(deleteId))
			},
			videos: {
				...state.videos,
				results: state.videos.results.filter(f => !f.folder_relative_path.includes(deleteId))
			},
			documents: {
				...state.documents,
				results: state.documents.results.filter(f => !f.folder_relative_path.includes(deleteId))
			}
		};
	}
	if (fileType == 'photo') {
		return {
			...state,
			allFiles: chnageIds(
				sortByProperty(
					state.allFiles.filter(f => f.id != indexId),
					'title'
				)
			),
			photos: { ...state.photos, results: state.photos.results.filter(f => f.id != deleteId) },
			files: state.files.filter(f => f.mainId != deleteId)
		};
	}
	if (fileType == 'video') {
		return {
			...state,
			allFiles: chnageIds(
				sortByProperty(
					state.allFiles.filter(f => f.id != indexId),
					'title'
				)
			),
			videos: { ...state.videos, results: state.videos.results.filter(f => f.id != deleteId) },
			files: state.files.filter(f => f.mainId != deleteId)
		};
	}
	return {
		...state,
		allFiles: chnageIds(
			sortByProperty(
				state.allFiles.filter(f => f.id != indexId),
				'title'
			)
		),
		documents: { ...state.documents, results: state.documents.results.filter(f => f.id != deleteId) },
		files: state.files.filter(f => f.mainId != deleteId)
	};
};
const getnestedFilesById = (folders, id) => {
	if (Array.isArray(folders)) {
		if (folders.find(x => x.id === id)) {
			return folders;
		}
		for (let i = 0; i < folders.length; i++) {
			getnestedFilesById(folders[i].folders, id);
		}
	}
};

const newArrayFromTwo = (arr1, arr2) => {
	const newArr = [];
	arr2.map(files => {
		const resultObject = searchFolder(files.folder, arr1);
		if (resultObject) {
			newArr.push(files);
		}
	});
	return newArr;
};

function searchFiles(idKey, array) {
	for (let i = 0; i < array.length; i++) {
		if (typeof array[i] === 'object') {
			if (array[i].id === idKey) {
				return array[i];
			}
			return false;
		}
	}
}

const arr_diff = (a1, a2) => {
	const res = a1.filter(item1 => !a2.some(item2 => item2.id === item1.mainId));
	return res;
};

const checkTypeAndReturn = (arr = [], type) => arr.filter(ar => ar.type != type);

const updateFolderPath = (folderPath, payload) => {
	let newFolderPath = []
	folderPath.map((folder) => {
		let index = payload.findIndex(p => p.id === folder.id);
		if(index > -1) {
			let id = payload[index].id
			if(folder.id === id) {
				newFolderPath.push(payload[index])
			}
		} else {
			newFolderPath.push(folder)
		}
	});
	return newFolderPath;
}

const filesReducer = (state = initialState(), action) => {
	switch (action.type) {
		case Actions.GET_ALL_FILES:
			return {
				...state,
				allFiles: chnageIds(action.payload)
			};
		case Actions.GET_PHOTOS:
			return {
				...state,
				isUploadingFiles: false,
				photos: action.payload,
				rootFiles: chnageIds(
					sortByProperty(
						mergeArray(
							checkTypeAndReturn(state.rootFiles, 'photo'),
							addTypeInArray(action.payload, 'photo')
						),
						'title'
					)
				)
			};
		case Actions.GET_VIDEOS:
			return {
				...state,
				isUploadingFiles: false,
				videos: action.payload,
				rootFiles: chnageIds(
					sortByProperty(
						mergeArray(
							checkTypeAndReturn(state.rootFiles, 'video'),
							addTypeInArray(action.payload, 'video')
						),
						'title'
					)
				)
			};
		case Actions.GET_DOCUMENTS:
			return {
				...state,
				isUploadingFiles: false,
				documents: action.payload,
				rootFiles: chnageIds(
					sortByProperty(
						mergeArray(
							checkTypeAndReturn(state.rootFiles, 'document'),
							addTypeInArray(action.payload, 'document')
						),
						'title'
					)
				)
			};
		case Actions.GET_FOLDERS_PATHS:
			return {
				...state,
				isUploadingFiles: false,
				allFolderPaths: action.payload
			};
		case Actions.GET_FOLDERS:
			const cFolderPath = state.folderPath;
			return {
				...state,
				isUploadingFiles: false,
				folders: cFolderPath[cFolderPath.length - 1] ? cFolderPath.length === 1 ? action.payload : state.folders : addTypeInArray(action.payload, 'folder'),
				rootFolders: action.payload,
				folderPath: updateFolderPath(cFolderPath, action.payload)
			};
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.SET_FOLDER_PATH:
			let newArr = [];
			state.folderPath.map(folder => {
				if (typeof folder === 'object' && 'id' in folder) {
					let newFold;
					if (action.payload.id !== folder.id) {
						const newArrayFromResults = newArrayFromTwo(state.folderPath, action.currentFiles);
						const resultCheck = searchFolderById(folder.id, newArrayFromResults);
						if (resultCheck) {
							const photo = [];
							const video = [];
							const document = [];

							let newMediaObj = {
								photo: [],
								video: [],
								document: []
							};
							newArrayFromResults.map(mediaFiles => {
								if (mediaFiles.type === 'photo') {
									photo.push(mediaFiles);
									newMediaObj = {
										...newMediaObj,
										photo
									};
								}
								if (mediaFiles.type === 'video') {
									video.push(mediaFiles);
									newMediaObj = {
										...newMediaObj,
										video
									};
								}
								if (mediaFiles.type === 'document') {
									document.push(mediaFiles);
									newMediaObj = {
										...newMediaObj,
										document
									};
								}
							});
							newFold = {
								...folder,
								media: newMediaObj
							};
							newArr = [...newArr, newFold];
						} else {
							newArr = [...newArr, folder];
						}
					} else {
						newArr = [...newArr, folder];
					}
				}
			});
			const folderPathResult = [[''], ...newArr, action.payload];
			return {
				...state,
				folderPath: folderPathResult,
				folders: addTypeInArray(action.payload.folders, 'folder'),
				photos: action.payload.media.photo,
				files: chnageIds(
					sortByProperty(
						mergeArray(
							[],
							[
								...addTypeInArray(action.payload.media.photo, 'photo'),
								...addTypeInArray(action.payload.media.video, 'video'),
								...addTypeInArray(action.payload.media.document, 'document')
							]
						),
						'title'
					)
				)
			};
		case Actions.UPDATE_SPECIFIC_FOLDERS:
			const currentFolderFiles = action.payload.media.photo.concat(
				action.payload.media.document,
				action.payload.media.video
			);

			const differenceFiles = arr_diff(state.files, currentFolderFiles);
			let newFolderPath = [];
			state.folderPath.map(folder => {
				if (typeof folder === 'object' && 'id' in folder) {
					if (action.payload.id === folder.id) {
						newFolderPath = [...newFolderPath, action.payload];
					} else {
						const resultObject = searchFolder(action.payload.id, folder.folders);
						let newFolderObj = {};
						if (resultObject) {
							let newFolders = [];
							folder.folders.map(folderItem => {
								if (folderItem.id === action.payload.id) {
									newFolders = [...newFolders, action.payload];
								} else {
									newFolders = [...newFolders, folderItem];
								}
							});
							newFolderObj = {
								...folder,
								folders: newFolders
							};
						} else {
							newFolderObj = {
								...folder
							};
						}

						newFolderPath = [...newFolderPath, newFolderObj];
					}
				} else {
					newFolderPath = [...newFolderPath, folder];
				}
			});
			return action.payload.media
				? {
						...state,
						folderPath: newFolderPath,
						differenceFiles,
						updatedFolderValues: action.updatedFolderValues,
						folders: addTypeInArray(action.payload.folders, 'folder'),
						files: chnageIds(
							sortByProperty(
								mergeArray(
									[],
									[
										...addTypeInArray(action.payload.media.photo, 'photo'),
										...addTypeInArray(action.payload.media.video, 'video'),
										...addTypeInArray(action.payload.media.document, 'document')
									]
								),
								'title'
							)
						)
				  }
				: {
						...state,
						folderPath: newFolderPath,
						differenceFiles,
						updatedFolderValues: action.updatedFolderValues,
						folders: addTypeInArray(action.payload.folders, 'folder'),
						files: chnageIds(
							sortByProperty(
								mergeArray(
									[],
									[
										...addTypeInArray(state.photos, 'photo'),
										...addTypeInArray(state.videos, 'video'),
										...addTypeInArray(state.documents, 'document')
									]
								),
								'title'
							)
						)
				  };
		case Actions.UPDATE_FOLDER_PATH:
			let newActionPayload = [];
			action.payload.map(folder => {
				if (typeof folder === 'object' && 'id' in folder) {
					let newFold;
					if (folder.id === state.updatedFolderValues.folder) {
						let newMediaObj = folder.media;
						state.differenceFiles.map(mediaFiles => {
							const newMediaFile = Object.assign(mediaFiles, { folder: folder.id });
							if (mediaFiles.type === 'photo') {
								newMediaObj = {
									...newMediaObj,
									photo: [...newMediaObj.photo, newMediaFile]
								};
							}
							if (mediaFiles.type === 'video') {
								newMediaObj = {
									...newMediaObj,
									video: [...newMediaObj.video, newMediaFile]
								};
							}
							if (mediaFiles.type === 'document') {
								newMediaObj = {
									...newMediaObj,
									document: [...newMediaObj.document, newMediaFile]
								};
							}
						});
						newFold = {
							...folder,
							// media: newMediaObj
						};
						newActionPayload = [...newActionPayload, newFold];
					} else {
						newActionPayload = [...newActionPayload, folder];
					}
				} else {
					newActionPayload = [...newActionPayload, folder];
				}
			});

			let updateNewActionPayload;
			let pathData;
			if (state.differenceFiles.length > 0) {
				pathData = newActionPayload[newActionPayload.length - 1];
				updateNewActionPayload = newActionPayload;
			} else {
				pathData = action.payload[action.payload.length - 1];
				updateNewActionPayload = action.payload;
			}

			return {
				...state,
				folderPath: [...updateNewActionPayload],
				photos: pathData?.media ? pathData.media.photo : [],
				files: pathData?.media
					? chnageIds(
							sortByProperty(
								mergeArray(
									[],
									[
										...addTypeInArray(pathData.media.photo, 'photo'),
										...addTypeInArray(pathData.media.video, 'video'),
										...addTypeInArray(pathData.media.document, 'document')
									]
								),
								'title'
							)
					  )
					: chnageIds(
							sortByProperty(
								mergeArray(
									[],
									[
										...addTypeInArray(state.photos, 'photo'),
										...addTypeInArray(state.videos, 'video'),
										...addTypeInArray(state.documents, 'document')
									]
								),
								'title'
							)
					  ),
				folders: pathData?.folders
					? addTypeInArray(pathData.folders, 'folder')
					: addTypeInArray(state.rootFolders, 'folder')
			};
		case Actions.POP_FOLDER_PATH:
			const { folderPath } = state;
			folderPath.pop();
			const pathDataAfterPop = folderPath[folderPath.length - 1];
			return {
				...state,
				folderPath,
				photos: pathDataAfterPop?.media ? pathDataAfterPop.media.photo : [], // pathDataAfterPop.media.photo,
				files: pathDataAfterPop?.media
					? chnageIds(
							sortByProperty(
								mergeArray(state.files, [
									...addTypeInArray(pathDataAfterPop.media.photo, 'photo'),
									...addTypeInArray(pathDataAfterPop.media.video, 'video'),
									...addTypeInArray(pathDataAfterPop.media.document, 'document')
								]),
								'title'
							)
					  )
					: chnageIds(
							sortByProperty(
								mergeArray(state.files, [
									...addTypeInArray(state.photos, 'photo'),
									...addTypeInArray(state.videos, 'video'),
									...addTypeInArray(state.documents, 'document')
								]),
								'title'
							)
					  ), // pathDataAfterPop.media.photo,
				folders: pathDataAfterPop?.folders
					? addTypeInArray(pathDataAfterPop.folders, 'folder')
					: addTypeInArray(state.rootFolders, 'folder')
			};
		case Actions.HANDLE_UPLOAD_LOADING:
			return {
				...state,
				isUploadingFiles: action.payload
			};
		case Actions.DELETE_FILE:
			return deleteFileOrFolder(
				action.payload.fileType,
				state,
				action.payload.id,
				action.payload.deleteId,
				action.payload.selectedItem
			);
		case Actions.RESET_FILES: {
			return initialState();
		}
		case Actions.FILE_MOVE_OPEN_DIALOG: {
			return {
				...state,
				moveFileDialog: {
					type: 'moveFile',
					props: {
						open: true
					},
					data: action.payload
				}
			};
		}
		case Actions.FILE_MOVE_CLOSE_DIALOG: {
			return {
				...state,
				moveFileDialog: {
					type: 'moveFile',
					props: {
						open: false
					},
					data: {}
				}
			};
		}
		case Actions.FILE_RENAME_OPEN_DIALOG: {
			return {
				...state,
				moveFileDialog: {
					type: 'rename',
					props: {
						open: true
					},
					data: action.payload
				}
			};
		}
		case Actions.FILE_RENAME_CLOSE_DIALOG: {
			return {
				...state,
				moveFileDialog: {
					type: 'rename',
					props: {
						open: false
					},
					data: {}
				}
			};
		}
		default:
			return state;
	}
};

export default filesReducer;
