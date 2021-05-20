import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	entities: null,
	searchText: '',
	noteDialogId: null,
	variateDescSize: true,
	openConfirmDeleteDialog: false,
	okConfirmDeleteDialog: false,
	projectConfirmDeleteId: null,
	openConfirmArchiveDialog: false,
	okConfirmArchiveDialog: false,
	projectConfirmArchiveId: null,
	projectConfirmArchiveStatus: null
};

const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_NOTES: {
			return {
				...state,
				entities: _.keyBy(action.payload, 'id')
			};
		}
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.TOGGLE_VARIATE_DESC_SIZE: {
			return {
				...state,
				variateDescSize: !state.variateDescSize
			};
		}
		case Actions.OPEN_NOTE_DIALOG: {
			return {
				...state,
				noteDialogId: action.payload
			};
		}
		case Actions.CLOSE_NOTE_DIALOG: {
			return {
				...state,
				noteDialogId: null
			};
		}
		case Actions.OPEN_CONFIRM_ARCHIVE_DIALOG: {
			return {
				...state,
				openConfirmArchiveDialog: true,
				projectConfirmArchiveId: action.id,
				projectConfirmArchiveStatus: action.status
			};
		}
		case Actions.CLOSE_CONFIRM_ARCHIVE_DIALOG: {
			return {
				...state,
				openConfirmArchiveDialog: false,
				okConfirmArchiveDialog: false,
				projectConfirmArchiveId: null
			};
		}
		case Actions.OK_CONFIRM_ARCHIVE_DIALOG: {
			return {
				...state,
				openConfirmArchiveDialog: false,
				okConfirmArchiveDialog: true
			};
		}
		case Actions.OPEN_CONFIRM_DELETE_DIALOG: {
			return {
				...state,
				openConfirmDeleteDialog: true,
				projectConfirmDeleteId: action.id
			};
		}
		case Actions.CLOSE_CONFIRM_DELETE_DIALOG: {
			return {
				...state,
				openConfirmDeleteDialog: false,
				okConfirmDeleteDialog: false,
				projectConfirmDeleteId: null
			};
		}
		case Actions.OK_CONFIRM_DELETE_DIALOG: {
			return {
				...state,
				openConfirmDeleteDialog: false,
				okConfirmDeleteDialog: true
			};
		}
		case Actions.CREATE_NOTE: {
			return {
				...state,
				entities: _.cloneDeep(_.assign({ [action.note.id]: action.note }, state.entities))
			};
		}
		case Actions.REMOVE_NOTE: {
			return {
				...state,
				entities: _.cloneDeep(_.omit(state.entities, [action.id])),
				noteDialogId: null
			};
		}
		case Actions.UPDATE_NOTE: {
			return {
				...state,
				entities: _.cloneDeep(_.set(state.entities, action.note.id, action.note))
			};
		}
		default: {
			return state;
		}
	}
};

export default notesReducer;
