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
import { ALERTED_POSTS_TASKS, ALERTED_POSTS_ACTIVITY } from 'app/services/apiEndPoints';
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
import reducer from './store/reducers';
import * as Actions from './store/actions/index';

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

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`
	};
}

const useStylesTabs = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	}
}));

function QuickPanel(props) {
	const dispatch = useDispatch();
	const data = useSelector(({ quickPanel }) => quickPanel.data);
	const state = useSelector(({ quickPanel }) => quickPanel.state);
	const classesAccordion = useStylesAccordion();
	const classesTabs = useStylesTabs();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const classes = useStyles();
	const [checked, setChecked] = useState('notifications');
	const [listTask, setListTask] = useState([]);
	const [listActivity, setListActivity] = useState([]);
	useEffect(() => {
		if (state) {
			getAlertPostTask();
			getAlertPostActivity();
		}
		return () => {
			setListActivity([]);
			setListTask([]);
		};
	}, [state]);
	const getAlertPostTask = () => {
		apiCall(
			ALERTED_POSTS_TASKS,
			{},
			results => {
				const items = results.map(d => ({ ...d, type: 'tasks' }));
				setListTask(items);
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	const getAlertPostActivity = () => {
		apiCall(
			ALERTED_POSTS_ACTIVITY,
			{},
			results => {
				const items = results.map(d => ({ ...d, type: 'activity' }));
				setListActivity(items);
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
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
			className="alerted-post-modal-width"
			open={state}
			anchor="right"
			onClose={ev => dispatch(Actions.toggleQuickPanel())}
		>
			<FuseScrollbars>
				<Toolbar className="px-4 flex justify-between items-center">
					{/* <ListSubheader className="bg-body" component="div">Alerted posts</ListSubheader> */}
					<Typography className="mx-16 text-16" color="inherit">
						Alerted posts
					</Typography>
					<div className="px-4">
						<IconButton onClick={ev => dispatch(Actions.toggleQuickPanel())} color="inherit">
							<Icon>close</Icon>
						</IconButton>
					</div>
				</Toolbar>
				<div className={classesTabs.root}>
					<AppBar position="static">
						<Tabs fullWidth value={value} onChange={handleChange} centered aria-label="simple tabs example">
							<Tab label="Tasks" {...a11yProps(0)} />
							<Tab label="Activities" {...a11yProps(1)} />
						</Tabs>
					</AppBar>
					<TabPanel value={value} index={0} className="bg-post-section">
						<PostList posts={listTask} showPrject />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<PostList posts={listActivity} showPrject showTask />
					</TabPanel>
				</div>
			</FuseScrollbars>
		</Drawer>
	);
}

export default withReducer('quickPanel', reducer)(React.memo(QuickPanel));
