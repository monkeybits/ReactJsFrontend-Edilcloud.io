import _ from '@lodash';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import { green } from '@material-ui/core/colors';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light-border.css'
import { Paper } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
	paper: {
		marginRight: theme.spacing(2)
	}
}));
function TippyMenu(props) {
	const [instance, setInstance] = useState(null);
	const [visible, setVisible] = useState(false);
	const [ariaExpanded, setAriaExpanded] = useState(false);
	const show = () => setVisible(true);
	const hide = () => setVisible(false);
	const classes = useStyles(props);
	const handleMenuOpen = event => {
		stopsEvents(event);
		show();
		if (props.onOpen) {
			props.onOpen(true);
		}
	};

	const handleMenuClose = event => {
		stopsEvents(event);
		hide();
		if (props.onClose) {
			props.onClose(true);
		}
	};
	const stopsEvents = event => {
		if (event.preventDefault && event.stopPropagation) {
			event.preventDefault();
			event.stopPropagation();
		}
	};

	return (
		<Tippy
			className="custom-tippy"
			theme="light-border"
			allowHTML
			placement="bottom-start"
			// visible={Boolean(instance)}
			// interactive
			content={<Paper className={classes.paper}>{props.children}</Paper>}
			onCreate={setInstance}
			onClickOutside={props.outsideClick ? handleMenuClose : () => ''}
			trigger="click"
			// Need to ensure it can be tabbed to directly after with no clipping issues
			// appendTo="parent"
			// hideOnClick
			onMount={() => setAriaExpanded('true')}
			onHide={() => setAriaExpanded('false')}
		>
			<div
				className="custom-tippy-btn"
				aria-haspopup="true"
				aria-expanded={ariaExpanded}
				onClick={visible ? handleMenuClose : handleMenuOpen}
			>
				{props.icon ? props.icon : <Icon>person</Icon>}
			</div>
		</Tippy>
	);
}

export default TippyMenu;
