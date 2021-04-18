import { Button, Icon, IconButton, Input, Paper, Typography } from '@material-ui/core'
import FuseAnimate from '@fuse/core/FuseAnimate';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';

function TodoHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-1 dashboard-todo-header w-full">
			<div className="project_list h-auto bg-dark-blue min-h-auto w-full p-16">
			<Typography className="sm:flex pt-4 pb-8 text-white mx-0 sm:mx-12" variant="h6">
							Dashboard - Tutte le fasi di lavoro
						</Typography>

			<div className="flex flex-1 items-center justify-between">
				<div className="flex items-center">
				<IconButton
						onClick={ev => props.pageLayout.current.toggleLeftSidebar()}
						aria-label="open left sidebar"
					>
						<Icon className="text-white">filter_list</Icon>
					</IconButton>
				
	
					
				</div>
	
				<div className="flex flex-1 items-center justify-center px-12">
					<ThemeProvider theme={mainTheme}>
						<FuseAnimate animation="transition.slideDownIn" delay={300}>
							<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
								<Icon color="action">search</Icon>
	
								<Input
									
							placeholder="Cerca Fase di lavoro o attività"
									className="flex flex-1 mx-8"
									disableUnderline
									fullWidth
									value={searchText}
									inputProps={{
										'aria-label': 'Search'
									}}
									onChange={ev => dispatch(Actions.setSearchText(ev))}
								/>
							</Paper>
						</FuseAnimate>


					
					</ThemeProvider>
				</div>
				<FuseAnimate animation="transition.slideRightIn" delay={300}>
			<Button
				component={Link}
				to="/apps/e-commerce/products/new"
				className="whitespace-no-wrap normal-case"
				variant="contained"
				color="secondary"
			>
				<span className="xs:hidden sm:flex">Guida</span>
			</Button>
		</FuseAnimate>
			</div>
			</div>
			</div>
		</ThemeProvider>
	);
}

export default TodoHeader;
