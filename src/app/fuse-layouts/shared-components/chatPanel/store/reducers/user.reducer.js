import _ from '@lodash';
import * as Actions from '../actions';

const userReducer = (state = {}, action) => {
	switch (action.type) {
		case Actions.GET_USER_DATA: {
			return { ...action.payload };
		}
		case Actions.CHAT_IS_LOADING: {
			return { ...state, loadingChat: action.payload, showUser: true };
		}
		case Actions.ADD_USER_DATA: {
			return {
				...state,
				...action.chatUserData
			};
		}
		case Actions.SEND_MESSAGE: {
			return getUpdatedUser(state, action);
		}
		case Actions.REMOVE_CHAT: {
			return {
				showUser: false
			};
		}
		default:
			return state;
	}
};

function getUpdatedUser(state, action) {
	const newUserData = _.merge({}, state);
	const userChatData = newUserData.chatList.find(_chat => _chat.contactId === action.userChatData.contactId);
	if (userChatData) {
		newUserData.chatList = newUserData.chatList.map(_chat =>
			_chat.contactId === action.userChatData.contactId ? action.userChatData : _chat
		);
	} else {
		newUserData.chatList = [action.userChatData, ...newUserData.chatList];
	}
	return newUserData;
}

export default userReducer;
