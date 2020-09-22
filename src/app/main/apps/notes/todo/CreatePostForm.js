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
	ADD_POST_TO_TASK
} from 'app/services/apiEndPoints';
import { getHeaderToken, getCompressFile } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import * as Actions from './store/actions';
import ImagesPreview from './ImagesPreview';
import PostList from './PostList';
import moment from 'moment';
import FuseUtils from '@fuse/utils';

function CreatePostForm({ isTask, taskId }) {
	const dispatch = useDispatch();
	const [data, setData] = useState(null);
	const [text, setText] = useState('');
	const [images, setImages] = useState(null);
	const [viewCroper, setViewCroper] = useState(false);
	const [file, setFile] = useState({
		fileData: undefined,
		imagePreviewUrl: undefined
	});
	const inputRef = useRef(null);
	const todoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.todoDialog);
	useEffect(() => {
		setData({});
		if (todoDialog.data?.id) {
			getPosts();
		}
	}, [todoDialog.data]);
	useEffect(() => {
		setData({});
		if (isTask) {
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
			isTask ? GET_POST_FOR_TASK(taskId) : GET_POST_TO_ACTIVITY(todoDialog.data?.id),
			{},
			res => setData({ posts: res.results }),
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	const createPost = async () => {
		var formData = new FormData();
		let values = {
			text
		};

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
		apiCall(
			isTask ? ADD_POST_TO_TASK(taskId) : ADD_POST_TO_ACTIVITY(todoDialog.data?.id),
			formData,
			res => {
				document.getElementById('addPost').value = '';
				setImages(null);
				getPosts();
			},
			err => console.log(err),
			METHOD.POST,
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
			file = [
				...file,
				{
					file: await getCompressFile(files[i]),
					imgPath: URL.createObjectURL(files[i]),
					fileType: files[i].type?.split('/')[0]
				}
			];
			setImages(file);
		}
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
	if (!data) {
		return null;
	}
	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1">
				<div>
					<Card className="w-full overflow-hidden post-form mb-32 post-card-clx">
						<Input
							id="addPost"
							className="p-16 w-full write-post"
							classes={{ root: 'text-14' }}
							placeholder="Write something.."
							multiline
							rows="6"
							margin="none"
							disableUnderline
							onChange={e => setText(e.target.value)}
						/>
						{images && <ImagesPreview images={images} replaceUrl={replaceImageUrl} />}

						<AppBar
							className="card-footer flex flex-row border-t-1"
							position="static"
							color="default"
							elevation={0}
						>
							<div className="flex-1 items-center">
								<IconButton onClick={() => inputRef.current.click()} aria-label="Add photo">
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

							<div className="p-8">
								<Button
									onClick={createPost}
									variant="contained"
									color="primary"
									size="small"
									aria-label="post"
									disabled={!text.length}
								>
									POST
								</Button>
							</div>
						</AppBar>
					</Card>

					{/* <Divider className="my-32" /> */}
				</div>

				<PostList posts={data.posts} />
			</div>
		</div>
	);
}

export default CreatePostForm;
