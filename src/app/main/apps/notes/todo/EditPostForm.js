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
	GET_SHARED_POSTS_FOR_TASKS,
	EDIT_POST
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
import { CircularProgress } from '@material-ui/core';
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
function EditPostForm(props) {
	const { isTask, taskId, postId, setIsEditPost, currnetPost, setPost } = props;
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
			err => console.log(err),
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
				text
			},
			res => {
				setPost(cp => ({ ...cp, ...res }));
				setIsEditPost(false);
				setLoading(false);
			},
			err => {
				setLoading(false);
				console.log(err);
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};

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
							<div>
								<Button
									className="mr-4"
									onClick={editPost}
									variant="contained"
									color="primary"
									size="large"
									aria-label="post"
									//disabled={!text.length}
								>
									Save {loading && <CircularProgress size={20} color="secondary" className="ml-20" />}
								</Button>
								<Button
									onClick={() => setIsEditPost(false)}
									color="secondary"
									size="large"
									aria-label="post"
									//disabled={!text.length}
								>
									Cancel
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
