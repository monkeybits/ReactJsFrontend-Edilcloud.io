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
import PostList from './PostList';
import moment from 'moment';

export default function ReplyListItem({ post, comment, getReplies, commentId, author, handleReplyClick }) {
	return (
		<div key={comment.id}>
			<ListItem className="px-0 -mx-8">
				<Avatar alt={comment.author.user.username} src={comment.author.photo} className="mx-8">
					{' '}
					{comment.author.user.username[0]}
				</Avatar>
				<ListItemText
					className="p-12 py-10 bg-white comment-p"
					primary={
						<div className="flex comment-section">
							<Typography color="initial" paragraph={false}>
								{comment.author.user.username}
							</Typography>
							<Typography className="mx-12 font-size-14" variant="caption">
								{
									moment.parseZone(comment.created_date).fromNow() //format('LL')
								}
							</Typography>
						</div>
					}
					secondary={comment.text}
				/>
			</ListItem>
			<div className="flex items-center ml-44 mb-8">
				<Button onClick={handleReplyClick} className="normal-case">
					Reply
				</Button>
				<Icon className="text-14 mx-8 cursor-pointer">flag</Icon>
			</div>
		</div>
	);
}
