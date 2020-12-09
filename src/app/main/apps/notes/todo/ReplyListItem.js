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
import { ADD_COMMENT_TO_POST, GET_COMMENT_OF_POST, DELETE_COMMENT, EDIT_COMMENT } from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import * as Actions from './store/actions';
import ImagesPreview from './ImagesPreview';
import PostList from './PostList';
import moment from 'moment';
import PostedImages from './PostedImages';
import { Box, CircularProgress, Collapse } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';
import Menu from '@material-ui/core/Menu';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
export default function ReplyListItem({
	post,
	comment,
	getReplies,
	commentId,
	author,
	handleReplyClick,
	callRetryReplySuccess,
	afterDeleteComment,
	isOffline
}) {
	const dispatch = useDispatch();
	const [isRetryingPostReply, setIsRetryingPostReply] = useState(false);
	const [editText, setEditText] = useState('');
	const [isEditing, setIsEditing] = useState(false);
	const options = ['Edit', 'Delete'];
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
		let notification = notificationPanel.notificationData?.notification;
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
		e.preventDefault();
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
	return (
		<div
			key={comment.id}
			ref={notificationPanel.notificationData?.notification?.object_id == comment.id ? scrollRef : null}
		>
			<ListItem className="px-0 items-start">
				<Avatar alt={comment.author.first_name} src={comment.author.photo} className="mr-12">
					{[...comment.author.first_name][0]}
				</Avatar>
				{isEditing ? (
					<div className="flex-1 w-full">
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
					<div className="bg-white w-full">
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
						<div className="actions-dropdown resize-action-btn absolute top-0 right-0 mt-8">
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
									<MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
										<ListItemIcon>
											<PriorityHighIcon fontSize="small" />
										</ListItemIcon>
										<Typography variant="inherit"> {option}</Typography>
									</MenuItem>
								))}
							</Menu>
						</div>
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

			{!isOffline && isEditing ? (
				<div className="flex flex-wrap items-center ml-44">
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
				<div className="flex items-center ml-44 mb-8">
					<Button size="small" aria-label="Add to favorites">
						<Icon className="text-13" color="action">
							favorite
						</Icon>
						<Typography className="normal-case text-13 ml-4">Like</Typography>
					</Button>
					<Button onClick={handleReplyClick} size="small" className="normal-case">
						<Icon className="text-13" color="action">
							reply_outlined
						</Icon>
						<Typography className="normal-case text-13 ml-4">Reply</Typography>
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
					<Button size="small" aria-label="Report">
						<Icon className="text-13" color="action">
							flag_outlined
						</Icon>
						<Typography className="normal-case text-13 ml-4">Report</Typography>
					</Button>
					<Typography className="mx-6 text-13" variant="caption">
						{
							moment.parseZone(comment.created_date).fromNow() //format('LL')
						}
					</Typography>
				</div>
			)}
		</div>
	);
}
