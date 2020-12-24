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
	ADD_COMMENT_TO_POST,
	ADD_POST_TO_ACTIVITY,
	ADD_POST_TO_TASK,
	EDIT_POST,
	GET_COMMENT_OF_POST,
	SHARE_ACTIVITY_POST_TO_TASK
} from 'app/services/apiEndPoints';
import { getHeaderToken, getCompressFile } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import * as Actions from './store/actions';
import ImagesPreview from './ImagesPreview';
import CommentListItem from './CommentListItem';
import moment from 'moment';
import SendIcon from '@material-ui/icons/Send';
import PostedImages from './PostedImages';
import { Box, CircularProgress, Collapse } from '@material-ui/core';
import FuseUtils from '@fuse/utils';
import { red } from '@material-ui/core/colors';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
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
	media
}) {
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const [text, setText] = useState('');
	const [images, setImages] = useState(null);
	const [open, setOpen] = React.useState(true);
	const [post, setPost] = React.useState({});
	const [postComments, setPostComments] = useState([]);
	const todoDialog = useSelector(state =>
		state.todoAppNote?.todos?.todoDialog ? state.todoAppNote.todos.todoDialog : state.todoApp.todos.todoDialog
	);
	const [offlinePostComments, setofflinePostComments] = useState({});
	const [isRetryingPost, setIsRetryingPost] = useState(false);

	const options = ['Edit', 'Delete', 'Report as inapropriate'];

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
		let notification = notificationPanel.notificationData?.notification;
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
	const [anchorEl, setAnchorEl] = React.useState(null);

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

		var formData = new FormData();
		formData.append('parent', '');
		let values = {
			text,
			unique_code
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
			formData.append(key, values[key]);
		}
		const tempComment = {
			author: tempAuthor,
			replies_set: [],
			media_set,
			text: text,
			unique_code,
			parent: null,
			formData
		};
		let tempofflinePostComments = { ...offlinePostComments, [unique_code]: tempComment };
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
		const files = e.currentTarget.files;
		let file = [];
		for (var i = 0; i < files.length; i++) {
			let fileType = files[i].type?.split('/');
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
		let tempofflinePostComments = { ...offlinePostComments };
		delete tempofflinePostComments[unique_code];
		setofflinePostComments(tempofflinePostComments);
		getComments();
	};
	const deleteCommentByIndex = index => setPostComments(prevComments => prevComments.filter((d, i) => i != index));
	if (!Object.entries(post).length) {
		return null;
	}
	return (
		<Card
			id={`post${post.id}`}
			ref={notificationPanel.notificationData?.notification?.object_id == post.id ? scrollRef : null}
			key={post.id}
			className="mb-32 overflow-hidden post-form post-card-clx"
		>
			<CardHeader
				avatar={
					post.author.first_name ? (
						<Avatar aria-label="Recipe" src={post.author.photo}>
							{[...post.author.first_name][0]}{' '}
						</Avatar>
					) : null
				}
				action={
					<div className="px-8">
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
						<IconButton
							onClick={ev => {
								ev.preventDefault();
								ev.stopPropagation();
								handleAlertPost();
							}}
							className="text-default p-8"
						>
							{post.alert ? <Icon style={{ color: red[500] }}>error</Icon> : <Icon>error_outline</Icon>}
						</IconButton>
						<div className="inline">
							<IconButton
								aria-label="more"
								aria-controls="long-menu"
								aria-haspopup="true"
								onClick={handleClick}
								className="p-8"
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="long-menu"
								anchorEl={anchorEl}
								keepMounted
								open={openMenu}
								onClose={handleClose}
								className="actions-dropdown"
								// PaperProps={{
								// 	style: {
								// 		width: '20ch'
								// 	}
								// }}
							>
								{options.map(option => (
									<MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
										<ListItemIcon>
											<PriorityHighIcon fontSize="small" />
										</ListItemIcon>
										<Typography variant="inherit"> {option}</Typography>
									</MenuItem>
								))}
							</Menu>
						</div>
						{/* <IconButton className="text-default p-8" aria-label="more">
							<Icon>more_vert</Icon>
						</IconButton> */}
					</div>
				}
				title={
					<span>
						<Typography className="font-600 capitalize" color="primary" paragraph={false}>
							{post.author.first_name} {post.author.last_name}
						</Typography>
						<div className="">
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
									{/* )} */}
									{/* {showTask && (<> */}
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
							<span className="mx-4">
								{post.type === 'post' && 'posted on your timeline'}
								{post.type === 'something' && 'shared something with you'}
								{post.type === 'video' && 'shared a video with you'}
								{post.type === 'article' && 'shared an article with you'}
							</span>
						</div>
					</span>
				}
				subheader={moment.parseZone(post.published_date).format('llll')}
			/>

			<CardContent className="p-0">
				{post.text && (
					<Typography component="p" className="mb-16 px-16">
						{post.text}
					</Typography>
				)}
				<div className="posted-images">
					<PostedImages images={post.media_set} showClick media={media} />
				</div>
				{/* {post.media && <img src={post.media} alt="post" />} */}
			</CardContent>

			<CardActions disableSpacing className="bg-custom-primary px-12 py-4">
				<Button size="small" className="text-white text-13" aria-label="Add to favorites">
					<Icon className="text-white text-14">favorite</Icon>
					<Typography className="normal-case text-white text-13 mx-4">Like</Typography>
					<Typography className="normal-case text-13">({post.like})</Typography>
				</Button>
				<Button aria-label="Share" className="text-white text-13" onClick={sharePost}>
					<Icon className="text-white text-14">share</Icon>
					<Typography className="normal-case text-white text-13 mx-4">Share</Typography>
					<Typography className="normal-case text-13">({post.share})</Typography>
				</Button>
			</CardActions>

			<AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>
				{showComments() && (
					<div className="">
						<div
							className="flex items-center mb-12 cursor-pointer"
							onClick={ev => {
								ev.preventDefault();
								ev.stopPropagation();
								setOpen(!open);
							}}
						>
							<Typography className="text-13 font-600">{commentsLength()} Comments</Typography>
							<Icon className="text-16 font-600 mx-4" color="action">
								{open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
							</Icon>
						</div>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<List className="pt-0">
								{postComments.map((comment, index) => (
									<CommentListItem
										tempAuthor={tempAuthor}
										key={index}
										post={post}
										comment={comment}
										afterDeleteComment={() => deleteCommentByIndex(index)}
										needToGetComments={getComments}
									/>
								))}
								{Object.values(offlinePostComments).map((comment, index) => (
									<CommentListItem
										isOffline
										key={comment.unique_code}
										callRetryCommentSuccess={callRetryCommentSuccess}
										post={post}
										comment={comment}
									/>
								))}
							</List>
						</Collapse>
					</div>
				)}

				{(!isOffline || currnetPost.successAfterRetry) && (
					<div className="flex flex-auto">
						<Avatar className="mr-10" src="assets/images/avatars/profile.jpg" />
						<div className="flex-1">
							<Paper elevation={0} className="w-full relative post-icons">
								<Input
									className="p-8 w-full border-1"
									id={String(post.id)}
									classes={{ root: 'text-13' }}
									placeholder="Add a comment.."
									multiline
									rows="2"
									margin="none"
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
									disabled={!text.length}
								>
									<Icon>send</Icon>
								</IconButton>
								{/* <Button
								disabled={!text.length}
								onClick={handlePostComment}
								className="normal-case"
								variant="contained"
								color="primary"
								size="small"
							>
								Post Comment
							</Button> */}
							</Paper>
							{images && <ImagesPreview images={images} replaceUrl={replaceImageUrl} />}
							{/* <div className="card-footer flex items-center relative">
							<div className="flex-1 items-center post-icons">
							</div>
						</div> */}
						</div>
					</div>
				)}
			</AppBar>
		</Card>
	);
}
