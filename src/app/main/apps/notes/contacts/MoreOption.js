import { Icon, IconButton, Typography, MenuItem, ListItemIcon } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
const TippyMenu = loadable(() => import('app/TippyMenu'));

export default function MoreOption(props) {
	const { t } = useTranslation('contacts_project');
	const [anchorEl, setAnchorEl] = React.useState(false);
	const options = [
		{ name: 'VIEW', icon: 'visibility', handler: props.onView, view: true },
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
