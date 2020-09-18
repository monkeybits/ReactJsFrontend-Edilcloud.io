import * as Actions from '../actions';

const initialState = null;

const chat = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_CHAT: {
			return {
				chats: [...action.chat]
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
				chats: state?.chats ? [...state.chats, action.update.message] : []
			};
		}
		default: {
			return state;
		}
	}
};

export default chat;
