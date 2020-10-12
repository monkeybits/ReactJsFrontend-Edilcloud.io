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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { decodeDataFromToken, getCompressFile } from 'app/services/serviceUtils';
import ViewFile from './ViewFile';
import SendMessageFilePreview from './SendMessageFilePreview';
import AudioRecord from 'app/AudioRecord';

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
				backgroundColor: theme.palette.primary.main,
				color: theme.palette.primary.contrastText,
				borderTopLeftRadius: 5,
				borderBottomLeftRadius: 5,
				borderTopRightRadius: 20,
				borderBottomRightRadius: 20,
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
				backgroundColor: theme.palette.grey[300],
				color: theme.palette.getContrastText(theme.palette.grey[300]),
				borderTopLeftRadius: 20,
				borderBottomLeftRadius: 20,
				borderTopRightRadius: 5,
				borderBottomRightRadius: 5,
				'& $time': {
					justifyContent: 'flex-end',
					right: 0,
					marginRight: 12
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
	const dispatch = useDispatch();
	const contacts = useSelector(({ chatPanel }) => chatPanel.contacts.entities);
	const selectedContactId = useSelector(({ chatPanel }) => chatPanel.contacts.selectedContactId);
	const chat = useSelector(({ chatPanel }) => chatPanel.chat);
	const user = useSelector(({ chatPanel }) => chatPanel.user);
	const userInfo = decodeDataFromToken();
	const userIdFromCompany = userInfo?.extra?.profile?.id;
	const classes = useStyles();
	const chatScroll = useRef(null);
	const [messageText, setMessageText] = useState('');
	const [images, setImages] = useState(null);
	const inputRef = useRef(null);
	const audioRef = useRef(null);

	useEffect(() => {
		scrollToBottom();
	}, [chat]);

	function scrollToBottom() {
		chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
	}

	const onInputChange = ev => {
		setMessageText(ev.target.value);
	};

	const onMessageSubmit = ev => {
		ev.preventDefault();
		if (audioRef.current) {
			audioRef.current.sendDirectToChat();
		}
		if (messageText === '') {
			return;
		}
		dispatch(Actions.sendMessage(messageText, setMessageText, user, images, setImages));
	};
	const addPhoto = async e => {
		const files = e.currentTarget.files;
		let file = [];
		for (var i = 0; i < files.length; i++) {
			let fileType = files[i].type?.split('/')[0];
			file = [
				...file,
				{
					file: fileType == 'image' ? await getCompressFile(files[i]) : files[i],
					imgPath: URL.createObjectURL(files[i]),
					fileType
				}
			];
			setImages(file);
		}
	};
	const addAudio = file => {
		let fileType = file.type?.split('/')[0];
		let fileList = images ? images : [];

		fileList = [
			{
				file: file,
				imgPath: URL.createObjectURL(file),
				fileType
			},
			...fileList
		];
		setImages(fileList);
	};
	const sendAudioDirectToChat = file => {
		let fileType = file.type?.split('/')[0];
		let fileList = images ? images : [];

		fileList = [
			{
				file: file,
				imgPath: URL.createObjectURL(file),
				fileType
			},
			...fileList
		];
		dispatch(Actions.sendMessage(messageText, setMessageText, fileList, setImages));
	};
	return (
		<Paper elevation={3} className={clsx('flex flex-col', props.className)}>
			{useMemo(() => {
				const shouldShowContactAvatar = (item, i) => {
					return i < chat.chats.length && chat.chats[i - 1] && chat.chats[i - 1].sender.id != item.sender.id;
				};

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
									Select a contact to start a conversation.
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
															className="text-xs mb-6"
														>
															{contact.first_name + ' ' + contact.last_name}
														</Typography>
													)}
													<div className="leading-normal font-size-16 mb-10">{item.body}</div>
													<ViewFile
														open={props.open}
														setOpen={props.setOpen}
														files={item.files}
													/>
													{contact.id == userIdFromCompany && item.waitingToSend ? (
														<Icon className="float-right font-size-16">access_time</Icon>
													) : (
														<Icon className="float-right font-size-16">check</Icon>
													)}
												</div>
											</div>
											{isLastMessageOfGroup(item, i) && (
												<Typography
													className={clsx(classes.time, 'mb-12')}
													color="textSecondary"
												>
													{moment(item.time).format('MMMM Do YYYY, h:mm:ss a')}
												</Typography>
											)}
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
				);
			}, [chat, classes, contacts, selectedContactId, user])}
			{chat && (
				<form onSubmit={onMessageSubmit} className={clsx(classes.bottom, 'py-16 px-8')}>
					<div className="multiple-images flex flex-row overflow-x-auto">
						{images &&
							images.map((item, index) => (
								<SendMessageFilePreview
									item={item}
									card={{}}
									// makeCover={makeCover}
									// removeCover={removeCover}
									// removeAttachment={removeAttachment}
									onRemove={() => setImages(prev => prev.filter((d, i) => i != index))}
									key={item.id}
								/>
							))}
					</div>
					<Paper className={clsx(classes.inputWrapper, 'flex items-center relative')}>
						<TextField
							autoFocus={false}
							id="message-input"
							className="flex-1"
							InputProps={{
								disableUnderline: true,
								classes: {
									root: 'flex flex-grow flex-shrink-0 mx-16 ltr:mr-48 rtl:ml-48 my-8',
									input: ''
								},
								placeholder: 'Type your message'
							}}
							InputLabelProps={{
								shrink: false,
								className: classes.bootstrapFormLabel
							}}
							onChange={onInputChange}
							value={messageText}
						/>
						<AudioRecord
							afterRecordComplete={addAudio}
							ref={audioRef}
							sendDirectToChat={sendAudioDirectToChat}
						/>

						<input hidden multiple type="file" ref={inputRef} onChange={addPhoto} />
						<IconButton
							className="image mr-48"
							onClick={() => inputRef.current.click()}
							aria-label="Add photo"
						>
							<Icon>photo</Icon>
						</IconButton>
						<IconButton className="absolute ltr:right-0 rtl:left-0 top-0" type="submit">
							<Icon className="text-24" color="action">
								send
							</Icon>
						</IconButton>
					</Paper>
				</form>
			)}
		</Paper>
	);
}

export default Chat;
