import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	ADD_POST_TO_ACTIVITY,
	GET_POST_TO_ACTIVITY,
	GET_POST_FOR_TASK,
	ADD_POST_TO_TASK,
	GET_SHARED_POSTS_FOR_TASKS
} from 'app/services/apiEndPoints';
import { getHeaderToken, getCompressFile } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import * as Actions from './store/actions';
import ImagesPreview from './ImagesPreview';
import PostList from './PostList';
import moment from 'moment';
import FuseUtils from '@fuse/utils';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
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
	} else {
		return {
			media_set: []
		};
	}
};
function CreatePostForm({ isTask, taskId }) {
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

	const [media, setMedia] = useState({ files: [] });
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	let notification = notificationPanel.notificationData?.notification;
	let scrollRef = document.getElementById(`post${notification?.object_id}`);
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
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	const createPost = async () => {
		var formData = new FormData();
		const unique_code = uuidv1();
		let values = {
			text,
			unique_code
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
				formData.append('media[' + i + ']', file, file.name);
				i += 1;
			}
		}
		for (let key in values) {
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
		let tempOfflinePosts = { ...offilePosts, [unique_code]: tempPost };
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
				onUploadProgress: function (progressEvent) {
					var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
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
		const files = e.currentTarget.files;
		const fileToCompress = e.currentTarget.files[0];
		console.log(`File size ${fileToCompress.size / 1024 / 1024} MB`); // smaller than maxSizeMB
		console.log(`File Index 0`, fileToCompress); // smaller than maxSizeMB
		if (fileToCompress.type?.split('/')[0] == 'image') {
			const compressedFile = await imageCompression(fileToCompress, {
				maxSizeMB: 0.1,
				maxWidthOrHeight: 1024,
				useWebWorker: true
			});
			console.log(`without compressedFile(blob)`, compressedFile);
			console.log(`compressedFile into the file`, new File([compressedFile], compressedFile.name));
			console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
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
		for (var i = 0; i < files.length; i++) {
			let fileType = files[i].type?.split('/');
			console.log({ fileType });
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
	const getSharedPosts = () => {
		apiCall(
			GET_SHARED_POSTS_FOR_TASKS(taskId),
			{},
			res => setData(prev => ({ ...prev, sharedPosts: res.results })),
			err => console.log(err),
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
		let tempPosts = { ...offilePosts };
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
			<div className="flex flex-col flex-1 ml-8">
				<div>
					<Card className="w-full overflow-hidden post-form mb-20 post-card-clx">
						<Input
							id="addPost"
							className="p-16 w-full write-post"
							classes={{ root: 'text-14' }}
							placeholder="Write something.."
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
							<div className="add-photo-image">
								<IconButton
									onClick={() => inputRef.current.click()}
									aria-label="Add photo"
									className="p-8"
								>
									<Icon>photo</Icon>
								</IconButton>
								<input
									hidden
									multiple
									type="file"
									accept="image/*, video/*"
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
								//disabled={!text.length}
							>
								Post
							</Button>
						</AppBar>
					</Card>

					{/* <Divider className="my-32" /> */}
				</div>

				<PostList
					isOffline
					tempAuthor={tempAuthor}
					isTask={isTask}
					taskId={taskId}
					posts={Object.values(offilePosts)}
					callRetryAfterSuccess={callRetryAfterSuccess}
				/>
				<PostList tempAuthor={tempAuthor} posts={data.posts} media={media.files} />
				<PostList tempAuthor={tempAuthor} posts={data.sharedPosts} />
			</div>
		</div>
	);
}

export default CreatePostForm;
