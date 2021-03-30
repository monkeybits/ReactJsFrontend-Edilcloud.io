import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Avatar, Icon, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment/moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decodeDataFromToken, getCompressFile } from 'app/services/serviceUtils';
import { useParams } from 'react-router';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import FuseUtils from '@fuse/utils';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const MessageMoreOptions = loadable(() => import('app/main/apps/chat/MessageMoreOptions'))
const ViewFile = loadable(() => import('./ViewFile'))
const RetryToSendMessage = loadable(() => import('./RetryToSendMessage'))
const SendMessageForm = loadable(() => import('./SendMessageForm'))

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
				backgroundColor: '#dcf8c6',
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
	const selectedContactId = useSelector(({ chatAppProject }) => chatAppProject.contacts.selectedContactId);
	const chat = useSelector(({ chatAppProject }) => chatAppProject.chat);
	const contacts = useSelector(({ chatAppProject }) => chatAppProject.contacts.entities);
	const inputRef = useRef(null);
	const audioRef = useRef(null);

	const user = useSelector(({ chatAppProject }) => chatAppProject.user);

	const classes = useStyles(props);
	const chatRef = useRef(null);
	const [messageText, setMessageText] = useState('');
	const [chatLength, setChatLength] = useState(0);
	const userInfo = decodeDataFromToken();
	const userIdFromCompany = userInfo?.extra?.profile?.id;
	const routeParams = useParams();
	const [images, setImages] = useState(null);
	const [hasRender, setHasRender] = React.useState(false);
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const scrollRef = useRef(null);
	const getRole = () => userInfo?.extra?.profile.role;
	useEffect(() => {
		if (chat?.chats?.length) {
			setTimeout(() => {
				setHasRender(true);
			}, 600);
			return () => {
				setHasRender(false);
			};
		}
	}, [chat?.chats]);

	useEffect(() => {
		if (notificationPanel.viewing && hasRender && scrollRef.current) {
			dispatch(notificationActions.removeFrmViewNotification());
			FuseUtils.notificationBackrondColor(scrollRef, 'custom-notification-bg');
		}
	}, [notificationPanel.viewing, scrollRef, hasRender]);

	useEffect(() => {
		if (chat?.chats?.length && chat.chats.length != chatLength) {
			setChatLength(chat.chats.length);
			scrollToBottom();
		}
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
	function onInputChange(ev) {
		setMessageText(ev.target.value);
	}

	function onMessageSubmit(ev) {
		ev.preventDefault();
		if (audioRef.current) {
			audioRef.current.sendDirectToChat();
		}
		if (messageText === '' && !images) {
			return;
		}
		console.log({ routeParams });
		dispatch(Actions.sendMessage(messageText, setMessageText, routeParams.id, images, setImages));
	}
	const addPhoto = async e => {
		const { files } = e.currentTarget;
		let file = [];
		for (let i = 0; i < files.length; i++) {
			const fileType = files[i].type?.split('/');
			file = [
				...file,
				{
					file: fileType[0] == 'image' ? await getCompressFile(files[i]) : files[i],
					imgPath: URL.createObjectURL(files[i]),
					fileType: fileType[0],
					extension: `.${fileType[1]}`,
					type: fileType.join('/')
				}
			];
			setImages(file);
		}
	};
	const addAudio = file => {
		const fileType = file.type?.split('/');
		let fileList = images || [];

		fileList = [
			{
				file,
				imgPath: URL.createObjectURL(file),
				fileType: fileType[0],
				extension: `.${fileType[1]}`,
				type: fileType.join('/')
			},
			...fileList
		];
		setImages(fileList);
	};
	const sendAudioDirectToChat = file => {
		const fileType = file.type?.split('/');
		let fileList = images || [];

		fileList = [
			{
				file,
				imgPath: URL.createObjectURL(file),
				fileType: fileType[0],
				extension: `.${fileType[1]}`,
				type: fileType.join('/')
			},
			...fileList
		];
		dispatch(Actions.sendMessage(messageText, setMessageText, routeParams.id, fileList, setImages));
	};
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
									key={item.date_create}
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
									<div
										className="bubble items-center justify-center p-12 max-w-50 relative"
										ref={
											notificationPanel.notificationData?.notification?.object_id == item.id
												? scrollRef
												: null
										}
									>
										{contact.id != userIdFromCompany && isFirstMessageOfGroup(item, i) && (
											<Typography
												style={{ color: contact.company?.color_project }}
												className="font-bold mb-6"
											>
												{`${contact.first_name} ${contact.last_name}`}
												{!!contact.position && (
													<Typography className="font-size-12 ">
														{contact.position} - {contact.company?.name}
													</Typography>
												)}
											</Typography>
										)}

										<RetryToSendMessage isOffline={item.retryOption} chatItem={item} />
										{!item.waitingToSend && contact.id == userIdFromCompany && (
											<MessageMoreOptions
												className="text-right chat-options"
												item={item}
												deleteMessage={Actions.deleteMessage}
											/>
										)}
										<div className="leading-normal py-4 font-size-16 mb-15">{item.body}</div>
										<ViewFile files={item.files} />
										<div className="flex items-center mt-8">
											{
												// isLastMessageOfGroup(item, i) && (
												<Typography
													className="time text-12 font-500 ltr:left-0 rtl:right-0 whitespace-no-wrap"
													color="textSecondary"
												>
													{moment(item.date_create).format('MMMM Do YYYY, h:mm:ss a')}
												</Typography>
												// )
											}
											{contact.id == userIdFromCompany && item.waitingToSend ? (
												<Icon className="float-right ml-10 text-16 text-check">
													access_time
												</Icon>
											) : (
												// <Icon className="float-right text-16 text-check">check</Icon>
												<Icon className="float-right ml-10 text-16 text-check">done_all</Icon>
											)}
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
