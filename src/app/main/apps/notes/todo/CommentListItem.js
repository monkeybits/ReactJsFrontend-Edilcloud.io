import {
	Avatar,
	Button,
	Icon,
	IconButton,
	Input,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Paper,
	Typography,
	Box,
	CircularProgress,
	Collapse,
	MenuItem
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { ADD_COMMENT_TO_POST, DELETE_COMMENT, GET_REPLIES_OF_COMMENT, EDIT_COMMENT } from 'app/services/apiEndPoints';
import { getHeaderToken, getCompressFile, decodeDataFromToken } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import FuseUtils from '@fuse/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
const TippyMenu = loadable(() => import('app/TippyMenu'));
const ReplyListItem = loadable(() => import('./ReplyListItem'));
const ImagesPreview = loadable(() => import('./ImagesPreview'));
const PostedImages = loadable(() => import('./PostedImages'));

const uuidv1 = require('uuid/v1');

export default function CommentListItem({
	post,
	setCommentOpen,
	commentBoxOpen,
	comment,
	isOffline,
	callRetryCommentSuccess,
	needToGetComments,
	tempAuthor,
	afterDeleteComment,
	nameSpace = 'todo_project'
}) {
	const { t } = useTranslation(nameSpace);
	const dispatch = useDispatch();
	const inputRef = useRef(null);
	const replyRefs = useRef(null);
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
			icon: 'edit',
			name: 'EDIT',
			handler: () => {
				setEditText(comment.text);
				setIsEditing(true);
				setAnchorEl(null);
			}
		},
		{
			icon: 'delete',
			name: 'DELETE',
			handler: e => {
				handleDeleteComment();
				setAnchorEl(null);
			}
		}
	];

	useEffect(() => {
		setTimeout(() => {
			const notification = notificationPanel.notificationData?.notification;
			if (notificationPanel.viewing && notification?.content_type == 'comment' && hasRender && scrollRef.current) {
				dispatch(notificationActions.removeFrmViewNotification());
				FuseUtils.notificationBackrondColor(scrollRef, 'custom-notification-bg');
			}
		}, 1000)
	}, [comment, notificationPanel.viewing, scrollRef, hasRender])

	const handlePostComment = e => {
		e.preventDefault();
		if (!text && !images?.length) return;
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
			parent: comment.id,
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
		const tempReply = {
			author: tempAuthor,
			replies_set: [],
			media_set,
			text,
			unique_code,
			parent: null,
			formData
		};
		const tempofflineCommentReplies = { ...offlineCommentReplies, [unique_code]: tempReply };
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
			},
			METHOD.GET,
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
			err => {
				// console.log(err),
			},
			METHOD.DELETE,
			getHeaderToken()
		);
	};
	const editComment = () => {
		const formData = new FormData();
		const values = {
			text: editText
		};
		for (const key in values) {
			formData.append(key, values[key]);
		}
		apiCall(
			EDIT_COMMENT(comment.id),
			formData,
			res => {
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
		const tempofflineCommentReplies = { ...offlineCommentReplies };
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
	const getRole = () => userInfo?.extra?.profile.role;

	return (
		<div
			key={comment.id}
			ref={notificationPanel.notificationData?.notification?.object_id == comment.id ? scrollRef : null}
			className={comment.id}
		>
			<ListItem className="px-0 items-start">
				<Avatar alt={comment.author.first_name} src={comment.author.photo} className="mr-12 h-48 w-48">
					{comment.author.first_name}
				</Avatar>
				{isEditing ? (
					<div className="flex-1 mx-4">
						<Paper elevation={0} className="w-full relative post-icons">
							<Input
								className="p-8 w-full border-1"
								classes={{ root: 'text-13' }}
								placeholder={t('ADD_COMMENT')}
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
							className="p-10 py-8 m-0 comment-p bg-post-section rounded-16 w-full"
							primary={
								<div className="flex comment-section">
									<span className="text-15 font-700">
										{`${comment.author.first_name} ${comment.author.last_name}`}
									</span>
								</div>
							}
							secondary={
								<div>
									<p className="text-base text-black">{comment.text}</p>
								</div>
							}
						/>
						<div className="posted-images comment-post-img">
							<PostedImages images={comment.media_set} hideNavigation />
						</div>
						{tempAuthor.id == comment.author.id && (
							<div className="actions-dropdown resize-action-btn absolute top-0 right-0">
								<TippyMenu
									icon={
										<>
											<IconButton
												aria-label="more"
												aria-controls="long-menu"
												aria-haspopup="true"
												onClick={handleClick}
												className="p-10"
											>
												<MoreVertIcon />
											</IconButton>
										</>
									}
									outsideClick
								>
									{options.map(option => (
										<MenuItem key={option.name} onClick={option.handler}>
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
				)}
				{isOffline && (
					<>
						{comment.retryOption && !isRetryingPostComment ? (
							<Button onClick={retryToPostComment}>{t('RETRY')}</Button>
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
			{!isOffline && isEditing && getRole() != 'w' ? (
				<div className="flex flex-wrap items-center ml-60">
					<Button className="mx-2" variant="contained" onClick={() => setIsEditing(false)} size="small">
						<Typography className="normal-case mx-4">{t('CANCEL')}</Typography>
					</Button>
					<Button
						disabled={!editText.length}
						onClick={editComment}
						className="mx-2"
						variant="contained"
						size="small"
						color="secondary"
					>
						<Typography className="normal-case mx-4">{t('SAVE')}</Typography>
					</Button>
				</div>
			) : (
				<div className="flex flex-wrap items-center ml-60">
					{/* <Button size="small" aria-label="Add to favorites">
						<Icon className="text-13" color="action">
							favorite
						</Icon>
						<Typography className="normal-case text-13 ml-4">Like</Typography>
					</Button> */}
					<Button
						disabled={getRole() == 'w'}
						onClick={() => {
							setCommentOpen(!commentBoxOpen);
							if (getRole() != 'w') {
								setIsReplying(prev => !prev);
								setText('@' + `${comment.author.first_name} ${comment.author.last_name}`);
								setTimeout(() => {
									if (!isReplying) {
										const character =
											'@' + `${comment.author.first_name} ${comment.author.last_name}`;
										const element = document.getElementById(String(comment.id));
										element.selectionStart = character.length;
										element.selectionEnd = character.length;
										element.focus();
									}
								}, 100);
							}
						}}
						size="small"
					>
						<Icon className="text-13" color="action">
							reply_outlined
						</Icon>
						<Typography className="normal-case text-13 ml-4">{t('REPLY')}</Typography>
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
							repliesLength() ? ' text-blue-500' : ''
						}`}
						onClick={ev => {
							ev.preventDefault();
							ev.stopPropagation();
							setOpen(!open);
							setCommentOpen(false);
						}}
					>
						<Typography className="underline font-600 text-13">
							{repliesLength()} {t('REPLIES')}
						</Typography>
						<Icon className="font-600 text-16 ml-2" color="action">
							{open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}
						</Icon>
					</div>
				</div>
			)}
			{showReplies() && (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<div className="left-100">
						<List className="clearfix">
							{replyComments.map((reply, index) => (
								<ReplyListItem
									tempAuthor={tempAuthor}
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
											setCommentOpen(false);
											setText('@' + `${reply.author.first_name} ${reply.author.last_name}`);
											setTimeout(() => {
												const character =
													'@' + `${reply.author.first_name} ${reply.author.last_name}`;
												const element = document.getElementById(String(comment.id));
												element.selectionStart = character.length;
												element.selectionEnd = character.length;
												element.focus();
											}, 100);
										}
									}}
								/>
							))}
							{Object.values(offlineCommentReplies).map((reply, index) => (
								<ReplyListItem
									isOffline
									tempAuthor={tempAuthor}
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
											setCommentOpen(false);
											setText('@' + `${reply.author.first_name} ${reply.author.last_name}`);
											setTimeout(() => {
												const character =
													'@' + `${reply.author.first_name} ${reply.author.last_name}`;
												const element = document.getElementById(String(comment.id));
												element.selectionStart = character.length;
												element.selectionEnd = character.length;
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
				<div className="flex-1 left-100 my-6">
					<Paper elevation={0} className="w-full relative post-icons rounded-32">
						<Input
							ref={replyRefs}
							className="pl-12 pr-80 py-8 w-full border-1 comment-area"
							id={String(comment.id)}
							classes={{ root: 'text-base' }}
							placeholder={t('ADD_COMMENT')}
							value={text}
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
						<input hidden type="file" accept="image/*, video/*" ref={inputRef} onChange={addPhoto} />
						<IconButton
							className="send p-0"
							onClick={handlePostComment}
							aria-label="Send"
							disabled={!text && !images}
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
