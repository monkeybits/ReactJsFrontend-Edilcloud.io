import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import GuideListItem from './GuideListItem';
const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		// maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

export default function Guide() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [quickStartList, setQuickStartList] = React.useState([
		{
			title: 'Add your collaborators',
			content: 'Testing',
			contentTitle: 'Welcome to EdilCloud',
			contentDescription: 'Add your collaborators and let them access the company.',
			link: '',
			linkText: 'Add team page',
			image: '',
			video: '',
			iconSelection: 'team'
		},
		{
			title: 'Creat a project',
			content: 'Testing',
			contentTitle: '',
			contentDescription: 'You can create a project and assign task to other companies, or assign them to your company only',
			link: '',
			linkText: 'See Academy Project Course',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: ''
		},
		{
			title: 'Creat a task',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: '',
			linkText: 'Add team page',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: ''
		},
		{
			title: 'Discover Dashboard',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: '',
			linkText: 'Add team page',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: ''
		},
		{
			title: 'Download app for smartphone',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: '',
			linkText: 'Add team page',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: ''
		},
		{
			title: 'Creat Knowledge Base',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: '',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: ''
		},
	]);

	const handleClick = () => {
		setOpen(!open);
	};

	return (
		<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					To quick start
				</ListSubheader>
			}
			className={classes.root}
		>
			
			{quickStartList.map((d, i) => (
				<GuideListItem {...{ data: d, index: i }} />
			))}
		</List>
	);
}
