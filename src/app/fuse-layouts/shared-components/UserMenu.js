import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import * as authActions from 'app/auth/store/actions';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMainProfileId, getHeaderToken } from 'app/services/serviceUtils';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_MAIN_PROFILE } from 'app/services/apiEndPoints';

function UserMenu(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	const mainProfileId = getMainProfileId();
	const [userMenu, setUserMenu] = useState(null);
	const [userId, setUserId] = useState(null);
	const userData = user?.data?.user;
	useEffect(() => {
		if (mainProfileId && !userData?.id) {
			setUserId(mainProfileId);
			apiCall(
				GET_MAIN_PROFILE(mainProfileId),
				{},
				res => dispatch(authActions.setUserData(res)),
				err => console.log({ err }),
				METHOD.GET,
				getHeaderToken()
			);
		}
	}, [userData]);
	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	return (
		<>
			<Button className="h-64" onClick={userMenuClick}>
				<Avatar className="" alt="user photo" src={userData?.photo}>
					{userData?.first_name?.split('')?.[0]}{' '}
				</Avatar>

				<div className="hidden md:flex flex-col mx-12 items-start">
					<Typography component="span" className="normal-case font-600 flex">
						{userData?.first_name}
					</Typography>
					<Typography className="text-11 capitalize" color="textSecondary">
						Main profile
					</Typography>
				</div>

				<Icon className="text-16 hidden sm:flex" variant="action">
					keyboard_arrow_down
				</Icon>
			</Button>

			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				{!user.role || user.role.length === 0 ? (
					<>
						<MenuItem component={Link} to="/login" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>lock</Icon>
							</ListItemIcon>
							<ListItemText primary="Login" />
						</MenuItem>
						<MenuItem component={Link} to="/register" role="button">
							<ListItemIcon className="min-w-40">
								<Icon>person_add</Icon>
							</ListItemIcon>
							<ListItemText primary="Register" />
						</MenuItem>
					</>
				) : (
					<>
						<MenuItem component={Link} to="/apps/companies" onClick={userMenuClose} role="button">
							<ListItemIcon className="min-w-40">
								<Icon>account_circle</Icon>
							</ListItemIcon>
							<ListItemText primary="companies" />
						</MenuItem>

						<MenuItem
							onClick={() => {
								dispatch(authActions.logoutUser());
								userMenuClose();
							}}
						>
							<ListItemIcon className="min-w-40">
								<Icon>exit_to_app</Icon>
							</ListItemIcon>
							<ListItemText primary="Logout" />
						</MenuItem>
					</>
				)}
			</Popover>
		</>
	);
}

export default UserMenu;
