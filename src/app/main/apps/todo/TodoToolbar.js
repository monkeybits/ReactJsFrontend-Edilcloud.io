import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

function TodoToolbar(props) {
	const dispatch = useDispatch();
	const orderBy = useSelector(({ todoApp }) => todoApp.todos.orderBy);
	const orderDescending = useSelector(({ todoApp }) => todoApp.todos.orderDescending);

	function handleOrderChange(ev) {
		dispatch(Actions.changeOrder(ev.target.value));
	}

	return (
		<div className="flex justify-between w-full">
			<div className="flex" />
			<div className="flex items-center">
				<FormControl className="">
					<Select value={orderBy} onChange={handleOrderChange} displayEmpty name="filter" className="">
						<MenuItem value="">
							<em>Order by</em>
						</MenuItem>
						<MenuItem value="date_start">Start Date</MenuItem>
						<MenuItem value="date_end">Due Date</MenuItem>
						<MenuItem value="name">Title</MenuItem>
					</Select>
				</FormControl>
				<IconButton onClick={ev => dispatch(Actions.toggleOrderDescending())}>
					<Icon style={{ transform: orderDescending ? 'scaleY(-1)' : 'scaleY(1)' }}>sort</Icon>
				</IconButton>
			</div>
		</div>
	);
}

export default TodoToolbar;
