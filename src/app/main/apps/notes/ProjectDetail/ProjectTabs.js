// import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProjectInfo from './ProjectInfo';
import React from 'react';
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

// const useStyles = makeStyles(theme => ({
// 	root: {
// 		flexGrow: 1,
// 		minHeight: '100%',
// 		backgroundColor: theme.palette.background.paper
// 	}
// }));

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		minHeight: '100%',
		backgroundColor: theme.palette.background.paper
	}
}));

function ProjectTabs({ value, setValue }) {
	const classes = useStyles();

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
			<TabPanel value={value} index={0}>
				<ProjectInfo />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<ContactsApp />
			</TabPanel>
			<TabPanel value={value} index={2} className="h-full chat-tab-content-height">
				<ChatApp />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<TodoApp />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<FileManagerApp />
			</TabPanel>
			<TabPanel value={value} index={5}>
				Item Six
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
					<BottomNavigationAction label="Info" icon={<RestoreIcon />} {...a11yProps(0)} />
					<BottomNavigationAction label="Team" icon={<FavoriteIcon />} {...a11yProps(1)} />
					<BottomNavigationAction label="Chat" icon={<LocationOnIcon />} {...a11yProps(2)} />
					<BottomNavigationAction label="Todo" icon={<RestoreIcon />} {...a11yProps(3)} />
					<BottomNavigationAction label="File Manager" icon={<FavoriteIcon />} {...a11yProps(4)} />
					<BottomNavigationAction label="Gantt" icon={<LocationOnIcon />} {...a11yProps(5)} />
				</BottomNavigation>
			</AppBar>
		</div>
	);
}
export default withReducer('contactsApp', reducer)(ProjectTabs);
