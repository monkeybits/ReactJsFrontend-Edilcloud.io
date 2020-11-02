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
import { Menu, MenuItem, Switch } from '@material-ui/core';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { DISABLE_PROJECT, ENABLE_PROJECT } from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import * as ProjectChatActions from 'app/main/apps/notes/chat/store/actions';

export default function ProjectListitem({
	index,
	// project: { id, name, description, logo, date_start, status, date_end, profiles },
	classes
}) {
	const projects = useSelector(({ notesApp }) => notesApp.project.entities);
	const {
		id,
		name,
		description,
		company,
		logo,
		date_start,
		status,
		date_end,
		profiles,
		isApproved,
		talks
	} = projects[index];
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
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
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
		handleClose();
		dispatch(Actions.updateProjectDetail({ ...projects[index], index }));
		dispatch(Actions.openProjectDialog('edit'));
	};
	const handleArchiveProject = () => {
		handleClose();
		console.log('archive called');
		dispatch(Actions.archiveProject(id));
	};
	const handleDeleteProject = () => {
		handleClose();
		dispatch(Actions.deleteProject(id));
	};
	return (
		<Card className="h-full flex flex-col">
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" src={company?.logo} className={classes.avatar}>
						{company?.name?.split('')[0]}
					</Avatar>
				}
				action={
					!!isApproved &&
					(getRole() == 'o' || getRole() == 'd') && (
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
								{/* {status ? (
									<MenuItem onClick={handleDeactivate}>Deactivate</MenuItem>
								) : (
									<MenuItem onClick={handleDeactivate}>Activate</MenuItem>
								)} */}
								<MenuItem onClick={handleUpdateProject}>Update Project Details</MenuItem>
								<MenuItem onClick={handleArchiveProject}>Archive</MenuItem>
								<MenuItem onClick={handleDeleteProject}>Delete</MenuItem>
							</Menu>
						</div>
					)
				}
				title={company?.name} //
				subheader={moment(date_start).format('MMM DD, YYYY')}
			/>
			<CardMedia
				className={classes.media}
				image={logo ? logo : '/assets/images/notes/Building 01.jpg'}
				title={name}
			/>
			<CardContent>
				{isApproved ? (
					<Link className="font-size-17" to={`${match.path}/${id}`}>
						{name}
					</Link>
				) : (
					name
				)}
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
					<Switch name="checkedA" inputProps={{ 'aria-label': 'secondary checkbox' }} />
					<Icon>notifications</Icon>
				</IconButton>
			</CardActions>
		</Card>
	);
}
