import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import withReducer from 'app/store/withReducer';
import reducer from 'app/main/apps/notes/store/reducers';
import * as ConatctActions from 'app/main/apps/contacts/store/actions';
import * as NotesActions from 'app/main/apps/notes/store/actions';
import * as TodosActions from 'app/main/apps/notes/todo/store/actions';
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
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import {
	GET_POST_FOR_TASK
} from 'app/services/apiEndPoints';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		// maxWidth: 360,
		backgroundColor: '#eff2f7',
		padding: 0,
		borderRadius: 10,
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

function Guide() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [isMenuOpen, setIsOpenMenu] = React.useState('');
	const [posts, setPosts] = React.useState([]);
	const [loading, setLoading] = useState({
		loadingProjects: true,
		loadingProjectRequest: true
	});

	const handleSetLoading = data =>
		setLoading(loading => ({
			...loading,
			...data
	}));

	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts?.entities);
	const projects = useSelector(({ notesApp }) => notesApp?.project?.entities);
	const todos = useSelector(({ todoAppNote }) => todoAppNote?.todos?.entities);
	const accessibilityPanelAppState = useSelector(({ accessibilityPanel }) => accessibilityPanel.isDownloadApp);
	let accessibilityPanelApp = localStorage.getItem('downloadApp');

	useEffect(() => {
		setPosts([]);
		if (todos) {
			getPosts();
		}
	}, [todos]);

	const getPosts = () => {
		if(todos && Object.keys(todos).length > 0) {
			apiCall(
				GET_POST_FOR_TASK(todos[0].id),
				{},
				res => {
					setPosts(res.results);
				},
				err => {
					console.log(err);
				},
				METHOD.GET,
				getHeaderToken()
			);
		}
	};

	useEffect(() => {
		if(contacts && contacts.length > 0) {
			setIsOpenMenu('project')
		}

		if(projects && projects.length > 0) {
			setIsOpenMenu('task')
		}
		
		if(todos && Object.keys(todos).length > 0) {
			setIsOpenMenu('post')
		}

		if(posts && posts.length > 0) {
			setIsOpenMenu('downloadApp')
		}

		if(accessibilityPanelApp === 'true' || accessibilityPanelAppState) {
			setIsOpenMenu('discover')
		}

	}, [contacts, projects, todos, posts, accessibilityPanelApp, accessibilityPanelAppState, setIsOpenMenu]);

	useDeepCompareEffect(() => {
		dispatch(ConatctActions.getContacts());
		dispatch(NotesActions.getProjects(handleSetLoading));
		if(projects.length > 0) {
			let project_id = 0
			if(projects !== undefined && projects.length > 0) {
				project_id = projects[0].id
			}
			dispatch(TodosActions.getTodos(project_id, true));
		}
	}, [dispatch, projects]);

	const [quickStartList, setQuickStartList] = React.useState([
		{
			title: 'Add your collaborators',
			content: 'Testing',
			contentTitle: 'Welcome to EdilCloud',
			contentDescription: 'Add your collaborators and let them access the company.',
			link: '/apps/contacts/all',
			linkText: 'Add team page',
			linkTextAll: 'View teams',
			image: '',
			video: '',
			iconSelection: 'team'
		},
		{
			title: 'Creat a project',
			content: 'Testing',
			contentTitle: '',
			contentDescription: 'You can create a project and assign task to other companies, or assign them to your company only',
			link: '/apps/projects',
			linkText: 'Add project page',
			linkTextAll: 'View projects',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: 'project'
		},
		{
			title: 'Creat a task',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: projects !== undefined && projects.length > 0 ? '/apps/projects/' + projects[0].id : '',
			linkText: 'Add task page',
			linkTextAll: 'View tasks',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: 'task',
		},
		{
			title: 'Creat a post',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: projects !== undefined && projects.length > 0 ? '/apps/projects/' + projects[0].id : '',
			linkText: 'Add post page',
			linkTextAll: 'View posts',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: 'post',
		},
		{
			title: 'Download app for smartphone',
			content: 'Testing',
			contentTitle: '',
			contentDescription: 'Download the app for your phone or tablet and use EdilCloud from the construction site field',
			link: '',
			linkText: 'Download App',
			linkTextAll: '',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: 'downloadApp'
		},
		{
			title: 'Discover Dashboard',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: '',
			linkText: '',
			linkTextAll: '',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: 'discover'
		},
		{
			title: 'Creat Knowledge Base',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: '',
			linkText: '',
			linkTextAll: '',
			image: '/material-ui-static/images/cards/contemplative-reptile.jpg',
			video: '',
			iconSelection: 'knowledge'
		},
	]);

	const handleClick = () => {
		setOpen(!open);
	};
	
	return (
		<List
			component="nav"
			aria-labelledby="nested-list-subheader"
			className={classes.root}
		>
			
			{quickStartList.map((d, i) => (
				<GuideListItem {...{ 
					data: d,
					index: i,
					isMenuOpen: isMenuOpen
				}} />
			))}
		</List>
	);
}

export default withReducer('notesApp', reducer)(Guide);
