import { IconButton, Typography } from '@material-ui/core';
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
	const options = ['Edit', 'Delete', 'Report as inapropriate'  ];
	const handleClick = event => {
		setAnchorEl(true);
		event.preventDefault();
		event.stopPropagation();
		setTimeout(() => {
			console.log({ currentTarget: event.currentTarget, anchorEl: Boolean(anchorEl) });
		}, 1000);
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
			<div className="custom-list-dropdown">
					<ul className="list-unstyled">
						<li className="py-6">
							<EditOutlinedIcon />
							Edit
						</li>
						<li className="py-6">
							<DeleteOutlineOutlinedIcon />
							Delete
						</li>
						<li className="py-6">
							<FlagOutlinedIcon />
							Report as inapropriate
						</li>
					</ul>
				</div>
			{/* <Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={openMenu}
				onClose={handleClose}
				className="actions-dropdown"
				PaperProps={{
					style: {
						width: '20ch'
					}
				}}
			>
				{options.map(option => (
					<MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
						<ListItemIcon>
							<PriorityHighIcon fontSize="small" />
						</ListItemIcon>
						<Typography variant="inherit"> {option}</Typography>
					</MenuItem>
				))}
			</Menu> */}
		</div>
	);
}
