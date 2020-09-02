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
import { ADD_COMMENT_TO_POST, GET_COMMENT_OF_POST, GET_REPLIES_OF_COMMENT } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import * as Actions from './store/actions';
import ImagesPreview from './ImagesPreview';
import ReplyListItem from './ReplyListItem';
import moment from 'moment';

export default function CommentListItem({ post, comment }) {
	const [text, setText] = useState('');
	const [isReplying, setIsReplying] = useState(false);
	const [replyComments, setReplyComments] = useState([...comment.replies_set]);
	const handlePostComment = e => {
		e.preventDefault();
		if (!text) return;
		apiCall(
			ADD_COMMENT_TO_POST(post.id),
			{
				text,
				parent: comment.id
			},
			res => {
				getReplies();
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
		setText('');
		document.getElementById(String(comment.id)).value = '';
	};
	const getReplies = () => {
		apiCall(
			GET_REPLIES_OF_COMMENT(comment.id),
			{},
			res => {
				setReplyComments(res.results);
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	return (
		<div key={comment.id}>
			<ListItem className="px-0 -mx-8">
				<Avatar alt={comment.author.user.username} src={comment.author.photo} className="mx-8">
					{' '}
					{comment.author.user.username[0]}
				</Avatar>
				<ListItemText
					className="px-4"
					primary={
						<div className="flex">
							<Typography className="font-medium" color="initial" paragraph={false}>
								{comment.author.user.username}
							</Typography>
							<Typography className="mx-4" variant="caption">
								{
									moment.parseZone(comment.created_date).fromNow() //format('LL')
								}
							</Typography>
						</div>
					}
					secondary={comment.text}
				/>
			</ListItem>
			<div className="flex items-center mx-52 mb-8">
				<Button onClick={() => setIsReplying(prev => !prev)} className="normal-case">
					Reply
				</Button>
				<Icon className="text-14 mx-8 cursor-pointer">flag</Icon>
			</div>
			{isReplying && (
				<div className="flex-1 mx-4">
					<Paper elevation={0} className="w-full mb-16">
						<Input
							className="p-8 w-full border-1"
							id={String(comment.id)}
							classes={{ root: 'text-13' }}
							placeholder="Add a comment.."
							multiline
							rows="2"
							margin="none"
							disableUnderline
							onChange={e => setText(e.target.value)}
						/>
					</Paper>
					<div className="card-footer flex flex-row float-right">
						<Button
							disabled={!text.length}
							onClick={handlePostComment}
							className="normal-case"
							variant="contained"
							color="primary"
							size="small"
						>
							Reply Comment
						</Button>
					</div>
				</div>
			)}
			{replyComments.length > 0 && (
				<div className="">
					<div className="flex items-center">
						<Typography>{replyComments.length} Replies</Typography>
						<Icon className="text-16 mx-4" color="action">
							keyboard_arrow_down
						</Icon>
					</div>

					<List>
						{replyComments.map((comment, index) => (
							<ReplyListItem key={index} post={post} comment={comment} />
						))}
					</List>
				</div>
			)}
		</div>
	);
}
