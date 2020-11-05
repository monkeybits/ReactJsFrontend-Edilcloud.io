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

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (todos) {
			setFilteredData(
				_.orderBy(getFilteredArray(todos, searchText), [orderBy], [orderDescending ? 'desc' : 'asc'])
			);
		}
	}, [todos, searchText, orderBy, orderDescending]);

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
