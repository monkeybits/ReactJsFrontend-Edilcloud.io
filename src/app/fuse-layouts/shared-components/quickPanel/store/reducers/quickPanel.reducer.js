import * as Actions from '../actions';

const initialState = {
	state: false,
	data: null,
	projectAlertId: null,
	isShowAlertPost: false
};

const quickPanel = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_QUICK_PANEL_DATA: {
			return {
				...state,
				data: action.payload
			};
		}
		case Actions.TOGGLE_QUICK_PANEL: {
			return {
				...state,
				state: !state.state
			};
		}
		case Actions.OPEN_ALERT_QUICK_PANEL: {
			return {
				...state,
				projectAlertId: action.id,
				isShowAlertPost: true
			};
		}
		case Actions.CLOSE_ALERT_POST: {
			return {
				...state,
				isShowAlertPost: false
			};
		}
		default: {
			return state;
		}
	}
};

export default quickPanel;
