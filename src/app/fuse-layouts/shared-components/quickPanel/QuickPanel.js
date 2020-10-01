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
import { ALERTED_POSTS_TASKS, ALERTED_POSTS_ACTIVITY } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import PostList from 'app/main/apps/notes/todo/PostList';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';

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
				let items = results.map(d => ({ ...d, type: 'tasks' }));
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
				let items = results.map(d => ({ ...d, type: 'activity' }));
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
				<div className="flex justify-between items-center">
					{/* <ListSubheader className="bg-body" component="div">Alerted posts</ListSubheader> */}
					<Typography className="mx-16 text-16" color="inherit">Alerted posts</Typography>
					<div className="px-4">
						<IconButton onClick={ev => dispatch(Actions.toggleQuickPanel())} color="inherit">
							<Icon>close</Icon>
						</IconButton>
					</div>
				</div>
				<div className={clsx(classes.root, 'alerted-post-modal-accordion')}>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1a-content"
							id="panel1a-header"
						>
							<Typography className={classes.heading}>Tasks</Typography>
						</AccordionSummary>
						<AccordionDetails className="flex-wrap">
							<PostList posts={listTask} />
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel2a-content"
							id="panel2a-header"
						>
							<Typography className={classes.heading}>Activities</Typography>
						</AccordionSummary>
						<AccordionDetails  className="flex-wrap">
							<PostList posts={listActivity} />
						</AccordionDetails>
					</Accordion>
				</div>
			</FuseScrollbars>
		</Drawer>
	);
}

export default withReducer('quickPanel', reducer)(React.memo(QuickPanel));
