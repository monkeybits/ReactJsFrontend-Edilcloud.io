import {
	AppBar,
	Button,
	Card,
	Icon,
	IconButton,
	Input,
	Typography,
	CircularProgress,
	MenuItem,
	ListItemIcon
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	GET_POST_TO_ACTIVITY,
	GET_POST_FOR_TASK,
	GET_SHARED_POSTS_FOR_TASKS,
	EDIT_POST
} from 'app/services/apiEndPoints';
import { getHeaderToken, getCompressFile, decodeDataFromToken } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import FuseUtils from '@fuse/utils';
import { useTranslation } from 'react-i18next';
import ImagesPreview from './ImagesPreview';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
import Dropzone from 'react-dropzone';
const TippyMenu = loadable(() => import('app/TippyMenu'));

const uuidv1 = require('uuid/v1');

const getAllFilesOfTimeline = timeline => {
	if (Array.isArray(timeline) && timeline.length) {
		return timeline.reduce(
			(prev, current) => {
				return { media_set: [...prev.media_set, ...current.media_set].map((d, index) => ({ ...d, index })) };
			},
			{
				media_set: []
			}
		);
	}
	return {
		media_set: []
	};
};
function EditPostForm(props) {
	const { isTask, taskId, postId, setIsEditPost, currnetPost, setPost } = props;
	const { t } = useTranslation('todo_project');
	const dispatch = useDispatch();
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const user = useSelector(({ auth }) => auth.user.data.company);
	const [tempAuthor, setTempAuthor] = useState({});
	const [data, setData] = useState({ posts: [] });
	const [offilePosts, setOffilePosts] = useState({});
	const [text, setText] = useState('');
	const [images, setImages] = useState(null);
	const [viewCroper, setViewCroper] = useState(false);
	const [loading, setLoading] = useState(false);
	const [postStatus, setPostStatus] = useState(false);

	const [media, setMedia] = useState({ files: [] });
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const notification = notificationPanel.notificationData?.notification;
	const scrollRef = document.getElementById(`post${notification?.object_id}`);
	const [file, setFile] = useState({
		fileData: undefined,
		imagePreviewUrl: undefined
	});
	const [deviceType, setDeviceType] = React.useState('');
	const inputRef = useRef(null);
	const todoDialog = useSelector(state =>
		state.todoAppNote?.todos?.todoDialog ? state.todoAppNote.todos.todoDialog : state.todoApp.todos.todoDialog
	);
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const postStatusOptions = [
		{
			icon: 'public',
			name: 'Public',
			handler: () => {
				setPostStatus(true);
				// setTimeout(() => {
				// 	editPost();
				// }, 250)
			}
		},
		{
			icon: 'lock',
			name: 'Private',
			handler: e => {
				setPostStatus(false);
				// setTimeout(() => {
				// 	editPost();
				// }, 250)
			}
		}
	];

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

	useEffect(() => {
		setText(props.currnetPost.text);
	}, [props.currnetPost.text]);
	useEffect(() => {
		if (user) {
			setTempAuthor({
				...user
			});
		}
	}, [user]);
	useEffect(() => {
		if (todoDialog.data?.todo?.id) {
			getPosts();
		}
	}, [todoDialog.data]);
	useEffect(() => {
		if (isTask) {
			getSharedPosts();
			getPosts();
		}
	}, [isTask]);
	function closeTodoDialog() {
		return todoDialog.type === 'edit'
			? dispatch(Actions.closeActivityTodoDialog())
			: dispatch(Actions.closeActivityTodoDialog());
	}
	const getPosts = () => {
		apiCall(
			isTask ? GET_POST_FOR_TASK(taskId) : GET_POST_TO_ACTIVITY(todoDialog.data.todo?.id),
			{},
			res => {
				setData(prev => ({ ...prev, posts: res.results }));
				const files = getAllFilesOfTimeline(res.results);
				setMedia({ files: files.media_set });
			},
			err => {
				// console.log(err),
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	const editPost = () => {
		setLoading(true);
		apiCall(
			EDIT_POST(currnetPost.id),
			{
				...currnetPost,
				text,
				is_public: postStatus
			},
			res => {
				setPost(cp => ({ ...cp, ...res }));
				setIsEditPost(false);
				setLoading(false);
			},
			err => {
				setLoading(false);
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};

	
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

		const fileToCompress = files[0];
		try {
			if (fileToCompress.type?.split('/')[0] == 'image') {
				const compressedFile = fileToCompress;
				setFile({
					fileData: new File([compressedFile], compressedFile.name)
				});
			} else {
				setFile({
					fileData: fileToCompress
				});
			}

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
		const fileToCompress = files[0];
		// console.log(`File size ${fileToCompress.size / 1024 / 1024} MB`); // smaller than maxSizeMB
		// console.log(`File Index 0`, fileToCompress); // smaller than maxSizeMB
		if (fileToCompress.type?.split('/')[0] == 'image') {
			const compressedFile = await imageCompression(fileToCompress, {
				maxSizeMB: 0.1,
				maxWidthOrHeight: 1024,
				useWebWorker: true
			});
			// console.log(`without compressedFile(blob)`, compressedFile);
			// console.log(`compressedFile into the file`, new File([compressedFile], compressedFile.name));
			// console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
			// console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
			setFile({
				fileData: new File([compressedFile], compressedFile.name)
			});
		} else {
			setFile({
				fileData: fileToCompress
			});
		}

		let file = [];
		for (let i = 0; i < files.length; i++) {
			const fileType = files[i].type?.split('/');
			// console.log({ fileType });
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
	const getSharedPosts = () => {
		apiCall(
			GET_SHARED_POSTS_FOR_TASKS(taskId),
			{},
			res => setData(prev => ({ ...prev, sharedPosts: res.results })),
			err => {
				// console.log(err),
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	const replaceImageUrl = (url, index) => {
		images[index] = {
			...images[index],
			imgPath: url,
			file: FuseUtils.dataURItoFile(url)
		};
		// console.log('Fileurl', URL.createObjectURL(FuseUtils.dataURItoFile(url)));
		setImages(images);
	};
	const callRetryAfterSuccess = (unique_code, res) => {
		const tempPosts = { ...offilePosts };
		tempPosts[unique_code] = {
			...tempPosts[unique_code],
			...res,
			retryOption: false,
			successAfterRetry: true
		};
		setOffilePosts(tempPosts);
		forceUpdate();
	};
	if (!data) {
		return null;
	}

	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1">
				<div>
					<Card className="w-full overflow-hidden post-form mb-20 post-card-clx">
						<Input
							id="addPost"
							className="p-16 w-full write-post"
							classes={{ root: 'text-14' }}
							placeholder={t('WRITE_SOMETHING')}
							multiline
							rows="3"
							margin="none"
							disableUnderline
							value={text}
							onChange={e => setText(e.target.value)}
						/>
						{images && <ImagesPreview images={images} replaceUrl={replaceImageUrl} />}

						<AppBar
							className="card-footer flex flex-row border-t-1 items-center justify-between pt-8 pb-6 pr-12 pl-10"
							position="static"
							color="default"
							elevation={0}
						>
							<div className="add-photo-image flex">
								<Dropzone onDrop={deviceType === 'ios' ? onAddPhoto : addPhoto}>
									{({ getRootProps, getInputProps }) => (
										<section>
											<div {...getRootProps()}>
												<IconButton
													onClick={deviceType === 'ios' ? onAddPhoto : addPhoto}
													aria-label="Add photo"
													className="p-8"
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
								{getRole() !== 'w' && (
									<div className="inline">
										<TippyMenu
											icon={
												<>
													<IconButton
														// onClick={() => inputRef.current.click()}
														aria-label="Change status"
													>
														<Icon>visibility</Icon>
													</IconButton>
												</>
											}
											outsideClick
										>
											{postStatusOptions.map(option => (
												<MenuItem
													key={option.name}
													selected={option.name === 'Pyxis'}
													onClick={option.handler}
												>
													<ListItemIcon>
														<Icon>{option.icon}</Icon>
													</ListItemIcon>
													<Typography variant="inherit"> {t(option.name)}</Typography>
												</MenuItem>
											))}
										</TippyMenu>
									</div>
								)}
							</div>
							<div>
								<Button
									className="mr-4"
									onClick={editPost}
									variant="contained"
									color="primary"
									size="large"
									aria-label="post"
									// disabled={!text.length}
								>
									{t('SAVE')}{' '}
									{loading && <CircularProgress size={20} color="secondary" className="ml-20" />}
								</Button>
								<Button
									onClick={() => setIsEditPost(false)}
									color="secondary"
									size="large"
									aria-label="post"
									// disabled={!text.length}
								>
									{t('CANCEL')}
								</Button>
							</div>
						</AppBar>
					</Card>

					{/* <Divider className="my-32" /> */}
				</div>
			</div>
		</div>
	);
}

export default EditPostForm;
