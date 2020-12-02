import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as notificationActions from './store/actions';

function NotificationToggleButton(props) {
	const dispatch = useDispatch();

	return (
		<IconButton className="w-64 h-64 text-default" onClick={ev => dispatch(notificationActions.toggleNotification())}>
			{props.children}
		</IconButton>
	);
}

NotificationToggleButton.defaultProps = {
	children: <Icon>notifications_active</Icon>
};

export default NotificationToggleButton;
