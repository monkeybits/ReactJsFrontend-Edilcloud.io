import { Hidden, Icon, IconButton, Input, Paper, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function BillingHeader(props) {
	const dispatch = useDispatch();
	// const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-1">
				<Typography className="text-black">Billing</Typography>
			</div>
		</ThemeProvider>
	);
}

export default BillingHeader;
