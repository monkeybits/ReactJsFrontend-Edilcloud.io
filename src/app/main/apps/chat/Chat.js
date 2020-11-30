import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import moment from 'moment/moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { decodeDataFromToken, getCompressFile } from 'app/services/serviceUtils';
import ViewFile from './ViewFile';
import SendMessageFilePreview from './SendMessageFilePreview';
import AudioRecord from 'app/AudioRecord';
import MessageMoreOptions from './MessageMoreOptions';
import RetryToSendMessage from './RetryToSendMessage';
import SendMessageForm from './SendMessageForm';

const useStyles = makeStyles(theme => ({
	messageRow: {
		'&.contact': {
			'& .bubble': {
				backgroundColor: '#fff',
				// backgroundColor: theme.palette.background.default,
				// color: theme.palette.getContrastText(theme.palette.primary.dark),
				color: '#1E2129',
				boxShadow: '0 1px 3px #00000029',
				borderTopLeftRadius: 5,
				borderBottomLeftRadius: 5,
				borderTopRightRadius: 5,
				borderBottomRightRadius: 5
				// '& .time': {
				// 	marginLeft: 12
				// }
			},
			'&.first-of-group': {
				'& .bubble': {
					borderTopLeftRadius: 15
				}
			},
			'&.last-of-group': {
				'& .bubble': {
					borderBottomRightRadius: 15
				}
			}
		},
		'&.me': {
			paddingLeft: 20,

			'& .avatar': {
				order: 2,
				margin: '0 0 0 16px'
			},
			'& .bubble': {
				marginLeft: 'auto',
				backgroundColor: '#4caf501f',
				// backgroundColor: theme.palette.primary.dark,
				color: '#1E2129',
				// color: theme.palette.getContrastText(theme.palette.primary.dark),
				borderTopLeftRadius: 5,
				borderBottomLeftRadius: 5,
				borderTopRightRadius: 5,
				borderBottomRightRadius: 5,
				'& .time': {
					justifyContent: 'flex-end',
					right: 0,
					marginLeft: 6
				}
			},
			'&.first-of-group': {
				'& .bubble': {
					borderTopLeftRadius: 15
				}
			},

			'&.last-of-group': {
				'& .bubble': {
					borderBottomRightRadius: 15
				}
			}
		},
		'&.contact + .me, &.me + .contact': {
			// paddingTop: 20,
			// marginTop: 20
		},
		'&.first-of-group': {
			'& .bubble': {
				borderTopLeftRadius: 15,
				paddingTop: 13
			}
		},
		'&.last-of-group': {
			'& .bubble': {
				borderBottomRightRadius: 15,
				paddingBottom: 13,
				'& .time': {
					display: 'flex'
				}
			}
		}
	}
}));

function Chat(props) {
	const dispatch = useDispatch();
	const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);
	const chat = useSelector(({ chatApp }) => chatApp.chat);
	const contacts = useSelector(({ chatApp }) => chatApp.contacts.entities);
	const audioRef = useRef(null);

	const inputRef = useRef(null);
	const user = useSelector(({ chatApp }) => chatApp.user);
	const [images, setImages] = useState(null);

	const classes = useStyles(props);
	const chatRef = useRef(null);
	const [messageText, setMessageText] = useState('');
	const userInfo = decodeDataFromToken();
	const userIdFromCompany = userInfo?.extra?.profile?.id;

	useEffect(() => {
		scrollToBottom();
	}, [chat?.chats]);

	function scrollToBottom() {
		chatRef.current.scrollTop = chatRef.current.scrollHeight;
	}

	function shouldShowContactAvatar(item, i) {
		return i < chat.chats.length && chat.chats[i - 1] && chat.chats[i - 1].sender.id != item.sender.id;
	}

	function isFirstMessageOfGroup(item, i) {
		return i === 0 || (chat.chats[i - 1] && chat.chats[i - 1].sender.id != item.sender.id);
	}

	function isLastMessageOfGroup(item, i) {
		return i === chat.chats.length - 1 || (chat.chats[i + 1] && chat.chats[i + 1].sender.id != item.sender.id);
	}

	return (
		<div className={clsx('flex flex-col relative chat-box', props.className)}>
			<FuseScrollbars ref={chatRef} className="flex flex-1 flex-col overflow-y-auto">
				{chat?.chats?.length ? (
					<div className="flex flex-col pt-16 px-16 ltr:pl-48 rtl:pr-48 pb-30">
						{chat.chats.map((item, i) => {
							const contact = item.sender;
							const color = contacts.length && contacts?.filter(c => c.id == contact.id);
							return (
								<div
									key={i}
									className={clsx(
										classes.messageRow,
										'flex flex-col flex-grow-0 flex-shrink-0 items-start justify-end relative px-20 pb-12',
										{ me: contact.id == userIdFromCompany },
										{ contact: contact.id != userIdFromCompany },
										{ 'first-of-group': isFirstMessageOfGroup(item, i) },
										{ 'last-of-group': isLastMessageOfGroup(item, i) },
										i + 1 === chat.length && 'pb-96'
									)}
								>
									{isLastMessageOfGroup(item, i) && contact.id != userIdFromCompany && (
										<Avatar
											className="avatar absolute ltr:left-0 rtl:right-0 m-0 -mx-32 top-0"
											src={contact.photo}
										>
											{contact.first_name.split('')[0]}
										</Avatar>
									)}

									<div className="bubble items-center justify-center p-12 max-w-50 relative">
										{contact.id != userIdFromCompany && isFirstMessageOfGroup(item, i) && (
											<Typography
												style={{ color: color?.[0]?.contactNameColor }}
												className="text-xs mb-6"
											>
												{contact.first_name + ' ' + contact.last_name}
											</Typography>
										)}
										<RetryToSendMessage isOffline={item.retryOption} chatItem={item} />
										{!item.waitingToSend && (
											<MessageMoreOptions
												className="text-right chat-options"
												item={item}
												deleteMessage={Actions.deleteMessage}
											/>
										)}
										<div className="leading-normal mb-4">{item.body} </div>
										<ViewFile files={item.files} />
										<div className="flex items-center mt-8">
											{contact.id == userIdFromCompany && item.waitingToSend ? (
												<Icon className="float-right font-size-16 text-check">access_time</Icon>
											) : (
												// <Icon className="float-right text-16 text-check">check</Icon>
												<Icon className="float-right text-16 text-check">done_all</Icon>
											)}
											{
												// isLastMessageOfGroup(item, i) && (
												<Typography
													className="time text-11 ml-6 ltr:left-0 rtl:right-0 whitespace-no-wrap"
													color="textSecondary"
												>
													{moment(item.date_create).format('MMMM Do YYYY, h:mm:ss a')}
												</Typography>
												// )
											}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="flex flex-col flex-1">
						<div className="flex flex-col flex-1 items-center justify-center">
							<Icon className="text-128" color="disabled">
								chat
							</Icon>
						</div>
						<Typography className="px-16 pb-24 text-center" color="textSecondary">
							Start a conversation by typing your message below.
						</Typography>
					</div>
				)}
			</FuseScrollbars>
			<SendMessageForm />
		</div>
	);
}

export default Chat;
