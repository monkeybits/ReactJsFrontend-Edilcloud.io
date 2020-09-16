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

export default function ProjectInfo({ openDialog, closeDialog }) {
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
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
		<Dialog open={openDialog} onClose={closeDialog} fullWidth maxWidth="sm">
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						Project Detail
					</Typography>
				</Toolbar>
			</AppBar>
			<DialogContent>
				<div className="md:flex max-w-2xl">
					<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
						
							<Card className="w-full mb-16">
								<AppBar position="static" elevation={0}>
									<Toolbar className="px-8">
										<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
											General Information
										</Typography>
									</Toolbar>
								</AppBar>

								<CardContent>
									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Name</Typography>
										<Typography>{name}</Typography>
									</div>

									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Start Date</Typography>
										<Typography>{moment(new Date(date_start)).format('LL')}</Typography>
									</div>
									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">End Date</Typography>
										{date_end && <Typography>{moment(new Date(date_end)).format('LL')}</Typography>}
									</div>
									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Note</Typography>
										<Typography>{note}</Typography>
									</div>
								</CardContent>
							</Card>

							<Card className="w-full mb-16">
								<AppBar position="static" elevation={0}>
									<Toolbar className="px-8">
										<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
											Work
										</Typography>
									</Toolbar>
								</AppBar>

								<CardContent>
									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Occupation</Typography>
										<Typography>{'work.occupation'}</Typography>
									</div>

									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Skills</Typography>
										<Typography>{'work.skills'}</Typography>
									</div>

									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Jobs</Typography>
										<table className="">
											<tbody>
												{/* {work.jobs.map(job => ( */}
												<tr key={'job.company'}>
													<td>
														<Typography>{'job.company'}</Typography>
													</td>
													<td className="px-16">
														<Typography color="textSecondary">{'job.date'}</Typography>
													</td>
												</tr>
												{/* ))} */}
											</tbody>
										</table>
									</div>
								</CardContent>
							</Card>

							<Card className="w-full mb-16">
								<AppBar position="static" elevation={0}>
									<Toolbar className="px-8">
										<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
											Contact
										</Typography>
									</Toolbar>
								</AppBar>

								<CardContent>
									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Address</Typography>
										<Typography>{'contact.address'}</Typography>
									</div>

									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Tel.</Typography>+ 1 987 687 3210
										{/* {contact.tel.map(tel => (
                            <div className="flex items-center" key={tel}>
                                <Typography>{tel}</Typography>
                            </div>
                        ))} */}
									</div>

									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Website</Typography>
										www.peerbits.com
										{/* {contact.websites.map(website => (
                            <div className="flex items-center" key={website}>
                                <Typography>{website}</Typography>
                            </div>
                        ))} */}
									</div>

									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Emails</Typography>
										info@peerbits.com
										{/* {contact.emails.map(email => (
                            <div className="flex items-center" key={email}>
                                <Typography>{email}</Typography>
                            </div>
                        ))} */}
									</div>
								</CardContent>
							</Card>
					
					</div>

					<div className="flex flex-col md:w-320">
						<FuseAnimateGroup
							enter={{
								animation: 'transition.slideUpBigIn'
							}}
						>
							<Card className="w-full mb-16">
								<AppBar position="static" elevation={0}>
									<Toolbar className="px-8">
										<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
											Company
										</Typography>
									</Toolbar>
								</AppBar>
								<CardContent>
									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Name</Typography>
										<Typography>{company?.name}</Typography>
									</div>

									<div className="mb-24">
										<Typography className="font-bold mb-4 text-15">Email</Typography>
										<Typography>{company?.email}</Typography>
									</div>
								</CardContent>
							</Card>

							{/* <Card className="w-full mb-16">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Joined Groups
								</Typography>
								<Button className="normal-case" color="inherit" size="small">
									See 6 more
								</Button>
							</Toolbar>
						</AppBar>
						<CardContent className="p-0">
							<List className="p-0">
								{groups.map(group => (
                            <ListItem key={group.id} className="px-8">
                                <Avatar className="mx-8" alt={group.name}>
                                    {group.name[0]}
                                </Avatar>
                                <ListItemText
                                    primary={
                                        <div className="flex">
                                            <Typography
                                                className="font-medium"
                                                color="secondary"
                                                paragraph={false}
                                            >
                                                {group.name}
                                            </Typography>

                                            <Typography className="mx-4" paragraph={false}>
                                                {group.category}
                                            </Typography>
                                        </div>
                                    }
                                    secondary={group.members}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <Icon>more_vert</Icon>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
							</List>
						</CardContent>
					</Card>
			 */}
						</FuseAnimateGroup>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
