import _ from '@lodash';
import { actions } from 'react-table';
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
	editTaskTodoDialog: false,
	editActivityTodoDialog: false,
	isDeleteConfirmDialog: false,
	deleteConfirmDialog: {
		type: null,
		data: null
	},
	okDeleteTaskConfirmDialog: false,
	okDeleteActivityConfirmDialog: false
};

const removeByActivityId = (arr = [], activity) => {
	let newEntities = []
	for (const [k, d] of Object.entries(arr)) {
		if(activity.task === d.id) {
			let newActivity = []
			d.activities && d.activities.map((c) => {
				if(c.id !== activity.id) {
					newActivity = [
						...newActivity,
						c
					]
				}
			})
			newEntities = [
				...newEntities,
				{
					...d,
					activities: newActivity
				}
			]
		} else {
			newEntities = [
				...newEntities,
				d
			]
		}
	}
	return newEntities
}

const removeByTaskId = (arr = [], task) => {
	let newEntities = []
	for (const [k, d] of Object.entries(arr)) {
		if(task.id !== d.id) {
			newEntities = [
				...newEntities,
				d
			]
		}
	}
	return newEntities
}


const editByActivityId = (arr = [], activity) => {
	let newEntities = []
	for (const [k, d] of Object.entries(arr)) {
		if(activity.task === d.id) {
			let newActivity = []
			d.activities && d.activities.map((c) => {
				if(c.id === activity.id) {
					newActivity = [
						...newActivity,
						activity
					]
				} else {
					newActivity = [
						...newActivity,
						c
					]
				}
			})
			newEntities = [
				...newEntities,
				{
					...d,
					activities: newActivity
				}
			]
		} else {
			newEntities = [
				...newEntities,
				d
			]
		}
	}
	return newEntities
}

const todosReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_TODOS: {
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
				taskContentDialog: {
					type: 'new',
					props: {
						open: false
					},
					data: action.data
				}
			};
		}
		case Actions.CLOSE_EDIT_TASK_TODO_DIALOG: {
			return {
				...state,
				editTaskTodoDialog: false,
				taskContentDialog: {
					type: 'new',
					props: {
						open: false
					},
					data: null
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
		case Actions.EDIT_ACTIVITY_TODO_DIALOG: {
			return {
				...state,
				todoDialog: {
					type: 'edit',
					props: {
						openTimelineDialog: false
					},
					data: action.todo
				},
				editActivityTodoDialog: true
			};
		}
		case Actions.EDIT_ACTIVITY: {
			return {
				...state,
				entities: editByActivityId(state.entities, action.payload)
			};
		}
		case Actions.OPEN_DELETE_CONFIRM_DIALOG: {
			return {
				...state,
				isDeleteConfirmDialog: true,
				deleteConfirmDialog: {
					type: action.deleteType,
					data: action.data 
				},
			};
		}
		case Actions.CLOSE_DELETE_CONFIRM_DIALOG: {
			return {
				...state,
				isDeleteConfirmDialog: false,
				deleteConfirmDialog: {
					type: null,
					data: null
				},
			};
		}
		case Actions.REMOVE_ACTIVITY: {
			return {
				...state,
				entities: removeByActivityId(state.entities, action.payload),
			};
		}
		case Actions.REMOVE_TASK: {
			return {
				...state,
				entities: removeByTaskId(state.entities, action.payload),
			};
		}
		case Actions.OK_DELETE_TASK_CONFIRM_DIALOG: {
			return {
				...state,
				okDeleteTaskConfirmDialog: true
			};
		}
		case Actions.OK_DELETE_ACTIVITY_CONFIRM_DIALOG: {
			return {
				...state,
				okDeleteActivityConfirmDialog: true
			};
		}
		case Actions.CLOSE_EDIT_ACTIVITY_TODO_DIALOG: {
			return {
				...state,
				todoDialog: {
					type: 'edit',
					props: {
						openTimelineDialog: false
					},
					data: null
				},
				editActivityTodoDialog: false
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
