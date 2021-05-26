import { decodeDataFromToken } from 'app/services/serviceUtils';
import * as Actions from '../actions';

const initialState = {
	entities: [],
	selectedContactId: null
};
const getUpdatedEntities = (entities, msg) => {
	const userInfo = decodeDataFromToken();
	const getUserId = () => userInfo?.extra?.profile.id;
	return entities.map(entity => {
		if (entity.id == msg.message.talk.object_id && getUserId() != msg.message.sender.id) {
			return {
				...entity,
				talks: [
					{
						...entity.talks[0],
						unread_count: entity.talks[0].unread_count + 1
					}
				],
				last_message_created: new Date()
			};
		}
		return entity;
	});
};
const resetTheMessageCount = (entities, id) => {
	return entities.map(entity => {
		if (entity.id == id) {
			return {
				...entity,
				talks: [
					{
						...entity.talks[0],
						unread_count: 0
					}
				]
			};
		}
		return entity;
	});
};
const sortByDate = arr => {
	if (Array.isArray(arr)) {
		arr.sort(function (a, b) {
			// Turn your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			return new Date(b.last_message_created) - new Date(a.last_message_created);
		});
	}
};
const contactsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_CONTACTS: {
			return {
				...state,
				entities: [...action.payload]
			};
		}
		case Actions.UPDATE_CONTECT_COUNT: {
			return {
				...state,
				entities: getUpdatedEntities(state.entities, action.payload)
			};
		}
		case Actions.RESET_CONTECT_COUNT: {
			return {
				...state,
				entities: resetTheMessageCount(state.entities, action.payload)
			};
		}
		case Actions.SET_SELECTED_CONTACT_ID: {
			return {
				...state,
				selectedContactId: action.payload
			};
		}
		case Actions.REMOVE_SELECTED_CONTACT_ID: {
			return {
				...state,
				selectedContactId: null
			};
		}
		case Actions.REMOVE_SELECTED_CONTACTS: {
			return {
				...state,
				selectedContactId: null,
				entities: []
			};
		}
		default: {
			return state;
		}
	}
};

export default contactsReducer;
