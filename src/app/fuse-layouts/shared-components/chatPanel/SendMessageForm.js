import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { decodeDataFromToken, getCompressFile } from 'app/services/serviceUtils';
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
				backgroundColor: '#4caf501f',
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

export default function SendMessageForm() {
	const dispatch = useDispatch();
	const user = useSelector(({ chatPanel }) => chatPanel.user);
	const classes = useStyles();
	const [messageText, setMessageText] = useState('');
	const [images, setImages] = useState(null);
	const inputRef = useRef(null);
	const audioRef = useRef(null);
	const onInputChange = ev => {
		setMessageText(ev.target.value);
	};

	const onMessageSubmit = ev => {
		ev.preventDefault();
		if (audioRef.current) {
			audioRef.current.sendDirectToChat();
		}
		if (messageText === '' && !images) {
			return;
		}
		dispatch(Actions.sendMessage(messageText, setMessageText, user, images, setImages));
	};
	const addPhoto = async e => {
		const files = e.currentTarget.files;
		let file = [];
		for (var i = 0; i < files.length; i++) {
			let fileType = files[i].type?.split('/');
			file = [
				...file,
				{
					file: fileType[0] == 'image' ? await getCompressFile(files[i]) : files[i],
					imgPath: URL.createObjectURL(files[i]),
					fileType: fileType[0],
					extension: '.' + fileType[1],
					type: fileType.join('/')
				}
			];
			setImages(file);
		}
	};
	const addAudio = file => {
		let fileType = file.type?.split('/');
		let fileList = images ? images : [];

		fileList = [
			{
				file: file,
				imgPath: URL.createObjectURL(file),
				fileType: fileType[0],
				extension: '.' + fileType[1],
				type: fileType.join('/')
			},
			...fileList
		];
		setImages(fileList);
	};
	const sendAudioDirectToChat = file => {
		let fileType = file.type?.split('/');
		let fileList = images ? images : [];

		fileList = [
			{
				file: file,
				imgPath: URL.createObjectURL(file),
				fileType: fileType[0],
				extension: '.' + fileType[1],
				type: fileType.join('/')
			},
			...fileList
		];
		dispatch(Actions.sendMessage(messageText, setMessageText, user, fileList, setImages));
	};
	return (
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
				<AudioRecord afterRecordComplete={addAudio} ref={audioRef} sendDirectToChat={sendAudioDirectToChat} />

				<input hidden multiple type="file" ref={inputRef} onChange={addPhoto} />
				<IconButton className="image mr-48" onClick={() => inputRef.current.click()} aria-label="Add photo">
					<Icon>photo</Icon>
				</IconButton>
				<IconButton className="absolute ltr:right-0 rtl:left-0 top-0" type="submit">
					<Icon className="text-24" color="action">
						send
					</Icon>
				</IconButton>
			</Paper>
		</form>
	);
}
