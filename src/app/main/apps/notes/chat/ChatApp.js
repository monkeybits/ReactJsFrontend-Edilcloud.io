import { AppBar, Drawer, Button, Input, Paper, Hidden, Icon, IconButton, Toolbar, Typography, LinearProgress } from '@material-ui/core';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { GET_CHAT } from './store/actions';
import { ThemeProvider } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import loadable from '@loadable/component';
const Chat = loadable(() => import('./Chat'))
const ChatsSidebar = loadable(() => import('./ChatsSidebar'))
const ContactSidebar = loadable(() => import('./ContactSidebar'))
const UserSidebar = loadable(() => import('./UserSidebar'))

const drawerWidth = 350;
const headerHeight = 200;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: '100%',
		position: 'relative',
		flex: '1 1 auto',
		height: 'auto',
		backgroundColor: theme.palette.background.default
	},
	topBg: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
		backgroundColor: theme.palette.primary.dark,
		backgroundSize: 'cover',
		pointerEvents: 'none'
	},
	contentCardWrapper: {
		position: 'relative',
		// padding: 24,
		// maxWidth: 1400,
		display: 'flex',
		flexDirection: 'column',
		flex: '1 0 auto',
		width: '100%',
		minWidth: '0',
		maxHeight: '100%',
		margin: '0 auto',
		[theme.breakpoints.down('sm')]: {
			padding: 16
		},
		[theme.breakpoints.down('xs')]: {
			padding: 12
		}
	},
	contentCard: {
		display: 'flex',
		position: 'relative',
		flex: '1 1 100%',
		flexDirection: 'row',
		backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[1],
		borderRadius: 8,
		minHeight: 0,
		height: '100%',
		overflow: 'hidden'
	},
	drawerPaper: {
		width: drawerWidth,
		maxWidth: '100%',
		overflow: 'hidden',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 100%',
		zIndex: 10,
		background: `linear-gradient(to bottom, ${fade(theme.palette.background.paper, 0.8)} 0,${fade(
			theme.palette.background.paper,
			0.6
		)} 20%,${fade(theme.palette.background.paper, 0.8)})`
	},
	content: {
		display: 'flex',
		flex: '1 1 100%',
		minHeight: 0
	}
}));

function ChatApp(props) {
	const { t } = useTranslation('chat_projects');
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const searchText = useSelector(({ chatAppProject }) => chatAppProject.searchText);
	const chat = useSelector(({ chatAppProject }) => chatAppProject.chat);
	const company = useSelector(({ chatAppProject }) => chatAppProject.company);
	const contacts = useSelector(({ chatAppProject }) => chatAppProject.contacts.entities);
	const selectedContactId = useSelector(({ chatAppProject }) => chatAppProject.contacts.selectedContactId);
	const mobileChatsSidebarOpen = useSelector(({ chatAppProject }) => chatAppProject.sidebars.mobileChatsSidebarOpen);
	const userSidebarOpen = useSelector(({ chatAppProject }) => chatAppProject.sidebars.userSidebarOpen);
	const contactSidebarOpen = useSelector(({ chatAppProject }) => chatAppProject.sidebars.contactSidebarOpen);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const routeParams = useParams();

	const classes = useStyles(props);
	const [loading, setLoading] = useState({
		loadingCompanyInfo: false,
		loadingGetContacts: false,
		loadingGetChat: false
	});
	const handleSetLoading = data =>
		setLoading(loading => ({
			...loading,
			...data
		}));
	useEffect(() => {
		dispatch(Actions.companyInfo(handleSetLoading));
	}, [dispatch]);

	useEffect(() => {
		// if (company.can_access_chat && routeParams.id) {
		dispatch(Actions.getUserData());
		dispatch(Actions.getContacts(routeParams.id, handleSetLoading));
		dispatch(Actions.getChat(routeParams.id, handleSetLoading));
		// let callMessageList = setInterval(() => dispatch(Actions.getChat(routeParams.id)), 3000);
		return () => {
			dispatch({
				type: GET_CHAT,
				chat: [],
				userChatData: {}
			});
			// clearInterval(callMessageList);
		};
		// } else {
		// 	props.history.push('/apps/todo/all');
		// }
	}, [dispatch, company, routeParams, projectDetail]);
	if (loading.loadingCompanyInfo || loading.loadingGetChat || loading.loadingGetContacts) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center h-full">
				<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
					{t('LOADING_CHATS')}...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}
	return (
		<div>
			<ThemeProvider theme={mainTheme}>
				<div className="flex flex-1 dashboard-todo-header w-full">
					<div className="project_list h-auto bg-dark-blue min-h-auto w-full p-16">
						<div>
							<Typography className="sm:flex pt-4 pb-4 text-white mx-0 sm:mx-12" variant="h6">
								{projectDetail.name}
							</Typography>
							<Typography className="sm:flex pb-8 text-white mx-0 sm:mx-12" variant="p">
								{projectDetail.address}
							</Typography>
						</div>

						<div className="flex flex-1 w-full items-center justify-between">

							{/* <div className="flex items-center">
								<FuseAnimate animation="transition.expandIn" delay={300}>
									<div className="flex items-center">
										<FuseAnimate animation="transition.expandIn" delay={300}>
											<IconButton>
												<Icon className="text-32 text-white">filter_list</Icon></IconButton>
										</FuseAnimate>
									</div>
								</FuseAnimate>
							</div> */}

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
									<span className="flex">Nuovo</span>
								</Button>
							</FuseAnimate>
						</div>
					</div>
				</div>
			</ThemeProvider>

			{/* <div className={classes.topBg} /> */}

			{/* <div className="flex w-full justify-between items-center mb-20">
					<div className="mr-20">
						<Typography variant="h5" className="mb-4">
							Chat
						</Typography>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="subtitle1" className="font-weight-700 mb-4">Project Name</Typography>
						</FuseAnimate>
						<Typography variant="subtitle1" className="text-14 font-weight-600 text-muted">
							Nuernbergerstrasse 45, Elsfleth, Niedersachsen, 26931
						</Typography>
					</div>
					<Button className="badge-btn" color="secondary" onClick={() => props.onOpen()}>
						Open Details
					</Button>
				</div> */}

			<ThemeProvider theme={mainTheme}>

				<div className={clsx(classes.contentCardWrapper, 'container chat-custom-h-full p-0 inner-height')}>
					<div className={clsx(classes.contentCard, 'chat-bg')}>
						<Hidden mdUp>
							<Drawer
								className="h-full absolute z-20 b-right"
								variant="temporary"
								anchor="left"
								open={mobileChatsSidebarOpen}
								onClose={() => dispatch(Actions.closeMobileChatsSidebar())}
								classes={{
									paper: clsx(classes.drawerPaper, 'absolute ltr:left-0 rtl:right-0')
								}}
								style={{ position: 'absolute' }}
								ModalProps={{
									keepMounted: true,
									disablePortal: true,
									BackdropProps: {
										classes: {
											root: 'absolute'
										}
									}
								}}
							>
								<ChatsSidebar />
							</Drawer>
						</Hidden>
						<Hidden smDown>
							<Drawer
								className="h-full z-20 b-right"
								variant="permanent"
								open
								classes={{
									paper: classes.drawerPaper
								}}
							>
								<ChatsSidebar />
							</Drawer>
						</Hidden>
						<Drawer
							className="h-full absolute z-30 b-right"
							variant="temporary"
							anchor="left"
							open={userSidebarOpen}
							onClose={() => dispatch(Actions.closeUserSidebar())}
							classes={{
								paper: clsx(classes.drawerPaper, 'absolute left-0')
							}}
							style={{ position: 'absolute' }}
							ModalProps={{
								keepMounted: false,
								disablePortal: true,
								BackdropProps: {
									classes: {
										root: 'absolute'
									}
								}
							}}
						>
							<UserSidebar />
						</Drawer>

						<main className={clsx(classes.contentWrapper, 'z-10 multiple-images-overflow-x chat-bg custom-w-form')}>
							<>
								{/*	<AppBar className="w-full border-0" position="static" elevation={1}>
								<Toolbar className="bg-dark min-h-72 px-16">
									<IconButton
										color="inherit"
										aria-label="Open drawer"
										onClick={() => dispatch(Actions.openMobileChatsSidebar())}
										className="flex md:hidden"
									>
										<Icon>chat</Icon>
									</IconButton>
									<div
										className="flex items-center cursor-pointer chat-content-header"
										onClick={() => dispatch(Actions.openContactSidebar())}
										onKeyDown={() => dispatch(Actions.openContactSidebar())}
										role="button"
										tabIndex={0}
									>
										<div className="relative mx-8">
											{/* <div className="absolute right-0 bottom-0 -m-4 z-10">
													<StatusIcon status={selectedContact.status} />
												</div>
										</div>
									</div>
								</Toolbar>
							</AppBar> */}

								<div className={classes.content}>
									<Chat className="flex flex-1 z-10 Poppinsple-images-overflow-x chat-bg" />
								</div>
							</>
						</main>

						<Drawer
							className="h-full absolute z-30"
							variant="temporary"
							anchor="right"
							open={contactSidebarOpen}
							onClose={() => dispatch(Actions.closeContactSidebar())}
							classes={{
								paper: clsx(classes.drawerPaper, 'absolute ltr:right-0 rtl:left-0')
							}}
							style={{ position: 'absolute' }}
							ModalProps={{
								keepMounted: true,
								disablePortal: true,
								BackdropProps: {
									classes: {
										root: 'absolute'
									}
								}
							}}
						>
							<ContactSidebar />
						</Drawer>
					</div>
				</div>
			</ThemeProvider>
		</div>
	);
}

export default withRouter(withReducer('chatAppProject', reducer)(ChatApp));
