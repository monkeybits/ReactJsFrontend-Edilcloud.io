import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import keycode from 'keycode';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chat from './Chat';
import ContactList from './ContactList';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import WebSocketProvider, { WebSocketContext } from 'app/WebSocket';
import LinearProgress from '@material-ui/core/LinearProgress';
import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'chat_panel', en);
i18next.addResourceBundle('it', 'chat_panel', it);
const useStyles = makeStyles(theme => ({
	root: {
		width: 70,
		maxWidth: 70,
		minWidth: 70,
		[theme.breakpoints.down('md')]: {
			width: 0,
			maxWidth: 0,
			minWidth: 0
		}
	},
	unreadBadge: {
		position: 'absolute',
		minWidth: 18,
		height: 18,
		top: 4,
		right: 10,
		borderRadius: 9,
		padding: '0 5px',
		fontSize: 11,
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
		zIndex: 10
	},
	panel: {
		position: 'absolute',
		width: 350,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[3],
		top: 0,
		height: '100%',
		minHeight: '100%',
		bottom: 0,
		right: 0,
		margin: 0,
		zIndex: 1000,
		transform: 'translate3d(280px,0,0)',
		overflow: 'hidden',
		[theme.breakpoints.down('md')]: {
			transform: 'translate3d(350px,0,0)',
			maxWidth: '100%',
			boxShadow: 'none',
			'&.opened': {
				boxShadow: theme.shadows[5]
			}
		},
		transition: theme.transitions.create(['transform'], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.standard
		}),
		'&.opened': {
			transform: 'translateX(0)'
		}
	}
}));

function ChatPanel(props) {
	const dispatch = useDispatch();
	const contacts = useSelector(({ chatPanel }) => chatPanel.contacts.entities);
	const selectedContactId = useSelector(({ chatPanel }) => chatPanel.contacts.selectedContactId);
	const state = useSelector(({ chatPanel }) => chatPanel.state);
	const user = useSelector(({ chatPanel }) => chatPanel.user);
	const ref = useRef();
	const [open, setOpen] = useState(false);
	const [totalCount, setTotalCount] = useState(0);
	const classes = useStyles(props);
	const selectedContact = contacts.find(_contact => _contact.id === selectedContactId);
	const projects = useSelector(({ notesApp }) => notesApp?.project?.entities);
	const company = useSelector(({ chatApp }) => chatApp?.company);

	const handleDocumentKeyDown = useCallback(
		event => {
			if (keycode(event) === 'esc' && !open) {
				dispatch(Actions.closeChatPanel());
			}
		},
		[dispatch]
	);

	useEffect(() => {
		// dispatch(Actions.getUserData());
		// let callMessageList = setInterval(() => dispatch(Actions.getProjects()), 1000);
		dispatch(Actions.getProjects());
		return () => {
			// clearInterval(callMessageList);
			dispatch(Actions.removeContacts());
			document.removeEventListener('keydown', handleDocumentKeyDown);
		};
	}, [dispatch, handleDocumentKeyDown, projects]);

	useEffect(() => {
		if (state) {
			document.addEventListener('keydown', handleDocumentKeyDown);
		} else {
			document.removeEventListener('keydown', handleDocumentKeyDown);
		}
	}, [handleDocumentKeyDown, state]);
	useEffect(() => {
		let newContacts = [];
		if (company && company.id && contacts) {
			newContacts = [
				{
					...company,
					type: 'company'
				},
				...contacts
			];
		}
		if (company && company.id) {
			let result = newContacts.reduce((unique, o) => {
				if (o.talks?.[0]?.unread_count) {
					unique.push(o.talks?.[0]?.unread_count);
				}
				return unique;
			}, []);
			result = result.reduce((a, b) => a + b, 0);
			setTotalCount(result);
		}
	}, [contacts, company]);
	/**
	 * Click Away Listener
	 */
	// useEffect(() => {
	// 	function handleDocumentClick(ev) {
	// 		if (ref.current && !ref.current.contains(ev.target) && !open) {
	// 			dispatch(Actions.closeChatPanel());
	// 		}
	// 	}

	// 	if (state) {
	// 		document.addEventListener('click', handleDocumentClick, true);
	// 	} else {
	// 		document.removeEventListener('click', handleDocumentClick, true);
	// 	}

	// 	return () => {
	// 		document.removeEventListener('click', handleDocumentClick);
	// 	};
	// }, [state, dispatch]);

	// if (contacts.length < 1) {
	// 	return null;
	// }
	return (
		<div className={classes.root}>
			<div className={clsx(classes.panel, { opened: state }, 'flex flex-col team-chat-sidebar')} ref={ref}>
				<AppBar position="static" elevation={1}>
					<Toolbar className="px-4">
						{(!state || !user?.id) && (
							<div className="flex flex-1 items-center px-4">
								<IconButton
									className=""
									color="inherit"
									onClick={ev => dispatch(Actions.openChatPanel())}
								>
									{!!totalCount && <div className={classes.unreadBadge}>{totalCount}</div>}
									<Icon className="text-32">chat</Icon>
								</IconButton>
								{!user?.id && (
									<Typography className="mx-8 text-16" color="inherit">
										Team Chat
									</Typography>
								)}
							</div>
						)}
						{state && user?.id && (
							<div className="flex">
								<IconButton onClick={ev => dispatch(Actions.removeChat())} color="inherit">
									<Icon>arrow_back</Icon>
								</IconButton>
							</div>
						)}
						{state && user?.id && (
							<div className="flex flex-1 items-center px-12">
								<Avatar src={user.logo} />
								<Typography className="mx-16 text-16" color="inherit">
									{user.name}
								</Typography>
							</div>
						)}
						<div className="flex px-4">
							<IconButton onClick={ev => !open && dispatch(Actions.closeChatPanel())} color="inherit">
								<Icon>close</Icon>
							</IconButton>
						</div>
					</Toolbar>
				</AppBar>
				{user?.loadingChat && <LinearProgress color="secondary" />}
				<Paper className="flex flex-1 flex-row min-h-px border-none border-0">
					{(!state || !user?.showUser) && <ContactList className="flex flex-shrink-0" />}
					{state && user?.showUser && (
						<Chat {...{ open, setOpen }} className="flex flex-1 z-10 muliple-images-overflow-x" />
					)}
				</Paper>
			</div>
		</div>
	);
}

export default withReducer('chatPanel', reducer)(React.memo(ChatPanel));
