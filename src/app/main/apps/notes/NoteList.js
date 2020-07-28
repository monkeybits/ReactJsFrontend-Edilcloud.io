import FuseUtils from '@fuse/utils';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NoteListItem from './NoteListItem';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
	// root: {
	// 	maxWidth: 345,
	// },
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	board: {
		cursor: 'pointer',
		boxShadow: theme.shadows[0],
		transitionProperty: 'box-shadow border-color',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		background: theme.palette.primary.dark,
		color: theme.palette.getContrastText(theme.palette.primary.dark),
		'&:hover': {
			boxShadow: theme.shadows[6]
		}
	},
	newBoard: {
		borderWidth: 2,
		borderStyle: 'dashed',
		borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.6),
		'&:hover': {
			borderColor: fade(theme.palette.getContrastText(theme.palette.primary.main), 0.8)
		}
	}
}));


function NoteList(props) {
	const notes = useSelector(({ notesApp }) => notesApp.notes.entities);
	const variateDescSize = useSelector(({ notesApp }) => notesApp.notes.variateDescSize);
	const searchText = useSelector(({ notesApp }) => notesApp.notes.searchText);
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const [filteredData, setFilteredData] = useState(null);

	useEffect(() => {
		function filterData() {
			const { params } = props.match;
			const { id, labelId } = params;

			let data = Object.keys(notes).map(_id => notes[_id]);

			if (labelId) {
				data = data.filter(note => note.labels.includes(labelId) && !note.archive);
			}

			if (!id) {
				data = data.filter(note => !note.archive);
			}

			if (id === 'archive') {
				data = data.filter(note => note.archive);
			}

			if (id === 'reminders') {
				data = data.filter(note => Boolean(note.reminder) && !note.archive);
			}

			if (searchText.length === 0) {
				return data;
			}

			data = FuseUtils.filterArrayByString(data, searchText);

			return data;
		}

		if (notes) {
			setFilteredData(filterData());
		}
	}, [notes, searchText, props.match]);

	return !filteredData || filteredData.length === 0 ? (
		<div className="flex items-center justify-center h-full">
			<Typography color="textSecondary" variant="h5">
				There are no notes!
			</Typography>
		</div>
	) : (
			<div className="flex flex-wrap w-full">
				<div className={classes.root}>
					<Grid container spacing={3}>
					<Grid item xs={4}>
							<Card>
								<CardContent>
								<div className="w-224 h-224 p-16 mx-auto">
							<div
								className={clsx(
									classes.board,
									classes.newBoard,
									'flex flex-col items-center justify-center w-full h-full rounded py-24'
								)}
								role="button"
								tabIndex={0}
							>
								<Icon className="text-56">add_circle</Icon>
								<Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
									Create new company
								</Typography>
							</div>
						</div>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card>
								<CardHeader
									avatar={
										<Avatar aria-label="recipe" className={classes.avatar}>
											R
				</Avatar>
									}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title="Shrimp and Chorizo Paella"
									subheader="September 14, 2016"
								/>
								<CardMedia
									className={classes.media}
									image="/assets/images/avatars/Arnold.jpg"
									title="Paella dish"
								/>
								<CardContent>
									<Typography variant="body2" color="textSecondary" component="p">
										This impressive paella is a perfect party dish and a fun meal to cook together with your
										guests. Add 1 cup of frozen peas along with the mussels, if you like.
				</Typography>
								</CardContent>
								<CardActions disableSpacing>
									<IconButton aria-label="add to favorites">
										<FavoriteIcon />
									</IconButton>
									<IconButton aria-label="share">
										<ShareIcon />
									</IconButton>
									<IconButton
										className={clsx(classes.expand, {
											[classes.expandOpen]: expanded,
										})}
										onClick={handleExpandClick}
										aria-expanded={expanded}
										aria-label="show more"
									>
										<ExpandMoreIcon />
									</IconButton>
								</CardActions>
								<Collapse in={expanded} timeout="auto" unmountOnExit>
									<CardContent>
										<Typography paragraph>Method:</Typography>
										<Typography paragraph>
											Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
											minutes.
				</Typography>
										<Typography paragraph>
											Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
											heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
											browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
											and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
											pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
											saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
				</Typography>
										<Typography paragraph>
											Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
											without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
											medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
											again without stirring, until mussels have opened and rice is just tender, 5 to 7
											minutes more. (Discard any mussels that don’t open.)
				</Typography>
										<Typography>
											Set aside off of the heat to let rest for 10 minutes, and then serve.
				</Typography>
									</CardContent>
								</Collapse>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card>
								<CardHeader
									avatar={
										<Avatar aria-label="recipe" className={classes.avatar}>
											R
				</Avatar>
									}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title="Shrimp and Chorizo Paella"
									subheader="September 14, 2016"
								/>
								<CardMedia
									className={classes.media}
									image="/assets/images/avatars/Arnold.jpg"
									title="Paella dish"
								/>
								<CardContent>
									<Typography variant="body2" color="textSecondary" component="p">
										This impressive paella is a perfect party dish and a fun meal to cook together with your
										guests. Add 1 cup of frozen peas along with the mussels, if you like.
				</Typography>
								</CardContent>
								<CardActions disableSpacing>
									<IconButton aria-label="add to favorites">
										<FavoriteIcon />
									</IconButton>
									<IconButton aria-label="share">
										<ShareIcon />
									</IconButton>
									<IconButton
										className={clsx(classes.expand, {
											[classes.expandOpen]: expanded,
										})}
										onClick={handleExpandClick}
										aria-expanded={expanded}
										aria-label="show more"
									>
										<ExpandMoreIcon />
									</IconButton>
								</CardActions>
								<Collapse in={expanded} timeout="auto" unmountOnExit>
									<CardContent>
										<Typography paragraph>Method:</Typography>
										<Typography paragraph>
											Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
											minutes.
				</Typography>
										<Typography paragraph>
											Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
											heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
											browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
											and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
											pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
											saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
				</Typography>
										<Typography paragraph>
											Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
											without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
											medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
											again without stirring, until mussels have opened and rice is just tender, 5 to 7
											minutes more. (Discard any mussels that don’t open.)
				</Typography>
										<Typography>
											Set aside off of the heat to let rest for 10 minutes, and then serve.
				</Typography>
									</CardContent>
								</Collapse>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card>
								<CardHeader
									avatar={
										<Avatar aria-label="recipe" className={classes.avatar}>
											R
				</Avatar>
									}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title="Shrimp and Chorizo Paella"
									subheader="September 14, 2016"
								/>
								<CardMedia
									className={classes.media}
									image="/assets/images/avatars/Arnold.jpg"
									title="Paella dish"
								/>
								<CardContent>
									<Typography variant="body2" color="textSecondary" component="p">
										This impressive paella is a perfect party dish and a fun meal to cook together with your
										guests. Add 1 cup of frozen peas along with the mussels, if you like.
				</Typography>
								</CardContent>
								<CardActions disableSpacing>
									<IconButton aria-label="add to favorites">
										<FavoriteIcon />
									</IconButton>
									<IconButton aria-label="share">
										<ShareIcon />
									</IconButton>
									<IconButton
										className={clsx(classes.expand, {
											[classes.expandOpen]: expanded,
										})}
										onClick={handleExpandClick}
										aria-expanded={expanded}
										aria-label="show more"
									>
										<ExpandMoreIcon />
									</IconButton>
								</CardActions>
								<Collapse in={expanded} timeout="auto" unmountOnExit>
									<CardContent>
										<Typography paragraph>Method:</Typography>
										<Typography paragraph>
											Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
											minutes.
				</Typography>
										<Typography paragraph>
											Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
											heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
											browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
											and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
											pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
											saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
				</Typography>
										<Typography paragraph>
											Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
											without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
											medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
											again without stirring, until mussels have opened and rice is just tender, 5 to 7
											minutes more. (Discard any mussels that don’t open.)
				</Typography>
										<Typography>
											Set aside off of the heat to let rest for 10 minutes, and then serve.
				</Typography>
									</CardContent>
								</Collapse>
							</Card>
						</Grid>
						<Grid item xs={4}>
							<Card>
								<CardHeader
									avatar={
										<Avatar aria-label="recipe" className={classes.avatar}>
											R
				</Avatar>
									}
									action={
										<IconButton aria-label="settings">
											<MoreVertIcon />
										</IconButton>
									}
									title="Shrimp and Chorizo Paella"
									subheader="September 14, 2016"
								/>
								<CardMedia
									className={classes.media}
									image="/assets/images/avatars/Arnold.jpg"
									title="Paella dish"
								/>
								<CardContent>
									<Typography variant="body2" color="textSecondary" component="p">
										This impressive paella is a perfect party dish and a fun meal to cook together with your
										guests. Add 1 cup of frozen peas along with the mussels, if you like.
				</Typography>
								</CardContent>
								<CardActions disableSpacing>
									<IconButton aria-label="add to favorites">
										<FavoriteIcon />
									</IconButton>
									<IconButton aria-label="share">
										<ShareIcon />
									</IconButton>
									<IconButton
										className={clsx(classes.expand, {
											[classes.expandOpen]: expanded,
										})}
										onClick={handleExpandClick}
										aria-expanded={expanded}
										aria-label="show more"
									>
										<ExpandMoreIcon />
									</IconButton>
								</CardActions>
								<Collapse in={expanded} timeout="auto" unmountOnExit>
									<CardContent>
										<Typography paragraph>Method:</Typography>
										<Typography paragraph>
											Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
											minutes.
				</Typography>
										<Typography paragraph>
											Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
											heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
											browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
											and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
											pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
											saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
				</Typography>
										<Typography paragraph>
											Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
											without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
											medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
											again without stirring, until mussels have opened and rice is just tender, 5 to 7
											minutes more. (Discard any mussels that don’t open.)
				</Typography>
										<Typography>
											Set aside off of the heat to let rest for 10 minutes, and then serve.
				</Typography>
									</CardContent>
								</Collapse>
							</Card>
						</Grid>
					</Grid>
				</div>
			</div>
		);
}

export default withRouter(NoteList);
