import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	upload: {
		isUploading: false,
		uploadPercentage: 0
	},
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
	},
	openDrawingContent: false,
	editTaskTodoDialog: false
};

const todosReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_TODOS: {
			// console.log({ payload: action.payload });
			return {
				...state,
				entities: { ...action.payload },
				searchText: '',
				routeParams: action.routeParams
			};
		}
		case Actions.UPDATE_TODOS: {
			return {
				...state,
				entities: action.payload
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
		case Actions.EDIT_TASK_TODO_DIALOG: {
			return {
				...state,
				editTaskTodoDialog: true,
				editTaskTodoData: action.data
			};
		}
		case Actions.CLOSE_EDIT_TASK_TODO_DIALOG: {
			return {
				...state,
				editTaskTodoDialog: false,
				editTaskTodoData: {}
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
		case Actions.OPEN_DRAWING_CONTENT_DIALOG: {
			return {
				...state,
				openDrawingContent: true,
				taskContentDialog: {
					type: 'new',
					props: {
						open: false
					},
					data: action.data
				}
			};
		}
		case Actions.CLOSE_DRAWING_CONTENT_DIALOG: {
			return {
				...state,
				openDrawingContent: false
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
		case Actions.SET_UPLOAD: {
			return {
				...state,
				upload: {
					...state.upload,
					isUploading: action.payload,
					uploadPercentage: 0
				}
			};
		}
		case Actions.SET_UPLOAD_PERCENTAGE: {
			return {
				...state,
				upload: {
					...state.upload,
					uploadPercentage: action.payload
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
				entities: {
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
