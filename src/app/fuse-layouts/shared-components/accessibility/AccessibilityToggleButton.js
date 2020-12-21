import FuseAnimate from '@fuse/core/FuseAnimate';
import { Fab, makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';

const useStyles = makeStyles({
	addButton: {
		position: 'fixed',
		right: 90,
		bottom: 25,
		zIndex: 999999
	}
});
function AccessibilityToggleButton(props) {
	const dispatch = useDispatch();
	const classes = useStyles(props);

	return (
		<FuseAnimate animation="transition.expandIn" delay={300}>
			<Fab
				color="primary"
				aria-label="accessibility_new"
				className={classes.addButton}
				onClick={ev => dispatch(Actions.toggleAccessibility())}
			>
				<Icon>accessibility_new</Icon>
			</Fab>
		</FuseAnimate>
	);
}

// AccessibilityToggleButton.defaultProps = {
// 	children: <Icon>notifications_active</Icon>
// };

export default AccessibilityToggleButton;