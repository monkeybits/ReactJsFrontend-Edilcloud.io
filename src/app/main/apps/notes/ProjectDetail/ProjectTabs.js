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
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import * as Actions from 'app/main/apps/notes/contacts/store/actions';
import reducer from 'app/main/apps/notes/contacts/store/reducers';
import { useDeepCompareEffect } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';

function TabPanel(props) {
	// const [data, setData] = useState(null);
	// useEffect(() => {
	// 	axios.get('/api/profile/about').then(res => {
	// 		setData(res.data);
	// 	});
	// }, []);
	// const { general, work, contact, groups, friends } = data;
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

function ProjectTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState('one');
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
			<TabPanel value={value} index="one">
				<ProjectInfo />
			</TabPanel>
			<TabPanel value={value} index="two">
				<ContactsApp />
			</TabPanel>
			<TabPanel value={value} index="three" className="h-full chat-tab-content-height" >
				<ChatApp />
			</TabPanel>
			<TabPanel value={value} index="four" className="no-bg">
				<TodoApp />
			</TabPanel>
			<TabPanel value={value} index="five">
				Item Five
			</TabPanel>
			<TabPanel value={value} index="six">
				Item Six
			</TabPanel>
			<AppBar className="fixed custom-tab-header right-0 bottom-0">
				<Tabs value={value} onChange={handleChange} aria-label="wrapped label tabs example">
					<Tab value="one" label="Info" wrapped {...a11yProps('one')} />
					<Tab value="two" label="Team" {...a11yProps('two')} />
					<Tab value="three" label="Chat" {...a11yProps('three')} />
					<Tab value="four" label="Todo" {...a11yProps('four')} />
					<Tab value="five" label="File Manager" {...a11yProps('five')} />
					<Tab value="six" label="Gantt" {...a11yProps('six')} />
				</Tabs>
			</AppBar>
		</div>
	);
}
export default withReducer('contactsApp', reducer)(ProjectTabs);