import {
	AppBar,
	Avatar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Icon,
	IconButton,
	Typography,
	Collapse,
	List,
	Paper,
	Input,
	CircularProgress,
	MenuItem,
	ListItemIcon
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	ADD_COMMENT_TO_POST,
	ADD_POST_TO_ACTIVITY,
	ADD_POST_TO_TASK,
	DELETE_POST,
	EDIT_POST,
	GET_COMMENT_OF_POST,
	SHARE_ACTIVITY_POST_TO_TASK
} from 'app/services/apiEndPoints';
import { getHeaderToken, getCompressFile, decodeDataFromToken } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import FuseUtils from '@fuse/utils';
import { toast } from 'react-toastify';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const TippyMenu = loadable(() => import('app/TippyMenu'));
const EditPostForm = loadable(() => import('./EditPostForm'));
const PostedImages = loadable(() => import('./PostedImages'));
const CommentListItem = loadable(() => import('./CommentListItem'));
const ImagesPreview = loadable(() => import('./ImagesPreview'));

const uuidv1 = require('uuid/v1');

export default function PostListItem({
	currnetPost,
	isTask,
	taskId,
	callRetryAfterSuccess,
	isOffline,
	tempAuthor,
	showPrject,
	showTask,
	media,
	afterDeletePost,
	nameSpace = 'todo_project'
}) {
	const { t } = useTranslation(nameSpace);
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const [text, setText] = useState('');
	const [images, setImages] = useState(null);
	const [open, setOpen] = React.useState(true);
	const [commentOpen, setCommentOpen] = React.useState(false);
	const [commentBoxOpen, setCommentBoxOpen] = React.useState(true);
	const [post, setPost] = React.useState({});
	const [postComments, setPostComments] = useState([]);
	const todoDialog = useSelector(state =>
		state.todoAppNote?.todos?.todoDialog ? state.todoAppNote.todos.todoDialog : state.todoApp.todos.todoDialog
	);
	const [offlinePostComments, setofflinePostComments] = useState({});
	const [isRetryingPost, setIsRetryingPost] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [isEditPost, setIsEditPost] = useState(false);
	const [loadMorePostIds, setLoadMorePostIds] = useState([]);
	const [loadMorePost, setLoadMorePost] = useState(false);
	const options = [
		{
			icon: 'edit',
			name: 'EDIT',
			handler: () => {
				setIsEditPost(true);
				setAnchorEl(null);
				// setEditText(comment.text);
				// setIsEditing(true);
			}
		},
		{
			icon: 'delete',
			name: 'DELETE',
			handler: e => {
				handleDeletePost();
				setAnchorEl(null);
			}
		}
	];
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const [hasRender, setHasRender] = React.useState(false);
	const [loading, setLoading] = useState(false);
	const [alertLoading, setAlertLoading] = useState(false);
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const okStateConfirmDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.okStateConfirmDialog);
	const statusPost = useSelector(({ todoAppNote }) => todoAppNote.todos.statusPost);
	const scrollRef = useRef(null);

	const hasNotifcationOnThisItem = notificationPanel.notificationData?.notification?.object_id == currnetPost.id;

	useEffect(() => {
		setPost(currnetPost);
		if (hasNotifcationOnThisItem) {
			setTimeout(() => {
				setHasRender(true);
			}, 300);
		} else {
			setHasRender(true);
		}
	}, [currnetPost]);

	useEffect(() => {
		if (post.comment_set) {
			setPostComments(post.comment_set);
			return () => setPostComments([]);
		}
	}, [post.comment_set]);

	useEffect(() => {
		const notification = notificationPanel.notificationData?.notification;
		if (notificationPanel.viewing && notification?.content_type == 'post' && hasRender && scrollRef.current) {
			dispatch(notificationActions.removeFrmViewNotification());
			scrollRef.current.scrollIntoView(false);
			scrollRef.current.classList.add('bg-yellow-200');
			setTimeout(() => {
				if (scrollRef.current) {
					scrollRef.current.classList.remove('bg-yellow-200');
				}
			}, 5000);
		}
	}, [notificationPanel.viewing, scrollRef, hasRender]);

	useEffect(() => {
		if ('id' in statusPost && okStateConfirmDialog) {
			apiCall(
				EDIT_POST(statusPost.id),
				{
					...statusPost,
					is_public: !statusPost.is_public
				},
				res => {
					if (statusPost.id === post.id) {
						setPost(cp => ({ ...statusPost, is_public: res.is_public }));
					}
					dispatch(Actions.closeStatusConfirmDialog());
					// setIsEditPost(false);
					setLoading(false);
				},
				err => {
					setLoading(false);
				},
				METHOD.PUT,
				getHeaderToken()
			);
		}
	}, [statusPost, okStateConfirmDialog]);

	const openMenu = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handlePostComment = e => {
		e.preventDefault();
		if (!text && !images) return;
		const unique_code = uuidv1();
		let media_set = [];
		if (images) {
			media_set = images.map(d => ({
				extension: d.extension,
				media_url: d.imgPath,
				name: d.file.name,
				type: d.type
			}));
		}

		const formData = new FormData();
		formData.append('parent', '');
		const values = {
			text,
			unique_code
		};
		if (images) {
			const acceptedFiles = images.map(d => d.file);
			let i = 0;
			for (const file of acceptedFiles) {
				formData.append(`media[${i}]`, file, file.name);
				i += 1;
			}
		}
		for (const key in values) {
			formData.append(key, values[key]);
		}
		const tempComment = {
			author: tempAuthor,
			replies_set: [],
			media_set,
			text,
			unique_code,
			parent: null,
			formData
		};
		const tempofflinePostComments = { ...offlinePostComments, [unique_code]: tempComment };
		setofflinePostComments(tempofflinePostComments);
		apiCall(
			ADD_COMMENT_TO_POST(post.id),
			formData,
			res => {
				delete tempofflinePostComments[res.unique_code];
				setofflinePostComments(tempofflinePostComments);
				getComments();
				setText('');
			},
			err => {
				tempofflinePostComments[unique_code] = {
					...tempofflinePostComments[unique_code],
					retryOption: true
				};
				setofflinePostComments(tempofflinePostComments);
				forceUpdate();
			},
			METHOD.POST,
			getHeaderToken()
		);
		setImages(null);
		document.getElementById(String(post.id)).value = '';
		setText('');
	};
	const getComments = setIsEditing => {
		apiCall(
			GET_COMMENT_OF_POST(post.id),
			{},
			res => {
				setPostComments(res.results);
				if (setIsEditing) {
					setIsEditing(false);
				}
			},
			err => {
				if (setIsEditing) {
					setIsEditing(false);
				}
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	const handleAlertPost = () => {
		setAlertLoading(true);
		apiCall(
			EDIT_POST(post.id),
			{
				...post,
				alert: !post.alert
			},
			res => {
				setPost(currnetPost => ({ ...currnetPost, alert: res.alert }));
				setAlertLoading(false);
			},
			err => {
				// console.log(err),
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};
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
	const replaceImageUrl = (url, index) => {
		images[index] = {
			...images[index],
			imgPath: url,
			file: FuseUtils.dataURItoFile(url)
		};
		// console.log('Fileurl', URL.createObjectURL(FuseUtils.dataURItoFile(url)));
		setImages(images);
	};
	const sharePost = () => {
		apiCall(
			SHARE_ACTIVITY_POST_TO_TASK(post.id),
			{},
			res => {
				toast.success('Shared To Task');
			},
			err => {
				// console.log(err);
			},
			METHOD.POST,
			getHeaderToken()
		);
	};
	const retryToPost = () => {
		setIsRetryingPost(true);
		apiCall(
			isTask ? ADD_POST_TO_TASK(taskId) : ADD_POST_TO_ACTIVITY(todoDialog.data.todo?.id),
			currnetPost.formData,
			res => {
				callRetryAfterSuccess(currnetPost.unique_code, res);
				setIsRetryingPost(false);
			},
			(err, request, error) => {
				setIsRetryingPost(false);
			},
			METHOD.POST,
			getHeaderToken()
		);
	};
	const showComments = () => Object.values(offlinePostComments).length || (postComments && postComments.length > 0);
	const commentsLength = () => Object.values(offlinePostComments).length + postComments.length;
	const callRetryCommentSuccess = unique_code => {
		const tempofflinePostComments = { ...offlinePostComments };
		delete tempofflinePostComments[unique_code];
		setofflinePostComments(tempofflinePostComments);
		getComments();
	};
	const deleteCommentByIndex = index => setPostComments(prevComments => prevComments.filter((d, i) => i != index));
	const handleDeletePost = () => {
		apiCall(
			DELETE_POST(post.id),
			{},
			res => afterDeletePost(),
			err => {
				// console.log(err),
			},
			METHOD.DELETE,
			getHeaderToken()
		);
	};
	if (!Object.entries(post).length) {
		return null;
	}

	const loadMorePostFunc = id => {
		const newLoadMorePostIds = [...loadMorePostIds, id];
		setLoadMorePost(true);
		setLoadMorePostIds(newLoadMorePostIds);
	};

	const onStatusChange = () => {
		dispatch(Actions.openStatusConfirmDialog(post));
		// setLoading(true);
		// apiCall(
		// 	EDIT_POST(post.id),
		// 	{
		// 		...post,
		// 		is_public: !post.is_public
		// 	},
		// 	res => {
		// 		setPost(cp => ({ ...cp, ...res }));
		// 		// setIsEditPost(false);
		// 		setLoading(false);
		// 	},
		// 	err => {
		// 		setLoading(false);
		// 		console.log(err);
		// 	},
		// 	METHOD.PUT,
		// 	getHeaderToken()
		// );
	};

	const onNotificationClick = () => {
		dispatch(Actions.openNotificationDialog(post));
	};

	return (
		<Card
			id={`post${post.id}`}
			ref={notificationPanel.notificationData?.notification?.object_id == post.id ? scrollRef : null}
			key={post.id}
			className="mb-40 overflow-hidden post-card-clx"
		>
			<CardHeader
				className="bg-dark-blue"
				avatar={
					post.author.first_name ? (
						<Avatar aria-label="Recipe" src={post.author.photo} className="sm:h-60 sm:w-60  h-48 w-48">
							{[...post.author.first_name][0]}{' '}
						</Avatar>
					) : null
				}
				action={
					<div className="sm:px-8 text-white flex">
						{isOffline && !currnetPost.successAfterRetry && (
							<>
								{
									currnetPost.retryOption && !isRetryingPost ? (
										<Button onClick={retryToPost}>Retry</Button>
									) : null // <Box position="relative" display="inline-flex">
									// 	<CircularProgress size={20} className="mt-10 mr-24" color="secondary" />
									// 	<Box
									// 		top={20}
									// 		left={0}
									// 		bottom={0}
									// 		right={0}
									// 		position="absolute"
									// 		display="flex"
									// 		alignItems="center"
									// 		justifyContent="center"
									// 	>
									// 		<FontAwesomeIcon
									// 			icon={faUpload}
									// 			className="text-default"
									// 			style={{ fontSize: '1.6rem' }}
									// 		/>
									// 	</Box>
									// </Box>
								}
							</>
						)}
						{/* <IconButton
							onClick={ev => {
								ev.preventDefault();
								ev.stopPropagation();
								handleAlertPost();
							}}
							className="text-default p-8"
						>
							{post.alert ? (
								<Icon style={{ color: red[500] }}>new_releases</Icon>
							) : (
								<Icon>new_releases</Icon>
							)}
						</IconButton> */}
						{/* {tempAuthor.id == post.author.id && ( */}
						<div className="inline">
							<TippyMenu
								icon={
									<>
										<IconButton
											aria-label="more"
											aria-controls="long-menu"
											aria-haspopup="true"
											className="sm:p-8 text-white py-8 px-0"
										>
											<MoreVertIcon />
										</IconButton>
									</>
								}
								outsideClick
							>
								{options.map(option => (
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
						{/* )} */}
						{/* <IconButton className="text-default p-8" aria-label="more">
							<Icon>more_vert</Icon>
						</IconButton> */}
					</div>
				}
				title={
					<span>
						{/* <div className="flex">
							<Typography
								className="font-700 capitalize sm:text-14 lg:text-lg"
								color="primary"
								paragraph={false}
							>
								{post.author.first_name} {post.author.last_name}
							</Typography>
							{post.type === 'post' && <span>posted on your timeline</span>}
							{post.type === 'something' && <span>shared something with you</span>}
							{post.type === 'video' && <span>shared a video with you</span>}
							{post.type === 'article' && <span>shared an article with you</span>}
							<span className="sm:text-14 lg:text-lg pl-6 font-600">added a new video to</span>
							<Typography
								className="font-700 capitalize sm:text-14 lg:text-lg pl-6"
								color="primary"
								paragraph={false}
							>
								{post.task.name}
							</Typography>
						</div> */}
						<div className="flex flex-wrap">
							<p>
								<span className="font-700 capitalize text-15 text-white lg:text-lg">
									{post.author.first_name} {post.author.last_name}
								</span>
								{/* {post.type === 'post' && <span className="text-15 lg:text-lg pl-2 sm:pl-6 font-600"> posted on your timeline </span>}
								{post.type === 'something' && <span className="text-15 lg:text-lg pl-2 sm:pl-6 font-600"> shared something with you </span>}
								{post.type === 'video' && <span className="text-15 lg:text-lg pl-2 sm:pl-6 font-600"> shared a video with you </span>}
								{post.type === 'article' && <span className="text-15 lg:text-lg pl-2 sm:pl-6 font-600"> shared an article with you </span>}
								<span className="text-15 lg:text-lg pl-2 sm:pl-6 font-600"> added a new video to </span>
								<span className="font-700 capitalize text-15 lg:text-lg pl-2 sm:pl-6">
									{'task' in post ? post.task.name : ''}
								</span> */}
							</p>
						</div>
						<div className="text-13 sm:text-15 lg:text-base text-white font-600">
							{post.author.position}
							{'company' in post.author ? ` - ${post.author.company.name}` : ''}
						</div>
						{/* <div className="">
							{showPrject && (
								<>
									<div className="mr-4 flex">
										<Icon className="text-16 mt-10 mr-4">work_outline</Icon>
										<Typography
											variant="h6"
											className="font-600 capitalize"
											color="primary"
											paragraph={false}
										>
											{post.project.name}
										</Typography>
									</div>
									<div className="mx-4">
										<Typography className="font-600 capitalize" color="secondary" paragraph={false}>
											{post.task.name}
										</Typography>
									</div>
									<div className="mx-4 pt-6">
										<Typography className="font-600 capitalize" color="secondary" paragraph={false}>
											{post.sub_task.title}
										</Typography>
									</div>
								</>
							)}
						</div> */}
					</span>
				}
				subheader={
					<div className="flex items-center text-14 font-600">
						<Icon className="font-600 text-white text-18">public</Icon>
						<span className="ml-4 sm:mr-16 text-white mr-4">
							{post.is_public ? t('STATUS_PUBLIC') : t('STATUS_PRIVATE')}
						</span>
						<span className="text-white">
							{`${moment.parseZone(post.published_date).format('MMMM DD')} at ${moment
								.parseZone(post.published_date)
								.format('h:mm a')}`}
						</span>
					</div>
				}
			/>
			{isEditPost ? (
				<CardContent className="p-0">
					<EditPostForm {...{ currnetPost, setIsEditPost, setPost }} />
				</CardContent>
			) : (
				<CardContent className="p-0">
					{post.text && (
						<Typography component="p" className="my-16 px-16 text-lg">
							{post.text}
						</Typography>
					)}
					<div>
						<PostedImages images={post.media_set} showClick media={media} />
					</div>
					{/* {post.media && <img src={post.media} alt="post" />} */}
				</CardContent>
			)}

			{/* {getRole() != 'w' && !isTask && (
				<CardActions disableSpacing className="bg-custom-primary px-12 py-4 flex justify-center">
					<Button size="small" className="text-white text-13" aria-label="Add to favorites">
						<Icon className="text-white text-14">favorite</Icon>
						<Typography className="normal-case text-white text-13 mx-4">Like</Typography>
						<Typography className="normal-case text-13">({post.like})</Typography>
					</Button>
					<Button aria-label="Share" className="text-white text-13" onClick={sharePost}>
						<Icon className="text-white text-14">share</Icon>
						<Typography className="normal-case text-white text-13 mx-4">{t('SHARE')}</Typography>
						{!!post.share && (
							<>
								<Typography className="normal-case text-13">({post.share})</Typography>
							</>
						)}
					</Button>
				</CardActions>
			)} */}

			{/* ----------------- Show Comments and likes ---------------*/}
			<AppBar
				className="card-footer flex flex-column p-16 bg-white"
				position="static"
				color="default"
				elevation={0}
			>
				<div className="flex flex-wrap items-center mb-12 cursor-pointer justify-between">
					<div className="flex">
						<Avatar aria-label="Recipe" src={post.author.photo} className="h-32 w-32 mr-8" />
						<Avatar aria-label="Recipe" src={post.author.photo} className="h-32 w-32 mr-8" />
						<Avatar aria-label="Recipe" src={post.author.photo} className="h-32 w-32 mr-8" />
					</div>
					{/* {showComments() && ( */}
					<div
						className="flex items-start mb-12 cursor-pointer"
						onClick={ev => {
							ev.preventDefault();
							ev.stopPropagation();
							setOpen(!open);
							setCommentOpen(!commentOpen);
						}}
					>
						<Icon fontSize="small" className="mr-4">
							comment
						</Icon>
						{/* <span className="text-base font-600 hover:underline">
								{commentsLength() > 0
									? commentsLength() === 1
										? `${commentsLength()} comment`
										: `${commentsLength()} comments`
									: 'comment'}
							</span> */}
					</div>
					{/* )} */}
				</div>

				<div className="flex justify-around social-border my-8">
					<IconButton
						aria-label="more"
						aria-controls="long-menu"
						aria-haspopup="true"
						onClick={ev => {
							ev.preventDefault();
							ev.stopPropagation();
							handleAlertPost();
						}}
						edge={false}
						size="small"
						classes={{ root: post.alert ? 'text-white bg-red-500 hover:bg-red-500' : 'text-black' }}
						className="justify-center w-1/3 text-18 font-500 my-8 p-6 posts-social-icon"
					>
						{post.alert ? (
							<Icon fontSize="small" className="mr-4">
								new_releases
							</Icon>
						) : (
							<Icon fontSize="small" className="mr-4">
								new_releases
							</Icon>
						)}
						<span>{t('ALERT')}</span>
						{alertLoading && <CircularProgress size={20} className="ml-10" color="black" />}
					</IconButton>
					<IconButton
						aria-label="more"
						aria-controls="long-menu"
						aria-haspopup="true"
						onClick={onNotificationClick}
						edge={false}
						size="small"
						className="justify-center w-1/3 text-18 font-500 my-8 posts-social-icon text-black"
					>
						<Icon fontSize="small" className="mr-4">
							notifications_active
						</Icon>
						<span>{t('SEND_NOTIFICATION')}</span>
					</IconButton>
					{getRole() !== 'w' && (
						<IconButton
							aria-label="more"
							aria-controls="long-menu"
							aria-haspopup="true"
							onClick={onStatusChange}
							edge={false}
							size="small"
							className="justify-center w-1/3 text-18 font-500 my-8 posts-social-icon text-black"
						>
							<Icon fontSize="small" className="mr-4">
								{post.is_public ? 'visibility' : 'visibility_off'}
							</Icon>
							<span>{post.is_public ? t('STATUS_PUBLIC') : t('STATUS_PRIVATE')}</span>
						</IconButton>
					)}
				</div>

				{showComments() && (
					<Collapse in={open} timeout="auto" unmountOnExit className="mt-10">
						<List className="pt-0">
							{postComments.map((comment, index) => {
								if (loadMorePostIds.includes(post.id) && loadMorePost) {
									{
										/* if(index <=2 ) { */
									}
									return (
										<CommentListItem
											tempAuthor={tempAuthor}
											key={index}
											post={post}
											setCommentOpen={setCommentBoxOpen}
											commentBoxOpen={commentBoxOpen}
											comment={comment}
											afterDeleteComment={() => deleteCommentByIndex(index)}
											needToGetComments={getComments}
										/>
									);
									{
										/* } */
									}
								}
								if (index <= 2) {
									return (
										<CommentListItem
											tempAuthor={tempAuthor}
											key={index}
											post={post}
											setCommentOpen={setCommentBoxOpen}
											commentBoxOpen={commentBoxOpen}
											comment={comment}
											afterDeleteComment={() => deleteCommentByIndex(index)}
											needToGetComments={getComments}
										/>
									);
								}
							})}
							{Object.values(offlinePostComments).map((comment, index) => (
								<CommentListItem
									isOffline
									tempAuthor={tempAuthor}
									key={comment.unique_code}
									callRetryCommentSuccess={callRetryCommentSuccess}
									post={post}
									setCommentOpen={setCommentBoxOpen}
									commentBoxOpen={commentBoxOpen}
									comment={{ ...comment, author: tempAuthor }}
								/>
							))}
						</List>
						{!loadMorePostIds.includes(post.id) && postComments.length > 3 && (
							<IconButton
								className="text-16 my-8 posts-social-icon"
								onClick={() => {
									loadMorePostFunc(post.id);
								}}
								// aria-label="Add photo"
							>
								<span className="font-700 mr-4 hover:underline">{`View ${
									postComments.length - 3
								} more ${postComments.length - 3 > 1 ? 'comments' : 'comment'}`}</span>
							</IconButton>
						)}
					</Collapse>
				)}

				{open && commentBoxOpen && (!isOffline || currnetPost.successAfterRetry) && getRole() != 'w' && (
					<div className="flex flex-auto mt-10">
						<Avatar className="mr-10" src={post.author.photo} />
						<div className="flex-1">
							<Paper elevation={0} className="w-full relative post-icons rounded-32 comment-box">
								<Input
									className="pl-12 pr-80 py-8 w-full comment-area"
									id={String(post.id)}
									classes={{ root: 'text-base' }}
									placeholder={t('ADD_COMMENT')}
									multiline
									disableUnderline
									value={text}
									onChange={e => setText(e.target.value)}
								/>
								<IconButton
									className="image p-0"
									onClick={() => inputRef.current.click()}
									aria-label="Add photo"
								>
									<Icon>photo</Icon>
								</IconButton>
								<input
									hidden
									type="file"
									accept="image/*, video/*"
									ref={inputRef}
									onChange={addPhoto}
								/>
								<IconButton
									className="send p-0"
									onClick={handlePostComment}
									aria-label="Send"
									disabled={!text && !images}
								>
									<Icon>send</Icon>
								</IconButton>
							</Paper>
							{images && <ImagesPreview images={images} replaceUrl={replaceImageUrl} />}
						</div>
					</div>
				)}
			</AppBar>
		</Card>
	);
}
