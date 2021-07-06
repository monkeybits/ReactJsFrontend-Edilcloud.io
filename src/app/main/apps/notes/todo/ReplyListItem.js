import {
	Button,
	Icon,
	IconButton,
	Input,
	ListItem,
	ListItemText,
	MenuItem,
	Paper,
	Typography,
	Box,
	CircularProgress,
	ListItemIcon
} from '@material-ui/core';
import React, { useEffect, useState, useRef } from 'react';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { ADD_COMMENT_TO_POST, DELETE_COMMENT, EDIT_COMMENT } from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
const PostedImage = loadable(() => import('./PostedImage'));
const TippyMenu = loadable(() => import('app/TippyMenu'));

export default function ReplyListItem({
	post,
	comment,
	getReplies,
	commentId,
	author,
	handleReplyClick,
	callRetryReplySuccess,
	afterDeleteComment,
	tempAuthor,
	isOffline,
	nameSpace = 'todo_project'
}) {
	const { t } = useTranslation(nameSpace);
	const dispatch = useDispatch();
	const [isRetryingPostReply, setIsRetryingPostReply] = useState(false);
	const [editText, setEditText] = useState('');
	const [isEditing, setIsEditing] = useState(false);
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
	const [hasRender, setHasRender] = React.useState(false);
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const scrollRef = useRef(null);
	const hasNotifcationOnThisItem = notificationPanel.notificationData?.notification?.object_id == comment.id;
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
		const notification = notificationPanel.notificationData?.notification;
		if (
			notificationPanel.viewing &&
			notification?.content_type == 'comment' &&
			notification.body.hasOwnProperty('comment_id') &&
			hasRender &&
			scrollRef.current
		) {
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

	const retryToPostReply = () => {
		setIsRetryingPostReply(true);
		apiCall(
			ADD_COMMENT_TO_POST(post.id),
			comment.formData,
			res => {
				setIsRetryingPostReply(false);
				callRetryReplySuccess(comment.unique_code);
			},
			err => {
				setIsRetryingPostReply(false);
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
				getReplies(setIsEditing);
			},
			err => {},
			METHOD.PUT,
			getHeaderToken()
		);
	};
	const [anchorEl, setAnchorEl] = React.useState(null);
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

	const index = comment.text.indexOf(' ', comment.text.indexOf(' ') + 1);
	const replyAuthor = comment.text.substring(0, index);
	return (
		<div
			key={comment.id}
			ref={notificationPanel.notificationData?.notification?.object_id == comment.id ? scrollRef : null}
		>
			<ListItem className="px-0 items-start">
				{/* <Avatar alt={comment.author.first_name} src={comment.author.photo} className="mr-12">
					{[...comment.author.first_name][0]}
				</Avatar> */}
				{isEditing ? (
					<div className="flex-1 w-full">
						<Paper elevation={0} className="w-full relative post-icons">
							<Input
								className="pl-12 pr-80 py-8 w-full border-1 comment-area"
								classes={{ root: 'text-base' }}
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
					<div className="bg-white w-full">
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
								<div className="text-base text-black">
									<span className="font-700 mr-2">{replyAuthor}</span>
									<span>{comment.text.replace(replyAuthor, '')}</span>
								</div>
							}
						/>
						<div className="posted-images comment-post-img">
							<PostedImage images={comment.media_set} hideNavigation />
						</div>
						{tempAuthor.id == comment.author.id && (
							<div className="actions-dropdown resize-action-btn absolute top-0 right-0 mt-8">
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
					</div>
				)}
				{isOffline && (
					<>
						{comment.retryOption && !isRetryingPostReply ? (
							<Button onClick={retryToPostReply}>Retry</Button>
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

			{!isOffline && isEditing && getRole() != 'w' ? (
				<div className="flex flex-wrap items-center ml-44">
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
				<div className="flex items-center ml-44 mb-8">
					<Button onClick={handleReplyClick} size="small" className="normal-case">
						<Icon className="text-13" color="action">
							reply_outlined
						</Icon>
						<Typography className="normal-case text-13 ml-4">{t('REPLY')}</Typography>
					</Button>
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
					{/* <Icon className="text-14 mx-8 cursor-pointer">flag</Icon> */}
					<Typography className="mx-6 text-13" variant="caption">
						{
							moment.parseZone(comment.created_date).fromNow() // format('LL')
						}
					</Typography>
				</div>
			)}
		</div>
	);
}
