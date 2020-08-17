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
import { ADD_POST_TO_ACTIVITY, GET_POST_TO_ACTIVITY } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import * as Actions from './store/actions';
import ImagesPreview from './ImagesPreview';
import PostList from './PostList';
import moment from 'moment';

export default function PostListItem({ post }) {
	const inputRef = useRef(null);
	return (
		<Card key={post.id} className="mb-32 overflow-hidden">
			<CardHeader
				avatar={<Avatar aria-label="Recipe" src={post.user?.avatar} />}
				action={
					<IconButton aria-label="more">
						<Icon>more_vert</Icon>
					</IconButton>
				}
				title={
					<span className="flex">
						<Typography className="font-medium" color="primary" paragraph={false}>
							{post.user?.name}
						</Typography>
						<span className="mx-4">
							{post.type === 'post' && 'posted on your timeline'}
							{post.type === 'something' && 'shared something with you'}
							{post.type === 'video' && 'shared a video with you'}
							{post.type === 'article' && 'shared an article with you'}
						</span>
					</span>
				}
				subheader={moment(post.published_date).format('llll')}
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
				{post.comments && post.comments.length > 0 && (
					<div className="">
						<div className="flex items-center">
							<Typography>{post.comments.length} comments</Typography>
							<Icon className="text-16 mx-4" color="action">
								keyboard_arrow_down
							</Icon>
						</div>

						<List>
							{post.comments.map(comment => (
								<div key={comment.id}>
									<ListItem className="px-0 -mx-8">
										<Avatar alt={comment.user.name} src={comment.user.avatar} className="mx-8" />
										<ListItemText
											className="px-4"
											primary={
												<div className="flex">
													<Typography
														className="font-medium"
														color="initial"
														paragraph={false}
													>
														{comment.user.name}
													</Typography>
													<Typography className="mx-4" variant="caption">
														{comment.time}
													</Typography>
												</div>
											}
											secondary={comment.message}
										/>
									</ListItem>
									<div className="flex items-center mx-52 mb-8">
										<Button className="normal-case">Reply</Button>
										<Icon className="text-14 mx-8 cursor-pointer">flag</Icon>
									</div>
								</div>
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
								classes={{ root: 'text-13' }}
								placeholder="Add a comment.."
								multiline
								rows="6"
								margin="none"
								disableUnderline
							/>
						</Paper>
						<div className="card-footer flex flex-row">
							<div className="flex-1 items-center">
								<IconButton onClick={() => inputRef.current.click()} aria-label="Add photo">
									<Icon>photo</Icon>
								</IconButton>
								<input hidden multiple type="file" accept="image/*, video/*" ref={inputRef} />
							</div>
							<Button className="normal-case" variant="contained" color="primary" size="small">
								Post Comment
							</Button>
						</div>
					</div>
				</div>
			</AppBar>
		</Card>
	);
}
