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
	Input
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
import { red } from '@material-ui/core/colors';
import { toast } from 'react-toastify';
import TippyMenu from 'app/TippyMenu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import { useTranslation } from 'react-i18next';
import EditPostForm from './EditPostForm';
import PostedImages from './PostedImages';
import CommentListItem from './CommentListItem';
import ImagesPreview from './ImagesPreview';

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
	const [open, setOpen] = React.useState(false);
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
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const scrollRef = useRef(null);

	const hasNotifcationOnThisItem = notificationPanel.notificationData?.notification?.object_id == currnetPost.id;
	console.log({ hasNotifcationOnThisItem });
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
			},
			err => {
				tempofflinePostComments[unique_code] = {
					...tempofflinePostComments[unique_code],
					retryOption: true
				};
				console.log({ myErrorComment: err, tempofflinePostComments });
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
				console.log(err);
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	const handleAlertPost = () => {
		apiCall(
			EDIT_POST(post.id),
			{
				...post,
				alert: !post.alert
			},
			res => {
				setPost(currnetPost => ({ ...currnetPost, alert: res.alert }));
			},
			err => console.log(err),
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
				console.log(err);
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
				console.log({ myError: err, request, error });
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
			err => console.log(err),
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
		console.log('newLoadMorePostIds>>>>>>>>>>>>>>>', newLoadMorePostIds);
	};

	console.log('post>>>>>>>>>>>>>>>>>>', post);
	return (
		<Card
			id={`post${post.id}`}
			ref={notificationPanel.notificationData?.notification?.object_id == post.id ? scrollRef : null}
			key={post.id}
			className="mb-32 overflow-hidden post-card-clx"
		>
			<CardHeader
				avatar={
					post.author.first_name ? (
						<Avatar aria-label="Recipe" src={post.author.photo} className="sm:h-60 sm:w-60 h-48 w-48">
							{[...post.author.first_name][0]}{' '}
						</Avatar>
					) : null
				}
				action={
					<div className="sm:px-8 flex">
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
						{tempAuthor.id == post.author.id && (
							<div className="inline">
								<TippyMenu
									icon={
										<>
											<IconButton
												aria-label="more"
												aria-controls="long-menu"
												aria-haspopup="true"
												className="sm:p-8 py-8 px-0"
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
						)}
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
								<span className="font-700 capitalize text-15 lg:text-lg">
									{post.author.first_name} {post.author.last_name}
								</span>
								{post.type === 'post' && <span className="text-15 lg:text-lg pl-2 sm:pl-6 font-600"> posted on your timeline </span>}
								{post.type === 'something' && <span className="text-15 lg:text-lg pl-2 sm:pl-6 font-600"> shared something with you </span>}
								{post.type === 'video' && <span className="text-15 lg:text-lg pl-2 sm:pl-6 font-600"> shared a video with you </span>}
								{post.type === 'article' && <span className="text-15 lg:text-lg pl-2 sm:pl-6 font-600"> shared an article with you </span>}
								<span className="text-15 lg:text-lg pl-2 sm:pl-6 font-600"> added a new video to </span>
								<span className="font-700 capitalize text-15 lg:text-lg pl-2 sm:pl-6">
									{post.task.name}
								</span>
							</p>
						</div>
						<div className="text-13 sm:text-15 lg:text-base font-600">
							{post.author.role}{ 'company' in post.author ? ' - ' + post.author.company.name : '' }
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
						<Icon className="font-600 text-18">public</Icon>
						<span className="ml-4 sm:mr-16 mr-4">{post.is_public ? 'Public ' : 'Private '}</span>
						<span>
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
						<Typography component="p" className="mb-16 px-16 text-lg">
							{post.text}
						</Typography>
					)}
					<div>
						<PostedImages images={post.media_set} showClick media={media} />
					</div>
					{/* {post.media && <img src={post.media} alt="post" />} */}
				</CardContent>
			)}

			{getRole() != 'w' && !isTask && (
				<CardActions disableSpacing className="bg-custom-primary px-12 py-4 flex justify-center">
					{/* <Button size="small" className="text-white text-13" aria-label="Add to favorites">
						<Icon className="text-white text-14">favorite</Icon>
						<Typography className="normal-case text-white text-13 mx-4">Like</Typography>
						<Typography className="normal-case text-13">({post.like})</Typography>
					</Button> */}
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
			)}

			{/* ----------------- Show Comments and likes ---------------*/}
			<AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>
				<div className="flex flex-wrap items-center mb-12 cursor-pointer justify-between">
					<div className="flex">
						<Avatar aria-label="Recipe" src={post.author.photo} className="h-44 w-44 mr-8">
							{[...post.author.first_name][0]}{' '}
						</Avatar>
						<Avatar aria-label="Recipe" src={post.author.photo} className="h-44 w-44 mr-8">
							{[...post.author.first_name][0]}{' '}
						</Avatar>
						<Avatar aria-label="Recipe" src={post.author.photo} className="h-44 w-44 mr-8">
							{[...post.author.first_name][0]}{' '}
						</Avatar>
					</div>
					{showComments() && (
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
							<span className="text-base font-600 hover:underline">
								{commentsLength() > 0
									? commentsLength() === 1
										? `${commentsLength()} comment`
										: `${commentsLength()} comments`
									: ''}
							</span>
						</div>
					)}
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
						className="justify-center w-1/3 text-15 my-4 p-6 posts-social-icon text-black"
					>
						{post.alert ? (
							<Icon fontSize="small" className="mr-4" style={{ color: red[500] }}>new_releases</Icon>
						) : (
							<Icon fontSize="small" className="mr-4">new_releases</Icon>
						)}
						<span>{t('ALERT')}</span>
					</IconButton>
					<IconButton
						aria-label="more"
						aria-controls="long-menu"
						aria-haspopup="true"
						// onClick={() => {
						// 	setCommentOpen(true)
						// }}
						edge={false}
						size="small"
						className="justify-center w-1/3 text-15 my-4 p-6 posts-social-icon text-black"
					>
						<Icon fontSize="small" className="mr-4">
							notifications_active
						</Icon>
						<span>{t('SEND_NOTIFICATION')}</span>
					</IconButton>
					<IconButton
						aria-label="more"
						aria-controls="long-menu"
						aria-haspopup="true"
						onClick={() => {
							setCommentOpen(true);
						}}
						edge={false}
						size="small"
						className="justify-center w-1/3 text-15 my-4 p-6 posts-social-icon text-black"
					>
						<Icon fontSize="small" className="mr-4">
							visibility
						</Icon>
						<span>{t('STATUS_PUBLIC')}</span>
					</IconButton>
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
								<span className="font-700 mr-4">{postComments.length - 3}</span>
								<span className="text-gray-500">Load more</span>
							</IconButton>
						)}
					</Collapse>
				)}

				{open && commentBoxOpen && (!isOffline || currnetPost.successAfterRetry) && getRole() != 'w' && (
					<div className="flex flex-auto mt-10">
						<Avatar className="mr-10" src="assets/images/avatars/profile.jpg" />
						<div className="flex-1">
							<Paper elevation={0} className="w-full relative post-icons">
								<Input
									className="pl-12 pr-80 py-8 w-full border-1 comment-area"
									id={String(post.id)}
									classes={{ root: 'text-base' }}
									placeholder={t('ADD_COMMENT')}
									multiline
									disableUnderline
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
