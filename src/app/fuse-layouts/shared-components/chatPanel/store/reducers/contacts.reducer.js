import * as Actions from '../actions';

const initialState = {
	entities: [],
	selectedContactId: null
};
const getUpdatedEntities = (entities, msg) => {
	return entities.map(entity => {
		if (entity.id == msg.message.talk.object_id) {
			return {
				...entity,
				talks: [
					{
						...entity.talks[0],
						unread_count: entity.talks[0].unread_count + 1
					}
				]
			};
		} else {
			return entity;
		}
	});
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
