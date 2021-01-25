import _ from '@lodash';
import * as Actions from '../actions';

const initialState = () => ({
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
	if (0 === a) return '0 Bytes';
	const c = 0 > b ? 0 : b,
		d = Math.floor(Math.log(a) / Math.log(1024));
	return (
		parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
		' ' +
		['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
	);
}

const addTypeInArray = (arr = [], type) =>
	arr.map((d, i) => ({ ...d, mainId: d.id, id: i, type, size: formatBytes(d.size) }));
const mergeArray = (oldArr = [], newArr = []) =>
	[...newArr, ...oldArr].reduce((arr, current) => {
		const x = arr.find(item => item.mainId === current.mainId && item.type === current.type);
		if (!x) {
			return arr.concat([current]);
		} else {
			return arr;
		}
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
	} else if (fileType == 'photo') {
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
	} else if (fileType == 'video') {
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
	} else {
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
	}
};
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
				files: chnageIds(
					sortByProperty(mergeArray(state.files, addTypeInArray(action.payload.results, 'photo')), 'title')
				)
			};
		case Actions.GET_VIDEOS:
			return {
				...state,
				isUploadingFiles: false,
				videos: action.payload,
				files: chnageIds(
					sortByProperty(mergeArray(state.files, addTypeInArray(action.payload.results, 'video')), 'title')
				)
			};
		case Actions.GET_DOCUMENTS:
			return {
				...state,
				isUploadingFiles: false,
				documents: action.payload,
				files: chnageIds(
					sortByProperty(mergeArray(state.files, addTypeInArray(action.payload.results, 'document')), 'title')
				)
			};
		case Actions.GET_FOLDERS:
			return {
				...state,
				isUploadingFiles: false,
				folders: action.payload.sort((_a, _b) => {
					let a = _a.path.replace('/', '');
					let b = _b.path.replace('/', '');
					return a > b ? 1 : a < b ? -1 : 0;
				})
			};
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.SET_FOLDER_PATH:
			return {
				...state,
				folderPath: [...state.folderPath, action.payload]
			};
		case Actions.UPDATE_FOLDER_PATH:
			return {
				...state,
				folderPath: [...action.payload]
			};
		case Actions.POP_FOLDER_PATH:
			let folderPath = state.folderPath;
			folderPath.pop();
			return {
				...state,
				folderPath
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
