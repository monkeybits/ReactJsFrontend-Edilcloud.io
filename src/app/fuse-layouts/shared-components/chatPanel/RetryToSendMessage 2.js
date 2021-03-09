import React, { useState } from 'react';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';

export default function RetryToSendMessage({ isOffline, chatItem }) {
	const [isRetryingPost, setIsRetryingPost] = useState(false);
	const dispatch = useDispatch();
	const retryToSend = () => {
		dispatch(Actions.retryToSendMessage(chatItem));
	};
	return isOffline ? (
		<>
			{true && !isRetryingPost ? (
				<Button onClick={retryToSend}>Retry</Button>
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
	) : null;
}
