import React from 'react';
import { makeStyles, Icon, IconButton } from '@material-ui/core';

import { useDispatch } from 'react-redux';
import * as notificationActions from './store/actions';

const useStyles = makeStyles(theme => ({
	unreadBadge: {
		position: 'absolute',
		minWidth: 18,
		height: 18,
		top: 14,
		right: 6,
		borderRadius: 9,
		padding: '0 5px',
		fontSize: 11,
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.palette.secondary.main,
		color: theme.palette.secondary.contrastText,
		boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.35)',
		zIndex: 10
	}
}));
function NotificationToggleButton(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);

	const readAllNotification = () => {
		dispatch(notificationActions.toggleNotification());
	};
	return (
		<IconButton className="w-64 h-64 text-default" onClick={readAllNotification}>
			{!!props.totalCount && <div className={classes.unreadBadge}>{props.totalCount}</div>}
			{props.children}
		</IconButton>
	);
}

NotificationToggleButton.defaultProps = {
	children: <Icon>notifications_active</Icon>
};

export default NotificationToggleButton;
