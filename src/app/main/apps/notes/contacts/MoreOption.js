import { Icon, IconButton, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
export default function MoreOption() {
	const [anchorEl, setAnchorEl] = React.useState(false);
	const options = [
		{ name: 'Edit', icon: 'edit' },
		{ name: 'Delete', icon: 'delete' }
	];
	const handleClick = event => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = event => {
		event.stopPropagation();
		setAnchorEl(false);
	};
	const openMenu = Boolean(anchorEl);

	return (
		<div className="actions-dropdown relative">
			<IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={openMenu}
				onClose={handleClose}
				className="actions-dropdown"
			>
				{options.map(option => (
					<MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
						<ListItemIcon>
							<Icon>{option.icon}</Icon>
						</ListItemIcon>
						<Typography variant="inherit"> {option.name}</Typography>
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}