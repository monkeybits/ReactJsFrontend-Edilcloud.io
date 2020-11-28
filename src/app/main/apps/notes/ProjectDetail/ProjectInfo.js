// import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ContactsApp from '../contacts/ContactsApp';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import ProjectDetailContent from './ProjectDetailContent';

export default function ProjectInfo({ openDialog, closeDialog }) {
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);

	return (
		<Dialog
			open={openDialog}
			onClose={closeDialog}
			fullWidth
			maxWidth="sm"
			className="custom-modal-new custom-modal-lg"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex">
					<Typography variant="h6" color="inherit">
						Project Details
					</Typography>
					<div className="absolute right-m-12">
						<IconButton onClick={closeDialog} edge="start" color="inherit" aria-label="close">
							<CloseIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: 'p-0' }}>
				<ProjectDetailContent projectDetail={projectDetail} />
			</DialogContent>
		</Dialog>
	);
}
