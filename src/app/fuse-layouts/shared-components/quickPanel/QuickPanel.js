import React, { useEffect, useState } from 'react';
// import loadable from '@loadable/component';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Drawer, Icon, Typography, IconButton, AppBar, Tabs, Tab, Box, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { ALERTED_POSTS_TASKS, ALERTED_POSTS_ACTIVITY } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import PropTypes from 'prop-types';
import reducer from './store/reducers';
import * as Actions from './store/actions/index';

const PostList = React.lazy(() => import('app/main/apps/notes/todo/PostList'));

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
			err => {
				// console.log(err)
			},
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
			err => {
				// console.log(err)
			},
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
					<TabPanel value={value} index={0} className="bg-post-section write-post-img-full">
						<PostList posts={listTask} showPrject />
					</TabPanel>
					<TabPanel value={value} index={1} className="bg-post-section write-post-img-full">
						<PostList posts={listActivity} showPrject showTask />
					</TabPanel>
				</div>
			</FuseScrollbars>
		</Drawer>
	);
}

export default withReducer('quickPanel', reducer)(React.memo(QuickPanel));
