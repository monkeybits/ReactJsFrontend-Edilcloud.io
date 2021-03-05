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
import TimelineTab from 'app/main/pages/profile/tabs/TimelineTab';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Checkbox } from '@material-ui/core';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { ALERTED_POSTS_TASKS, GET_ALL_NOTIFICATIONS, GET_ALL_PAGES_NOTIFICATIONS } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import PostList from 'app/main/apps/notes/todo/PostList';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroller';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';

import CircularProgress from '@material-ui/core/CircularProgress';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import Guide from './Guide';

const useStyles = makeStyles(theme => ({
	root: {
		width: 450,
		backgroundColor: '#eff2f7'
	},
	top: {
		color: '#192d3e',
		animationDuration: '550ms',
		position: 'absolute',
		left: '50%'
	},
	circle: {
		strokeLinecap: 'round'
	}
}));

function AccessibilityPanel(props) {
	const dispatch = useDispatch();
	const state = useSelector(({ accessibilityPanel }) => accessibilityPanel.state);
	const classes = useStyles();

	return (
		<Drawer
			classes={{ paper: classes.root }}
			className="alerted-post-modal-width"
			open={state}
			anchor="right"
			onClose={ev => dispatch(Actions.toggleAccessibility())}
		>
			<FuseScrollbars className="unset-position">
				<div className="flex flex-col">
					<div className="px-4 absolute top-0 right-0 z-20">
						<IconButton onClick={ev => dispatch(Actions.toggleAccessibility())} className="text-white">
							<Icon>close</Icon>
						</IconButton>
					</div>
					<Card className="w-full rounded-none">
						<AppBar position="inherit" elevation={0}>
							<Toolbar className="px-8 pt-36 pb-56 text-center bg-blue-500">
								<Typography variant="h5" color="inherit" className="flex-1 px-12">
									Edilcloud Quickstart
								</Typography>
							</Toolbar>
						</AppBar>
						<div className="absolute custom-quickstart-wrap w-full">
							<Guide />
						</div>
					</Card>
				</div>
			</FuseScrollbars>
		</Drawer>
	);
}

export default withReducer('accessibilityPanel', reducer)(React.memo(AccessibilityPanel));
