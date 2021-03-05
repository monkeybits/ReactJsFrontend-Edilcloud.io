import * as Actions from '../actions';

const initialState = {
	state: false,
	notifications: [],
	readNotifications: [],
	isDownloadApp: false,
	openMenu: '',
	isTeam: '',
	isProject: '',
	isTask: '',
	isPost: '',
	isDownload: '',
	count: 0
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
		case Actions.OPEN_ACCESSIBILITY_PANEL: {
			return {
				...state,
				state: true
			};
		}
		case Actions.IS_TEAM: {
			return {
				...state,
				isTeam: action.payload,
				count: 1
			};
		}
		case Actions.IS_PROJECT: {
			return {
				...state,
				isProject: action.payload,
				count: 2
			};
		}
		case Actions.IS_TASK: {
			return {
				...state,
				isTask: action.payload,
				count: 3
			};
		}
		case Actions.IS_POST: {
			return {
				...state,
				isPost: action.payload,
				count: 4
			};
		}
		case Actions.IS_DOWNLOAD_APP: {
			return {
				...state,
				isDownload: action.payload,
				count: 5
			};
		}
		case Actions.SET_MENU_OPEN_PANEL: {
			return {
				...state,
				openMenu: action.payload
			};
		}
		case Actions.DOWNLOAD_SMARTPHONE_APP_PANEL: {
			return {
				...state,
				isDownloadApp: true
			};
		}
		default: {
			return state;
		}
	}
};

export default accessibilityPanel;
