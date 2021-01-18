import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import * as Actions from './store/actions';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';

function TodoList(props) {
	const dispatch = useDispatch();
	const todos = useSelector(({ todoAppNote }) => todoAppNote.todos.todoEntities);
	const searchText = useSelector(({ todoAppNote }) => todoAppNote.todos.searchText);
	const [hasRenderd, setHasRenderd] = useState(false);
	const orderBy = useSelector(({ todoAppNote }) => todoAppNote.todos.orderBy);
	const orderDescending = useSelector(({ todoAppNote }) => todoAppNote.todos.orderDescending);
	const companies = useSelector(({ contactsApp }) => contactsApp.contacts.companies);
	const [filteredData, setFilteredData] = useState(null);
	const filters = useSelector(({ todoAppNote }) => todoAppNote.filters);
	const activeFilter = useSelector(({ todoAppNote }) => todoAppNote.filters.activeFilter);
	const activeFilterKey = useSelector(({ todoAppNote }) => todoAppNote.filters.activeFilterKey);
	const usedKeys = useSelector(({ todoAppNote }) => todoAppNote.filters.usedKeys);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const canSelectMultiple = ['companyFilter', 'peopleFilter'];
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const scrollRef = useRef(null);

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
	}, [todos, searchText, orderBy, orderDescending]);
	useEffect(() => {
		handleDoFilter();
	}, [activeFilterKey, company, usedKeys, todos]);

	// useEffect(() => {
	// 	// function scrolldiv() {
	// 	// 	var elem = document.getElementById("ele");
	// 	// 	elem.scrollIntoView();
	// 	// }
	// 	if (notificationPanel.viewing && scrollRef.current && todos) {
	// 		dispatch(Actions.resetAllFilters());
	// 		if (hasRenderd) {
	// 			dispatch(notificationActions.removeFrmViewNotification());
	// 			setTimeout(() => {
	// 				scrollRef.current.scrollIntoView();
	// 				scrollRef.current.classList.add('bg-yellow-200');
	// 				setTimeout(() => {
	// 					scrollRef.current.classList.remove('bg-yellow-200');
	// 				}, 5000);
	// 			}, 2000);
	// 		}
	// 	}
	// }, [notificationPanel.viewing, todos, scrollRef, hasRenderd]);

	const handleDoFilter = () => {
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
				// let listDiv = document.getElementById('list-content');
				// listDiv.scrollTop = 0;
			} else {
				setFilteredData(list);
			}
			setTimeout(() => {
				setHasRenderd(true);
			}, 3000);
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
				if (activeFilterKey === 'MINE' && userInfo) {
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

	return (
		// <List className="p-0">
		<FuseAnimateGroup
			enter={{
				animation: 'transition.slideUpBigIn'
			}}
		>
			<div>
				<div className="flex flex-1">
					<Paper
						className="flex items-center w-full h-48 sm:h-56 grey-border p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8"
						elevation={1}
					>
						<Hidden lgUp>
							<IconButton
								onClick={ev => props.pageLayout.current.toggleLeftSidebar()}
								aria-label="open left sidebar"
							>
								<Icon>menu</Icon>
							</IconButton>
						</Hidden>

						<Icon color="action">search</Icon>

						<Input
							placeholder="Search"
							className="px-16"
							disableUnderline
							fullWidth
							value={searchText}
							inputProps={{
								'aria-label': 'Search'
							}}
							onChange={ev => dispatch(Actions.setSearchText(ev))}
						/>
					</Paper>
				</div>

				{filteredData.length === 0 ? (
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
				) : (
					filteredData.map((todo, index) => (
						<TodoListItem {...props} todo={todo} key={todo.id} index={index} companies={companies} />
					))
				)}
			</div>
		</FuseAnimateGroup>
		// </List>
	);
}

export default TodoList;
