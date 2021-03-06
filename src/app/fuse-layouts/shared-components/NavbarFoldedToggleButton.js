import React from 'react';
import _ from '@lodash';
import { Icon, IconButton } from '@material-ui/core';
import * as Actions from 'app/store/actions';
import { useDispatch, useSelector } from 'react-redux';

function NavbarFoldedToggleButton(props) {
	const dispatch = useDispatch();
	const settings = useSelector(({ fuse }) => fuse.settings.current);

	return (
		<IconButton
			className={props.className}
			onClick={() => {
				dispatch(
					Actions.setDefaultSettings(
						_.set({}, 'layout.config.navbar.folded', !settings.layout.config.navbar.folded)
					)
				);
				dispatch(Actions.toggleSidebarMenu());
			}}
			color="inherit"
		>
			{props.children}
		</IconButton>
	);
}

NavbarFoldedToggleButton.defaultProps = {
	children: <Icon>menu</Icon>
};

export default NavbarFoldedToggleButton;
