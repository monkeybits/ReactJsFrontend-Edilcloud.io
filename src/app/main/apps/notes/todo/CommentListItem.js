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
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { apiCall, METHOD } from 'app/services/baseUrl';
import {
	ADD_COMMENT_TO_POST,
	GET_COMMENT_OF_POST,
	DELETE_COMMENT,
	GET_REPLIES_OF_COMMENT,
	EDIT_COMMENT
} from 'app/services/apiEndPoints';
import { getHeaderToken, getCompressFile, decodeDataFromToken } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import * as Actions from './store/actions';
import ImagesPreview from './ImagesPreview';
import ReplyListItem from './ReplyListItem';
import moment from 'moment';
import PostedImages from './PostedImages';
import FuseUtils from '@fuse/utils';
import { Box, CircularProgress, Collapse } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
const uuidv1 = require('uuid/v1');

export default function CommentListItem({
	post,
	comment,
	isOffline,
	callRetryCommentSuccess,
	needToGetComments,
	tempAuthor,
	afterDeleteComment
}) {
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const [open, setOpen] = React.useState(false);
	const [images, setImages] = useState(null);
	const [text, setText] = useState('');
	const [editText, setEditText] = useState('');
	const [isReplying, setIsReplying] = useState(false);
	const [isRetryingPostComment, setisRetryingPostComment] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [replyComments, setReplyComments] = useState([]);
	const [offlineCommentReplies, setofflineCommentReplies] = useState({});
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);
	const [hasRender, setHasRender] = React.useState(false);
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const scrollRef = useRef(null);
	const hasNotifcationOnThisItem = notificationPanel.notificationData?.notification?.object_id == comment.id;
	useEffect(() => {
		if (
			notificationPanel.notificationData?.notification?.content_type === 'comment' &&
			comment &&
			notificationPanel.notificationData?.notification.body.hasOwnProperty('comment_id') &&
			notificationPanel.notificationData?.notification.body.comment_id == comment.id
		) {
			setOpen(true);
		}
	}, [notificationPanel.notificationData, comment]);
	useEffect(() => {
		if (hasNotifcationOnThisItem) {
			setTimeout(() => {
				setHasRender(true);
			}, 300);
		} else {
			setHasRender(true);
		}
	}, [comment]);
	useEffect(() => {
		setReplyComments(comment.replies_set);
		return () => {
			setReplyComments([]);
		};
	}, [comment.replies_set]);
	const options = [
		{
			name: 'Edit',
			handler: () => {
				setEditText(comment.text);
				setIsEditing(true);
				setAnchorEl(null);
			}
		},
		{
			name: 'Delete',
			handler: e => {
				handleDeleteComment();
				setAnchorEl(null);
			}
		}
	];

	useEffect(() => {
		let notification = notificationPanel.notificationData?.notification;
		if (notificationPanel.viewing && notification?.content_type == 'comment' && hasRender && scrollRef.current) {
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

	const handlePostComment = e => {
		e.preventDefault();
		if (!text) return;
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
			parent: comment.id,
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
		const tempReply = {
			author: tempAuthor,
			replies_set: [],
			media_set,
			text: text,
			unique_code,
			parent: null,
			formData
		};
		let tempofflineCommentReplies = { ...offlineCommentReplies, [unique_code]: tempReply };
		setofflineCommentReplies(tempofflineCommentReplies);

		apiCall(
			ADD_COMMENT_TO_POST(post.id),
			formData,
			res => {
				delete tempofflineCommentReplies[res.unique_code];
				setofflineCommentReplies(tempofflineCommentReplies);
				getReplies();
				setIsReplying(false);
			},
			err => {
				tempofflineCommentReplies[unique_code] = {
					...tempofflineCommentReplies[unique_code],
					retryOption: true
				};
				console.log({ myErrorComment: err, tempofflineCommentReplies });
				setofflineCommentReplies(tempofflineCommentReplies);
				forceUpdate();
			},
			METHOD.POST,
			getHeaderToken()
		);
		setImages(null);
		setText('');
		document.getElementById(String(comment.id)).value = '';
	};
	const getReplies = setIsEditing => {
		apiCall(
			GET_REPLIES_OF_COMMENT(comment.id),
			{},
			res => {
				setReplyComments(res.results);
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
	const retryToPostComment = () => {
		setisRetryingPostComment(true);
		apiCall(
			ADD_COMMENT_TO_POST(post.id),
			comment.formData,
			res => {
				setisRetryingPostComment(false);
				callRetryCommentSuccess(comment.unique_code);
			},
			err => {
				setisRetryingPostComment(false);
			},
			METHOD.POST,
			getHeaderToken()
		);
	};
	const handleDeleteComment = e => {
		apiCall(
			DELETE_COMMENT(comment.id),
			{},
			res => afterDeleteComment(),
			err => console.log(err),
			METHOD.DELETE,
			getHeaderToken()
		);
	};
	const editComment = () => {
		var formData = new FormData();
		let values = {
			text: editText
		};
		for (let key in values) {
			formData.append(key, values[key]);
		}
		apiCall(
			EDIT_COMMENT(comment.id),
			formData,
			res => {
				console.log('edited', res);
				needToGetComments(setIsEditing);
			},
			err => {},
			METHOD.PUT,
			getHeaderToken()
		);
	};
	const showReplies = () => Object.values(offlineCommentReplies).length || replyComments.length > 0;
	const repliesLength = () => Object.values(offlineCommentReplies).length + replyComments.length;
	const deleteCommentByIndex = index => setReplyComments(prevComments => prevComments.filter((d, i) => i != index));
	const callRetryReplySuccess = unique_code => {
		let tempofflineCommentReplies = { ...offlineCommentReplies };
		delete tempofflineCommentReplies[unique_code];
		setofflineCommentReplies(tempofflineCommentReplies);
		setIsReplying(false);
		getReplies();
	};
	const openMenu = Boolean(anchorEl);

	const handleClick = event => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const handleClose = event => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(null);
	};
	const userInfo = decodeDataFromToken();
	const getUserId = () => userInfo?.extra?.profile.id;
	return (
		<div
			key={comment.id}
			ref={notificationPanel.notificationData?.notification?.object_id == comment.id ? scrollRef : null}
		>
			<ListItem className="px-0 items-start">
				<Avatar alt={comment.author.first_name} src={comment.author.photo} className="mr-12">
					{comment.author.first_name}
				</Avatar>
				{isEditing ? (
					<div className="flex-1 mx-4">
						<Paper elevation={0} className="w-full relative post-icons">
							<Input
								className="p-8 w-full border-1"
								classes={{ root: 'text-13' }}
								placeholder="Add a comment.."
								value={editText}
								multiline
								rows="2"
								margin="none"
								disableUnderline
								onChange={e => setEditText(e.target.value)}
							/>
						</Paper>
					</div>
				) : (
					<div className="w-full relative">
						<ListItemText
							className="p-10 py-8 m-0 comment-p bg-post-section bg-white rounded w-full"
							primary={
								<div className="flex comment-section">
									<Typography color="initial" paragraph={false}>
										{`${comment.author.first_name} ${comment.author.last_name}`}
									</Typography>
								</div>
							}
							secondary={comment.text}
						/>
						<div className="posted-images comment-post-img">
							<PostedImages images={comment.media_set} hideNavigation />
						</div>
						<div className="actions-dropdown resize-action-btn absolute top-0 right-0">
							<IconButton
								aria-label="more"
								aria-controls="long-menu"
								aria-haspopup="true"
								onClick={handleClick}
								className="p-10"
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
								PaperProps={{
									style: {
										width: '20ch'
									}
								}}
							>
								{options.map(option => (
									<MenuItem
										key={option.name}
										selected={option.name === 'Pyxis'}
										onClick={option.handler}
									>
										<ListItemIcon>
											<PriorityHighIcon fontSize="small" />
										</ListItemIcon>
										<Typography variant="inherit"> {option.name}</Typography>
									</MenuItem>
								))}
							</Menu>
						</div>
					</div>
				)}
				{isOffline && (
					<>
						{comment.retryOption && !isRetryingPostComment ? (
							<Button onClick={retryToPostComment}>Retry</Button>
						) : (
							<Box position="relative" display="inline-flex">
								<CircularProgress size={20} color="secondary" />
								<Box
									top={0}
									left={0}
									bottom={0}
									right={0}
									position="absolute"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									<FontAwesomeIcon icon={faUpload} style={{ fontSize: '1.5rem' }} />
								</Box>
							</Box>
						)}
					</>
				)}
			</ListItem>
			{/* {!isEditing && (
				<div className="posted-images comment-post-img mt-4 mb-10">
					<PostedImages images={comment.media_set} hideNavigation />
				</div>
			)} */}
			{!isOffline && isEditing ? (
				<div className="flex flex-wrap items-center ml-52">
					<Button className="mx-2" variant="contained" onClick={() => setIsEditing(false)} size="small">
						<Typography className="normal-case mx-4">Cancel</Typography>
					</Button>
					<Button
						disabled={!editText.length}
						onClick={editComment}
						className="mx-2"
						variant="contained"
						size="small"
						color="secondary"
					>
						<Typography className="normal-case mx-4">Save</Typography>
					</Button>
				</div>
			) : (
				<div className="flex flex-wrap items-center ml-44">
					{/* <Button size="small" aria-label="Add to favorites">
						<Icon className="text-13" color="action">
							favorite
						</Icon>
						<Typography className="normal-case text-13 ml-4">Like</Typography>
					</Button> */}
					<Button
						onClick={() => {
							setIsReplying(prev => !prev);
							setText('@' + `${comment.author.first_name} ${comment.author.last_name}`);
							setTimeout(() => {
								if (!isReplying) {
									document.getElementById(String(comment.id)).focus();
								}
							}, 100);
						}}
						size="small"
					>
						<Icon className="text-13" color="action">
							reply_outlined
						</Icon>
						<Typography className="normal-case text-13 ml-4">Reply</Typography>
					</Button>
					{/* <Button size="small" aria-label="Report">
						<Icon className="text-13" color="action">
							flag_outlined
						</Icon>
						<Typography className="normal-case text-13 ml-4">Report</Typography>
					</Button> */}
					{/* {getUserId() == comment.author.id && (
						<Button onClick={handleDeleteComment} size="small" aria-label="Add to favorites">
							<Icon className="text-13" color="action">
								delete_outline
							</Icon>
							<Typography className="normal-case text-13 ml-4">Delete</Typography>
						</Button>
					)}
					{getUserId() == comment.author.id && (
						<Button
							onClick={() => {
								setEditText(comment.text);
								setIsEditing(true);
							}}
							size="small"
							aria-label="Add to favorites"
						>
							<Icon className="text-13" color="action">
								edit
							</Icon>
							<Typography className="normal-case text-13 ml-4">Edit</Typography>
						</Button>
					)} */}

					<div
						className={`flex items-center ml-auto cursor-pointer ${
							!!repliesLength() ? ' underline text-blue-500' : ''
						}`}
						onClick={ev => {
							ev.preventDefault();
							ev.stopPropagation();
							setOpen(!open);
						}}
					>
						<Typography className="font-600 text-13">{repliesLength()} Replies</Typography>
						<Icon className="font-600 text-16 ml-2" color="action">
							{open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
						</Icon>
					</div>
				</div>
			)}
			{showReplies() && (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<div className="ml-52">
						<List className="clearfix">
							{replyComments.map((reply, index) => (
								<ReplyListItem
									commentId={comment.id}
									author={comment.author}
									key={index}
									post={post}
									comment={reply}
									getReplies={getReplies}
									afterDeleteComment={() => deleteCommentByIndex(index)}
									handleReplyClick={() => {
										if (isReplying) {
											setIsReplying(false);
											setText('');
										} else {
											setIsReplying(true);
											setText('@' + reply.author.user.username);
											setTimeout(() => {
												let element = document.getElementById(String(comment.id));
												element.focus();
											}, 100);
										}
									}}
								/>
							))}
							{Object.values(offlineCommentReplies).map((reply, index) => (
								<ReplyListItem
									isOffline
									key={reply.unique_code}
									callRetryReplySuccess={callRetryReplySuccess}
									commentId={comment.id}
									author={tempAuthor}
									key={index}
									post={post}
									comment={reply}
									getReplies={getReplies}
									handleReplyClick={() => {
										if (isReplying) {
											setIsReplying(false);
											setText('');
										} else {
											setIsReplying(true);
											setText('@' + reply.author.user.username);
											setTimeout(() => {
												let element = document.getElementById(String(comment.id));
												element.focus();
											}, 100);
										}
									}}
								/>
							))}
						</List>
					</div>
				</Collapse>
			)}
			{isReplying && (
				<div className="flex-1 ml-52 my-6">
					<Paper elevation={0} className="w-full relative post-icons">
						<Input
							className="p-8 w-full border-1"
							id={String(comment.id)}
							classes={{ root: 'text-13' }}
							placeholder="Add a comment.."
							value={text}
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
						<input hidden type="file" accept="image/*, video/*" ref={inputRef} onChange={addPhoto} />
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
							Reply Comment
						</Button> */}
					</Paper>
					{images && <ImagesPreview images={images} replaceUrl={replaceImageUrl} />}
				</div>
			)}
		</div>
	);
}
