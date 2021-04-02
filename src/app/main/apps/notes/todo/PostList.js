import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
const PostListItem = loadable(() => import('./PostListItem'))

function PostList({
	posts,
	isTask,
	taskId,
	callRetryAfterSuccess,
	isOffline,
	showPrject,
	showTask,
	scrollRef,
	media,
	nameSpace
}) {
	const [postsList, setPostsList] = useState([]);
	const [tempAuthor, setTempAuthor] = useState({});
	const user = useSelector(({ auth }) => auth.user.data.company);
	useEffect(() => {
		if (user) {
			setTempAuthor({
				...user
			});
		}
	}, [user]);
	useEffect(() => {
		if (posts) {
			setPostsList(posts);
			return () => setPostsList([]);
		}
	}, [posts]);
	const deletePostByIndex = index => setPostsList(prevPosts => prevPosts.filter((d, i) => i != index));

	if (!postsList || postsList?.length == 0) {
		return null;
	}
	return postsList.map((post, index) => (
		<PostListItem
			media={media}
			scrollRef={scrollRef}
			showTask={showTask}
			showPrject={showPrject}
			tempAuthor={tempAuthor}
			isOffline={isOffline}
			isTask={isTask}
			taskId={taskId}
			key={index}
			currnetPost={post}
			afterDeletePost={() => deletePostByIndex(index)}
			callRetryAfterSuccess={callRetryAfterSuccess}
			nameSpace={nameSpace}
		/>
	));
}

export default PostList;
