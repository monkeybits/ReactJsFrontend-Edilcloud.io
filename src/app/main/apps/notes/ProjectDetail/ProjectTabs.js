// import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProjectInfo from './ProjectInfo';
import React, { useState } from 'react';
import ContactsApp from '../contacts/ContactsApp';
import ChatApp from '../chat/ChatApp';
import TodoApp from '../todo/TodoApp';
import FileManagerApp from '../file-manager/FileManagerApp';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import * as Actions from 'app/main/apps/notes/contacts/store/actions';
import reducer from 'app/main/apps/notes/contacts/store/reducers';
import { useDeepCompareEffect } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Gantt from '../gantt/index';
import Toolbar from '../gantt/Toolbar';
import { Icon } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import FuseAnimate from '@fuse/core/FuseAnimate';

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
		'aria-controls': `wrapped-tabpanel-${index}`
	};
}
const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		minHeight: '100%',
		backgroundColor: theme.palette.background.paper
	}
}));

function ProjectTabs({ value, setValue , setOpenDialog }) {
	const classes = useStyles();
	const [zoom, setZoom] = useState({
		currentZoom: 'Months'
	});

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
		dispatch(Actions.getContacts(routeParams.id));

		return dispatch(Actions.resetContact());
	}, [dispatch, routeParams]);
	return (
		<div className={classes.root}>
			<TabPanel value={value} index={0} className="team-tab-content no-data-height-full">
				<ContactsApp {...{ value, setValue , setOpenDialog }} />
			</TabPanel>
			<TabPanel value={value} index={1} className="h-full chat-tab-content-height">
				<ChatApp {...{ value, setValue }} />
			</TabPanel>
			<TabPanel value={value} index={2} className="no-data-height-full">
				<TodoApp {...{ value, setValue }} />
			</TabPanel>
			<TabPanel value={value} index={3} className="no-data-height-full">
				{/* <div className="flex w-full justify-between items-center p-24 pb-0">
					<div>
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
			<TabPanel value={value} index={4} className="gantt-height-full">
				{/* <div> */}
				{/* <div className="zoom-bar custom-zoom-bar">
						<Toolbar zoom={zoom.currentZoom} onZoomChange={handleZoomChange} />
					</div> */}
				<div id="myCover" className="gantt-container">
					<Gantt zoom={zoom.currentZoom} {...{ value, setValue }} />
				</div>
				{/* </div> */}
			</TabPanel>
			<AppBar className="fixed custom-tab-header right-0 bottom-0">
				<BottomNavigation
					value={value}
					onChange={(event, newValue) => {
						setValue(newValue);
					}}
					showLabels
					className={classes.root}
				>
					<BottomNavigationAction label="Team" icon={<Icon>people</Icon>} {...a11yProps(0)} />
					<BottomNavigationAction label="Chat" icon={<Icon>message</Icon>} {...a11yProps(1)} />
					<BottomNavigationAction label="Todo" icon={<Icon>check_box</Icon>} {...a11yProps(2)} />
					<BottomNavigationAction label="Files" icon={<Icon>folder</Icon>} {...a11yProps(3)} />
					<BottomNavigationAction label="Gantt" icon={<Icon>subject</Icon>} {...a11yProps(4)} />
				</BottomNavigation>
			</AppBar>
		</div>
	);
}
export default withReducer('contactsApp', reducer)(ProjectTabs);
