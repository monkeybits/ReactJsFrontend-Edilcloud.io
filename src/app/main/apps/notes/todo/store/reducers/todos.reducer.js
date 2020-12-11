import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	entities: [],
	searchText: '',
	orderBy: '',
	orderDescending: false,
	routeParams: {},
	todoDialog: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	},
	taskContentDialog: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	}
};

const todosReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_TODOS: {
			console.log({ payload: action.payload, isGantt: action.isGantt });

			return {
				...state,
				[action.isGantt ? 'entities' : 'todoEntities']: { ...action.payload },
				searchText: '',
				routeParams: action.routeParams
			};
		}
		case Actions.UPDATE_TODOS: {
			return {
				...state,
				[action.isGantt ? 'entities' : 'todoEntities']: action.payload
			};
		}
		case Actions.OPEN_NEW_TODO_DIALOG: {
			return {
				...state,
				todoDialog: {
					type: 'new',
					props: {
						open: true
					},
					data: action.data ? action.data : null
				}
			};
		}
		case Actions.OPEN_TASK_CONTENT_DIALOG: {
			return {
				...state,
				taskContentDialog: {
					type: 'new',
					props: {
						open: true
					},
					data: action.data
				}
			};
		}
		case Actions.ADD_TASK_CONTENT_DATA: {
			return {
				...state,
				taskContentDialog: {
					...state.taskContentDialog,
					data: {
						...state.taskContentDialog.data,
						...action.data
					}
				}
			};
		}
		case Actions.CLOSE_TASK_CONTENT_DIALOG: {
			return {
				...state,
				taskContentDialog: {
					type: 'new',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		case Actions.OPEN_TIMELINE_DIALOG: {
			return {
				...state,
				todoDialog: {
					type: 'new',
					props: {
						openTimelineDialog: true
					},
					data: action.todo
				}
			};
		}
		case Actions.ADD_TIMELINE_DATA: {
			return {
				...state,
				todoDialog: {
					...state.todoDialog,
					data: {
						...state.todoDialog.data,
						...action.todo
					}
				}
			};
		}
		case Actions.CLOSE_NEW_TODO_DIALOG: {
			return {
				...state,
				todoDialog: {
					type: 'new',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		case Actions.CLOSE_TIMELINE_DIALOG: {
			return {
				...state,
				todoDialog: {
					type: 'new',
					props: {
						openTimelineDialog: false
					},
					data: null
				}
			};
		}
		case Actions.OPEN_EDIT_TODO_DIALOG: {
			return {
				...state,
				todoDialog: {
					type: 'edit',
					props: {
						open: true
					},
					data: action.data
				}
			};
		}
		case Actions.CLOSE_EDIT_TODO_DIALOG: {
			return {
				...state,
				todoDialog: {
					type: 'edit',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		case Actions.OPEN_ACTIVITY_TODO_DIALOG: {
			return {
				...state,
				todoDialog: {
					type: 'activity',
					props: {
						open: true
					},
					data: action.data
				}
			};
		}
		case Actions.CLOSE_ACTIVITY_TODO_DIALOG: {
			return {
				...state,
				todoDialog: {
					type: 'activity',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		case Actions.UPDATE_TODO: {
			const todo = action.payload;

			return {
				...state,
				[action.isGantt ? 'entities' : 'todoEntities']: {
					...state.entities,
					[todo.id]: { ...todo }
				}
			};
		}
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.TOGGLE_ORDER_DESCENDING: {
			return {
				...state,
				orderDescending: !state.orderDescending
			};
		}
		case Actions.CHANGE_ORDER: {
			return {
				...state,
				orderBy: action.orderBy
			};
		}
		default:
			return state;
	}
};

export default todosReducer;
