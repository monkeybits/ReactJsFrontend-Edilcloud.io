/* =============================================================================
 TODO:ProjectListitem.js
 ===============================================================================
*This file is part of project list page 
TODO: Single item of project list
*/
import FuseUtils from '@fuse/utils';
import {
	Typography,
	Card,
	CardHeader,
	CardActions,
	Avatar,
	IconButton,
	Icon,
	MenuItem,
	Box,
	Paper,
	Tabs,
	Tab,
	Divider,
	Button,
	Tooltip
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import * as Actions from 'app/main/apps/notes/store/actions';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { DISABLE_PROJECT, ENABLE_PROJECT } from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import PropTypes from 'prop-types';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import { useTranslation } from 'react-i18next';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/themes/light-border.css';
import loadable from '@loadable/component';
const DownloadPdf = loadable(() => import('./DownloadPdf'));

const useStyles = makeStyles(theme => ({
	paper: {
		marginRight: theme.spacing(2)
	}
}));

export default function ProjectListitem(props) {
	const [projectIndex, setProjectIndex] = useState(null);
	const { index, project, classes } = props;

	const { t } = useTranslation('projects');
	const projects = useSelector(({ notesApp }) => notesApp.project.entities);
	const okConfirmDeleteDialog = useSelector(({ notesApp }) => notesApp.notes.okConfirmDeleteDialog);
	const projectConfirmDeleteId = useSelector(({ notesApp }) => notesApp.notes.projectConfirmDeleteId);
	const okConfirmArchiveDialog = useSelector(({ notesApp }) => notesApp.notes.okConfirmArchiveDialog);
	const projectConfirmArchiveId = useSelector(({ notesApp }) => notesApp.notes.projectConfirmArchiveId);
	const projectConfirmArchiveStatus = useSelector(({ notesApp }) => notesApp.notes.projectConfirmArchiveStatus);

	if (projectIndex !== null && projectIndex < projects.length) {
		var {
			mainId,
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
			talks,
			address
		} = projects[projectIndex];
	}

	const [expanded, setExpanded] = React.useState(false);
	const [activeNotification, setActiveNotification] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [visible, setVisible] = React.useState(false);
	const open = Boolean(anchorEl);
	const match = useRouteMatch();
	const handleClick = event => {
		event.stopPropagation();
		event.preventDefault();
		// setAnchorEl(event.currentTarget);
		setVisible(true);
	};
	const dispatch = useDispatch();
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const [hasRender, setHasRender] = React.useState(false);
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const scrollRef = useRef(null);
	const hasNotifcationOnThisItem = notificationPanel.notificationData?.notification?.object_id == id;

	useEffect(() => {
		if (project) {
			projects.map((item, index) => {
				if (item.name === project.name) {
					setProjectIndex(index);
				}
			});
		}
	}, [project]);

	useEffect(() => {
		if (okConfirmDeleteDialog) {
			handleClose();
			dispatch(Actions.deleteProject(projectConfirmDeleteId));
		}
	}, [okConfirmDeleteDialog]);

	useEffect(() => {
		if (okConfirmArchiveDialog) {
			handleClose();
			apiCall(
				projectConfirmArchiveStatus ? DISABLE_PROJECT(projectConfirmArchiveId) : ENABLE_PROJECT(projectConfirmArchiveId),
				{},
				res => {
					handleClose();
					dispatch(Actions.toggleProjectStatus(index));
				},
				err => {
					// console.log(err)
				},
				METHOD.PUT,
				getHeaderToken(),
				true
			);	
		}
	}, [okConfirmArchiveDialog]);

	useEffect(() => {
		if (hasNotifcationOnThisItem) {
			setTimeout(() => {
				setHasRender(true);
			}, 300);
		} else {
			setHasRender(true);
		}
	}, [mainId, hasNotifcationOnThisItem]);

	useEffect(() => {
		const notification = notificationPanel.notificationData?.notification;
		if (notificationPanel.viewing && hasRender && scrollRef.current) {
			dispatch(notificationActions.removeFrmViewNotification());
			FuseUtils.notificationBackrondColor(scrollRef, 'custom-notification-bg');
		}
	}, [notificationPanel.viewing, scrollRef, hasRender]);

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	const handleUpdateProject = () => {
		handleClose();
		dispatch(Actions.updateProjectDetail({ ...projects[index], index }));
		dispatch(Actions.openProjectDialog('edit'));
	};
	const handleArchiveProject = () => {
		dispatch(Actions.openConfirmArchiveDialog(id, status));
	};
	const handleDeleteProject = () => {
		dispatch(Actions.openConfirmDeleteDialog(id));
	};
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	TabPanel.propTypes = {
		children: PropTypes.node,
		index: PropTypes.any.isRequired,
		value: PropTypes.any.isRequired
	};
	function a11yProps(index) {
		return {
			id: `scrollable-auto-tab-${index}`,
			'aria-controls': `scrollable-auto-tabpanel-${index}`
		};
	}
	function TabPanel(props) {
		const { children, value, index, ...other } = props;

		return (
			<div
				role="tabpanel"
				hidden={value !== index}
				id={`scrollable-auto-tabpanel-${index}`}
				aria-labelledby={`scrollable-auto-tab-${index}`}
				{...other}
			>
				{value === index && (
					<Box p={3}>
						<Typography>{children}</Typography>
					</Box>
				)}
			</div>
		);
	}
	const useStyles = makeStyles(theme => ({
		root: {
			flexGrow: 1,
			width: '100%',
			backgroundColor: theme.palette.background.paper
		}
	}));

	const onClickOutside = () => {
		setVisible(false);
	};

	return (
		<Card
			ref={notificationPanel.notificationData?.notification?.object_id == mainId ? scrollRef : null}
			className="h-full flex flex-col project_card"
		>
			<CardHeader
				className="bg-dark-blue"
				action={
					!!isApproved &&
					(getRole() == 'o' || getRole() == 'd') && (
						<div>
							{/* <IconButton onClick={handleClick} aria-label="settings">
								<MoreVertIcon />
							</IconButton> */}
							<Tippy
								theme="light"
								content={
									<Paper className={classes.paper}>
										<MenuItem onClick={handleUpdateProject}>{t('UPDATE_PROJECT_DETAILS')}</MenuItem>
										<MenuItem onClick={handleArchiveProject}>{t('ARCHIVE')}</MenuItem>
										<MenuItem onClick={handleDeleteProject}>{t('DELETE')}</MenuItem>
									</Paper>
								}
								visible={visible}
								placement="bottom-end"
								onClickOutside={onClickOutside}
								className="project-list-menu"
							>
								<button className="absolute right-0 pl-menu-custom" />
							</Tippy>
						</div>
					)
				}
				title={
					isApproved ? (
						<Link className="font-size-17 text-white" to={`${match.path}/${id}`}>
							{name}
						</Link>
					) : (
						<div className="font-size-17 text-white">{name}</div>
					)
				}
				// subheader={moment(date_start).format('MMM DD, YYYY')}
				subheader={
					isApproved ? (
						<Link className="font-size-14 text-white" to={`${match.path}/${id}`}>
							{address}
						</Link>
					) : (
						<div className="font-size-14 text-white">{address}</div>
					)
				}
				//
				avatar={
					<>
						<div className="project_card_avatar mt-20s">
							<Avatar aria-label="recipe" src={company?.logo} className={classes.avatar}>
								{company?.name?.split('')[0]}
							</Avatar>
						</div>
					</>
				}
			/>
			<div className="project_card_action">
				<IconButton disabled={getRole() == 'w' || getRole() == 'm'} onClick={handleClick} aria-label="settings">
					<MoreHorizIcon />
				</IconButton>
			</div>
			<Tabs
				value={value}
				indicatorColor="primary"
				textColor="primary"
				onChange={handleChange}
				aria-label="tabs example"
				className="project_tabs"
			>
				<Tab label={t('About')} {...a11yProps(0)} />
				{/* <Tab label="Insights" {...a11yProps(1)} />
				<Tab label="Weather" {...a11yProps(2)} /> */}
			</Tabs>
			<TabPanel value={value} index={0} className="tab_panel">
				<Typography>{description}</Typography>
				<div className="flex overflow-x-auto nowrap about-image-section mt-16">
					{!!profiles?.length &&
						profiles.map(d => (
							<Tooltip title={`${d.first_name} ${d.last_name}`} key={d.id}>
								<Avatar className="mx-4 w-32 h-32" src={d.photo} />
							</Tooltip>
						))}
					{/* <img src={d.photo ? d.photo : '/assets/images/avatars/profile.jpg'} /> */}
				</div>
			</TabPanel>
			<TabPanel value={value} index={1} className="tab_panel">
				<Typography variant="subtitle1" className="text-gray-500 font-500 mb-12">
					Tasks
				</Typography>
				<div className="flex items-center justify-between mb-16">
					<Typography variant="subtitle2">All</Typography>
					<div className="bg-gray text-white inline text-11 font-500 px-8 py-4 rounded-4">20</div>
				</div>
				<div className="flex items-center justify-between mb-16">
					<Typography variant="subtitle2">Today</Typography>
					<div className="bg-blue text-white inline text-11 font-500 px-8 py-4 rounded-4">5</div>
				</div>
				<div className="flex items-center justify-between mb-16">
					<Typography variant="subtitle2">Late</Typography>
					<div className="bg-red-500 text-white inline text-11 font-500 px-8 py-4 rounded-4">3</div>
				</div>
				<div className="flex items-center justify-between mb-16">
					<Typography variant="subtitle2">Upcoming</Typography>
					<div className="bg-orange text-white inline text-11 font-500 px-8 py-4 rounded-4">12</div>
				</div>
			</TabPanel>
			<TabPanel value={value} index={2} className="tab_panel">
				<div className="flex items-center justify-between">
					<div className="flex items-center">
						{/* <Icon color="action">location_on</Icon> */}
						<LocationOnIcon />
						<Typography className="text-16 mx-8">New York</Typography>
					</div>
					<IconButton aria-label="more">
						<Icon>more_vert</Icon>
					</IconButton>
				</div>
				<div className="flex items-center justify-center p-16 pb-32">
					<Icon className="meteocons text-40 cloud_size ltr:mr-8 rtl:ml-8" color="action">
						<CloudQueueIcon />
					</Icon>
					<Typography className="text-44 mx-8" color="textSecondary">
						21
					</Typography>
					<Typography className="text-48 font-300" color="textSecondary">
						°
					</Typography>
					<Typography className="text-44 font-300" color="textSecondary">
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
				<div className="w-full py-16">
					<div className="flex items-center justify-between w-full py-6 px-12">
						<Typography className="text-15">Sunday</Typography>
						<div className="flex items-center">
							<Icon className="meteocons text-24 ltr:mr-16 rtl:ml-16" color="action">
								rainy
							</Icon>
							<Typography className="text-20">21</Typography>
							<Typography className="text-20" color="textSecondary">
								&deg;
							</Typography>
							<Typography className="text-20" color="textSecondary">
								C
							</Typography>
						</div>
					</div>
					<div className="flex items-center justify-between w-full py-6 px-12">
						<Typography className="text-15">Monday</Typography>
						<div className="flex items-center">
							<Icon className="meteocons text-24 ltr:mr-16 rtl:ml-16" color="action">
								rainy
							</Icon>
							<Typography className="text-20">22</Typography>
							<Typography className="text-20" color="textSecondary">
								&deg;
							</Typography>
							<Typography className="text-20" color="textSecondary">
								C
							</Typography>
						</div>
					</div>
					<div className="flex items-center justify-between w-full py-6 px-12">
						<Typography className="text-15">Tuesday</Typography>
						<div className="flex items-center">
							<Icon className="meteocons text-24 ltr:mr-16 rtl:ml-16" color="action">
								rainy
							</Icon>
							<Typography className="text-20">21</Typography>
							<Typography className="text-20" color="textSecondary">
								&deg;
							</Typography>
							<Typography className="text-20" color="textSecondary">
								C
							</Typography>
						</div>
					</div>
				</div>
			</TabPanel>
			{/* <CardContent>
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
			</CardContent> */}

			{/* <IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton> */}
			<Button className="MuiButtonBase-root MuiButton-root mr-8 ">
				<CardActions disableSpacing className="border-t-1 mt-auto">
					<DownloadPdf
						className="MuiButtonBase-root MuiButton-root "
						label={t('DOWNLOAD_REPORT')}
						id={name}
						pid={id}
					/>
				</CardActions>
			</Button>
		</Card>
	);
}
