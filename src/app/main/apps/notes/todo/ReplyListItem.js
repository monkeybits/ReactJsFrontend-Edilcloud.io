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
	const [isRetryingPostReply, setIsRetryingPostReply] = useState(false);
	const [editText, setEditText] = useState('');
	const [isEditing, setIsEditing] = useState(false);
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
	const userInfo = decodeDataFromToken();
	const getUserId = () => userInfo?.extra?.profile.id;
	return (
		<div key={comment.id}>
			<ListItem className="px-0 -mx-8">
				<Avatar alt={comment.author.first_name} src={comment.author.photo} className="mx-8">
					{[...comment.author.first_name][0]}
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
					<ListItemText
						className="p-12 py-10 comment-p bg-post-section bg-white rounded w-auto flex-none"
						primary={
							<div className="flex comment-section">
								<Typography color="initial" paragraph={false}>
									{`${comment.author.first_name} ${comment.author.last_name}`}
								</Typography>
							</div>
						}
						secondary={comment.text}
					/>
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
			<div className="posted-images comment-post-img">
				<PostedImages images={comment.media_set} hideNavigation />
			</div>
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
						<Icon className="text-16" color="action">
							favorite
						</Icon>
						<Typography className="normal-case mx-4">Like</Typography>
					</Button>
					<Button onClick={handleReplyClick} className="normal-case">
						Reply
					</Button>
					{getUserId() == comment.author.id && (
						<Button onClick={handleDeleteComment} size="small" aria-label="Add to favorites">
							<Icon className="text-16" color="action">
								delete_outline
							</Icon>
							<Typography className="normal-case mx-4">Delete</Typography>
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
							<Icon className="text-16" color="action">
								edit
							</Icon>
							<Typography className="normal-case mx-4">Edit</Typography>
						</Button>
					)}
					<Typography className="mx-12 font-size-14" variant="caption">
						{
							moment.parseZone(comment.created_date).fromNow() //format('LL')
						}
					</Typography>
					<Icon className="text-14 mx-8 cursor-pointer">flag</Icon>
				</div>
			)}
		</div>
	);
}
