/* =============================================================================
 ChatApp.js
 ===============================================================================
*This file is created for ChatApp
TODO: ChatApp is created for do chats between company team mates
*/
import { AppBar, Avatar, Drawer, Hidden, Icon, IconButton, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { LinearProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FuseAnimate from '@fuse/core/FuseAnimate';
import * as accessibilityPanelActions from 'app/fuse-layouts/shared-components/accessibility/store/actions';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { GET_CHAT } from './store/actions';
import loadable from '@loadable/component';

const Chat = loadable(() => import('./Chat'));
const ChatsSidebar = loadable(() => import('./ChatsSidebar'));
const ContactSidebar = loadable(() => import('./ContactSidebar'));
const UserSidebar = loadable(() => import('./UserSidebar'));

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
		padding: 24,
		maxWidth: 1400,
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
	const dispatch = useDispatch();
	const chat = useSelector(({ chatApp }) => chatApp.chat);
	const company = useSelector(({ chatApp }) => chatApp.company);
	const contacts = useSelector(({ chatApp }) => chatApp.contacts.entities);
	const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);
	const mobileChatsSidebarOpen = useSelector(({ chatApp }) => chatApp.sidebars.mobileChatsSidebarOpen);
	const userSidebarOpen = useSelector(({ chatApp }) => chatApp.sidebars.userSidebarOpen);
	const contactSidebarOpen = useSelector(({ chatApp }) => chatApp.sidebars.contactSidebarOpen);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation('chat');

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
		if (company.can_access_chat) {
			dispatch(Actions.getUserData());
			if (!isMounted) {
				dispatch(Actions.getContacts(handleSetLoading));
				dispatch(Actions.getChat(handleSetLoading));
				setIsMounted(true);
			}
			// let callMessageList = setInterval(() => dispatch(Actions.getChat()), 1000);
			return () => {
				// clearInterval(callMessageList);
			};
		}
		props.history.push('/apps/todo/all');
	}, [dispatch, company]);
	useEffect(() => {
		return () => {
			setIsMounted(false);
			dispatch({
				type: GET_CHAT,
				chat: [],
				userChatData: {}
			});
		};
	}, []);

	if (loading.loadingCompanyInfo || loading.loadingGetChat || loading.loadingGetContacts) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center">
				<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
					{t('LOADING_CHATS')}...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}
	return (
		<>
			<div className={clsx(classes.root, 'flex-col h-full')}>
				{/* <div className={classes.topBg} /> */}

				<ThemeProvider theme={mainTheme}>
					<div className="flex flex-1 dashboard-todo-header w-full">
						<div className="project_list h-auto bg-dark-blue min-h-auto w-full p-16">
							<Typography className="sm:flex pt-4 pb-8 text-white mx-0 sm:mx-12" variant="h6">
								{t('CHAT')}
							</Typography>
							<div className="flex flex-1 items-center justify-end">
								<FuseAnimate animation="transition.slideRightIn" delay={300}>
									<Button
										onClick={ev => dispatch(accessibilityPanelActions.toggleAccessibility())}
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

				<div
					className={clsx(
						classes.contentCardWrapper,
						'container max-w-full chat-custom-h-full p-0 inner-height chat-inner-height'
					)}
				>
					<div className={clsx(classes.contentCard, 'chat-bg')}>
						<Hidden mdUp>
							<Drawer
								className="h-full absolute z-20"
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
							className="h-full absolute z-30"
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

						<main className={clsx(classes.contentWrapper, 'z-10 Poppinsple-images-overflow-x chat-bg')}>
							<>
								<AppBar className="w-full border-0" position="static" elevation={1}>
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
											// onClick={() => dispatch(Actions.openContactSidebar())}
											// onKeyDown={() => dispatch(Actions.openContactSidebar())}
											role="button"
											tabIndex={0}
										>
											<div className="relative mx-8">
												{/* <div className="absolute right-0 bottom-0 -m-4 z-10">
													<StatusIcon status={selectedContact.status} />
												</div> */}

												<Avatar
													src={
														company.logo
															? company.logo
															: 'assets/images/avatars/profile.jpg'
													}
													alt={company.name}
													className="w-48 h-48"
												>
													Group Chat
												</Avatar>
											</div>
											<div>
												<Typography color="inherit" className="px-8 mb-4">
													{company.name}
												</Typography>
												<Typography color="inherit" className="text-14 text-muted px-8">
													{t('MAIN_PROFILE')}
												</Typography>
											</div>
										</div>
									</Toolbar>
								</AppBar>

								<div className={clsx(classes.content)}>
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
			</div>
		</>
	);
}

export default withRouter(withReducer('chatApp', reducer)(ChatApp));
