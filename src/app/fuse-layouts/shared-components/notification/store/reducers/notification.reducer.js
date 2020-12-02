import * as Actions from '../actions';

const initialState = {
	state: false,
	data: null
};

const quickPanel = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_NOTOFICATION_PANEL_DATA: {
			return {
				...state,
				data: action.payload
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
