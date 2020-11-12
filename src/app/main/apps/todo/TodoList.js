import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';

function TodoList(props) {
	const todos = useSelector(({ todoApp }) => todoApp.todos.entities);
	const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
	const orderBy = useSelector(({ todoApp }) => todoApp.todos.orderBy);
	const orderDescending = useSelector(({ todoApp }) => todoApp.todos.orderDescending);
	const [filteredData, setFilteredData] = useState([]);
	const filters = useSelector(({ todoApp }) => todoApp.filters);
	const activeFilter = useSelector(({ todoApp }) => todoApp.filters.activeFilter);
	const activeFilterKey = useSelector(({ todoApp }) => todoApp.filters.activeFilterKey);
	const usedKeys = useSelector(({ todoApp }) => todoApp.filters.usedKeys);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const canSelectMultiple = ['projectFilter', 'companyFilter', 'peopleFilter'];
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
	useEffect(() => {
		handleDoFilter();
	}, [activeFilterKey, company, usedKeys, todos]);
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
				let listDiv = document.getElementById('list-content');
				listDiv.scrollTop = 0;
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
				if (activeFilterKey === 'Mine') {
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
				} else if (activeFilterKey === 'All') {
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
				if (activeFilterKey === 'Today') {
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
				} else if (activeFilterKey === 'Next week') {
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
				} else if (activeFilterKey === 'In late') {
					result = list.reduce((unique, o) => {
						let endDate = new Date(o.date_end);
						let date = new Date();
						let activities = [];
						if (o.assigned_company && o.assigned_company.id == company.id) {
							activities = inLateFilterForActivity(o.activities);
						}
						if ((date.getTime() <= endDate.getTime() && o.progress < 100) || activities.length) {
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
			console.log({ workers });
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
			if (date.getTime() > endDate.getTime() && o.status == 'to-do') {
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

	if (filteredData.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						There are no todos!
					</Typography>
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
			{filteredData.map((todo, index) => (
				<TodoListItem todo={todo} key={todo.id} index={index} />
			))}
		</FuseAnimateGroup>
		// </List>
	);
}
export default TodoList;
