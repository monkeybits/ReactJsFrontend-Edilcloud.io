/* =============================================================================
 TODO:NotesHeader.js
 ===============================================================================
*This file is part of project list page 
TODO: created for project Header
*/
import { Button, Icon, IconButton, Input, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { ThemeProvider } from '@material-ui/core/styles';
import * as Actions from 'app/main/apps/notes/store/actions';

function NotesHeader(props) {
	const searchText = useSelector(({ notesApp }) => notesApp.project.searchText);
	const dispatch = useDispatch();	
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const { t } = useTranslation('projects');

  






	return (
		<ThemeProvider theme={mainTheme}>
			<div className="flex flex-1 dashboard-todo-header w-full">
			<div className="project_list h-auto bg-dark-blue min-h-auto w-full p-16">
			<Typography className="sm:flex pt-4 pb-8 text-white mx-0 sm:mx-12" variant="h6">
							Progetti di cantiere
						</Typography>

		<div className="flex flex-1 w-full items-center justify-between">
			
		<div className="flex items-center">
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<IconButton
				 onClick={ev => props.pageLayout.current.toggleLeftSidebar()}><Icon className="text-32 text-white">filter_list</Icon></IconButton>
				 
			</FuseAnimate>
			
		</div>

		<div className="flex flex-1 items-center justify-center px-12">
			<ThemeProvider theme={mainTheme}>
				<FuseAnimate animation="transition.slideDownIn" delay={300}>
					<Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>
						<Icon color="action">search</Icon>

						<Input
							placeholder="Cerca Progetti o aziende committenti"
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
				<span className="xs:hidden sm:flex">Nuovo progetto</span>
				<span className="flex sm:hidden">Nuobo</span>
			</Button>
		</FuseAnimate>
	</div>
	</div>
	</div>
</ThemeProvider>
	);
}

export default NotesHeader;
