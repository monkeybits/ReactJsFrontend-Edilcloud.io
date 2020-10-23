import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const options = ['Edit'];

const ITEM_HEIGHT = 48;

export default function MoreOptionsCompany(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = event => {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(null);
	};
	const handleAction = (event, option) => {
		event.preventDefault();
		event.stopPropagation();
		props.actionIs(option);
		setAnchorEl(null);
	};
	return (
		<div>
			<IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch'
					}
				}}
			>
				{options.map(option => (
					<MenuItem key={option} selected={option === 'Pyxis'} onClick={e => handleAction(e, option)}>
						{option}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
