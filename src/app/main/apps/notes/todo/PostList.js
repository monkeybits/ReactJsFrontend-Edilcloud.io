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
import PostListItem from './PostListItem';
import moment from 'moment';

function PostList({ posts, isTask, taskId, callRetryAfterSuccess, isOffline, tempAuthor, showPrject, showTask }) {
	if (!posts || posts?.length == 0) {
		return null;
	}
	return posts.map((post, index) => (
		<PostListItem
			showTask={showTask}
			showPrject={showPrject}
			tempAuthor={tempAuthor}
			isOffline={isOffline}
			isTask={isTask}
			taskId={taskId}
			key={index}
			currnetPost={post}
			callRetryAfterSuccess={callRetryAfterSuccess}
		/>
	));
}

export default PostList;
