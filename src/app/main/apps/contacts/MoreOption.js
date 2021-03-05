/* =============================================================================
 MoreOption.js
 ===============================================================================
*This file is created for ContactsApp
TODO: More option like delete, edit or view contact
*/
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
import TippyMenu from 'app/TippyMenu';
import { useTranslation } from 'react-i18next';

export default function MoreOption(props) {
	const { t } = useTranslation('contacts');
	const [anchorEl, setAnchorEl] = React.useState(false);
	const options = [
		{ name: 'EDIT', icon: 'edit', handler: props.editHandler, view: true },
		{
			name: props.status == 'Deactivated' ? 'REACTIVATE' : 'DELETE',
			icon: 'delete',
			handler: props.deleteHandler,
			view: props.canHaveDeleteOption
		}
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
			<TippyMenu
				icon={
					<IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true">
						<MoreVertIcon />
					</IconButton>
				}
				// ref={menuRef}
			>
				{options.map(option =>
					option.view ? (
						<MenuItem key={option} selected={option === 'Pyxis'} onClick={option.handler}>
							<ListItemIcon>
								<Icon>{option.icon}</Icon>
							</ListItemIcon>
							<Typography variant="inherit"> {t(option.name)}</Typography>
						</MenuItem>
					) : null
				)}
			</TippyMenu>
		</div>
	);
}
// import React, { useState } from 'react';
// import onClickOutside from 'react-onclickoutside';
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
// import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { Icon, IconButton } from '@material-ui/core';
// const Menu = props => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	// const toggle = () => setIsOpen(!isOpen);
// 	const options = [
// 		{ name: 'Edit', icon: 'edit', handler: props.editHandler },
// 		{ name: 'Delete', icon: 'delete', handler: props.deleteHandler }
// 	];
// 	Menu.handleClickOutside = () => setIsOpen(false);
// 	const handleClick = event => {
// 		event.stopPropagation();
// 		setIsOpen(prev => !prev);
// 	};

// 	return (
// 		<div className="actions-dropdown relative">
// 			<IconButton aria-label="more" aria-controls="long-menu-table" aria-haspopup="true" onClick={handleClick}>
// 				<MoreVertIcon />
// 			</IconButton>
// 			{isOpen && (
// 				<div className="custom-list-dropdown">
// 					<ul className="list-unstyled">
// 						{options.map(option => (
// 							<li className="py-6">
// 								<Icon>{option.icon}</Icon>
// 								{option.name}
// 							</li>
// 						))}
// 					</ul>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// const clickOutsideConfig = {
// 	handleClickOutside: () => Menu.handleClickOutside,
// 	excludeScrollbar: true
// };

// export default onClickOutside(Menu, clickOutsideConfig);
