/* =============================================================================
TODO: Boards.js
 ===============================================================================
*This file is part of company list page
TODO: This file fetch request from other company and user compamies.
*/
import _ from '@lodash';
import loadable from '@loadable/component';
import FuseAnimate from '@fuse/core/FuseAnimate';
import PlanIosDialog from '@fuse/core/FuseNavigation/PlanIosDialog';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	APPROVE_LIST,
	REFRESH_TOKEN,
	REQUEST_LIST,
	GET_MAIN_PROFILE,
	ACCEPT_INVITATION,
	REFUSE_INVITATION
} from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken, getTokenOnly, saveToken, saveMainProfileId } from 'app/services/serviceUtils';
import * as authActions from 'app/auth/store/actions';
import { CircularProgress, Icon, Typography, Badge, Avatar } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import { useTranslation } from 'react-i18next';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import * as AccessibilityActions from 'app/fuse-layouts/shared-components/accessibility/store/actions';
import ReuestsDrawer from './ReuestsDrawer';
import { GET_BOARDS, RESET_BOARDS } from '../store/actions';
import reducer from '../store/reducers';
import * as Actions from '../store/actions';
import { getToken, onMessageListener } from '../../../../../firebase';

const UpdatePlanDialog = loadable(() => import('./UpdatePlanDialog'));
const BillingFormDialog = loadable(() => import('./BillingFormDialog'));

const useStyles = makeStyles(theme => ({
	root: {
		background: theme.palette.primary.main,
		color: theme.palette.getContrastText(theme.palette.primary.main)
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

function Boards(props) {
	const { t } = useTranslation('companies');
	const dispatch = useDispatch();
	const boards = useSelector(({ scrumboardApp }) => scrumboardApp.boards);
	const settings = useSelector(({ fuse }) => fuse.settings.current);
	const classes = useStyles(props);
	const [isShowRequests, setIsShowRequests] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isPlanIOSModal, setIsPlanIOSModal] = useState(false);
	const [isViewTutorial, setIsViewTutorial] = useState(true);
	const [request, setRequest] = useState({});
	const [show, setShow] = useState(false);
	const [notification, setNotification] = useState({title: '', body: ''});
	const [isTokenFound, setTokenFound] = useState(false);
	const [planCustomer, setPlanCustomer] = useState('');
	const [deviceType, setDeviceType] = React.useState('');
	getToken(setTokenFound);

	useEffect(() => {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			setDeviceType('window phone')
		}

		if (/android/i.test(userAgent)) {
			setDeviceType('android')
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			setDeviceType('ios')
		}

		const iPad = (userAgent.match(/(iPad)/)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
		if (iPad !== false) {
			setDeviceType('ios')
		}
	}, []);

	onMessageListener().then(payload => {
		console.log('payload: ', payload)
		setShow(true);
		setNotification({title: payload.notification.title, body: payload.notification.body})
	  }).catch(err => {
		  console.log('failed: ', err)
	  });

	useEffect(() => {
		localStorage.removeItem('main_profile');
		dispatch(notificationActions.resetNotificationData());
		dispatch({
			type: RESET_BOARDS
		});
		getcompanyList();
		getRequest();
	}, [dispatch]);
	/**
	 * get user companies
	 */
	const getcompanyList = () => {
		apiCall(
			APPROVE_LIST,
			{},
			results => {
				if (Array.isArray(results)) {
					const filterdBoards = results.filter(d => d.company && d.status);
					dispatch({
						type: GET_BOARDS,
						payload: filterdBoards.map(
							d => d.company && { ...d.company, company_profile_id: d.id, isApproved: true }
						)
					});
				}
			},
			err => {
				// console.log(err)
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	/**
	 * get companies who invited users
	 */
	const getRequest = () => {
		apiCall(
			REQUEST_LIST,
			{},
			({ results }) => {
				if (Array.isArray(results)) {
					const filterdBoards = results.filter(d => d.company && d.status);
					dispatch({
						type: GET_BOARDS,
						payload: filterdBoards.map(
							d => d.company && { ...d.company, uidb36: d.uidb36, token: d.token, isApproved: false }
						)
					});
				}
			},
			err => {
				// console.log(err)
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	/**
	 * its company click
	 * we need to genrate a new token when user click on a company
	 */
	const redirectAfterGetNewToken = company_profile_id => {
		const myCustomUniqueUserId = company_profile_id;
		// console.log(`LOGGED IN WITH PROFILE ID: ${myCustomUniqueUserId.toString()}`);

		if (window.flutter_inappwebview?.callHandler) {
			// console.log('listenning to flutterInAppWebViewPlatformReady');
			window.flutter_inappwebview
				.callHandler('OneSignalSetUser', myCustomUniqueUserId.toString())
				.then(function (result) {
					// console.log(JSON.stringify(result));
				});
			// console.log('finish listenning to flutterInAppWebViewPlatformReady');
		} else {
			// console.log('listenning to flutterInAppWebViewPlatformReady');
			if (window.OneSignalSetUser?.postMessage) {
				window.OneSignalSetUser.postMessage(myCustomUniqueUserId.toString());
			}

			// console.log('finish listenning to flutterInAppWebViewPlatformReady');
		}
		try {
			window.webkit.messageHandlers.OneSignalSetUser.postMessage(
				JSON.stringify({ userid: myCustomUniqueUserId })
			);
		} catch (e) {
			// console.log('error', e);
		}
		// if (window.OneSignal)
		// 	window.OneSignal.push(function () {
		// 		window.OneSignal.setExternalUserId(myCustomUniqueUserId);
			// });
		apiCall(
			REFRESH_TOKEN(company_profile_id),
			{
				token: getTokenOnly()
			},
			res => {
				getMainProfile(res.main_profile);
				saveMainProfileId(res.main_profile);
				saveToken(res.token);
				setIsLoading(false);
				dispatch(Actions.resetFile());
				dispatch(authActions.getCompanyProfile(res.token));
				dispatch(AccessibilityActions.openAccessibility());
				props.history.push('/apps/todo/all');
			},
			err => {
				setIsLoading(false);
				// console.log(err);
			},
			METHOD.POST
		);
	};
	/**
	 * its company click
	 * we need to genrate a new token when user click on a company
	 */
	 const getRefreshToken = company_profile_id => {
		apiCall(
			REFRESH_TOKEN(company_profile_id),
			{
				token: getTokenOnly()
			},
			res => {
				saveToken(res.token);
				setIsLoading(false);
			},
			err => {
				setIsLoading(false);
				// console.log(err);
			},
			METHOD.POST
		);
	};
	/**
	 * get Main profile data
	 */
	const getMainProfile = mainProfileId => {
		apiCall(
			GET_MAIN_PROFILE(mainProfileId),
			{},
			res => dispatch(authActions.setUserData(res)),
			err => {
				// console.log({ err })
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	/**
	 * on click on invitation accept need to get new list of companies and requests
	 */
	const handleInvitation = () => {
		dispatch({
			type: RESET_BOARDS
		});
		getcompanyList();
		getRequest();
		setIsShowRequests(false);
	};

	return isLoading ? (
		<FuseSplashScreen />
	) : (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center sm:h-full')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<FuseAnimate>
					<Typography className="mt-44 sm:mt-56 sm:py-24 text-32" color="inherit">
						{t('COMPANIES_LIST')}
					</Typography>
				</FuseAnimate>
				<div>
					<div className="flex flex-wrap w-full justify-center py-32 px-16">
						{!!boards.length ? (
							boards.map(board => (
								<div className="w-224 h-224 p-16" key={board.id}>
									<Link
										to="#"
										onClick={e => {
											e.preventDefault();
											e.stopPropagation();
											if (
												board.subscription.status === 'active'
											) {
												setRequest(board);
												if (board.isApproved) {
													setIsLoading(true);
													redirectAfterGetNewToken(board.company_profile_id);
												} else {
													setIsShowRequests(true);
													setRequest(board);
												}
											} else {
												// getRefreshToken(board.company_profile_id)
												// dispatch(Actions.openUpgradePlanDialog(board));
												setIsPlanIOSModal(true)
											}
										}}
										className={clsx(
											classes.board,
											'flex flex-col items-center justify-center w-full h-full rounded py-24'
										)}
										role="button"
									>
										{board.company_profile_id == request.company_profile_id && isLoading ? (
											<Skeleton style={{ background: 'darkgrey' }}>
												<Avatar src={board.logo} variant="square" className="company-img">
													{board.name.split('')[0]}
												</Avatar>
											</Skeleton>
										) : (
											<>
												{board.isApproved ? (
													<>
														<Avatar
															src={board.logo}
															variant="square"
															className="company-img"
														>
															{board.name.split('')[0]}
														</Avatar>
													</>
												) : (
													<Badge
														invisible={board.isApproved}
														color="secondary"
														onClick={e => {
															e.stopPropagation();
															e.preventDefault();
															setIsShowRequests(true);
															setRequest(board);
														}}
													>
														<Avatar
															src={board.logo}
															variant="square"
															className="company-img"
														>
															{board.name.split('')[0]}
														</Avatar>
														{/* <Icon className="text-56">assessment</Icon> */}
													</Badge>
												)}
											</>
										)}

										<Typography
											className="text-16 font-300 text-center pt-16 px-32"
											color="inherit"
										>
											{board.name}{' '}
										</Typography>
										<span className="trial intrial text-center mt-4 mx-2">
											{board.subscription.status}
										</span>
									</Link>
								</div>
							))
						) : (
							<div className="w-224 h-224 p-16">
								<div className="flex flex-col items-center justify-center w-full h-full rounded py-24 border-white border-1 border-dashed">
									<CircularProgress className="w-xs" color="white" />
								</div>
							</div>
						)}
						<div className="w-224 h-224 p-16">
							<div
								className={clsx(
									classes.board,
									classes.newBoard,
									'flex flex-col items-center justify-center w-full h-full rounded py-24'
								)}
								onClick={() => dispatch(Actions.newBoard())}
								onKeyDown={() => dispatch(Actions.newBoard())}
								role="button"
								tabIndex={0}
							>
								<Icon className="text-56">add_circle</Icon>
								<Typography
									className="text-16 font-300 text-uppercase text-center pt-16 px-32"
									color="inherit"
								>
									{t('CREATE_NEW_COMPANY')}
								</Typography>
							</div>
						</div>
					</div>
				</div>
				<UpdatePlanDialog {...props} setIsPlanIOSModal={(res, customer) => {
					setIsPlanIOSModal(res)
					setPlanCustomer(customer)
				}} />
				<BillingFormDialog {...props} setIsPlanIOSModal={(res, customer) => {
					setIsPlanIOSModal(res)
					setPlanCustomer(customer)
				}} />
				<PlanIosDialog
					isPlanModal={isPlanIOSModal}
					closePlanModal={() => setIsPlanIOSModal(false)}
					onOk={() => {
						try {
							setIsPlanIOSModal(false)
						} catch (e) {
							// console.log('error', e);
						}
					}}
				/>
			</div>
			<ReuestsDrawer
				afterSuccess={handleInvitation}
				isShowRequests={isShowRequests}
				setIsShowRequests={setIsShowRequests}
				request={request}
				acceptAPI={ACCEPT_INVITATION(request.uidb36, request.token)}
				rejectAPI={REFUSE_INVITATION(request.uidb36, request.token)}
			/>
		</div>
	);
}
export default withReducer('scrumboardApp', reducer)(Boards);
