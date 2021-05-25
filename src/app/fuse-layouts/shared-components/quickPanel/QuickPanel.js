import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { Drawer, Icon, Typography, IconButton, AppBar, Tabs, Tab, Box, Toolbar, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { ALERTED_POSTS_TASKS, ALERTED_POSTS_ACTIVITY } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import PropTypes from 'prop-types';
import reducer from './store/reducers';
import * as Actions from './store/actions/index';

const PostList = loadable(() => import('app/main/apps/notes/todo/PostList'));

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
	const state = useSelector(({ quickPanel }) => quickPanel.state);
	const projects = useSelector(({ notesApp }) => notesApp.project.entities);

	const classes = useStyles();
	const [listTask, setListTask] = useState([]);
	const [listActivity, setListActivity] = useState([]);
	const [distinctProject, setDistinctProject] = useState([]);

	const onlyUnique = (value, index, self) => {
		return self.indexOf(value) === index;
	}

	useEffect(() => {
		if (projects) {
			let projectIds = []
			listTask.map((task) => {
				projectIds = [
					...projectIds,
					task.project.id
				]
			})
			listActivity.map((activity) => {
				projectIds = [
					...projectIds,
					activity.project.id
				]
			})
			var distinctProject = projectIds.filter(onlyUnique);
			setDistinctProject(distinctProject)
		}
	}, [projects, listTask, listActivity]);

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

	const handleSelectProject = (event, id) => {
		dispatch(Actions.openAlertQuickPanel(id))
	}

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
				<div>
					<Toolbar className="px-4 flex justify-between items-center notifications-header">
						<Typography className="mx-16 text-16" color="inherit">
							Projects
						</Typography>
						<div className="px-4">
							<IconButton onClick={ev => dispatch(Actions.toggleQuickPanel())} color="inherit">
								<Icon>close</Icon>
							</IconButton>
						</div>
					</Toolbar>
					<div className="p-16">
						{
							projects.length > 0 &&
							projects.map((project) => (
								<>
									{
										distinctProject.includes(project.id) &&
										<ListItem
											button
											className="flex items-center relative w-full p-10 min-h-20 shadow border-2 font-bold bg-gray-300 hover:bg-gray-300 rounded-8 mb-16"
											onClick={(event) =>
												handleSelectProject(event, project.id)
											}
											// component={item.url ? NavLinkAdapter : 'li'}
											// to={item.url}
											role="button"
										>
											<ListItemText
												className="text-bold"
												primary={project.name}
											/>
											<IconButton
												disableRipple
												className="w-40 h-40 -mx-12 p-0 focus:bg-transparent hover:bg-transparent"
											>
												<Icon className="text-16 arrow-icon" color="inherit">
													chevron_right
												</Icon>
											</IconButton>
										</ListItem>
									}
								</>
							))
						}
					</div>
				</div>
			</FuseScrollbars>
		</Drawer>
	);
}

export default withReducer('quickPanel', reducer)(React.memo(QuickPanel));
