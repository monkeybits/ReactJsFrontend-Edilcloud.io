import FuseUtils from '@fuse/utils';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link, useRouteMatch } from 'react-router-dom';
import NoteListItem from '../NoteListItem';
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
import * as Actions from 'app/main/apps/notes/store/actions';
import moment from 'moment';
import { Menu, MenuItem } from '@material-ui/core';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { DISABLE_PROJECT, ENABLE_PROJECT } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';

export default function ProjectListitem({
	index,
	// project: { id, name, description, logo, date_start, status, date_end, profiles },
	classes
}) {
	const projects = useSelector(({ notesApp }) => notesApp.project.entities);
	const { id, name, description,company, logo, date_start, status, date_end, profiles } = projects[index];
	const [expanded, setExpanded] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const match = useRouteMatch();
	const handleClick = event => {
		event.stopPropagation();
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};
	const dispatch = useDispatch();

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const handleDeactivate = event => {
		event.stopPropagation();
		event.preventDefault();
		apiCall(
			status ? DISABLE_PROJECT(id) : ENABLE_PROJECT(id),
			{},
			res => {
				handleClose();
				dispatch(Actions.toggleProjectStatus(index));
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken(),
			true
		);
	};
	const handleUpdateProject = () => {
		handleClose()
		dispatch(Actions.updateProjectDetail(projects[index]));
		dispatch(Actions.openProjectDialog('edit'));
	};
	return (
		<Grid className="px-12 mb-32" item xs={12} md={6} xl={3}>
		<Card className="h-full flex flex-col">
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" src={profiles?.[0]?.photo} className={classes.avatar}>
						{profiles?.[0]?.first_name?.split('')[0]}
					</Avatar>
				}
				action={
					<div>
						<IconButton onClick={handleClick} aria-label="settings">
							<MoreVertIcon />
						</IconButton>
						<Menu
								id="long-menu"
								anchorEl={anchorEl}
								keepMounted
								open={open}
								onClose={handleClose}
								PaperProps={{}}
							>
								{status ? (
									<MenuItem onClick={handleDeactivate}>Deactivate</MenuItem>
								) : (
									<MenuItem onClick={handleDeactivate}>Activate</MenuItem>
								)}
								<MenuItem onClick={handleUpdateProject}>Update Project Details</MenuItem>
							</Menu>
					</div>
				}
				title={<Link to={`${match.path}/${id}`}>{name}</Link>}
				subheader={moment(date_start).format('MMM DD, YYYY')}
			/>
			<CardMedia className={classes.media} image={logo} title={name} />
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing className="mt-auto">
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded
					})}
					// onClick={handleExpandClick}
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
						Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high heat.
						Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly browned, 6 to
						8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken and chorizo in
						the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
						stirring often until thickened and fragrant, about 10 minutes. Add saffron broth and
						remaining 4 1/2 cups chicken broth; bring to a boil.
						</Typography>
					<Typography paragraph>
						Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
						without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
						medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook again
						without stirring, until mussels have opened and rice is just tender, 5 to 7 minutes more.
						(Discard any mussels that don’t open.)
						</Typography>
					<Typography>Set aside off of the heat to let rest for 10 minutes, and then serve.</Typography>
				</CardContent>
			</Collapse>
		</Card>
		</Grid>
	);
}
