import { InputLabel, MenuItem, ListItemIcon, AppBar, Button, Card, Icon, IconButton, Input, Typography, LinearProgress } from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	ADD_POST_TO_ACTIVITY,
	GET_POST_TO_ACTIVITY,
	GET_POST_FOR_TASK,
	ADD_POST_TO_TASK
} from 'app/services/apiEndPoints';
import { getHeaderToken, getCompressFile, decodeDataFromToken } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import FuseUtils from '@fuse/utils';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import loadable from '@loadable/component';
const PostList = loadable(() => import('./PostList'))
const ImagesPreview = loadable(() => import('./ImagesPreview'))
const TippyMenu = loadable(() => import('app/TippyMenu'))

const uuidv1 = require('uuid/v1');

const getAllFilesOfTimeline = timeline => {
	if (Array.isArray(timeline) && timeline.length) {
		console.log({ timeline });
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
function CreatePostForm({ isTask, taskId }) {
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
	const [loading, setLoading] = useState(false);
	const [postStatus, setPostStatus] = useState(true);
	
	const postStatusOptions = [
		{
			icon: 'public',
			name: 'Public',
			handler: () => {
				setPostStatus(true);
			}
		},
		{
			icon: 'lock',
			name: 'Private',
			handler: e => {
				setPostStatus(false);
			}
		}
	];

	const [media, setMedia] = useState({ files: [] });
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const notification = notificationPanel.notificationData?.notification;
	const scrollRef = document.getElementById(`post${notification?.object_id}`);
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const [file, setFile] = useState({
		fileData: undefined,
		imagePreviewUrl: undefined
	});
	const inputRef = useRef(null);
	const todoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.todoDialog);
	useEffect(() => {
		if (user) {
			setTempAuthor({
				...user
			});
		}
	}, [user]);
	useEffect(() => {
		setData({
			posts: []
		});
		if (todoDialog.data?.todo?.id) {
			getPosts();
		}
	}, [todoDialog.data]);
	useEffect(() => {
		setData({
			posts: []
		});
		if (isTask) {
			getSharedPosts();
			getPosts();
		}
	}, [isTask, taskId]);
	function closeTodoDialog() {
		return todoDialog.type === 'edit'
			? dispatch(Actions.closeActivityTodoDialog())
			: dispatch(Actions.closeActivityTodoDialog());
	}
	const getPosts = () => {
		setLoading(true);
		apiCall(
			isTask ? GET_POST_FOR_TASK(taskId) : GET_POST_TO_ACTIVITY(todoDialog.data.todo?.id),
			{},
			res => {
				setLoading(false);
				setData(prev => ({ ...prev, posts: res.results }));
				const files = getAllFilesOfTimeline(res.results);
				setMedia({ files: files.media_set });
			},
			err => {
				setLoading(false);
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	const createPost = async () => {
		const formData = new FormData();
		const unique_code = uuidv1();
		const values = {
			text,
			unique_code,
			is_public: postStatus
		};
		let media_set = [];
		if (images) {
			media_set = images.map(d => ({
				extension: d.extension,
				media_url: d.imgPath,
				name: d.file.name,
				type: d.type
			}));
		}
		if (images) {
			const acceptedFiles = images.map(d => d.file);
			let i = 0;
			for (const file of acceptedFiles) {
				formData.append(`media[${i}]`, file, file.name);
				i += 1;
			}
		}
		for (const key in values) {
			if (values[key]) formData.append(key, values[key]);
		}

		const tempPost = {
			formData,
			text,
			author: tempAuthor,
			media_set,
			unique_code
		};
		console.log({ media_set });
		const tempOfflinePosts = { ...offilePosts, [unique_code]: tempPost };
		setOffilePosts(tempOfflinePosts);
		dispatch(Actions.setUpload(true));
		apiCall(
			isTask ? ADD_POST_TO_TASK(taskId) : ADD_POST_TO_ACTIVITY(todoDialog.data.todo?.id),
			formData,
			res => {
				console.log({ res });
				delete tempOfflinePosts[res.unique_code];
				setOffilePosts(tempOfflinePosts);
				dispatch(Actions.setUpload(false));
				getPosts();
			},
			err => {
				// console.log({ myError: err, unique_code, tempOfflinePosts });
				// let tempPosts = { ...offilePosts };
				dispatch(Actions.setUpload(false));
				tempOfflinePosts[unique_code] = {
					...tempOfflinePosts[unique_code],
					retryOption: true
				};
				console.log({ myError: err, tempOfflinePosts });
				setOffilePosts(tempOfflinePosts);
				forceUpdate();
			},
			METHOD.POST,
			{
				...getHeaderToken(),
				onUploadProgress(progressEvent) {
					const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					dispatch(Actions.setUploadPercentage(percentCompleted));
				}
			}
		);
		document.getElementById('addPost').value = '';
		setImages(null);
	};

	// useEffect(() => {
	// 	if (notificationPanel.viewing) {
	// 		setTimeout(() => {
	// 			console.log({ posts: data.posts, scrollRef, notificationPanel , ele : document.getElementById(`post${notification?.object_id}`) });
	// 			if (data.posts.length && scrollRef) {
	// 				console.log({
	// 					notificationPanel
	// 				});
	// 				scrollRef.scrollIntoView();
	// 				scrollRef.classList.add('bg-yellow-200');
	// 				setTimeout(() => {
	// 					scrollRef.classList.remove('bg-yellow-200');
	// 				}, 5000);
	// 			}
	// 		}, 2000);
	// 	}
	// }, [notificationPanel.viewing, data.posts.length, scrollRef]);

	// const createPostOffline = (formData, unique_code) => {
	// 	let media_set = [];
	// 	if (images) {
	// 		media_set = images.map(d => ({
	// 			extension: d.extension,
	// 			media_url: d.imgPath,
	// 			name: d.file.name,
	// 			type: d.file.type
	// 		}));
	// 	}
	// 	const tempPost = {
	// 		formData,
	// 		text,
	// 		author: { user: { username: 'chaitnya16' } },
	// 		media_set
	// 	};
	// 	setOffilePosts(prev => ({ ...prev, [unique_code]: tempPost }));
	// };
	const addPhoto = async e => {
		const { files } = e.currentTarget;
		const fileToCompress = e.currentTarget.files[0];
		console.log(`File size ${fileToCompress.size / 1024 / 1024} MB`); // smaller than maxSizeMB
		console.log(`File name ${fileToCompress.name}`); // smaller than maxSizeMB
		console.log(`File Index 0`, JSON.stringify(fileToCompress)); // smaller than maxSizeMB
		if (fileToCompress.type?.split('/')[0] == 'image') {
			const compressedFile = await imageCompression(fileToCompress, {
				maxSizeMB: 0.1,
				maxWidthOrHeight: 1024,
				useWebWorker: true
			});
			console.log(`without compressedFile(blob)`, JSON.stringify(compressedFile));
			console.log(
				`compressedFile into the file`,
				JSON.stringify(new File([compressedFile], compressedFile.name))
			);
			console.log('compressedFile instanceof Blob', JSON.stringify(compressedFile instanceof Blob)); // true
			console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
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
			console.log('file', JSON.stringify(file[i]));
			console.log('fileType', JSON.stringify(fileType));
			console.log('local url', JSON.stringify(URL.createObjectURL(files[i])));
			file = [
				...file,
				{
					file: fileType[0] == 'image' ? await getCompressFile(files[i]) : files[i],
					imgPath: URL.createObjectURL(files[i]),
					fileType: 'image',
					extension: '.jpg',
					type: fileType.join('/')
				}
			];
			console.log('fuck     file', JSON.stringify(file));
			setImages(file);
		}
	};
	const getSharedPosts = () => {
		// apiCall(
		// 	GET_SHARED_POSTS_FOR_TASKS(taskId),
		// 	{},
		// 	res => setData(prev => ({ ...prev, sharedPosts: res.results })),
		// 	err => console.log(err),
		// 	METHOD.GET,
		// 	getHeaderToken()
		// );
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
				{getRole() != 'w' && (
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
									<IconButton
										onClick={() => inputRef.current.click()}
										aria-label="Add photo"
										className="p-8"
									>
										<Icon>photo</Icon>
									</IconButton>
									<TippyMenu
										icon={
											<>
												{/* <InputLabel id="demo-simple-select-label">{t('LANGUAGE')}</InputLabel> */}
												<InputLabel id="demo-simple-select-label" className="p-8 border-2 mx-8">
													{postStatus ? 'Public' : 'Private'}
													<span className="arrow-icon">
														{' '}
														<KeyboardArrowDownIcon />{' '}
													</span>{' '}
												</InputLabel>
											</>
										}
										// ref={menuRef}
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
									<input
										hidden
										multiple
										type="file"
										accept="image/*"
										ref={inputRef}
										onChange={addPhoto}
									/>
								</div>
								<Button
									onClick={createPost}
									variant="contained"
									color="primary"
									size="large"
									aria-label="post"
									disabled={!text.length && !images?.length}
								>
									{t('POST')}
								</Button>
							</AppBar>
						</Card>

						{/* <Divider className="my-32" /> */}
					</div>
				)}
				{loading && (
					<div className="flex flex-1 flex-col items-center justify-center">
						<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
							Sto caricando i posts
						</Typography>
						<LinearProgress className="w-xs" color="secondary" />
					</div>
				)}
				<PostList
					isOffline
					tempAuthor={tempAuthor}
					isTask={isTask}
					taskId={taskId}
					posts={Object.values(offilePosts)}
					callRetryAfterSuccess={callRetryAfterSuccess}
				/>
				<PostList isTask={isTask} tempAuthor={tempAuthor} posts={data.posts} media={media.files} />
				<PostList isTask={isTask} tempAuthor={tempAuthor} posts={data.sharedPosts} />
			</div>
		</div>
	);
}

export default CreatePostForm;
