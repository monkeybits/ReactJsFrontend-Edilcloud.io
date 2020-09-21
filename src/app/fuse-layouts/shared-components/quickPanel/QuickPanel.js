import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions/index';
import reducer from './store/reducers';
import TimelineTab from 'app/main/pages/profile/tabs/TimelineTab';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Checkbox } from '@material-ui/core';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { ALERTED_POSTS } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';

const useStyles = makeStyles(theme => ({
	root: {
		width: 450
	}
}));

const useStylesAccordion = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular
	}
}));
function QuickPanel(props) {
	const dispatch = useDispatch();
	const data = useSelector(({ quickPanel }) => quickPanel.data);
	const state = useSelector(({ quickPanel }) => quickPanel.state);
	const classesAccordion = useStylesAccordion();

	const classes = useStyles();
	const [checked, setChecked] = useState('notifications');
	// useEffect(() => {
	// 	apiCall(
	// 		ALERTED_POSTS,
	// 		{},
	// 		res => console.log(res),
	// 		err => console.log(err),
	// 		METHOD.GET,
	// 		getHeaderToken()
	// 	);
	// }, [state]);
	const handleToggle = value => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	useEffect(() => {
		dispatch(Actions.getQuickPanelData());
	}, [dispatch]);

	return (
		<Drawer
			classes={{ paper: classes.root }}
			open={state}
			anchor="right"
			onClose={ev => dispatch(Actions.toggleQuickPanel())}
		>
			<FuseScrollbars>
				<ListSubheader component="div">Alerted posts</ListSubheader>
				<div className={classes.root}>
					<TimelineTab />
				</div>
			</FuseScrollbars>
		</Drawer>
	);
}

export default withReducer('quickPanel', reducer)(React.memo(QuickPanel));
