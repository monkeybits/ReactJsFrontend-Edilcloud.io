/* =============================================================================
 TodoList.js
 ===============================================================================
This is part of dashboard 
TODO: This file simpley get list from redux store and do filters 
! Main function here to do the filters is handleDoFilter()
after do the filters it will show all the tasks 
*/
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import List from '@material-ui/core/List';
import { useDeepCompareEffect } from '@fuse/hooks';
import Typography from '@material-ui/core/Typography';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';
import TaskContentForm from './TaskContentForm';
import EditActivityPostForm from './EditActivityPostForm';
import * as ConatctActions from 'app/main/apps/contacts/store/actions';
import * as NotesActions from 'app/main/apps/notes/store/actions';
import * as TodosActions from 'app/main/apps/notes/todo/store/actions';
import * as AccessibilityActions from 'app/fuse-layouts/shared-components/accessibility/store/actions';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	GET_POST_FOR_TASK
} from 'app/services/apiEndPoints';

function TodoList(props) {
	const dispatch = useDispatch();
	const todos = useSelector(({ todoApp }) => todoApp.todos.entities);// it will get all tasks
	const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText); // its search text in dashboard you'll see search option and you can search task by this
	const orderBy = useSelector(({ todoApp }) => todoApp.todos.orderBy);// to get the current order(sorting of list)
	const orderDescending = useSelector(({ todoApp }) => todoApp.todos.orderDescending);
	const [filteredData, setFilteredData] = useState([]);// applied filter data list will be saved here
	const filters = useSelector(({ todoApp }) => todoApp.filters);// get filters categories 
	const activeFilter = useSelector(({ todoApp }) => todoApp.filters.activeFilter);
	const activeFilterKey = useSelector(({ todoApp }) => todoApp.filters.activeFilterKey);
	const usedKeys = useSelector(({ todoApp }) => todoApp.filters.usedKeys);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const taskContentDialog = useSelector(({ todoApp }) => todoApp.todos.taskContentDialog);
	const todoDialog = useSelector(({ todoApp }) => todoApp.todos.todoDialog);
	const [todoId, setTodoId] = useState(null);
	const [posts, setPosts] = React.useState([]);

	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts?.entities);
	const projects = useSelector(({ notesApp }) => notesApp?.project?.entities);
	const todosNote = useSelector(({ todoAppNote }) => todoAppNote?.todos?.entities);
	const accessibilityPanelAppState = useSelector(({ accessibilityPanel }) => accessibilityPanel.isDownloadApp);
	let accessibilityPanelApp = localStorage.getItem('downloadApp');

	useDeepCompareEffect(() => {
		dispatch(ConatctActions.getContacts());
		dispatch(NotesActions.getProjects());
		if(projects.length > 0) {
			let project_id = 0
			if(projects !== undefined && projects.length > 0) {
				project_id = projects[0].id
			}
			dispatch(TodosActions.getTodos(project_id, true));
		}
	}, [dispatch, projects]);

	useEffect(() => {
		setPosts([]);
		if (todosNote) {
			getPosts();
		}
	}, [todosNote]);

	const getPosts = () => {
		if(todosNote && Object.keys(todosNote).length > 0) {
			apiCall(
				GET_POST_FOR_TASK(todosNote[0].id),
				{},
				res => {
					setPosts(res.results);
				},
				err => {
					console.log(err);
				},
				METHOD.GET,
				getHeaderToken()
			);
		}
	};

	useEffect(() => {
		if(!contacts && contacts.length === 0) {
			dispatch(AccessibilityActions.openAccessibility())
		}

		if(!projects && projects.length === 0) {
			dispatch(AccessibilityActions.openAccessibility())
		}
		
		if(!todos && Object.keys(todos).length === 0) {
			dispatch(AccessibilityActions.openAccessibility())
		}

		if(!posts && posts.length === 0) {
			dispatch(AccessibilityActions.openAccessibility())
		}

		if(accessibilityPanelApp !== 'true' && !accessibilityPanelAppState) {
			dispatch(AccessibilityActions.openAccessibility())
		}

	}, [contacts, projects, todos, posts, accessibilityPanelApp, accessibilityPanelAppState]);
	
	/**
	 * * we have 5-6 filter category but, by default we can select only one filter from each categaory but some category need to allow multiple select
	 * ! we need to allow to select multiple project for projects, multiple people for activity, multiple company for tasks
	 */
	const canSelectMultiple = ['projectFilter', 'companyFilter', 'peopleFilter'];
	/**
	 * *below useeffect called for search text only
	 */
	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (todos && company) {
			new Promise((resolve, reject) => {
				let data = _.orderBy(
					getFilteredArray(todos, searchText),
					[orderBy],
					[orderDescending ? 'desc' : 'asc']
				);
				resolve(data);
			}).then(data => {
				setFilteredData(setFilterByKey(activeFilter, data, activeFilterKey));
				handleDoFilter();
			});
		}
	}, [searchText, orderBy, orderDescending, company]);
	/**
	 * *below useeffect called filter change
	 */
	useEffect(() => {
		handleDoFilter();
	}, [activeFilterKey, company, usedKeys, todos]);
	const handleDoFilter = () => { // this function is called to apply a filter, whenever user apply new filter this function will be called
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}
		if (company && todos) { 
			let list = _.orderBy(getFilteredArray(todos, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
			if (usedKeys && usedKeys.length) {
				for (const key in usedKeys) {
					if (usedKeys.hasOwnProperty(key)) {
						const element = usedKeys[key];
						if (canSelectMultiple.includes(element)) {
							let selectedFilters = filters[element].map(d => {
								if (d.isActive) {
									return element == 'peopleFilter' ? d.id : d.name;
								}
							});
							list = setFilterByKey(element, list, selectedFilters);
						} else {
							filters[element].map(d => {
								if (d.isActive) {
									list = setFilterByKey(element, list, element == 'peopleFilter' ? d.id : d.name);
								}
							});
						}
					}
				}
				setFilteredData(list);
				let listDiv = document.getElementById('list-content');
				if (listDiv) {
					listDiv.scrollTop = 0;
				}
			} else {
				setFilteredData(list);
			}
		}
	};
	const setFilterByKey = (activeFilter, list, activeFilterKey) => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}
		switch (activeFilter) {
			case 'genrealFilter':
				var result = [];
				const userInfo = decodeDataFromToken();
				if (activeFilterKey === 'MINE' && userInfo?.extra?.profile) {
					result = list.reduce((unique, o) => {
						let activities = [];
						if (o.assigned_company && o.assigned_company.id == company.id) {
							activities = filterByPeopleForActivity(o.activities, userInfo.extra.profile.id);
						}
						if (activities.length) {
							unique.push({ ...o, activities });
						}
						return unique;
					}, []);
				} else if (activeFilterKey === 'ALL') {
					result = _.orderBy(
						getFilteredArray(todos, searchText),
						[orderBy],
						[orderDescending ? 'desc' : 'asc']
					);
				} else {
					// activeFilterKey === 'Alerted'
					result = list.reduce((unique, o) => {
						let activities = [];
						if (o.assigned_company && o.assigned_company.id == company.id) {
							activities = checkAlert(o.activities);
						}
						if (o.alert || activities.length) {
							unique.push({ ...o, activities });
						}
						return unique;
					}, []);
				}
				return result;
			case 'peopleFilter':
				var result = list.reduce((unique, o) => {
					let activities = [];
					if (o.assigned_company && o.assigned_company.id == company.id) {
						activities = filterByPeopleForActivity(o.activities, activeFilterKey);
					}
					if (activities.length) {
						unique.push({ ...o, activities });
					}
					return unique;
				}, []);
				return result;
			case 'projectFilter':
				var result = list.reduce((unique, o) => {
					if (activeFilterKey.includes(o.project.name)) {
						unique.push(o);
					}
					return unique;
				}, []);
				return result;
			case 'companyFilter':
				var result = list.reduce((unique, o) => {
					if (activeFilterKey.includes(o.assigned_company?.name)) {
						unique.push(o);
					}
					return unique;
				}, []);
				return result;
			case 'timeFilter':
				var result = [];
				if (activeFilterKey === 'TODAY') {
					result = list.reduce((unique, o) => {
						let startDate = new Date(o.date_start);
						let endDate = new Date(o.date_end);
						let date = new Date();
						let activities = [];
						if (o.assigned_company && o.assigned_company.id == company.id) {
							activities = todayFilterForActivity(o.activities);
						}
						if (
							(date.getTime() <= endDate.getTime() && date.getTime() >= startDate.getTime()) ||
							activities.length
						) {
							unique.push({ ...o, activities });
						}
						return unique;
					}, []);
				} else if (activeFilterKey === 'NEXT_WEEK') {
					result = list.reduce((unique, o) => {
						let startDate = new Date(o.date_start);
						let endDate = new Date(o.date_end);
						let fromDate = new Date();
						let toDate = new Date();
						var pastDate = toDate.getDate() + 7;
						toDate.setDate(pastDate);
						let activities = [];
						if (o.assigned_company && o.assigned_company.id == company.id) {
							activities = todayFilterToNextWeekForActivity(o.activities);
						}
						if (
							(startDate.getTime() <= toDate.getTime() && endDate.getTime() >= fromDate.getTime()) ||
							activities.length
						) {
							unique.push({ ...o, activities });
						}
						return unique;
					}, []);
				} else if (activeFilterKey === 'IN_LATE') {
					result = list.reduce((unique, o) => {
						let endDate = new Date(o.date_end);
						let date = new Date();
						let activities = [];
						if (o.assigned_company && o.assigned_company.id == company.id) {
							activities = inLateFilterForActivity(o.activities);
						}
						// console.log({ date, endDate, name: o.name });
						if ((date.getTime() >= endDate.getTime() && o.progress < 100) || activities.length) {
							unique.push({ ...o, activities });
						}
						return unique;
					}, []);
				} else {
					// activeFilterKey=== 'Completed'
					result = list.reduce((unique, o) => {
						let activities = [];
						if (o.assigned_company && o.assigned_company.id == company.id) {
							activities = completedFilterForActivity(o.activities);
						}
						if (o.progress == 100 || activities.length) {
							unique.push({ ...o, activities });
						}
						return unique;
					}, []);
				}
				return result;
			default:
				return _.orderBy(getFilteredArray(todos, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
		}
	};
	const filterByPeopleForActivity = (arr = [], id) => {
		let result = arr.reduce((unique, o) => {
			let workers = Array.isArray(id)
				? o.workers.filter(d => id.includes(d.id))
				: o.workers.filter(d => d.id == id);
			if (workers.length) {
				unique.push(o);
			}
			return unique;
		}, []);
		return result;
	};
	const completedFilterForActivity = (arr = []) => {
		let result = arr.reduce((unique, o) => {
			if (o.status != 'to-do') {
				unique.push(o);
			}
			return unique;
		}, []);
		return result;
	};
	const checkAlert = (arr = []) => {
		let result = arr.reduce((unique, o) => {
			if (o.alert) {
				unique.push(o);
			}
			return unique;
		}, []);
		return result;
	};
	const todayFilterForActivity = (arr = []) => {
		let result = arr.reduce((unique, o) => {
			let startDate = new Date(o.datetime_start);
			let endDate = new Date(o.datetime_end);
			let date = new Date();
			if (endDate.getTime() >= date.getTime() && startDate.getTime() <= date.getTime()) {
				unique.push(o);
			}
			return unique;
		}, []);
		return result;
	};
	const inLateFilterForActivity = (arr = []) => {
		let result = arr.reduce((unique, o) => {
			let endDate = new Date(o.datetime_end);
			let date = new Date();
			if (date.getTime() >= endDate.getTime() && o.status == 'to-do') {
				unique.push(o);
			}
			return unique;
		}, []);
		return result;
	};
	const todayFilterToNextWeekForActivity = (arr = []) => {
		let result = arr.reduce((unique, o) => {
			let startDate = new Date(o.datetime_start);
			let endDate = new Date(o.datetime_end);
			let fromDate = new Date();
			let toDate = new Date();
			var pastDate = toDate.getDate() + 7;
			toDate.setDate(pastDate);
			if (startDate.getTime() <= toDate.getTime() && endDate.getTime() >= fromDate.getTime()) {
				unique.push(o);
			}
			return unique;
		}, []);
		return result;
	};
	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) { // if there are no tasks to show below HTML code wiil be display
		return (
			<FuseAnimate delay={100}>
				<div>
					<div className="flex flex-1 items-center justify-center h-full">
						<img className="w-400" src="assets/images/errors/nogantt.png"></img>
					</div>
					<div className="flex flex-1 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h5">
							Seems that there are no tasks yet!
						</Typography>
					</div>
					<div className="flex flex-1 mt-20 items-center justify-center h-full">
						<Typography color="textSecondary" variant="h6">
							Create a task clicking on green + button
						</Typography>
					</div>
				</div>
			</FuseAnimate>
		);
	}

	return (
		// <List className="p-0">
		<FuseAnimateGroup
			enter={{
				animation: 'transition.slideUpBigIn'
			}}
		>
			<div className="flex">
				<div className="lg:w-1/3 sidebar-ht dashboard">
					<div className="lg:mr-28 custom-margin cursor-pointer">
						{filteredData.map((todo, index) => (
							<TodoListItem setTodoId={setTodoId} {...props} todo={todo} key={todo.id} index={index} /> // all tasks will be display from this function
						))}
					</div>
				</div>
				<div className="lg:w-2/3 content-ht dashboard custom-modal-open flex-fill">
						{taskContentDialog.props.open && todoId == taskContentDialog.data.id && (
							<TaskContentForm />  // if we click on tasks this component will be displayed
						)}
						{todoDialog.props.openTimelineDialog && todoId == todoDialog.data.task.id && (
							<EditActivityPostForm />  // if we click on activity this component will be displayed
						)}
				</div>
			</div>
		</FuseAnimateGroup>
		// </List>
	);
}
export default TodoList;
