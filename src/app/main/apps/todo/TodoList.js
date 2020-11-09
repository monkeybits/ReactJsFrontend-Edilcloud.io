import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import TodoListItem from './TodoListItem';

function TodoList(props) {
	const todos = useSelector(({ todoApp }) => todoApp.todos.entities);
	const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
	const orderBy = useSelector(({ todoApp }) => todoApp.todos.orderBy);
	const orderDescending = useSelector(({ todoApp }) => todoApp.todos.orderDescending);
	const [filteredData, setFilteredData] = useState(null);
	const activeFilter = useSelector(({ todoApp }) => todoApp.filters.activeFilter);
	const activeFilterKey = useSelector(({ todoApp }) => todoApp.filters.activeFilterKey);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (todos) {
			new Promise((resolve, reject) => {
				let data = _.orderBy(
					getFilteredArray(todos, searchText),
					[orderBy],
					[orderDescending ? 'desc' : 'asc']
				);
				resolve(data);
			})
				.then(data => setFilteredData(data))
				.then(() => setFilteredData(setFilterByKey()));
		}
	}, [todos, searchText, orderBy, orderDescending]);
	useEffect(() => {
		setFilteredData(setFilterByKey());
	}, [activeFilterKey]);
	const setFilterByKey = () => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}
		switch (activeFilter) {
			case 'genrealFilter':
				let list = Object.values(todos);
				return list;
			case 'projectFilter':
				var result = Object.values(todos).reduce((unique, o) => {
					if (o.project.name === activeFilterKey) {
						unique.push(o);
					}
					return unique;
				}, []);
				return result;
			case 'companyFilter':
				var result = Object.values(todos).reduce((unique, o) => {
					if (o.assigned_company?.name === activeFilterKey) {
						unique.push(o);
					}
					return unique;
				}, []);
				return result;
			case 'timeFilter':
				console.log({ activeFilterKey });
				var result = [];
				if (activeFilterKey === 'Today') {
					result = Object.values(todos).reduce((unique, o) => {
						let startDate = new Date(o.date_start);
						let endDate = new Date(o.date_end);
						let date = new Date();
						let activities = todayFilterForActivity(o.activities);
						if (
							(date.getTime() <= endDate.getTime() && date.getTime() >= startDate.getTime()) ||
							activities.length
						) {
							unique.push({ ...o, activities });
						}
						return unique;
					}, []);
				} else if (activeFilterKey === 'Next week') {
					result = Object.values(todos).reduce((unique, o) => {
						let startDate = new Date(o.date_start);
						let endDate = new Date(o.date_end);
						let fromDate = new Date();
						let toDate = new Date();
						var pastDate = toDate.getDate() + 7;
						toDate.setDate(pastDate);
						console.log({
							fromDate,
							toDate
						});
						let activities = todayFilterToNextWeekForActivity(o.activities);
						if (
							(startDate.getTime() <= toDate.getTime() && endDate.getTime() >= fromDate.getTime()) ||
							activities.length
						) {
							unique.push({ ...o, activities });
						}
						return unique;
					}, []);
				} else if (activeFilterKey === 'In late') {
				} else {
					// activeFilterKey=== 'Completed'
				}
				console.log({ result });
				return result;
			default:
				return _.orderBy(getFilteredArray(todos, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
		}
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
