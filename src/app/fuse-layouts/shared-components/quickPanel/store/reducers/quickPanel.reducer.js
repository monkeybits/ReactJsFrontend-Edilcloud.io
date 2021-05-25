import * as Actions from '../actions';

const initialState = {
	state: false,
	data: null,
	projectAlertId: null,
	taskAlertId: null,
	activityAlertId: null,
	isShowAlertPost: false,
	isShowAlertedPost: false
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
		case Actions.OPEN_ALERTED_POST: {
			return {
				...state,
				taskAlertId: action.id,
				activityAlertId: null,
				isShowAlertedPost: true
			};
		}
		case Actions.OPEN_ALERTED_ACTIVITY: {
			return {
				...state,
				taskAlertId: null,
				activityAlertId: action.id,
				isShowAlertedPost: true
			};
		}
		case Actions.CLOSE_ALERTED_POST: {
			return {
				...state,
				taskAlertId: null,
				isShowAlertedPost: false
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
