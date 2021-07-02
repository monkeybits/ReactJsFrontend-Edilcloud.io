import React, { useEffect, useState } from 'react';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import {
	Divider,
	Drawer,
	Icon,
	List,
	ListItem,
	ListItemText,
	Typography,
	IconButton,
	AppBar,
	Toolbar,
	CardContent,
	Card,
	Button,
	Avatar,
	CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_ALL_NOTIFICATIONS, GET_ALL_PAGES_NOTIFICATIONS } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import { Link } from 'react-router-dom';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

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
	const history = useHistory();
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
			notificationInit();
		}
	}, [state]);
	const notificationInit = () => {
		setHasReadMore(true);
		dispatch(Actions.resetNotificationData());
		setDataRead(prev => ({
			...prev,
			pageRead: 1
		}));
		setData(prev => ({
			...prev,
			page: 1
		}));
		setTimeout(() => {
			getNotification(true);
			getReadNotification(true);
			dispatch(Actions.getNotificationCount());
		}, 1000);
	};
	const getNotification = isInit => {
		if (hasMore || isInit) {
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
	const getReadNotification = (isInit = false) => {
		if (hasReadMore || isInit) {
			setHasReadMore(false);
			setLoading(true);
			apiCall(
				GET_ALL_NOTIFICATIONS('read_list', isInit ? 1 : dataRead.pageRead),
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
	const onClickReadNotification = (event, activity, url) => {
		dispatch(
			Actions.toggleNotification()
		);
		dispatch(
			Actions.addNotificationData(
				activity
			)
		);
		history.push({
			pathname: url
		});
	}

	const onClickUnReadNotification = (event, activity, url) => {
		dispatch(
			Actions.toggleNotification()
		);
		dispatch(Actions.readAllNotifications());
		dispatch(
			Actions.addNotificationData(
				activity
			)
		);
		history.push({
			pathname: url
		});
	}

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
				{/* <ListSubheader className="bg-body" component="div">Alerted posts</ListSubheader> */}
				<Toolbar className="px-4 flex justify-between notifications-header items-center">
					<Typography className="mx-16 text-16" color="inherit">
						Notifications
					</Typography>
					<div className="px-4">
						<IconButton onClick={ev => dispatch(Actions.toggleNotification())} color="inherit">
							<Icon>close</Icon>
						</IconButton>
					</div>
				</Toolbar>
				<div className="flex flex-col">
					<Card className="w-full">
						<CardContent className="p-0">
							<SwipeableList className="borderbottom">
								<List>
									{notifications &&
										notifications.map((activity, index) => {
											const { notification } = activity;
											return (
												<SwipeableListItem
													className="borderbottom"
													threshold={0.3}
													swipeLeft={{
														content: <div className="bg-red-500 text-white flex h-full w-full items-center self-center text-15 font-semibold box-border p-24">Delete</div>,
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
														content: <div className="bg-red-500 text-white flex h-full w-full items-center self-center text-15 font-semibold box-border p-24">Delete</div>,
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
													<ListItem
														key={activity.id}
														className="px-12 py-16 bg-blue-200 hover:bg-blue-200 borderbottom items-start border-b-1 border-grey-400 cursor-pointer"
														onClick={(event) => onClickUnReadNotification(
															event,
															activity,
															notification.body.url)
														}
													>
														<Avatar
															className="mx-4 mt-10"
															alt={notification.sender.first_name}
															src={notification.sender.photo}
														/>
														<ListItemText
															className="flex-1 mx-4"
															primary={
																<>
																	<div className="flex justify-between py-4">
																		<Typography
																			className="font-bold whitespace-no-wrap"
																			color="primary"
																			paragraph={false}
																		>
																			{notification.sender.first_name}{' '}
																			{notification.sender.last_name}{' - '}
																			{notification.sender.company.name}
																		</Typography>
																		<Typography>
																			{
																				moment(activity.date_create)
																					.endOf('day')
																					.fromNow()
																			}
																		</Typography>
																	</div>
																	<div className="flex pb-4">
																		<Typography
																			className="font-semibold"
																			color="textPrimary"
																			paragraph={false}
																		>
																			{notification.subject}
																		</Typography>
																	</div>
																	{notification.body?.url && (
																		<div className="flex">
																			<Link
																				className="notifications-secondary font-medium"
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
														// secondary={moment(activity.date_create)
														// 	.endOf('day')
														// 	.fromNow()}
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
														content: <div className="bg-red-500 text-white flex h-full w-full items-center self-center text-15 font-semibold box-border p-24">Delete</div>,
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
														content: <div className="bg-red-500 text-white flex h-full w-full items-center self-center text-15 font-semibold box-border p-24">Delete</div>,
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
													<ListItem
														key={activity.id}
														className="px-12 py-16 items-start border-b-1 border-grey-400 cursor-pointer"
														onClick={(event) => onClickReadNotification(
															event,
															activity,
															notification.body.url.replace('https://localhost:3000', ''))
														}
													>
														<Avatar
															className="mx-4 mt-10"
															alt={notification.sender.first_name}
															src={notification.sender.photo}
														/>
														<ListItemText
															className="flex-1 mx-4"
															primary={
																<>
																	<div className="flex justify-between py-4">
																		<Typography
																			className="font-bold whitespace-no-wrap"
																			color="primary"
																			paragraph={false}
																		>
																			{notification.sender.first_name}{' '}
																			{notification.sender.last_name}{' - '}
																			{notification.sender.company.name}
																		</Typography>
																		<Typography>
																			{
																				moment(activity.date_create)
																					.endOf('day')
																					.fromNow()
																			}
																		</Typography>
																	</div>
																	<div className="flex pb-4">
																		<Typography
																			className="font-semibold"
																			color="textSecondary"
																			paragraph={false}
																		>
																			{notification.subject}
																		</Typography>
																	</div>
																	{notification.body?.url && (
																		<div className="flex">
																			<Link
																				className="notifications-secondary font-medium"
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
														// secondary={moment(activity.date_create)
														// 	.endOf('day')
														// 	.fromNow()}
														/>
													</ListItem>
												</SwipeableListItem>
											);
										})}
									<ListItem key="seeMore" className="px-12" onClick={() => getReadNotification()}>
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
