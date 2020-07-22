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
import { APPROVE_LIST, REFRESH_TOKEN, REQUEST_LIST } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken, getTokenOnly, saveToken } from 'app/services/serviceUtils';
import { GET_BOARDS, RESET_BOARDS } from '../store/actions';
import ReuestsDrawer from './ReuestsDrawer';
import Badge from '@material-ui/core/Badge';
import { Avatar } from '@material-ui/core';

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
	const classes = useStyles(props);
	const [isShowRequests, setIsShowRequests] = useState(false);
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
			({ results }) => {
				if (Array.isArray(results)) {
					let filterdBoards = results.filter(d => d.company);
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
					let filterdBoards = results.filter(d => d.company);
					dispatch({
						type: GET_BOARDS,
						payload: filterdBoards.map(
							d => d.company && { ...d.company, company_profile_id: d.id, isApproved: false }
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
		apiCall(
			REFRESH_TOKEN(company_profile_id),
			{
				token: getTokenOnly()
			},
			res => {
				saveToken(res.token);
				dispatch(Actions.resetFile());
				props.history.push('/apps/todo/all');
			},
			err => console.log(err),
			METHOD.POST
		);
	};

	return (
		<div className={clsx(classes.root, 'flex flex-grow flex-shrink-0 flex-col items-center')}>
			<div className="flex flex-grow flex-shrink-0 flex-col items-center container px-16 md:px-24">
				<FuseAnimate>
					<Typography className="mt-44 sm:mt-88 sm:py-24 text-32 sm:text-40 font-300" color="inherit">
						Companies List
					</Typography>
				</FuseAnimate>
				<div>
					<FuseAnimateGroup
						className="flex flex-wrap w-full justify-center py-32 px-16"
						enter={{
							animation: 'transition.slideUpBigIn',
							duration: 300
						}}
					>
						{boards.map(board => (
							<div className="w-224 h-224 p-16" key={board.id}>
								<Link
									// to={`/apps/companies/${board.id}/${board.uri}`}
									onClick={() => {
										console.log({
											isApproved: board.isApproved
										});
										if (!!board.isApproved) {
											redirectAfterGetNewToken(board.company_profile_id);
										} else {
											setIsShowRequests(true);
											setRequest(board);
										}
									}}
									className={clsx(
										classes.board,
										'flex flex-col items-center justify-center w-full h-full rounded py-24'
									)}
									role="button"
								>
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
										<Avatar src={board.logo} variant="square">
											{board.name.split('')[0]}
										</Avatar>
										{/* <Icon className="text-56">assessment</Icon> */}
									</Badge>
									<Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
										{board.name}
									</Typography>
									{/* {!board.isApproved && (
										<div className="mt-10">
											<a href="javascript:;">
												<Badge badgeContent="New request" color="secondary"></Badge>
											</a>
										</div>
									)} */}
								</Link>
							</div>
						))}
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
								<Typography className="text-16 font-300 text-center pt-16 px-32" color="inherit">
									Create new company
								</Typography>
							</div>
						</div>
					</FuseAnimateGroup>
				</div>
			</div>
			<ReuestsDrawer isShowRequests={isShowRequests} setIsShowRequests={setIsShowRequests} request={request} />
		</div>
	);
}
export default withReducer('scrumboardApp', reducer)(Boards);
