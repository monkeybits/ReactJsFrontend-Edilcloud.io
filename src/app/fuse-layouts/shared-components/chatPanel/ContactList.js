import React, { useRef, useEffect, useState } from 'react';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Avatar, Button, Tooltip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.background.default
	},
	contactButton: {
		width: 350,
		minWidth: 70,
		flex: '0 0 auto',
		justifyContent: 'start',
		padding: '20px 15px',
		'&.active:after': {
			position: 'absolute',
			top: 8,
			right: 0,
			bottom: 8,
			content: "''",
			width: 4,
			borderTopLeftRadius: 4,
			borderBottomLeftRadius: 4,
			backgroundColor: theme.palette.primary.main
		}
	},
	unreadBadge: {
		position: 'absolute',
		minWidth: 18,
		height: 18,
		top: 4,
		left: 10,
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
	status: {
		position: 'absolute',
		width: 12,
		height: 12,
		bottom: 4,
		left: 44,
		border: `2px solid ${theme.palette.background.default}`,
		borderRadius: '50%',
		zIndex: 10,

		'&.online': {
			backgroundColor: '#4CAF50'
		},

		'&.do-not-disturb': {
			backgroundColor: '#F44336'
		},

		'&.away': {
			backgroundColor: '#FFC107'
		},

		'&.offline': {
			backgroundColor: '#646464'
		}
	}
}));

function ContactList(props) {
	const { t } = useTranslation('chat_panel');
	const dispatch = useDispatch();
	const contacts = useSelector(({ chatPanel }) => chatPanel.contacts.entities);
	const selectedContactId = useSelector(({ chatPanel }) => chatPanel.contacts.selectedContactId);
	const user = useSelector(({ chatPanel }) => chatPanel.user);
	const [allContacts, setallContacts] = useState([]);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const classes = useStyles();
	const contactListScroll = useRef(null);

	const handleContactClick = contact => {
		// if(contact.type=="company"){

		// }
		dispatch(Actions.openChatPanel());
		dispatch(Actions.getChat(contact));
		scrollToTop();
	};

	const scrollToTop = () => {
		contactListScroll.current.scrollTop = 0;
	};
	useEffect(() => {
		let newContacts = [];
		if (company && company.id && contacts) {
			newContacts = [
				{
					...company,
					type: 'company'
				},
				...contacts
			].sort(function (a, b) {
				// Turn your strings into dates, and then subtract them
				// to get a value that is either negative, positive, or zero.
				return new Date(b.last_message_created) - new Date(a.last_message_created);
			});
		}
		if (company && company.id) {
			setallContacts(newContacts);
		}
	}, [contacts, company]);
	const ContactButton = ({ contact }) => {
		return (
			<Tooltip title={contact.name} placement="left">
				<Button
					onClick={() => handleContactClick(contact)}
					className={clsx(classes.contactButton, { active: selectedContactId === contact.id })}
				>
					{!!contact.talks?.length && !!contact?.talks[0]?.unread_count && (
						<div className={classes.unreadBadge}>{contact.talks[0].unread_count}</div>
					)}
					<div className={clsx(contact.status, classes.status)} />
					<Avatar src={contact.logo} alt={contact.name} className="bg-blue-500">
						{!contact.logo || contact.logo === '' ? contact.name[0] : ''}
					</Avatar>
					<div className="chatText truncate flex-1">
						<Typography
							className="ml-16 text-left text-16 normal-case truncate font-medium"
							color="inherit"
						>
							{contact.name}
						</Typography>
						<Typography className="ml-16 text-left text-12 normal-case truncate" color="inherit">
							{contact.type == 'project' ? contact.address : t('COMPANY_CHAT')}
						</Typography>
					</div>
				</Button>
			</Tooltip>
		);
	};

	return (
		<FuseScrollbars
			className={clsx(classes.root, 'flex flex-shrink-0 flex-col overflow-y-auto py-8 team-chat-body')}
			ref={contactListScroll}
		>
			{allContacts.length > 0 && (
				<>
					<FuseAnimateGroup
						enter={
							{
								// animation: 'transition.expandIn'
							}
						}
						className="flex flex-col flex-shrink-0"
					>
						{/* {user &&
							user.chatList &&
							user.chatList.map(chat => {
								const contact = contacts.find(_contact => _contact.id === chat?.contactId);
								return <ContactButton key={contact.id} contact={contact} />;
							})} */}

						{/* <Divider className="mx-24 my-8" /> */}
						{allContacts.map((contact, index) => {
							// const chatContact = user.chatList.find(_chat => _chat.contactId === contact.id);
							return (
								<>
									<ContactButton key={contact.id} contact={contact} />
									{index != allContacts.length - 1}
								</>
							);
						})}
					</FuseAnimateGroup>
				</>
			)}
		</FuseScrollbars>
	);
}

export default React.memo(ContactList);
