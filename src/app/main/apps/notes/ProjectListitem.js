/* =============================================================================
 TODO:ProjectListitem.js
 ===============================================================================
*This file is part of project list page 
TODO: Single item of project list
*/
import FuseUtils from '@fuse/utils';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useRef, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Link, useRouteMatch } from 'react-router-dom';
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
import * as Actions from 'app/main/apps/notes/store/actions';
import moment from 'moment';
import { Menu, MenuItem, Switch } from '@material-ui/core';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { DISABLE_PROJECT, ENABLE_PROJECT } from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import * as ProjectChatActions from 'app/main/apps/notes/chat/store/actions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Divider from '@material-ui/core/Divider';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import DownloadPdf from './DownloadPdf';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { useTranslation } from 'react-i18next';

export default function ProjectListitem(props) {
	const {
		index,
		// project: { id, name, description, logo, date_start, status, date_end, profiles },
		classes
	} = props;
	const { t } = useTranslation('projects');
	const projects = useSelector(({ notesApp }) => notesApp.project.entities);
	const {
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
	} = projects[index];
	const [expanded, setExpanded] = React.useState(false);
	const [activeNotification, setActiveNotification] = React.useState(false);
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
	const [hasRender, setHasRender] = React.useState(false);
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const scrollRef = useRef(null);
	const hasNotifcationOnThisItem = notificationPanel.notificationData?.notification?.object_id == id;
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
		let notification = notificationPanel.notificationData?.notification;
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
	};
	const handleDeleteProject = () => {
		handleClose();
		dispatch(Actions.deleteProject(id));
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

	return (
		<Card
			ref={notificationPanel.notificationData?.notification?.object_id == mainId ? scrollRef : null}
			className="h-full flex flex-col project_card"
		>
			<CardHeader
				action={
					!!isApproved &&
					(getRole() == 'o' || getRole() == 'd') && (
						<div>
							{/* <IconButton onClick={handleClick} aria-label="settings">
								<MoreVertIcon />
							</IconButton> */}
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
								<MenuItem onClick={handleUpdateProject}>{t('UPDATE_PROJECT_DETAILS')}</MenuItem>
								<MenuItem onClick={handleArchiveProject}>{t('ARCHIVE')}</MenuItem>
								<MenuItem onClick={handleDeleteProject}>{t('DELETE')}</MenuItem>
							</Menu>
						</div>
					)
				}
				title={
					isApproved ? (
						<Link className="font-size-17" to={`${match.path}/${id}`}>
							{name}
						</Link>
					) : (
						name
					)
				}
				// subheader={moment(date_start).format('MMM DD, YYYY')}
				subheader={<>{address}</>}
				//
				avatar={
					<>
						<div className="project_card_avatar">
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
					<a href="javascript:;" className="more-pic">
						<MoreHorizIcon />
					</a>
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
					<div className="bg-red text-white inline text-11 font-500 px-8 py-4 rounded-4">3</div>
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
			<CardActions disableSpacing className="border-t-1 mt-auto">
				{/* <IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton> */}
				<Button>
					<DownloadPdf
						className="MuiButtonBase-root MuiButton-root "
						label={t('DOWNLOAD_REPORT')}
						id={name}
						pid={id}
					/>
				</Button>
				<IconButton
					className={clsx(classes.expand, 'py-0', {
						[classes.expandOpen]: expanded
					})}
					// onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<Switch disabled={getRole() == 'w' || getRole() == 'm'} name="checkedA" inputProps={{ 'aria-label': 'secondary checkbox' }} />
					<NotificationsNoneOutlinedIcon />
					{/* {activeNotification ? <NotificationsIcon color="secondary" /> : <NotificationsNoneOutlinedIcon />} */}
				</IconButton>
			</CardActions>
		</Card>
	);
}
