import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import withReducer from 'app/store/withReducer';
import reducer from 'app/main/apps/notes/todo/store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import boardReducer from 'app/main/apps/scrumboard/store/reducers/board.reducer';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import { GET_POST_FOR_TASK } from 'app/services/apiEndPoints';
import GuideSubListItem from './GuideSubListItem';

const useStyles = makeStyles(theme => ({
	nested: {
		paddingLeft: theme.spacing(4)
	},
	rootCard: {
		width: '100%',
		margin: '0 auto 15px',
		borderRadius: 10
	},
	rootCardContent: {
		padding: '0 !important'
	}
}));

function GuideListItem(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [isTeam, setIsTeam] = React.useState('');
	const [isProject, setIsProject] = React.useState('');
	const [isTask, setIsTask] = React.useState('');
	const [isPost, setIsPost] = React.useState('');
	const [isDownloadApp, setIsDownloadApp] = React.useState('');
	const [openMenu, setOpenMenu] = React.useState('');
	const [posts, setPosts] = React.useState([]);

	const handleClick = () => {
		setOpen(!open);
	};

	const contacts = useSelector(({ contactsApp }) => contactsApp.contacts?.entities);
	const projects = useSelector(({ notesApp }) => notesApp?.project?.entities);
	const todos = useSelector(({ todoAppNote }) => todoAppNote?.todos?.entities);
	const accessibilityPanelAppState = useSelector(({ accessibilityPanel }) => accessibilityPanel.isDownloadApp);
	const accessibilityPanelApp = localStorage.getItem('downloadApp');

	useEffect(() => {
		setPosts([]);
		if (todos) {
			getPosts();
		}
	}, [todos]);

	const getPosts = () => {
		if (todos && Object.keys(todos).length > 0) {
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
		if (contacts && contacts.length > 0) {
			setIsTeam('team');
		}

		if (projects && projects.length > 0) {
			setIsProject('project');
		}

		if (todos && Object.keys(todos).length > 0) {
			setIsTask('task');
		}

		if (posts && posts.length > 0) {
			setIsPost('post');
		}

		if (accessibilityPanelApp === 'true' || accessibilityPanelAppState) {
			setIsDownloadApp('downloadApp');
		}
	}, [
		contacts,
		projects,
		todos,
		posts,
		accessibilityPanelApp,
		accessibilityPanelAppState,
		setOpenMenu,
		setIsDownloadApp
	]);

	useEffect(() => {
		if (props.data.iconSelection === props.isMenuOpen) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [props]);

	return (
		<>
			<Card className={classes.rootCard} variant="outlined">
				<CardContent className={classes.rootCardContent}>
					<ListItem button onClick={handleClick}>
						<IconButton>
							<Icon
								className={
									(props.data.iconSelection === isTeam ||
										props.data.iconSelection === isProject ||
										props.data.iconSelection === isTask ||
										props.data.iconSelection === isPost ||
										props.data.iconSelection === isDownloadApp) &&
									props.data.iconSelection !== ''
										? 'text-green-400'
										: 'text-gray-400'
								}
							>
								check_circle
							</Icon>
						</IconButton>
						<ListItemText className="heading-title" primary={props.data.title} />
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<GuideSubListItem
							data={props.data}
							todos={todos}
							isDataAvail={
								!!(
									(props.data.iconSelection === isTeam ||
										props.data.iconSelection === isProject ||
										props.data.iconSelection === isTask ||
										props.data.iconSelection === isPost ||
										props.data.iconSelection === isDownloadApp) &&
									props.data.iconSelection !== ''
								)
							}
						/>
					</Collapse>
				</CardContent>
			</Card>
		</>
	);
}

export default withReducer('todoAppNote', reducer)(GuideListItem);
