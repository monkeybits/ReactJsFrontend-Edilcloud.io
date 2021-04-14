/* =============================================================================
 Todo: CreatePostForm.js
 ===============================================================================
*This File is written for Dashboard
Todo: This File is created for create timeline posts and view timeline 
*/
import { AppBar, Button, Card, Icon, IconButton, Input, Typography, LinearProgress } from '@material-ui/core';
import loadable from '@loadable/component';
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
import Dropzone from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
const ImagesPreview = loadable(() => import('app/main/apps/notes/todo/ImagesPreview'))
const PostList = loadable(() => import('app/main/apps/notes/todo/PostList'))

const uuidv1 = require('uuid/v1');

/**
 * below function will return all medial files from all posts and merge them to single array so when user click on post he can browse medai files directly
 */
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
	const { t } = useTranslation('dashboard');
	const dispatch = useDispatch();
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const user = useSelector(({ auth }) => auth.user.data.company);
	const [tempAuthor, setTempAuthor] = useState({});
	const [data, setData] = useState({ posts: [] });
	const [media, setMedia] = useState({ files: [] });
	const [offilePosts, setOffilePosts] = useState({});
	const [text, setText] = useState('');
	const [images, setImages] = useState(null);
	const [viewCroper, setViewCroper] = useState(false);
	const [loading, setLoading] = useState(false);
	const [file, setFile] = useState({
		fileData: undefined,
		imagePreviewUrl: undefined
	});
	const inputRef = useRef(null);
	const todoDialog = useSelector(({ todoApp }) => todoApp.todos.todoDialog);
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
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
		if (isTask) {
			setData({
				posts: []
			});
			getSharedPosts();
			getPosts();
		}
	}, [isTask, taskId]);
	function closeTodoDialog() {
		return todoDialog.type === 'edit'
			? dispatch(Actions.closeActivityTodoDialog())
			: dispatch(Actions.closeActivityTodoDialog());
	}
	/**
	 * below function will return posts on activity or on task based on condition. if its task "isTask" wii be true else it false and it must be an activity
	 */
	const getPosts = () => {
		setLoading(true);
		apiCall(
			isTask ? GET_POST_FOR_TASK(taskId) : GET_POST_TO_ACTIVITY(todoDialog.data.todo?.id),
			{},
			res => {
				setLoading(false);
				setData({ posts: res.results });
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
	/**
	 * below function will is defined to upload/create post on task or activity
	 */
	const createPost = async () => {
		const formData = new FormData();
		const unique_code = uuidv1();
		const values = {
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
		console.log('media_set', JSON.stringify(media_set));
		const tempOfflinePosts = { ...offilePosts, [unique_code]: tempPost };
		setOffilePosts(tempOfflinePosts);
		dispatch(Actions.setUpload(true));
		apiCall(
			isTask ? ADD_POST_TO_TASK(taskId) : ADD_POST_TO_ACTIVITY(todoDialog.data.todo?.id),
			formData,
			res => {
				dispatch(Actions.setUpload(false));
				console.log('res', JSON.stringify(res));
				delete tempOfflinePosts[res.unique_code];
				setOffilePosts(tempOfflinePosts);
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
				console.log('err', JSON.stringify(err));
				console.log('tempOfflinePosts', JSON.stringify(tempOfflinePosts));
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

	/**
	 * below function is used to add media file before post it will store all files locallay on state called "fileData"
	 */

	const updateImage = async (string) => {
		let files = []
		var extToMimes = {
			'image/jpeg': '.jpg',
			'image/png': '.png',
			'application/pdf': '.pdf',
			'application/json': '.json',
			'application/vnd.ms-excel': '.xls',
			'text/csv': '.csv',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
			'audio/mp4': '.mp4a',
			'video/mp4': '.mp4',
			'application/mp4': '.mp4',
		}

		let randomName = '';
		for(let i = 0; i < 8; i++){
			const random = Math.floor(Math.random() * 27);
			randomName += String.fromCharCode(97 + random);
		};

		// var string = 'data:image/png;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K';
		var dataWithMimeType = string.substr(0, string.indexOf(';'));
		var mimeT = dataWithMimeType.split(':')[1]; 
		var fileObject = dataURLtoFile(string, randomName + extToMimes[mimeT]);
		console.log('file???????????????????????', fileObject)
		files.push(fileObject)

		const fileToCompress = files[0];
		console.log(`File size ${fileToCompress.size / 1024 / 1024} MB`); // smaller than maxSizeMB
		console.log(`File Index 0`, JSON.stringify(fileToCompress)); // smaller than maxSizeMB
		if (fileToCompress.type?.split('/')[0] == 'image') {
			const compressedFile = await imageCompression(fileToCompress, {
				maxSizeMB: 0.1,
				maxWidthOrHeight: 1024,
				useWebWorker: true
			});
			console.log(`with compressedFile(blob)`, JSON.stringify(compressedFile));
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
			console.log('file', JSON.stringify(files[i]));
			console.log('fileType', JSON.stringify(fileType));
			console.log('local url', JSON.stringify(URL.createObjectURL(files[i])));
			file = [
				...file,
				{
					file: fileType[0] == 'image' ? await getCompressFile(files[i]) : files[i], // if file is image then we need to reduce the size of image by calling the getCompressFile function
					imgPath: URL.createObjectURL(files[i]),
					fileType: fileType[0],
					extension: `.${fileType[1]}`,
					type: fileType.join('/')
				}
			];
			setImages(file);
		}
	}

	const dataURLtoFile = (dataurl, filename) => {
		var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
	}

	const addPhoto = async files => {
		console.log('files???????????????????', files)
		// const files = e.currentTarget.files;
		const fileToCompress = files[0];
		console.log(`File size ${fileToCompress.size / 1024 / 1024} MB`); // smaller than maxSizeMB
		console.log(`File Index 0`, JSON.stringify(fileToCompress)); // smaller than maxSizeMB
		if (fileToCompress.type?.split('/')[0] == 'image') {
			const compressedFile = await imageCompression(fileToCompress, {
				maxSizeMB: 0.1,
				maxWidthOrHeight: 1024,
				useWebWorker: true
			});
			console.log(`with compressedFile(blob)`, JSON.stringify(compressedFile));
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
			console.log('file', JSON.stringify(files[i]));
			console.log('fileType', JSON.stringify(fileType));
			console.log('local url', JSON.stringify(URL.createObjectURL(files[i])));
			file = [
				...file,
				{
					file: fileType[0] == 'image' ? await getCompressFile(files[i]) : files[i], // if file is image then we need to reduce the size of image by calling the getCompressFile function
					imgPath: URL.createObjectURL(files[i]),
					fileType: fileType[0],
					extension: `.${fileType[1]}`,
					type: fileType.join('/')
				}
			];
			setImages(file);
		}
	};
	/**
	 * below function is to get shared posts from activity
	 */
	const getSharedPosts = () => {
		// apiCall(
		// 	GET_SHARED_POSTS_FOR_TASKS(taskId),
		// 	{},
		// 	res => setData(prev => ({ sharedPosts: res.results })),
		// 	err => console.log(err),
		// 	METHOD.GET,
		// 	getHeaderToken()
		// );
	};
	/**
	 * below function is to replace image URL from blob to base64, check FuseUtils.dataURItoFile
	 */
	const replaceImageUrl = (url, index) => {
		images[index] = {
			...images[index],
			imgPath: url,
			file: FuseUtils.dataURItoFile(url) // blob to base64
		};
		// console.log('Fileurl', URL.createObjectURL(FuseUtils.dataURItoFile(url)));
		setImages(images);
	};
	/**
	 * below function is used for retry upload the post when it API filed to upload the post
	 */
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

	const onAddPhoto = () => {
		try {
			if(window.webkit.messageHandlers) {
				window.webkit.messageHandlers.UploadImage.postMessage("Start Image Loading")
			}
		} catch (e) {
			console.log('error', e);
		}
	}

	if (!data) {
		return null;
	}
	return (
		<div className="md:flex max-w-2xl">
			<div className="flex flex-col flex-1">
				{getRole() != 'w' && ( // when You have permission to upload post
					<div>
						<Card className="w-full overflow-hidden mb-20 post-card-clx">
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
									<Dropzone onDrop={addPhoto}>
										{({ getRootProps, getInputProps }) => (
											<section>
												<div {...getRootProps()}>
													<IconButton
														onClick={onAddPhoto}
														aria-label="Add photo"
														className="p-8"
													>
														<Icon>add_a_photo</Icon>
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
								</div>
								<Button
									onClick={createPost}
									variant="contained"
									color="primary"
									size="small"
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
				{loading && ( // when posts are loading
					<div className="flex flex-1 flex-col items-center justify-center">
						<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
							Sto caricando i posts
						</Typography>
						<LinearProgress className="w-xs" color="secondary" />
					</div>
				)}
				{/**
				 * it will show posts
				
				*/}
				<PostList
					isOffline
					tempAuthor={tempAuthor} // pass the current user
					isTask={isTask} // pass is task or not | currently it passed from parent component
					taskId={taskId} // pass task id
					posts={Object.values(offilePosts)} //  pass all posts
					callRetryAfterSuccess={callRetryAfterSuccess} // below function is used edit post locally
					nameSpace="dashboard" // pass name sapce it will be  used for translate
				/>
				<PostList
					isTask={isTask}
					tempAuthor={tempAuthor}
					posts={data.posts}
					media={media.files}
					nameSpace="dashboard"
				/>
				<PostList isTask={isTask} tempAuthor={tempAuthor} posts={data.sharedPosts} nameSpace="dashboard" />
			</div>
		</div>
	);
}

export default CreatePostForm;
