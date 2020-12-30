import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { ACCEPT_INVITATION, REFUSE_INVITATION } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import { CircularProgress } from '@material-ui/core';

function ReuestsDrawer({ isShowRequests, setIsShowRequests, request, afterSuccess, acceptAPI, rejectAPI }) {
	const [isLoading, setIsLoading] = React.useState({
		isAccept: false,
		isReject: false
	});
	const toggleDrawer = open => event => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setIsShowRequests(open);
	};
	const setLoadingAcceptTrue = () => setIsLoading(prev => ({ ...prev, isAccept: true }));
	const setLoadingRejectTrue = () => setIsLoading(prev => ({ ...prev, isReject: true }));
	const setLoadingAcceptFalse = () => setIsLoading(prev => ({ ...prev, isAccept: false }));
	const setLoadingRejectFalse = () => setIsLoading(prev => ({ ...prev, isReject: false }));
	const handleOnAccept = () => {
		setLoadingAcceptTrue();
		apiCall(
			acceptAPI,
			{},
			res => {
				setIsShowRequests(false);
				setLoadingAcceptFalse();
				afterSuccess();
			},
			err => {
				setIsShowRequests(false);
				setLoadingAcceptFalse();
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};
	const handleOnReject = () => {
		setLoadingRejectTrue();
		apiCall(
			rejectAPI,
			{},
			res => {
				setIsShowRequests(false);
				console.log(res);
				setLoadingRejectFalse();
				afterSuccess();
			},
			err => {
				setIsShowRequests(false);
				console.log(err);
				setLoadingRejectFalse();
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};
	return (
		<SwipeableDrawer
			anchor="bottom"
			open={isShowRequests}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
		>
			<div className="flex flex-wrap justify-between items-center p-40 sm:p-56 px-32">
				<h2 className="font-semibold">Sure you want to Accept Request ?</h2>
				<div className="mt-20 md:mt-0">
					<Button
						variant="contained"
						color="primary"
						onClick={handleOnAccept}
						startIcon={<CheckIcon />}
						className="mr-10"
					>
						Accept {isLoading.isAccept && <CircularProgress size={15} color="secondary" />}
					</Button>
					<Button variant="contained" onClick={handleOnReject} color="secondary" startIcon={<CloseIcon />}>
						Reject {isLoading.isReject && <CircularProgress size={15} color="primary" />}
					</Button>
				</div>
			</div>
		</SwipeableDrawer>
	);
}
export default ReuestsDrawer;
