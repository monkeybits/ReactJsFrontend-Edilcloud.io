import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemLink from '@material-ui/core/ListItemLink';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
// import * as NotesActions from 'app/main/apps/notes/store/actions';
import * as ContactActions from 'app/main/apps/contacts/store/actions';
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
	}
}));

export default function GuideSubListItem(props) {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	const [controls, setControls] = React.useState(false);
	const [playing, setPlaying] = React.useState(false);
	console.log('props.data', props.data)

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

	const onLinkClick = () => {
		dispatch(Actions.toggleAccessibility())
		history.push('/apps/contacts/all')
		setTimeout(() => {
			dispatch(ContactActions.openNewContactDialog('Invite'));
			// dispatch(NotesActions.openProjectDialog('new'))
		}, 250)
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
			<ListItem onClick={onLinkClick} button>
				<ListItemText primary={props.data.linkText} />
			</ListItem>
		</List>
	);
}
