import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from './Chat';
import ChatsSidebar from './ChatsSidebar';
import ContactSidebar from './ContactSidebar';
import StatusIcon from './StatusIcon';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import UserSidebar from './UserSidebar';
import { withRouter } from 'react-router';
import { GET_CHAT } from './store/actions';
import WebSocketProvider, { WebSocketContext } from 'app/WebSocket';
import FuseAnimate from '@fuse/core/FuseAnimate';

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
	const ws = useContext(WebSocketContext);
	const [isMounted, setIsMounted] = useState(false);

	const classes = useStyles(props);

	useEffect(() => {
		dispatch(Actions.companyInfo());
	}, [dispatch]);

	useEffect(() => {
		if (company.can_access_chat) {
			dispatch(Actions.getUserData());
			if (!isMounted) {
				dispatch(Actions.getContacts());
				dispatch(Actions.getChat());
				setIsMounted(true);
			}
			// let callMessageList = setInterval(() => dispatch(Actions.getChat()), 1000);
			return () => {
				// clearInterval(callMessageList);
			};
		} else {
			props.history.push('/apps/todo/all');
		}
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
	const handleData = data => {
		console.log(data);
	};
	return (
		<>
			<WebSocketProvider>
			<div className={clsx(classes.root, 'flex-col h-full p-24 inner-height')}>
					{/* <div className={classes.topBg} /> */}

					<div className="flex w-full justify-between items-center mb-20">
						<div>
							<Typography variant="h5" className="mb-4">
								Chat
							</Typography>
							<FuseAnimate animation="transition.slideLeftIn" delay={300}>
								<Typography variant="subtitle1" className="font-weight-700 mb-4">
									{/* {projectDetail.name} */}
									Project Test 1
								</Typography>
							</FuseAnimate>
							<Typography variant="subtitle1" className="text-14 font-weight-600 text-muted">
								Nuernbergerstrasse 45, Elsfleth, Niedersachsen, 26931
							</Typography>
						</div>
						<Button className="badge-btn" color="secondary" onClick={() => props.onOpen()}>
							Open Details
						</Button>
					</div>

					<div className={clsx(classes.contentCardWrapper, 'container h-full p-0')}>
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
									className="h-full z-20"
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

							<main className={clsx(classes.contentWrapper, 'z-10 muliple-images-overflow-x chat-bg')}>
								{
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
													onClick={() => dispatch(Actions.openContactSidebar())}
													onKeyDown={() => dispatch(Actions.openContactSidebar())}
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
													Main Profile
												</Typography>
												</div>
												</div>
											</Toolbar>
										</AppBar>

										<div className={classes.content}>
											<Chat className="flex flex-1 z-10 muliple-images-overflow-x chat-bg" />
										</div>
									</>
								}
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
			</WebSocketProvider>
		</>
	);
}

export default withRouter(withReducer('chatApp', reducer)(ChatApp));
