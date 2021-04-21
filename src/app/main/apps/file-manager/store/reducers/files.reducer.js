import _ from '@lodash';
import * as Actions from '../actions';

const initialState = () => ({
	rootFiles: [],
	allFolderPaths: [],
	allFiles: [],
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

function searchFolder(nameKey, array){
    for (var i=0; i < array.length; i++) {
		if(typeof array[i] === 'object') {
			if (array[i].id === nameKey) {
				return true;
			} else {
				return false;
			}
		}
    }
}

function searchFolderById(nameKey, array){
    for (var i=0; i < array.length; i++) {
		if(typeof array[i] === 'object') {
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
	console.log({ folders, id });
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
	let newArr = []
	arr2.map((files) => {
		var resultObject = 	searchFolder(files.folder, arr1);
		if(resultObject) {
			newArr.push(files)
		}
	})
	return newArr
}

function searchFiles(idKey, array){
    for (var i=0; i < array.length; i++) {
		if(typeof array[i] === 'object') {
			if (array[i].id === idKey) {
				console.log('files?????????????????????idKey', idKey)		
				return array[i];
			} else {
				console.log('files?????????????????????222')
				return false
			}
		}
    }
}

const arr_diff = (a1, a2) => {
	let diff = []
	a1.map((a1files) => {
		var resultObject = searchFiles(a1files.mainId, a2);
		console.log('files?????????????????????resultObject', resultObject)
		diff.push(resultObject)
	})
    return diff;
}

const checkTypeAndReturn = (arr = [], type) => arr.filter(ar => ar.type != type);
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
			console.log('files?????????????????????GET_FOLDERS')
			const cFolderPath = state.folderPath;
			return {
				...state,
				isUploadingFiles: false,
				folders: cFolderPath[cFolderPath.length - 1] ? state.folders : addTypeInArray(action.payload, 'folder'),
				rootFolders: action.payload
			};
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.SET_FOLDER_PATH:
			let newArr = {}
			console.log('files?????????????????????SET_FOLDER_PATH', state.folderPath)
			console.log('files?????????????????????action.currentFiles', action.currentFiles)
			console.log('files?????????????????????action.payload', action.payload)
			state.folderPath.map((folder) => {
				if(typeof folder === 'object' && "id" in folder) {
					let newFold;
					if(action.payload.id !== folder.id) {
						let photo = [];
						let video = [];
						let document = [];

						let newMediaObj = {
							photo: [],
							video: [],
							document: []
						};
						action.currentFiles.map((mediaFiles) => {
							if(mediaFiles.type === 'photo') {
								photo.push(mediaFiles)
								newMediaObj = {
									...newMediaObj,
									photo: photo
								}
							}
							if(mediaFiles.type === 'video') {
								video.push(mediaFiles)
								newMediaObj = {
									...newMediaObj,
									video: video
								}
							}
							if(mediaFiles.type === 'document') {
								document.push(mediaFiles)
								newMediaObj = {
									...newMediaObj,
									document: document
								}
							}
						})
						console.log('files?????????????????????newMediaObj', newMediaObj)
						newFold = {
							...folder,
							media: newMediaObj
						}
					}
					var newArrayFromResults = newArrayFromTwo(state.folderPath, action.currentFiles)
					var resultCheck = 	searchFolderById(folder.id, newArrayFromResults);
					console.log('files?????????????????????newArrayFromResults', newArrayFromResults)
					
					if(resultCheck) {
						let photo = [];
						let video = [];
						let document = [];

						let newMediaObj = {
							photo: [],
							video: [],
							document: []
						};
						newArrayFromResults.map((mediaFiles) => {
							if(mediaFiles.type === 'photo') {
								photo.push(mediaFiles)
								newMediaObj = {
									...newMediaObj,
									photo: photo
								}
							}
							if(mediaFiles.type === 'video') {
								video.push(mediaFiles)
								newMediaObj = {
									...newMediaObj,
									video: video
								}
							}
							if(mediaFiles.type === 'document') {
								document.push(mediaFiles)
								newMediaObj = {
									...newMediaObj,
									document: document
								}
							}
						})
						console.log('files?????????????????????newMediaObj', newMediaObj)
						newFold = {
							...folder,
							media: newMediaObj
						}
					}
					console.log('files?????????????????????newFold', newFold)
					newArr = newFold
				}
			})
			const folderPathResult = ("id" in newArr) ? [[""], newArr, action.payload] : [newArr, action.payload];
			console.log('files?????????????????????folderPathResult', folderPathResult)
			return {
				...state,
				folderPath: folderPathResult,
				folders: addTypeInArray(action.payload.folders, 'folder'),
				photos: action.payload.media.photo,
				files: chnageIds(
					sortByProperty(
						mergeArray([], [
							...addTypeInArray(action.payload.media.photo, 'photo'),
							...addTypeInArray(action.payload.media.video, 'video'),
							...addTypeInArray(action.payload.media.document, 'document')
						]),
						'title'
					)
				)
			};
		case Actions.UPDATE_SPECIFIC_FOLDERS:
			console.log('files?????????????????????folderPath', state.folderPath)
			console.log('files?????????????????????state.files', state.files)
			console.log('files?????????????????????UPDATE_SPECIFIC_FOLDERS', action.payload)

			let currentFolderFiles = action.payload.media.photo.concat(action.payload.media.document, action.payload.media.video)
			console.log('files?????????????????????currentFolderFiles', currentFolderFiles)

			let differenceFiles = arr_diff(state.files, currentFolderFiles)
			console.log('files?????????????????????differenceFiles', differenceFiles)

			let newFolderPath = []
			state.folderPath.map((folder) => {
				if(action.payload.id === folder.id) {
					newFolderPath.push(action.payload)
				} else {
					newFolderPath.push(folder)
				}
			})

			return action.payload.media
				? {
						...state,
						folderPath: newFolderPath,
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
						folders: addTypeInArray(action.payload.folders, 'folder'),
						files: chnageIds(
							sortByProperty(
								mergeArray([], [
									...addTypeInArray(state.photos, 'photo'),
									...addTypeInArray(state.videos, 'video'),
									...addTypeInArray(state.documents, 'document')
								]),
								'title'
							)
						)
				};
		case Actions.UPDATE_FOLDER_PATH:

			console.log('files?????????????????????update.action.payload', action.payload)
			const pathData = action.payload[action.payload.length - 1];
			console.log('files?????????????????????pathData', pathData)
			return {
				...state,
				folderPath: [...action.payload],
				photos: pathData?.media ? pathData.media.photo : [],
				files: pathData?.media
					? chnageIds(
							sortByProperty(
								mergeArray([], [
									...addTypeInArray(pathData.media.photo, 'photo'),
									...addTypeInArray(pathData.media.video, 'video'),
									...addTypeInArray(pathData.media.document, 'document')
								]),
								'title'
							)
					  )
					: chnageIds(
							sortByProperty(
								mergeArray([], [
									...addTypeInArray(state.photos, 'photo'),
									...addTypeInArray(state.videos, 'video'),
									...addTypeInArray(state.documents, 'document')
								]),
								'title'
							)
					  ),
				folders: pathData?.folders
					? addTypeInArray(pathData.folders, 'folder')
					: addTypeInArray(state.rootFolders, 'folder')
			};
		case Actions.POP_FOLDER_PATH:
			const { folderPath } = state;
			console.log('files?????????????????????POP_FOLDER_PATH')
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
