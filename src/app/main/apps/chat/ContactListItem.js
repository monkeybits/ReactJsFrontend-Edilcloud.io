import { Avatar, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import loadable from '@loadable/component';
const StatusIcon = loadable(() => import('./StatusIcon'));

const useStyles = makeStyles(theme => ({
	contactListItem: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		'&.active': {
			backgroundColor: theme.palette.background.paper
		}
	},
	unreadBadge: {
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText
	}
}));

function ContactListItem(props) {
	const classes = useStyles(props);

	return (
		<ListItem
			button
			className={clsx(classes.contactListItem, 'px-16 py-12 min-h-86 chat-border active', {
				active: props.selectedContactId === props.contact.id
			})}
		>
			<div className="relative">
				<div className="absolute right-0 bottom-0 -m-4 z-10">
					<StatusIcon status={props.contact.status} />
				</div>

				<Avatar src={props.contact.photo} alt={props.contact.name}>
					{!props.contact.photo || props.contact.photo === '' ? props.contact.name : ''}
				</Avatar>
			</div>

			<ListItemText
				classes={{
					root: 'min-w-px px-16 chat-contact-text',
					secondary: 'truncate'
				}}
				primary={props.contact.name}
				secondary={
					props.contact.position
						? `${props.contact.position}@${props.contact.company?.name}`
						: props.contact.company?.name
				}
			/>

			{/* {props.contact.chatId && ( */}
			<div className="flex flex-col justify-center items-end">
				{/* {props.contact.lastMessageTime && ( */}
				{/* <Typography className="whitespace-no-wrap mb-8">
							{moment(props.contact.lastMessageTime).format('ll')}
						</Typography> */}
				{/* )} */}
				{/* {props.contact.unread && ( */}
				{/* <div
							className={clsx(
								classes.unreadBadge,
								'flex items-center justify-center min-w-24 h-24 rounded-full text-11 text-white text-center chat-badge leading-normal'
							)}
						>
							11
						</div> */}
				{/* )} */}
			</div>
			{/* )} */}
		</ListItem>
	);
}

export default ContactListItem;
