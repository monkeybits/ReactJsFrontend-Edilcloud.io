import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	isOpenUpgradePlan: false,
	upgradePlanDetail: {},
	showBillingFormDialog: false
};

const boardReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_BOARD: {
			return {
				...action.payload
			};
		}
		case Actions.RESET_BOARD: {
			return initialState;
		}
		case Actions.ORDER_LIST: {
			return {
				...state,
				lists: action.payload
			};
		}
		case Actions.ORDER_CARD: {
			return {
				...state,
				lists: action.payload
			};
		}
		case Actions.ADD_LIST: {
			return {
				...state,
				lists: action.payload
			};
		}
		case Actions.ADD_CARD: {
			return {
				...action.payload
			};
		}
		case Actions.ADD_LABEL: {
			return {
				...state,
				labels: [...state.labels, action.payload]
			};
		}
		case Actions.UPDATE_CARD: {
			return {
				...state,
				cards: state.cards.map(_card => {
					if (_card.id === action.payload.id) {
						return action.payload;
					}
					return _card;
				})
			};
		}
		case Actions.REMOVE_CARD: {
			return {
				...state,
				cards: _.reject(state.cards, { id: action.cardId }),
				lists: state.lists.map(list => {
					_.set(
						list,
						'idCards',
						_.reject(list.idCards, id => id === action.cardId)
					);
					return list;
				})
			};
		}
		case Actions.RENAME_LIST: {
			return {
				...state,
				lists: state.lists.map(list => {
					if (list.id === action.listId) {
						list.name = action.listTitle;
					}
					return list;
				})
			};
		}
		case Actions.REMOVE_LIST: {
			return {
				...state,
				lists: _.reject(state.lists, { id: action.listId })
			};
		}
		case Actions.CHANGE_BOARD_SETTINGS: {
			return {
				...state,
				settings: action.payload
			};
		}
		case Actions.DELETE_BOARD: {
			return initialState;
		}
		case Actions.RENAME_BOARD: {
			return {
				...state,
				name: action.boardTitle
			};
		}
		case Actions.OPEN_UPGRADE_PLAN_DIALOG: {
			return {
				...state,
				isOpenUpgradePlan: true,
				upgradePlanDetail: action.payload 
			};
		}
		case Actions.CLOSE_UPGRADE_PLAN_DIALOG: {
			return {
				...state,
				isOpenUpgradePlan: false
			};
		}
		case Actions.SHOW_BILLING_FORM_DIALOG: {
			return {
				...state,
				showBillingFormDialog: true
			};
		}
		case Actions.CLOSE_BILLING_FORM_DIALOG: {
			return {
				...state,
				showBillingFormDialog: false
			};
		}
		default:
			return state;
	}
};

export default boardReducer;
