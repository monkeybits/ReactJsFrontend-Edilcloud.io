import { Button, Icon, IconButton, Input, Paper, Typography } from '@material-ui/core';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_POST_FOR_TASK } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import * as accessibilityPanelActions from 'app/fuse-layouts/shared-components/accessibility/store/actions';
import * as Actions from './store/actions';

function TodoHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ todoApp }) => todoApp.todos.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const [posts, setPosts] = React.useState([]);
	const [quickStartCount, setQuickStartCount] = React.useState(0);

	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts?.entities);
	const projects = useSelector(({ notesApp }) => notesApp?.project?.entities);
	const todosNote = useSelector(({ todoAppNote }) => todoAppNote?.todos?.entities);
	const accessibilityPanelAppState = useSelector(({ accessibilityPanel }) => accessibilityPanel.isDownloadApp);
	const isOpenQuickStart = useSelector(({ accessibilityPanel }) => accessibilityPanel.openMenu);
	// const count = useSelector(({ accessibilityPanel }) => accessibilityPanel.count);
	const accessibilityPanelApp = localStorage.getItem('downloadApp');

	useEffect(() => {
		setPosts([]);
		if (todosNote) {
			getPosts();
		}
	}, [todosNote]);

	const getPosts = () => {
		if (todosNote && Object.keys(todosNote).length > 0) {
			apiCall(
				GET_POST_FOR_TASK(todosNote[0].id),
				{},
				res => {
					setPosts(res.results);
				},
				err => {
					// console.log(err);
				},
				METHOD.GET,
				getHeaderToken()
			);
		}
	};

	useEffect(() => {
		if (contacts && contacts.length > 0) {
			setQuickStartCount(1);
		}
	}, [contacts]);

	useEffect(() => {
		if (projects && projects.length > 0) {
			setQuickStartCount(2);
		}
	}, [projects]);

	useEffect(() => {
		if (todosNote && Object.keys(todosNote).length > 0) {
			setQuickStartCount(3);
		}
	}, [todosNote]);

	useEffect(() => {
		if (posts && posts.length > 0) {
			setQuickStartCount(4);
		}
	}, [posts]);

	useEffect(() => {
		if (accessibilityPanelApp === 'true' || accessibilityPanelAppState) {
			setQuickStartCount(5);
		}
	}, [accessibilityPanelApp, accessibilityPanelAppState]);

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
									<Paper
										className="flex items-center w-full max-w-512 px-8 py-4 rounded-8"
										elevation={1}
									>
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
								onClick={ev => dispatch(accessibilityPanelActions.toggleAccessibility())}
								// component={Link}
								// to="/apps/e-commerce/products/new"
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
