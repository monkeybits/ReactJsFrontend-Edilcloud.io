import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import TimelineTab from 'app/main/pages/profile/tabs/TimelineTab';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Checkbox } from '@material-ui/core';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { ALERTED_POSTS_TASKS, GET_ALL_NOTIFICATIONS, GET_ALL_PAGES_NOTIFICATIONS } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import PostList from 'app/main/apps/notes/todo/PostList';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import InfiniteScroll from 'react-infinite-scroller';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	root: {
		width: 450
	},
	top: {
		color: '#192d3e',
		animationDuration: '550ms',
		position: 'absolute',
		left: '50%'
	},
	circle: {
		strokeLinecap: 'round'
	}
}));

function NotificationPanel(props) {
	const dispatch = useDispatch();
	const state = useSelector(({ notificationPanel }) => notificationPanel.state);
	const notifications = useSelector(({ notificationPanel }) => notificationPanel.notifications);
	const readNotifications = useSelector(({ notificationPanel }) => notificationPanel.readNotifications);
	const classes = useStyles();
	const [data, setData] = useState({
		page: 1
	});
	const [dataRead, setDataRead] = useState({
		pageRead: 1
	});
	const [hasMore, setHasMore] = useState(true);
	const [hasReadMore, setHasReadMore] = useState(true);
	const [loading, setLoading] = useState(true);
	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	useEffect(() => {
		if (state == false) {
			dispatch(Actions.resetNotificationData());
			getNotification();
			getReadNotification();
			dispatch(Actions.getNotificationCount());
		}
	}, [state]);
	const getNotification = () => {
		if (hasMore) {
			setHasMore(false);
			setLoading(true);
			apiCall(
				GET_ALL_PAGES_NOTIFICATIONS('new_list'),
				{},
				res => {
					setData(prev => ({
						...prev,
						page: prev.page + 1
					}));
					dispatch(Actions.getNotificationData(res));
					setLoading(false);
				},
				err => {
					setLoading(false);
				},
				METHOD.GET,
				getHeaderToken()
			);
		} else {
			getReadNotification();
		}
	};
	const getReadNotification = () => {
		if (hasReadMore) {
			setHasReadMore(false);
			setLoading(true);
			apiCall(
				GET_ALL_NOTIFICATIONS('read_list', dataRead.pageRead),
				{},
				res => {
					setDataRead(prev => ({
						...prev,
						pageRead: prev.pageRead + 1
					}));
					dispatch(Actions.getReadNotificationData(res.results));
					setLoading(false);
					if (res.last > dataRead.pageRead) {
						setHasReadMore(true);
					}
				},
				err => {
					setLoading(false);
				},
				METHOD.GET,
				getHeaderToken()
			);
		}
	};
	// if (!data.activities.length) {
	// 	return null;
	// }
	return (
		<Drawer
			classes={{ paper: classes.root }}
			className="alerted-post-modal-width"
			open={state}
			anchor="right"
			onClose={ev => dispatch(Actions.toggleNotification())}
		>
			<FuseScrollbars>
				<div className="flex justify-between items-center">
					{/* <ListSubheader className="bg-body" component="div">Alerted posts</ListSubheader> */}
					<Typography className="mx-16 text-16" color="inherit">
						Notifications
					</Typography>
					<div className="px-4">
						<IconButton onClick={ev => dispatch(Actions.toggleNotification())} color="inherit">
							<Icon>close</Icon>
						</IconButton>
					</div>
				</div>
				<div className="flex flex-col">
					<Card className="w-full">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Latest Activity
								</Typography>
								<Button color="inherit" size="small">
									See All
								</Button>
							</Toolbar>
						</AppBar>
						<CardContent className="p-0">
							<SwipeableList>
								<List>
									{notifications &&
										notifications.map((activity, index) => {
											const { notification } = activity;
											return (
												<SwipeableListItem
													threshold={0.3}
													swipeLeft={{
														content: <div className="bg-red">Delete</div>,
														action: () => {
															dispatch(
																Actions.deleteNotificationDataByIndex(
																	index,
																	false,
																	activity
																)
															);
														}
													}}
													swipeRight={{
														content: <div className="bg-red">Delete</div>,
														action: () => {
															dispatch(
																Actions.deleteNotificationDataByIndex(
																	index,
																	false,
																	activity
																)
															);
														}
													}}
													// onSwipeProgress={progress =>
													// 	console.info(`Swipe progress: ${progress}%`)
													// }
												>
													<ListItem key={activity.id} className="px-12 bg-blue-200">
														<Avatar
															className="mx-4"
															alt={notification.sender.first_name}
															src={notification.sender.photo}
														/>
														<ListItemText
															className="flex-1 mx-4"
															primary={
																<>
																	<div className="flex">
																		<Typography
																			className="font-medium whitespace-no-wrap"
																			color="primary"
																			paragraph={false}
																		>
																			{notification.sender.first_name}{' '}
																			{notification.sender.last_name}
																		</Typography>

																		<Typography
																			color="textSecondary"
																			className="px-4 truncate"
																			paragraph={false}
																		>
																			{notification.subject}
																		</Typography>
																	</div>
																	{notification.body?.url && (
																		<div className="flex">
																			<Link
																				onClick={() => {
																					dispatch(
																						Actions.toggleNotification()
																					);
																					dispatch(
																						Actions.addNotificationData(
																							activity
																						)
																					);
																				}}
																				to={notification.body.url}
																			>
																				{notification.body.content}
																			</Link>
																		</div>
																	)}
																</>
															}
															secondary={moment(notification.date_create)
																.endOf('day')
																.fromNow()}
														/>
													</ListItem>
													<Divider />
												</SwipeableListItem>
											);
										})}
									{!!readNotifications?.length &&
										readNotifications.map((activity, index) => {
											const { notification } = activity;

											return (
												<SwipeableListItem
													threshold={0.3}
													swipeLeft={{
														content: <div className="bg-red">Delete</div>,
														action: () => {
															dispatch(
																Actions.deleteNotificationDataByIndex(
																	index,
																	true,
																	activity
																)
															);
														}
													}}
													swipeRight={{
														content: <div className="bg-red">Delete</div>,
														action: () => {
															dispatch(
																Actions.deleteNotificationDataByIndex(
																	index,
																	true,
																	activity
																)
															);
														}
													}}
													// onSwipeProgress={progress =>
													// 	console.info(`Swipe progress: ${progress}%`)
													// }
												>
													<ListItem key={activity.id} className="px-12">
														<Avatar
															className="mx-4"
															alt={notification.sender.first_name}
															src={notification.sender.photo}
														/>
														<ListItemText
															className="flex-1 mx-4"
															primary={
																<>
																	<div className="flex">
																		<Typography
																			className="font-medium whitespace-no-wrap"
																			color="primary"
																			paragraph={false}
																		>
																			{notification.sender.first_name}{' '}
																			{notification.sender.last_name}
																		</Typography>

																		<Typography
																			color="textSecondary"
																			className="px-4 truncate"
																			paragraph={false}
																		>
																			{notification.subject}
																		</Typography>
																	</div>
																	{notification.body?.url && (
																		<div className="flex">
																			<Link
																				onClick={() => {
																					dispatch(
																						Actions.toggleNotification()
																					);
																					dispatch(
																						Actions.addNotificationData(
																							activity
																						)
																					);
																				}}
																				to={notification.body.url.replace(
																					'https://localhost:3000',
																					''
																				)}
																			>
																				{notification.body.content}
																			</Link>
																		</div>
																	)}
																</>
															}
															secondary={moment(notification.date_create)
																.endOf('day')
																.fromNow()}
														/>
													</ListItem>
												</SwipeableListItem>
											);
										})}
									<ListItem key="seeMore" className="px-12" onClick={getNotification}>
										<ListItemText
											className="flex-1 mx-4"
											primary={
												<div className="flex" style={{ justifyContent: 'center' }}>
													{loading ? (
														<CircularProgress
															variant="indeterminate"
															disableShrink
															className={classes.top}
															classes={{
																circle: classes.circle
															}}
															size={40}
															thickness={4}
															{...props}
															display="flex"
															justifyContent="center"
														/>
													) : (
														(hasMore || hasReadMore) && (
															<Button
																variant="outlined"
																color="secondary"
																paragraph={false}
																display="flex"
																justifyContent="center"
															>
																See More
															</Button>
														)
													)}
												</div>
											}
										/>
									</ListItem>
								</List>
							</SwipeableList>
						</CardContent>
					</Card>
				</div>
			</FuseScrollbars>
		</Drawer>
	);
}

export default withReducer('notificationPanel', reducer)(React.memo(NotificationPanel));
