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
	const { t } = useTranslation('contacts_project');
	const [anchorEl, setAnchorEl] = React.useState(false);
	const options = [
		// { name: 'Edit', icon: 'edit', handler: props.editHandler, view: true },
		{ name: 'DELETE', icon: 'delete', handler: props.deleteHandler, view: props.canHaveDeleteOption }
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
						<MenuItem key={option} onClick={option.handler}>
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
