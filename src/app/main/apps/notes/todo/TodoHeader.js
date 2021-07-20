import { Typography, Button, Icon, IconButton, Input, Paper } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import * as Actions from 'app/main/apps/todo/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';

function TodoHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ todoAppNote }) => todoAppNote.todos.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-1 dashboard-todo-header w-full">
				<div className="project_list h-auto bg-dark-blue min-h-auto w-full p-16">
					<div>
						<Typography className="sm:flex pt-4 text-white mx-0 sm:mx-12" variant="h6">
							{projectDetail.name}
						</Typography>
						<Typography className="sm:flex pb-8 text-white mx-0 sm:mx-12" variant="p">
							{projectDetail.address}
						</Typography>
					</div>
					<div className="flex flex-1 w-full items-center justify-between">
						<div className="flex items-center">
							<FuseAnimate animation="transition.expandIn" delay={300}>
								<IconButton onClick={ev => props.pageLayout.current.toggleLeftSidebar()}>
									<Icon className="text-32 text-white">filter_list</Icon>
								</IconButton>
							</FuseAnimate>
						</div>

						<div className="flex flex-1 items-center justify-center px-12">
							<ThemeProvider theme={mainTheme}>
								<FuseAnimate animation="transition.slideDownIn" delay={300}>
									<Paper
										className="flex items-center w-full max-w-512 px-8 py-4 rounded-8"
										elevation={1}
									>
										<Icon color="action">search</Icon>

										<Input
											placeholder="Cerca persone del team"
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
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default TodoHeader;
