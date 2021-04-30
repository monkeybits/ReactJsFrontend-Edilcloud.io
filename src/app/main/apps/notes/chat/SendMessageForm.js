import { Icon, Paper, IconButton, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCompressFile } from 'app/services/serviceUtils';
import { useParams } from 'react-router';
import AudioRecord from 'app/AudioRecord';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const SendMessageFilePreview = loadable(() => import('./SendMessageFilePreview'))

const useStyles = makeStyles(() => ({
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
				backgroundColor: '#4c54af1f',
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

export default function SendMessageForm(props) {
	const { t } = useTranslation('chat_projects');
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const audioRef = useRef(null);

	const classes = useStyles(props);
	const [messageText, setMessageText] = useState('');
	const routeParams = useParams();
	const [images, setImages] = useState(null);
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
		<div className="fixed w-full send-message-form">
			<form autoComplete="off" onSubmit={onMessageSubmit} className="w-full my-20 py-16 px-8 chat-form-bg">
				<div className="multiple-images flex flex-row overflow-x-auto custom-form-fixed-position">
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
				<Paper className="flex items-center relative rounded-24" elevation={1}>
					<TextField
						autoFocus={false}
						id="message-input"
						className="flex-1"
						InputProps={{
							disableUnderline: true,
							classes: {
								root: 'flex flex-grow flex-shrink-0 mx-16 ltr:mr-10 rtl:ml-48 my-8',
								input: ''
							},
							placeholder: t('TYPE_YOUR_MESSAGE')
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
					<IconButton
						className="image mr-48"
						onClick={() => inputRef.current.click()}
						aria-label="Add photo"
						color="inherit"
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
		</div>
	);
}
