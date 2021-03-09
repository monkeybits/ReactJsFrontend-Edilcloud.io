import { Icon, IconButton, MenuItem, Select, FormControl } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';

function TodoToolbar(props) {
	const dispatch = useDispatch();
	const orderBy = useSelector(({ todoApp }) => todoApp.todos.orderBy);
	const orderDescending = useSelector(({ todoApp }) => todoApp.todos.orderDescending);
	const { t } = useTranslation('dashboard');

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
							<em>{t('ORDER_BY')}</em>
						</MenuItem>
						<MenuItem value="date_start">{t('START_DATE')}</MenuItem>
						<MenuItem value="date_end">{t('DUE_DATE')}</MenuItem>
						<MenuItem value="name">{t('TITLE')}</MenuItem>
					</Select>
				</FormControl>
				<IconButton onClick={ev => dispatch(Actions.toggleOrderDescending())}>
					<Icon style={{ transform: orderDescending ? 'scaleY(-1)' : 'scaleY(1)' }}>{t('SORT')}</Icon>
				</IconButton>
			</div>
		</div>
	);
}

export default TodoToolbar;
