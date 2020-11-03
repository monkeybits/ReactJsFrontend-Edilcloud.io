import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import ToolbarMenu from './ToolbarMenu';
import PersonIcon from '@material-ui/icons/Person';

function MembersMenu(props) {
	const [anchorEl, setAnchorEl] = useState(null);

	function handleMenuOpen(event) {
		event.preventDefault();
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	return (
		<div className="inline-block">
			<div className="custom-member-menu flex items-center" onClick={handleMenuOpen}>
				<Icon>person</Icon>
				Assign People
			</div>
			{/* <IconButton color="inherit" onClick={handleMenuOpen}>
				<Icon>account_circle</Icon>
			</IconButton> */}
			<ToolbarMenu state={anchorEl} onClose={handleMenuClose}>
				<div className="">
					{props.members &&
						props.members.map(member => {
							return (
								<MenuItem className="px-8" key={member.id}>
									<Checkbox />
									<Avatar className="w-32 h-32" src={member.avatar} />
									<ListItemText className="mx-8">
										{member.first_name} {member.last_name}
									</ListItemText>
								</MenuItem>
							);
						})}
				</div>
			</ToolbarMenu>
		</div>
	);
}

export default MembersMenu;
