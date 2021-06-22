import { Icon, IconButton, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCompressFile } from 'app/services/serviceUtils';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
import Dropzone from 'react-dropzone';
const AudioRecord = loadable(() => import('app/AudioRecord'));
const SendMessageFilePreview = loadable(() => import('./SendMessageFilePreview'));

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
	const dispatch = useDispatch();
	const selectedContactId = useSelector(({ chatApp }) => chatApp.contacts.selectedContactId);
	const audioRef = useRef(null);
	const inputRef = useRef(null);
	const user = useSelector(({ chatApp }) => chatApp.user);
	const [images, setImages] = useState(null);
	const [messageText, setMessageText] = useState('');
	const [deviceType, setDeviceType] = React.useState('');
	const classes = useStyles(props);
	const { t } = useTranslation('chat');

	useEffect(() => {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			setDeviceType('window phone')
		}

		if (/android/i.test(userAgent)) {
			setDeviceType('android')
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			setDeviceType('ios')
		}
	}, []);

	function onInputChange(ev) {
		setMessageText(ev.target.value);
	}

	function onMessageSubmit(ev) {
		ev.preventDefault();
		if (audioRef.current) {
			audioRef.current.sendDirectToChat();
		}
		if (messageText.length || images) {
			dispatch(Actions.sendMessage(messageText, setMessageText, images, setImages));
		}
	}
	
	useEffect(() => {
		window.updateImage = updateImage;
	}, []);

	const dataURLtoFile = (dataurl, filename) => {
		const arr = dataurl.split(',');
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], filename, { type: mime });
	};
	
	const updateImage = async string => {
		const files = [];
		const extToMimes = {
			'image/jpeg': '.jpg',
			'image/png': '.png',
			'application/pdf': '.pdf',
			'application/json': '.json',
			'application/vnd.ms-excel': '.xls',
			'text/csv': '.csv',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
			'audio/mp4': '.mp4a',
			'video/mp4': '.mp4',
			'application/mp4': '.mp4'
		};

		let randomName = '';
		for (let i = 0; i < 8; i++) {
			const random = Math.floor(Math.random() * 27);
			randomName += String.fromCharCode(97 + random);
		}

		const dataWithMimeType = string.substr(0, string.indexOf(';'));
		const mimeT = dataWithMimeType.split(':')[1];
		const fileObject = dataURLtoFile(string, randomName + extToMimes[mimeT]);
		files.push(fileObject);

		// const fileToCompress = files[0];
		try {
			// if (fileToCompress.type?.split('/')[0] == 'image') {
			// 	const compressedFile = fileToCompress;
			// 	setFile({
			// 		fileData: new File([compressedFile], compressedFile.name)
			// 	});
			// } else {
			// 	setFile({
			// 		fileData: fileToCompress
			// 	});
			// }

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
		} catch (e) {
			// console.log('Error', e);
		}
	};

	const onAddPhoto = () => {
		try {
			if (window.webkit.messageHandlers) {
				window.webkit.messageHandlers.UploadImage.postMessage('Start Image Loading');
			}
		} catch (e) {
			// console.log('error', e);
		}
	};

	const addPhoto = async files => {
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
		dispatch(Actions.sendMessage(messageText, setMessageText, fileList, setImages));
	};
	return (
		<div className="fixed w-full chat-send-message-form chat-form-bg">
			<form
				autoComplete="off"
				onSubmit={onMessageSubmit}
				className="bottom-0 right-0 left-0 py-16 px-8 chat-form-bg"
			>
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
					<AudioRecord
						afterRecordComplete={addAudio}
						ref={audioRef}
						sendDirectToChat={sendAudioDirectToChat}
					/>
					{/* <input hidden multiple type="file" ref={inputRef} onChange={addPhoto} /> */}
					<Dropzone onDrop={deviceType === 'ios' ? onAddPhoto : addPhoto}>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps()}>
									<IconButton
										onClick={deviceType === 'ios' ? onAddPhoto : addPhoto}
										aria-label="Add photo"
										className="image mr-48"
										color="inherit"
									>
										<Icon>photo</Icon>
									</IconButton>
									<input
										// ref={inputRef}
										// onChange={addPhoto}
										{...getInputProps()}
										multiple
										hidden
										type="file"
										accept="image/*, video/*"
									/>
									{/* <p>Drag 'n' drop some files here, or click to select files</p> */}
								</div>
							</section>
						)}
					</Dropzone>
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
