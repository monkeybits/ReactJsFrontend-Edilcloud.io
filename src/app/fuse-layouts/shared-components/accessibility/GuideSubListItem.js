import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemLink from '@material-ui/core/ListItemLink';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from 'app/main/apps/notes/todo/store/reducers';
import * as Actions from './store/actions';
import * as NotesActions from 'app/main/apps/notes/store/actions';
import * as ContactActions from 'app/main/apps/contacts/store/actions';
import * as TodosActions from 'app/main/apps/notes/todo/store/actions';
import * as TodoTaskActions from 'app/main/apps/todo/store/actions';
import { useDeepCompareEffect } from '@fuse/hooks';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import GuideCard from './GuideCard';
import ReactPlayer from 'react-player';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useHistory } from 'react-router-dom';

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
		setPlaying(true)
	}

	const handlePause = () => {
		setPlaying(false)
	}

	const handlePlayIcon = () => {
		setControls(true)
		setPlaying(true)
	}

	const projects = useSelector(({ notesApp }) => notesApp?.project?.entities);

	// console.log('props............Data', props.todos)
	// console.log('props............Data', props.todos[0])

	console.log('props............Data', projects)

	const onLinkClick = () => {
		if(props.data.link !== '') {
			history.push(props.data.link)
		}
		if(props.data.iconSelection === 'team') {
			dispatch(Actions.toggleAccessibility())
			setTimeout(() => {
				dispatch(ContactActions.openNewContactDialog('Invite'));
			}, 250)
		}
		if(props.data.iconSelection === 'project') {
			dispatch(Actions.toggleAccessibility())
			setTimeout(() => {
				dispatch(NotesActions.openProjectDialog('new'))
			}, 250)
		}
		if(props.data.iconSelection === 'task') {
			dispatch(Actions.toggleAccessibility())
			setTimeout(() => {
				dispatch(TodosActions.openNewTodoDialog())
			}, 250)
		}
		if(props.data.iconSelection === 'post') {
			dispatch(Actions.toggleAccessibility())
			if(projects && projects.length > 0) {
				history.push('/apps/projects/' + projects[0].id)
			}
			setTimeout(() => {
				dispatch(TodosActions.openTaskContent(props.todos[0]));
			}, 500)
		}
		if(props.data.iconSelection === 'downloadApp') {
			localStorage.setItem('downloadApp', 'true');
			dispatch(Actions.downloadSmartPhoneApp())
		}
	}

	return (
		<List className={classes.root}>
			<ListItem>
				{props.data.image
					? <CardActionArea>
						<CardMedia
							className={classes.media}
							image="/material-ui-static/images/cards/contemplative-reptile.jpg"
							title="Contemplative Reptile"
						/>
					</CardActionArea>
					: <CardActionArea className="relative">
						<ReactPlayer
							url='assets/videos/samplevideo.mp4'
							playing={playing}
							onPlay={handlePlay}
							onPause={handlePause}
							controls={controls}
							width="100%"
							height="100%"
						/>
						{
							!playing &&
								<div className="absolute top-2/4 left-2/4 play-icon-wrap">
									<IconButton className={classes.playBtn} color="inherit" onClick={handlePlayIcon}>
										<Icon className={classes.playIcon}>play_arrow</Icon>
									</IconButton>
								</div>
						}
					</CardActionArea>
				}
			</ListItem>
			<ListItem>
				<ListItemText primary={props.data.contentDescription} />
			</ListItem>
			<ListItem onClick={onLinkClick} button className={classes.link}>
				<ListItemText primary={props.data.linkText} />
			</ListItem>
		</List>
	);
}

export default withReducer('todoAppNote', reducer)(GuideSubListItem)
