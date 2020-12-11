import * as Actions from '../actions';

const initialState = {
	state: false,
	notifications: []
};

const quickPanel = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_NOTOFICATION_PANEL_DATA: {
			return {
				...state,
				notifications: [...state.notifications, ...action.payload]
			};
		}
		case Actions.DELETE_NOTOFICATION_PANEL_DATA_BY_INDEX: {
			return {
				...state,
				notifications: state.notifications.filter((d, i) => i != action.payload)
			};
		}
		case Actions.PUSH_NOTOFICATION_PANEL_DATA: {
			return {
				...state,
				notifications: [action.payload, ...state.notifications]
			};
		}
		case Actions.ADD_NOTOFICATION_PANEL_DATA: {
			return {
				...state,
				notificationData: action.payload,
				viewing: true
			};
		}
		case Actions.ADD_NOTOFICATION_PANEL_COUNT: {
			return {
				...state,
				...action.payload,
				count: action.payload.new
			};
		}
		case Actions.INCREMENT_NOTOFICATION_PANEL_COUNT: {
			return {
				...state,
				...action.payload,
				count: state.count + 1
			};
		}
		case Actions.DECREMENT_NOTOFICATION_PANEL_COUNT: {
			return {
				...state,
				...action.payload,
				count: state.count - 1
			};
		}
		case Actions.REMOVE_FROM_VIEW_NOTOFICATION_PANEL_DATA: {
			return {
				...state,
				viewing: false
			};
		}
		case Actions.TOGGLE_NOTOFICATION_PANEL: {
			return {
				...state,
				state: !state.state
			};
		}
		default: {
			return state;
		}
	}
};

export default quickPanel;
