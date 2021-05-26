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
import ContactsApp from '../contacts/ContactsApp';

export default function ProjectDetailContent({ projectDetail }) {
	const {
		name,
		description,
		date_start,
		date_end,
		company,
		referent,
		tags,
		profiles,
		status,
		completed,
		messages_count,
		creator,
		date_create,
		date_last_modify,
		typology,
		shared_project,
		note,
		logo
	} = projectDetail;

	return (
		<div className="px-20 mt-16 sm:mt-20 sm:px-32 project-detail-modal-content">
			<Grid container spacing={2}>
				<Grid item sm={12} lg={7}>
					<Card className="w-full mb-16 text-default">
						<AppBar position="static" elevation={0}>
							<Toolbar>
								<Typography className="font-bold">General Information</Typography>
							</Toolbar>
						</AppBar>
						<CardContent>
							<Grid container spacing={12}>
								<Grid item xs={4} sm={3} className="mb-10">
									<Typography className="font-bold">Name</Typography>
								</Grid>
								<Grid item xs={8} sm={9} className="mb-10">
									<Typography>{name}</Typography>
								</Grid>
								<Grid item xs={4} sm={3} className="mb-10">
									<Typography className="font-bold">Start Date</Typography>
								</Grid>
								<Grid item xs={8} sm={9} className="mb-10">
									<Typography>{moment(new Date(date_start)).format('LL')}</Typography>
								</Grid>
								<Grid item xs={4} sm={3} className="mb-10">
									<Typography className="font-bold">End Date</Typography>
								</Grid>
								<Grid item xs={8} sm={9} className="mb-10">
									{date_end && <Typography>{moment(new Date(date_end)).format('LL')}</Typography>}
								</Grid>
								<Grid item xs={4} sm={3}>
									<Typography className="font-bold">Note</Typography>
								</Grid>
								<Grid item xs={8} sm={9}>
									<Typography>{note}</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>

					<Card className="w-full mb-16 text-default">
						<AppBar position="static" elevation={0}>
							<Toolbar>
								<Typography className="font-bold">Work</Typography>
							</Toolbar>
						</AppBar>
						<CardContent>
							<Grid container spacing={12}>
								<Grid item xs={4} sm={3} className="mb-10">
									<Typography className="font-bold">Occupation</Typography>
								</Grid>
								<Grid item xs={8} sm={9} className="mb-10">
									<Typography>work.occupation</Typography>
								</Grid>
								<Grid item xs={4} sm={3} className="mb-10">
									<Typography className="font-bold">Skills</Typography>
								</Grid>
								<Grid item xs={8} sm={9} className="mb-10">
									<Typography>work.skills</Typography>
								</Grid>
								<Grid item xs={4} sm={3}>
									<Typography className="font-bold">Jobs</Typography>
								</Grid>
								<Grid item xs={8} sm={9}>
									<table className="">
										<tbody>
											<tr key="job.company">
												<td>
													<Typography>job.company</Typography>
												</td>
												<td className="pl-16">
													<Typography>job.date</Typography>
												</td>
											</tr>
										</tbody>
									</table>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
					<Card className="w-full mb-16 text-default">
						<AppBar position="static" elevation={0}>
							<Toolbar>
								<Typography className="font-bold">Contact</Typography>
							</Toolbar>
						</AppBar>
						<CardContent>
							<Grid container spacing={12}>
								<Grid item xs={4} sm={3} className="mb-10">
									<Typography className="font-bold">Address</Typography>
								</Grid>
								<Grid item xs={8} sm={9} className="mb-10">
									<Typography>contact.address</Typography>
								</Grid>
								<Grid item xs={4} sm={3} className="mb-10">
									<Typography className="font-bold">Tel.</Typography>
								</Grid>
								<Grid item xs={8} sm={9} className="mb-10">
									+ 1 987 687 3210
									{/* {contact.tel.map(tel => (
												<div className="flex items-center" key={tel}>
													<Typography>{tel}</Typography>
												</div>
											))} */}
								</Grid>
								<Grid item xs={4} sm={3} className="mb-10">
									<Typography className="font-bold">Website</Typography>
								</Grid>
								<Grid item xs={8} sm={9} className="mb-10">
									www.peerbits.com
									{/* {contact.websites.map(website => (
												<div className="flex items-center" key={website}>
													<Typography>{website}</Typography>
												</div>
											))} */}
								</Grid>
								<Grid item xs={4} sm={3}>
									<Typography className="font-bold">Emails</Typography>
								</Grid>
								<Grid item xs={8} sm={9}>
									info@peerbits.com
									{/* {contact.emails.map(email => (
													<div className="flex items-center" key={email}>
														<Typography>{email}</Typography>
													</div>
												))} */}
								</Grid>
							</Grid>
						</CardContent>
					</Card>

					<Card className="w-full mb-16 text-default">
						<AppBar position="static" elevation={0}>
							<Toolbar>
								<Typography className="font-bold">Company</Typography>
							</Toolbar>
						</AppBar>
						<CardContent>
							<Grid container spacing={12}>
								<Grid item xs={4} sm={3} className="mb-10">
									<Typography className="font-bold">Name</Typography>
								</Grid>
								<Grid item xs={8} sm={9} className="mb-10">
									<Typography>{company?.name}</Typography>
								</Grid>
								<Grid item xs={4} sm={3}>
									<Typography className="font-bold">Email</Typography>
								</Grid>
								<Grid item xs={8} sm={9}>
									<Typography>{company?.email}</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</Grid>
				<Grid item sm={12} lg={5} className="w-full">
					<Card className="w-full mb-16 text-default">
						<AppBar position="static" elevation={0}>
							<Toolbar>
								<Typography className="font-bold">Tasks</Typography>
							</Toolbar>
						</AppBar>
						<CardContent>
							<div className="flex items-center justify-between mb-16">
								<Typography>All</Typography>
								<div className="bg-gray text-white inline text-11 font-500 px-8 py-4 rounded-4">20</div>
							</div>
							<div className="flex items-center justify-between mb-16">
								<Typography>Today</Typography>
								<div className="bg-blue text-white inline text-11 font-500 px-8 py-4 rounded-4">5</div>
							</div>
							<div className="flex items-center justify-between mb-16">
								<Typography>Late</Typography>
								<div className="bg-red-500 text-white inline text-11 font-500 px-8 py-4 rounded-4">
									3
								</div>
							</div>
							<div className="flex items-center justify-between">
								<Typography>Upcoming</Typography>
								<div className="bg-orange text-white inline text-11 font-500 px-8 py-4 rounded-4">
									12
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="w-full mb-16 text-default">
						<AppBar position="static" elevation={0}>
							<Toolbar>
								<Typography className="font-bold">Tasks</Typography>
							</Toolbar>
						</AppBar>
						<CardContent>
							<div className="flex items-center justify-between">
								<div className="flex items-center">
									{/* <Icon color="action">location_on</Icon> */}
									<LocationOnIcon />
									<Typography className="mx-8">New York</Typography>
								</div>
								<IconButton aria-label="more">
									<Icon>more_vert</Icon>
								</IconButton>
							</div>
							<div className="flex items-center justify-center p-12 pb-20">
								<Icon className="meteocons text-36 cloud_size mr-6" color="action">
									<CloudQueueIcon />
								</Icon>
								<Typography className="text-32 mx-8" color="textSecondary">
									21
								</Typography>
								<Typography className="text-32 font-300" color="textSecondary">
									°
								</Typography>
								<Typography className="text-32 font-300" color="textSecondary">
									C
								</Typography>
							</div>
							<Divider />
							<div className="flex justify-between items-center p-16">
								<div className="flex items-center">
									<Icon className="meteocons text-14 mr-4" color="action">
										windy
									</Icon>
									<Typography className="mx-4">12</Typography>
									<Typography color="textSecondary">KMH</Typography>
								</div>

								<div className="flex items-center">
									<Icon className="meteocons text-14 mr-4" color="action">
										compass
									</Icon>
									<Typography className="mx-4">NW</Typography>
								</div>

								<div className="flex items-center">
									<Icon className="meteocons text-14 mr-4" color="action">
										rainy
									</Icon>
									<Typography className="mx-4">98%</Typography>
								</div>
							</div>
							<Divider />
							<div className="w-full pt-16">
								<div className="flex items-center justify-between w-full py-6 px-12">
									<Typography>Sunday</Typography>
									<div className="flex items-center">
										<Icon className="meteocons text-20 mr-8" color="action">
											rainy
										</Icon>
										<Typography>21</Typography>
										<Typography color="textSecondary">&deg;</Typography>
										<Typography color="textSecondary">C</Typography>
									</div>
								</div>
								<div className="flex items-center justify-between w-full py-6 px-12">
									<Typography>Monday</Typography>
									<div className="flex items-center">
										<Icon className="meteocons text-20 mr-8" color="action">
											rainy
										</Icon>
										<Typography>22</Typography>
										<Typography color="textSecondary">&deg;</Typography>
										<Typography color="textSecondary">C</Typography>
									</div>
								</div>
								<div className="flex items-center justify-between w-full py-6 px-12">
									<Typography>Tuesday</Typography>
									<div className="flex items-center">
										<Icon className="meteocons text-20 mr-8" color="action">
											rainy
										</Icon>
										<Typography>21</Typography>
										<Typography color="textSecondary">&deg;</Typography>
										<Typography color="textSecondary">C</Typography>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</div>
	);
}
