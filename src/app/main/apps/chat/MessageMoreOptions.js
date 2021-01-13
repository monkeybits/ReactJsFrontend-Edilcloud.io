import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

export default function SimpleMenu(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const dispatch = useDispatch();
	const { t } = useTranslation('chat');

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleDelete = () => {
        dispatch(props.deleteMessage(props.item.id))
		handleClose();
	};
	return (
		<div className={props.className}>
			<IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
				<MoreVertIcon />
			</IconButton>
			<Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
				<MenuItem onClick={handleDelete}>{t('DELETE')}</MenuItem>
			</Menu>
		</div>
	);
}
