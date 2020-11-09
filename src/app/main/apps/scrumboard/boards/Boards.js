import _ from '@lodash';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import {
	APPROVE_LIST,
	REFRESH_TOKEN,
	REQUEST_LIST,
	GET_MAIN_PROFILE,
	ACCEPT_INVITATION,
	REFUSE_INVITATION
} from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import {
	getHeaderToken,
	getTokenOnly,
	saveToken,
	saveMainProfileId,
	decodeDataFromToken
} from 'app/services/serviceUtils';
import { GET_BOARDS, RESET_BOARDS } from '../store/actions';
import * as authActions from 'app/auth/store/actions';
import ReuestsDrawer from './ReuestsDrawer';
import Badge from '@material-ui/core/Badge';
import { Avatar } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import FuseSplashScreen from '@fuse/core/FuseSplashScreen';
import * as FuseActions from 'app/store/actions';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

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
	const dispatch = useDispatch();
	const boards = useSelector(({ scrumboardApp }) => scrumboardApp.boards);
	const settings = useSelector(({ fuse }) => fuse.settings.current);
	const classes = useStyles(props);
	const [isShowRequests, setIsShowRequests] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [request, setRequest] = useState({});

	useEffect(() => {
		dispatch({
			type: RESET_BOARDS
		});
		getcompanyList();
		getRequest();
	}, [dispatch]);
	const getcompanyList = () => {
		apiCall(
			APPROVE_LIST,
			{},
			results => {
				if (Array.isArray(results)) {
					let filterdBoards = results.filter(d => d.company && d.status);
					dispatch({
						type: GET_BOARDS,
						payload: filterdBoards.map(
							d => d.company && { ...d.company, company_profile_id: d.id, isApproved: true }
						)
					});
				}
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	const getRequest = () => {
		apiCall(
			REQUEST_LIST,
			{},
			({ results }) => {
				if (Array.isArray(results)) {
					let filterdBoards = results.filter(d => d.company && d.status);
					dispatch({
						type: GET_BOARDS,
						payload: filterdBoards.map(
							d => d.company && { ...d.company, uidb36: d.uidb36, token: d.token, isApproved: false }
						)
					});
				}
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	const redirectAfterGetNewToken = company_profile_id => {
		const myCustomUniqueUserId = company_profile_id;
		if (window.Print) {
			window.Print.postMessage(myCustomUniqueUserId.toString());
		}
		window.OneSignal.push(function () {
			window.OneSignal.setExternalUserId(myCustomUniqueUserId);
		});
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
				props.history.push('/apps/todo/all');
			},
			err => {
				setIsLoading(false);
				console.log(err);
			},
			METHOD.POST
		);
	};
	const getMainProfile = mainProfileId => {
		apiCall(
			GET_MAIN_PROFILE(mainProfileId),
			{},
			res => dispatch(authActions.setUserData(res)),
			err => console.log({ err }),
			METHOD.GET,
			getHeaderToken()
		);
	};
	const handleInvitation = () => {
		dispatch({
			type: RESET_BOARDS
		});
		getcompanyList();
		getRequest();
		setIsShowRequests(false);
	};
	const handleMoreAction = (action, company) => {
		if (action == 'Edit') {
			console.log({ company });
			dispatch(authActions.setUserCompanyData({ company }));
			props.history.push('/edit-company');
		}
	};
	return isLoading ? (
		<FuseSplashScreen />
	) : (
		<div className={clsx(classes.root, 'p-16 sm:p-32 flex flex-grow flex-shrink-0 flex-col bg-body')}>
			<div className="flex flex-grow flex-shrink-0 flex-col container px-16 md:px-24">
				{/* <FuseAnimate>
					<Typography className="sm:py-24 text-32 sm:text-40 font-300" color="inherit">
						Companies List
					</Typography>
				</FuseAnimate> */}
				<div className="flex w-full">
					<div className="flex w-full items-center justify-between pb-20 border-b-1">
						<Typography variant="h5">Company</Typography>
						<Button
							variant="contained"
							color="primary"
							className={'btn-primary normal-case m-0'}
							startIcon={<AddIcon />}
						>
							Add Company
						</Button>
					</div>
				</div>
				<div>
					<div className="flex flex-wrap w-full pt-32">
						{!!boards.length &&
							boards.map(board => (
								<div className="w-200 h-200 mr-20" key={board.id}>
									<Link
										to="#"
										onClick={e => {
											e.preventDefault();
											e.stopPropagation();
											setRequest(board);
											if (!!board.isApproved) {
												setIsLoading(true);
												// dispatch(
												// 	FuseActions.setDefaultSettings(
												// 		_.set({}, 'layout.config.toolbar.display', false)
												// 	)
												// );
												redirectAfterGetNewToken(board.company_profile_id);
											} else {
												setIsShowRequests(true);
												setRequest(board);
											}
										}}
										className={clsx(
											classes.board,
											'flex flex-col items-center justify-center w-full h-full rounded py-24 bg-white border-1 company-box'
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
											className="text-16 font-500 text-center text-custom-1 pt-16 px-32"
										>
											{board.name}
										</Typography>
									</Link>
								</div>
							))}
						{/* <div className="w-200 h-200">
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
								<Typography className="text-16 font-500 text-center text-custom-1 pt-16 px-32">
									Create new company
								</Typography>
							</div>
						</div> */}
					</div>
				</div>
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
