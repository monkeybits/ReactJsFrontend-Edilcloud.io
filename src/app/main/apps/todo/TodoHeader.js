import { Icon, IconButton, Input, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

function TodoHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-1 dashboard-todo-header">
				<Paper
					className="flex items-center bordergrey w-full h-48 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 rounded-8 shadow-none"
					elevation={1}
				>
					<IconButton
						onClick={ev => props.pageLayout.current.toggleLeftSidebar()}
						aria-label="open left sidebar"
					>
						<Icon>filter_list</Icon>
					</IconButton>

					<Icon color="action">search</Icon>

					<Input
						placeholder="Cerca"
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
		</ThemeProvider>
	);
}

export default TodoHeader;
