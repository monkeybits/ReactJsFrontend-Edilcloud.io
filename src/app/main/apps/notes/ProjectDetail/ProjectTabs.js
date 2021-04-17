// import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import * as Actions from 'app/main/apps/notes/contacts/store/actions';
import reducer from 'app/main/apps/notes/contacts/store/reducers';
import { useDeepCompareEffect } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Icon } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as TodoActions from 'app/main/apps/notes/todo/store/actions';
import Gantt from '../gantt/index';
import FileManagerApp from '../file-manager/FileManagerApp';
import TodoApp from '../todo/TodoApp';
import ChatApp from '../chat/ChatApp';
import ContactsApp from '../contacts/ContactsApp';
import ProjectInfo from './ProjectInfo';
import { Height } from '@material-ui/icons';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`wrapped-tabpanel-${index}`}
			aria-labelledby={`wrapped-tab-${index}`}
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
		id: `wrapped-tab-${index}`,
		'aria-controls': `wrapped-tabpanel-${index}`,
		
	};
}
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		minHeight: '100%',
		backgroundColor: '#1e2125',
		height: 76,
		
	}
}));

function ProjectTabs({ value, setValue, setOpenDialog }) {
	const { t } = useTranslation('projects');
	const classes = useStyles();
	const taskContentDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.taskContentDialog);
	const todoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.todoDialog);
	const [zoom, setZoom] = useState({
		currentZoom: 'Months'
	});
	// useEffect(() => {
	// 	dispatch(Actions.getTodos(routeParams.id, true));
	// 	return () => {
	// 		dispatch({
	// 			type: Actions.GET_TODOS,
	// 			payload: []
	// 		});
	// 	};
	// }, [dispatch, routeParams]);
	const handleZoomChange = zoom => {
		setZoom({
			currentZoom: zoom
		});
	};
	const dispatch = useDispatch();
	const routeParams = useParams();
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	useDeepCompareEffect(() => {
		dispatch(Actions.getApprovedContacts(routeParams.id));

		return dispatch(Actions.resetContact());
	}, [dispatch, routeParams]);
	return (
		<div className={classes.root}>
			<TabPanel value={value} index={0} className="team-tab-content p-0 no-data-height-full">
				<ContactsApp {...{ value, setValue, setOpenDialog }} />
			</TabPanel>
			<TabPanel value={value} index={1} className="h-full no-data-height-full chat-tab-content-height">
				<ChatApp {...{ value, setValue }} />
			</TabPanel>
			<TabPanel value={value} index={2} className="no-data-height-full">
				<TodoApp {...{ value, setValue }} />
			</TabPanel>
			<TabPanel value={value} index={3} className="no-data-height-full">
				{/* <div className="flex w-full justify-between items-center p-24 pb-0">
					<div className="mr-20">
						<Typography variant="h5" className="mb-4">
							File
						</Typography>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="subtitle1" className="font-weight-700 mb-4">
								Project Name
							</Typography>
						</FuseAnimate>
						<Typography variant="subtitle1" className="text-14 font-weight-600 text-muted">
							Nuernbergerstrasse 45, Elsfleth, Niedersachsen, 26931
						</Typography>
					</div>
					<Button className="badge-btn" color="secondary">
						Open Details
					</Button>
				</div> */}
				<FileManagerApp {...{ value, setValue }} />
			</TabPanel>
			{/* <TabPanel value={value} index={4} className="gantt-height-full"> */}
			{/* <div> */}
			{/* <div className="zoom-bar custom-zoom-bar">
						<Toolbar zoom={zoom.currentZoom} onZoomChange={handleZoomChange} />
					</div> */}
			<div id="myCover" className={value !== 4 ? 'hidden' : 'gantt-container gantt-height-full'}>
				<Gantt zoom={zoom.currentZoom} {...{ value, setValue }} />
			</div>
			{/* </div> */}
			{/* </TabPanel> */}
			<AppBar className="fixed custom-tab-header lightblue-bg custom-tab-header-mobile right-0 bottom-0">
				<BottomNavigation
					value={value}
					onChange={(event, newValue) => {
						if (taskContentDialog.props.open) {
							dispatch(TodoActions.closeTaskContent());
							setTimeout(() => {
								setValue(newValue);
							}, 0);
						} else if (todoDialog.props.openTimelineDialog) {
							dispatch(TodoActions.closeTimelineDialog());
							setTimeout(() => {
								setValue(newValue);
							}, 0);
						} else {
							setValue(newValue);
						}
					}}
					showLabels
					className={classes.root}
				>
					<BottomNavigationAction className="text-white" label={t('TEAM')} icon={<Icon className="white">people</Icon>} {...a11yProps(0)} />
					<BottomNavigationAction label={t('CHAT')} icon={<Icon>message</Icon>} {...a11yProps(1)} />
					<BottomNavigationAction label={t('TODO')} icon={<Icon>check_box</Icon>} {...a11yProps(2)} />
					<BottomNavigationAction label={t('FILES')} icon={<Icon>folder</Icon>} {...a11yProps(3)} />
					<BottomNavigationAction label={t('GANTT')} icon={<Icon>subject</Icon>} {...a11yProps(4)} />
				</BottomNavigation>
			</AppBar>
		</div>
	);
}
export default withReducer('contactsApp', reducer)(ProjectTabs);
