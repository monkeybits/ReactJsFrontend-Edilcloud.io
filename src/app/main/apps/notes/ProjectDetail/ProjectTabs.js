// import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProjectInfo from './ProjectInfo';
import React, {  } from 'react';
import ContactsApp from '../contacts/ContactsApp';

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
		backgroundColor: theme.palette.background.paper
	}
}));

export default function ProjectTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState('one');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<TabPanel value={value} index="one">
				<ProjectInfo />
			</TabPanel>
			<TabPanel value={value} index="two">
				<ContactsApp />
			</TabPanel>
			<TabPanel value={value} index="three">
				Item Three
			</TabPanel>
			<TabPanel value={value} index="four">
				Item Four
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
					<Tab value="three" label="Gantt" {...a11yProps('three')} />
					<Tab value="four" label="Todo" {...a11yProps('four')} />
					<Tab value="five" label="File Manager" {...a11yProps('five')} />
					<Tab value="six" label="Chat" {...a11yProps('six')} />
				</Tabs>
			</AppBar>
		</div>
	);
}
