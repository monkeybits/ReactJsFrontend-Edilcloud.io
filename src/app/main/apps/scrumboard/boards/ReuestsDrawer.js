import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
}));
function ReuestsDrawer({ isShowRequests, setIsShowRequests, requests }) {
	const toggleDrawer = open => event => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setIsShowRequests(open);
	};
	return (
		<SwipeableDrawer
			anchor="bottom"
			open={isShowRequests}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(true)}
		>
		<div className="flex justify-between items-center h-64 p-64 px-32">
			<h2 className="font-semibold">Sure you want to accept Request ?</h2>
			<div>
			<Button
				variant="contained"
				color="primary"
				startIcon={<CheckIcon />}
				className="mr-10"
			>
				Accept
			</Button>
			<Button
				variant="contained"
				color="secondary"
				startIcon={<CloseIcon />}
			>
				Reject
			</Button>
			</div>
		</div>
		</SwipeableDrawer>
	);
}
export default ReuestsDrawer;
