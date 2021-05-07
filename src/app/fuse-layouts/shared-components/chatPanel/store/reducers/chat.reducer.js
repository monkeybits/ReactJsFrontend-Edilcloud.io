import * as Actions from '../actions';

const initialState = {
	isUploadingFiles: false
};
const getAllFilesOfChat = chats => {
	if (Array.isArray(chats) && chats.length) {
		return chats.reduce(
			(prev, current) => {
				return { files: [...prev.files, ...current.files].map((d, index) => ({ ...d, index })) };
			},
			{
				files: []
			}
		);
	}
	return {
		files: []
	};
};
const chat = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_CHAT: {
			return {
				chats: [...action.chat],
				media: getAllFilesOfChat(action.chat)
			};
		}
		case Actions.HANDLE_UPLOAD_LOADING: {
			return {
				...state,
				isUploadingFiles: action.payload
			};
		}
		case Actions.REMOVE_CHAT: {
			return null;
		}
		case Actions.SEND_MESSAGE: {
			return {
				...state,
				dialog: [...state.dialog, action.message]
			};
		}
		case Actions.UPDATE_CHAT_LOG: {
			return {
				...state,
				chats: state?.chats ? [...state.chats, action.update.message] : [],
				media: getAllFilesOfChat(state?.chats ? [...state.chats, action.update.message] : [])
			};
		}
		default: {
			return state;
		}
	}
};

export default chat;
