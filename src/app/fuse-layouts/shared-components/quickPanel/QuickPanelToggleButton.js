import { Icon, IconButton } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as quickPanelActions from './store/actions';

function QuickPanelToggleButton(props) {
	const dispatch = useDispatch();

	return (
		<IconButton className="w-64 h-64 text-default" onClick={ev => dispatch(quickPanelActions.toggleQuickPanel())}>
			{props.children}
		</IconButton>
	);
}

QuickPanelToggleButton.defaultProps = {
	children: <Icon>format_list_bulleted</Icon>
};

export default QuickPanelToggleButton;
