import { Icon, IconButton, MenuItem } from '@material-ui/core';
import loadable from '@loadable/component';
import React, { useState } from 'react';

const ToolbarMenu = loadable(() => import('./ToolbarMenu'));

function OptionsMenu(props) {
	const [anchorEl, setAnchorEl] = useState(null);

	function handleMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	return (
		<div>
			<IconButton color="inherit" onClick={handleMenuOpen}>
				<Icon>more_horiz</Icon>
			</IconButton>
			<ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
				<MenuItem onClick={props.onRemoveCard}>Remove Card</MenuItem>
			</ToolbarMenu>
		</div>
	);
}

export default OptionsMenu;
