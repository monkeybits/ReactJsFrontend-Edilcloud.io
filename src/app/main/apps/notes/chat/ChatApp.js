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
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from './Chat';
import ChatsSidebar from './ChatsSidebar';
import ContactSidebar from './ContactSidebar';
import StatusIcon from './StatusIcon';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import UserSidebar from './UserSidebar';
import { withRouter, useParams } from 'react-router';

const drawerWidth = 400;
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
	const dispatch = useDispatch();
	const chat = useSelector(({ chatApp }) => chatApp.chat);
	const company = useSelector(({ chatApp }) => chatApp.company);
	const contacts = useSelector(({ chatApp }) => chatApp.contacts.entities);
	const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);
	const mobileChatsSidebarOpen = useSelector(({ chatApp }) => chatApp.sidebars.mobileChatsSidebarOpen);
	const userSidebarOpen = useSelector(({ chatApp }) => chatApp.sidebars.userSidebarOpen);
	const contactSidebarOpen = useSelector(({ chatApp }) => chatApp.sidebars.contactSidebarOpen);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const routeParams = useParams();

	const classes = useStyles(props);

	useEffect(() => {
		dispatch(Actions.companyInfo());
	}, [dispatch]);
	useEffect(() => {
		if (company.can_access_chat && routeParams.id) {
			dispatch(Actions.getUserData(routeParams.id));
			dispatch(Actions.getContacts(routeParams.id));
			let callMessageList = setInterval(() => dispatch(Actions.getChat(routeParams.id)), 3000);
			return () => clearInterval(callMessageList);
		} else {
			props.history.push('/apps/todo/all');
		}
	}, [dispatch, company, routeParams]);
	return (
		<div className={clsx(classes.root, 'h-full')}>
			{/* <div className={classes.topBg} /> */}

			<div className={clsx(classes.contentCardWrapper, 'container h-full')}>
				<div className={classes.contentCard}>
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

					<main className={clsx(classes.contentWrapper, 'z-10')}>
						{
							<>
								<AppBar className="w-full" position="static" elevation={1}>
									<Toolbar className="px-16">
										<IconButton
											color="inherit"
											aria-label="Open drawer"
											onClick={() => dispatch(Actions.openMobileChatsSidebar())}
											className="flex md:hidden"
										>
											<Icon>chat</Icon>
										</IconButton>
										<div
											className="flex items-center cursor-pointer"
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
														projectDetail.logo
															? projectDetail.logo
															: 'assets/images/avatars/profile.jpg'
													}
													alt={projectDetail.name}
												>
													Group Chat
												</Avatar>
											</div>
											<Typography color="inherit" className="text-18 font-600 px-4">
												{projectDetail.name}
											</Typography>
										</div>
									</Toolbar>
								</AppBar>

								<div className={classes.content}>
									<Chat className="flex flex-1 z-10" />
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
	);
}

export default withRouter(withReducer('chatApp', reducer)(ChatApp));
