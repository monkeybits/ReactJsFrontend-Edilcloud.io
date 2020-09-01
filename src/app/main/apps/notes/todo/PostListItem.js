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
import { ADD_COMMENT_TO_POST, GET_COMMENT_OF_POST } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import * as Actions from './store/actions';
import ImagesPreview from './ImagesPreview';
import CommentListItem from './CommentListItem';
import moment from 'moment';

export default function PostListItem({ post }) {
	const inputRef = useRef(null);
	const [text, setText] = useState('');
	const [postComments, setPostComments] = useState([...post.comment_set]);

	const handlePostComment = e => {
		e.preventDefault();
		if (!text) return;
		apiCall(
			ADD_COMMENT_TO_POST(post.id),
			{
				text,
				parent: ''
			},
			res => {
				document.getElementById(String(post.id)).value = '';
				getComments();
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	};
	const getComments = () => {
		apiCall(
			GET_COMMENT_OF_POST(post.id),
			{},
			res => {
				setPostComments(res.results);
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	return (
		<Card key={post.id} className="mb-32 overflow-hidden post-form">
			<CardHeader
				avatar={
					<Avatar aria-label="Recipe" src={post.author.photo}>
						{post.author.user.username[0]}{' '}
					</Avatar>
				}
				action={
					<IconButton aria-label="more">
						<Icon>more_vert</Icon>
					</IconButton>
				}
				title={
					<span className="flex">
						<Typography className="font-medium" color="primary" paragraph={false}>
							{post.author.user.username}
						</Typography>
						<span className="mx-4">
							{post.type === 'post' && 'posted on your timeline'}
							{post.type === 'something' && 'shared something with you'}
							{post.type === 'video' && 'shared a video with you'}
							{post.type === 'article' && 'shared an article with you'}
						</span>
					</span>
				}
				subheader={moment.parseZone(post.published_date).format('llll')}
			/>

			<CardContent className="py-0">
				{post.text && (
					<Typography component="p" className="mb-16">
						{post.text}
					</Typography>
				)}

				{post.media && <img src={post.media} alt="post" />}
			</CardContent>

			<CardActions disableSpacing className="px-12">
				<Button size="small" aria-label="Add to favorites">
					<Icon className="text-16" color="action">
						favorite
					</Icon>
					<Typography className="normal-case mx-4">Like</Typography>
					<Typography className="normal-case">({post.like})</Typography>
				</Button>
				<Button aria-label="Share">
					<Icon className="text-16" color="action">
						share
					</Icon>
					<Typography className="normal-case mx-4">Share</Typography>
					<Typography className="normal-case">({post.share})</Typography>
				</Button>
			</CardActions>

			<AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>
				{postComments && postComments.length > 0 && (
					<div className="">
						<div className="flex items-center">
							<Typography>{postComments.length} comments</Typography>
							<Icon className="text-16 mx-4" color="action">
								keyboard_arrow_down
							</Icon>
						</div>

						<List>
							{postComments.map((comment, index) => (
								<CommentListItem key={index} post={post} comment={comment} />
							))}
						</List>
					</div>
				)}

				<div className="flex flex-auto -mx-4">
					<Avatar className="mx-4" src="assets/images/avatars/profile.jpg" />
					<div className="flex-1 mx-4">
						<Paper elevation={0} className="w-full mb-16">
							<Input
								className="p-8 w-full border-1"
								id={String(post.id)}
								classes={{ root: 'text-13' }}
								placeholder="Add a comment.."
								multiline
								rows="6"
								margin="none"
								disableUnderline
								onChange={e => setText(e.target.value)}
							/>
						</Paper>
						<div className="card-footer flex items-center">
							<div className="flex-1 items-center">
								<IconButton className="p-0" onClick={() => inputRef.current.click()} aria-label="Add photo">
									<Icon>photo</Icon>
								</IconButton>
								<input hidden multiple type="file" accept="image/*, video/*" ref={inputRef} />
							</div>
							<Button
								onClick={handlePostComment}
								className="normal-case"
								variant="contained"
								color="primary"
								size="small"
							>
								Post Comment
							</Button>
						</div>
					</div>
				</div>
			</AppBar>
		</Card>
	);
}
