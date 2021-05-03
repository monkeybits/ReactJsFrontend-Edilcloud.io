import * as Actions from '../actions';

const initialState = {
	can_access_chat: true,
	can_access_files: true
};

const company = (state = initialState, action) => {
	switch (action.type) {
		case Actions.COMPANY_INFO: {
			return {
				...action.company
			};
		}
		case Actions.UPDATE_CONTECT_COUNT: {
			return {
				...state,
				talks: [
					{
						...state.talks[0],
						unread_count: state.talks[0] ? state.talks[0].unread_count + 1 : 1
					}
				],
				last_message_created: new Date()
			};
		}
		case Actions.RESET_CONTECT_COUNT: {
			return {
				...state,
				talks: [
					{
						...state.talks[0],
						unread_count: 0
					}
				],
				last_message_created: new Date()
			};
		}
		default: {
			return state;
		}
	}
};

export default company;
