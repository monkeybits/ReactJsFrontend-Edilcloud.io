import * as Actions from '../actions';

const initialState = {
	state: false,
	notifications: [],
	readNotifications: []
};

const accessibilityPanel = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_ACCESSIBILITY_PANEL_DATA: {
			return {
				...state,
				notifications: [...state.notifications, ...action.payload]
			};
		}
		case Actions.TOGGLE_ACCESSIBILITY_PANEL: {
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

export default accessibilityPanel;
