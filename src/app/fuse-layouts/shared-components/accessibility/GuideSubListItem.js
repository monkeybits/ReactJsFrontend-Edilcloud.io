import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, CardActionArea, CardMedia, Icon, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from 'app/main/apps/notes/todo/store/reducers';
import * as NotesActions from 'app/main/apps/notes/store/actions';
import * as ContactActions from 'app/main/apps/contacts/store/actions';
import * as TodosActions from 'app/main/apps/notes/todo/store/actions';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import * as Actions from './store/actions';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		// maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	media: {
		height: 140
	},
	playBtn: {
		background: 'rgba(0,0,0,0.5)'
	},
	playIcon: {
		color: '#ffffff'
	},
	link: {
		color: '#376AED'
	}
}));

function GuideSubListItem(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	const [controls, setControls] = React.useState(false);
	const [playing, setPlaying] = React.useState(false);

	const handlePlay = () => {
		setPlaying(true);
	};

	const handlePause = () => {
		setPlaying(false);
	};

	const handlePlayIcon = () => {
		setControls(true);
		setPlaying(true);
	};

	const projects = useSelector(({ notesApp }) => notesApp?.project?.entities);

	const onLinkClick = () => {
		if (props.data.link !== '') {
			history.push(props.data.link);
		}
		if (props.data.iconSelection === 'team') {
			dispatch(Actions.toggleAccessibility());
			if (!props.isDataAvail) {
				setTimeout(() => {
					dispatch(ContactActions.openNewContactDialog('Invite'));
				}, 250);
			}
		}
		if (props.data.iconSelection === 'project') {
			dispatch(Actions.toggleAccessibility());
			if (!props.isDataAvail) {
				setTimeout(() => {
					dispatch(NotesActions.openProjectDialog('new'));
				}, 250);
			}
		}
		if (props.data.iconSelection === 'task') {
			dispatch(Actions.toggleAccessibility());
			if (projects && projects.length > 0) {
				history.push(`/apps/projects/${projects[0].id}`);
			}
			if (!props.isDataAvail) {
				setTimeout(() => {
					dispatch(TodosActions.openNewTodoDialog());
				}, 250);
			}
		}
		if (props.data.iconSelection === 'post') {
			dispatch(Actions.toggleAccessibility());
			if (projects && projects.length > 0) {
				history.push(`/apps/projects/${projects[0].id}`);
			}
			setTimeout(() => {
				dispatch(TodosActions.openTaskContent(props.todos[0]));
			}, 500);
		}
		if (props.data.iconSelection === 'downloadApp') {
			localStorage.setItem('downloadApp', 'true');
			dispatch(Actions.downloadSmartPhoneApp());
		}
	};

	return (
		<List className={classes.root}>
			<ListItem>
				{props.data.image ? (
					<CardActionArea>
						<CardMedia className={classes.media} image={props.data.image} title="Contemplative Reptile" />
					</CardActionArea>
				) : (
					<CardActionArea className="relative">
						<ReactPlayer
							url={props.data.video}
							playing={playing}
							onPlay={handlePlay}
							onPause={handlePause}
							controls={controls}
							width="100%"
							height="100%"
						/>
						{!playing && (
							<div className="absolute top-2/4 left-2/4 play-icon-wrap">
								<IconButton className={classes.playBtn} color="inherit" onClick={handlePlayIcon}>
									<Icon className={classes.playIcon}>play_arrow</Icon>
								</IconButton>
							</div>
						)}
					</CardActionArea>
				)}
			</ListItem>
			{props.data.contentDescription && (
				<ListItem>
					<ListItemText primary={props.data.contentDescription} />
				</ListItem>
			)}
			{props.isDataAvail ? (
				<ListItem onClick={onLinkClick} button className={classes.link}>
					<ListItemText className="link-text" primary={props.data.linkTextAll} />
				</ListItem>
			) : (
				<ListItem onClick={onLinkClick} button className={classes.link}>
					<ListItemText className="link-text" primary={props.data.linkText} />
				</ListItem>
			)}
		</List>
	);
}

export default withReducer('todoAppNote', reducer)(GuideSubListItem);
