import React, { useEffect, useMemo, useRef } from 'react';
import loadable from '@loadable/component';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Avatar, Icon, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import moment from 'moment/moment';
import { useSelector } from 'react-redux';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import { useTranslation } from 'react-i18next';
const ViewFile = loadable(() => import('./ViewFile'))
const RetryToSendMessage = loadable(() => import('./RetryToSendMessage'))
const SendMessageForm = loadable(() => import('./SendMessageForm'))

const useStyles = makeStyles(theme => ({
	messageRow: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'flex-end',
		padding: '0 16px 4px 16px',
		flex: '0 0 auto',
		'&.contact': {
			'& $bubble': {
				backgroundColor: '#fff',
				// backgroundColor: theme.palette.primary.main,
				color: '#1E2129',
				boxShadow: '0 1px 3px #00000029',
				// color: theme.palette.primary.contrastText,
				borderTopLeftRadius: 5,
				borderBottomLeftRadius: 5,
				borderTopRightRadius: 20,
				borderBottomRightRadius: 20,
				marginBottom: 8,
				'& $time': {
					marginLeft: 12
				}
			},
			'&.first-of-group': {
				'& $bubble': {
					borderTopLeftRadius: 20
				}
			},
			'&.last-of-group': {
				'& $bubble': {
					borderBottomLeftRadius: 20
				}
			}
		},
		'&.me': {
			paddingLeft: 40,
			'& $avatar': {
				order: 2,
				margin: '0 0 0 16px'
			},

			'& $bubble': {
				marginLeft: 'auto',
				backgroundColor: '#dcf8c6',
				color: '#1E2129',
				// backgroundColor: theme.palette.grey[300],
				// color: theme.palette.getContrastText(theme.palette.grey[300]),
				borderTopLeftRadius: 20,
				borderBottomLeftRadius: 20,
				borderTopRightRadius: 5,
				borderBottomRightRadius: 5,
				marginBottom: 8,
				'& $time': {
					justifyContent: 'flex-end',
					right: 0,
					marginLeft: 6
				}
			},
			'&.first-of-group': {
				'& $bubble': {
					borderTopRightRadius: 20
				}
			},

			'&.last-of-group': {
				'& $bubble': {
					borderBottomRightRadius: 20
				}
			}
		},
		'&.contact + .me, &.me + .contact': {
			// paddingTop: 20,
			marginTop: 10
		},
		'&.first-of-group': {
			'& $bubble': {
				borderTopLeftRadius: 20,
				paddingTop: 13
			}
		},
		'&.last-of-group': {
			'& $bubble': {
				borderBottomLeftRadius: 20,
				paddingBottom: 13,
				'& $time': {
					display: 'flex'
				}
			}
		}
	},
	avatar: {
		position: 'absolute',
		left: -32,
		margin: 0
	},
	bubble: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 12,
		maxWidth: '100%'
	},
	message: {
		whiteSpace: 'pre-wrap',
		lineHeight: 1.2
	},
	time: {
		position: 'relative',
		// display: 'none',
		width: '100%',
		fontSize: 11,
		marginTop: 8,
		// top: '100%',
		// left: 0,
		whiteSpace: 'nowrap'
	},
	bottom: {
		background: theme.palette.background.default,
		borderTop: '1px solid rgba(0, 0, 0, 0.13)'
	},
	inputWrapper: {
		borderRadius: 24
	}
}));

function Chat(props) {
	const contacts = useSelector(({ chatPanel }) => chatPanel.contacts.entities);
	const selectedContactId = useSelector(({ chatPanel }) => chatPanel.contacts.selectedContactId);
	const chat = useSelector(({ chatPanel }) => chatPanel.chat);
	const user = useSelector(({ chatPanel }) => chatPanel.user);
	const userInfo = decodeDataFromToken();
	const userIdFromCompany = userInfo?.extra?.profile?.id;
	const classes = useStyles();
	const chatScroll = useRef(null);
	const { t } = useTranslation('chat_panel');

	useEffect(() => {
		scrollToBottom();
	}, [chat]);

	function scrollToBottom() {
		chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
	}

	return (
		<Paper elevation={3} className={clsx('flex flex-col', props.className)}>
			{useMemo(() => {
				const isFirstMessageOfGroup = (item, i) => {
					return i === 0 || (chat.chats[i - 1] && chat.chats[i - 1].sender.id != item.sender.id);
				};

				const isLastMessageOfGroup = (item, i) => {
					return (
						i === chat.chats.length - 1 ||
						(chat.chats[i + 1] && chat.chats[i + 1].sender.id != item.sender.id)
					);
				};
				return (
					<FuseScrollbars ref={chatScroll} className="flex flex-1 flex-col overflow-y-auto">
						{!chat ? (
							<div className="flex flex-col flex-1 items-center justify-center p-24">
								<Icon className="text-128" color="disabled">
									chat
								</Icon>
								<Typography className="px-16 pb-24 mt-24 text-center" color="textSecondary">
									{t('CREATE_CHAT_MESSAGE')}
								</Typography>
							</div>
						) : chat?.chats?.length ? (
							<div className="flex flex-col pt-16 ltr:pl-40 rtl:pr-40 pb-40 me-right-align right-panel-audio">
								{chat.chats.map((item, i) => {
									const contact = item.sender;
									const color = contacts.length && contacts?.filter(c => c.id == contact.id);
									return (
										<div
											key={item.time}
											className={clsx(
												classes.messageRow,
												{ me: contact.id == userIdFromCompany },
												{ contact: contact.id != userIdFromCompany },
												{ 'first-of-group': isFirstMessageOfGroup(item, i) },
												{ 'last-of-group': isLastMessageOfGroup(item, i) }
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
											<div className={classes.bubble}>
												<div className={classes.message}>
													{contact.id != userIdFromCompany && isFirstMessageOfGroup(item, i) && (
														<Typography
															style={{ color: color?.[0]?.contactNameColor }}
															className="font-size-15 font-bold mb-6"
														>
															{`${contact.first_name} ${contact.last_name}`}
															<Typography className="font-size-12 ">
																Project Manager - Impresa Edile Lucchini
															</Typography>
														</Typography>
													)}
													<RetryToSendMessage isOffline={item.retryOption} chatItem={item} />

													<div className="leading-normal py-4 font-size-16 mb-15">
														{item.body}
													</div>
													<ViewFile
														open={props.open}
														setOpen={props.setOpen}
														files={item.files}
													/>
													<div className="flex items-center mt-8">
														{
															// isLastMessageOfGroup(item, i) && (
															<Typography
																className="time text-12 font-500 ltr:left-0 rtl:right-0 whitespace-no-wrap"
																color="textSecondary"
															>
																{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}
															</Typography>
															// )
														}
														{contact.id == userIdFromCompany && item.waitingToSend ? (
															<Icon className="float-right font-size-16 ml-10 text-check">
																access_time
															</Icon>
														) : (
															// <Icon className="float-right text-16 text-check">check</Icon>
															<Icon className="float-right text-16 ml-10 text-check">
																done_all
															</Icon>
														)}
													</div>
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
									{t('START_CONVERSATION')}
								</Typography>
							</div>
						)}
					</FuseScrollbars>
				);
			}, [chat, classes, contacts, selectedContactId, user])}
			{chat && <SendMessageForm />}
		</Paper>
	);
}

export default Chat;
