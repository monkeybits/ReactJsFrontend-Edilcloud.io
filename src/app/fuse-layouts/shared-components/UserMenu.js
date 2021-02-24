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
import { Link, useHistory } from 'react-router-dom';
import { getMainProfileId, getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_MAIN_PROFILE } from 'app/services/apiEndPoints';
import TippyMenu from 'app/TippyMenu';

function UserMenu(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	const history = useHistory();

	const mainProfileId = getMainProfileId();
	const [userMenu, setUserMenu] = useState(null);
	const [userId, setUserId] = useState(null);
	const userData = user?.data?.user;
	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	return (
		<>
			<TippyMenu
				icon={
					<>
						<Button className="h-64" onClick={userMenuClick}>
							<Avatar className="" alt="user photo" src={userData?.photo}>
								{userData?.first_name?.split('')?.[0]}{' '}
							</Avatar>

							<div className="hidden md:flex flex-col mx-12 items-start">
								<Typography component="span" className="normal-case font-600 flex text-default">
									{userData?.first_name} {userData?.last_name}
								</Typography>
								<Typography className="text-11 capitalize text-muted">Main profile</Typography>
							</div>

							<Icon className="text-16 hidden sm:flex" variant="action">
								keyboard_arrow_down
							</Icon>
						</Button>
					</>
				}
				outsideClick
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
							<ListItemText primary="Companies" />
						</MenuItem>
						<MenuItem
							component={Link}
							to={{
								pathname: '/edit-profile',
								state: { nextPath: history.location.pathname }
							}}
							onClick={userMenuClose}
							role="button"
						>
							<ListItemIcon className="min-w-40">
								<Icon>admin_panel_settings</Icon>
							</ListItemIcon>
							<ListItemText primary="Edit main profile" />
						</MenuItem>
						{getRole() == 'o' && (
							<MenuItem
								component={Link}
								to={{
									pathname: '/edit-company',
									state: { nextPath: history.location.pathname }
								}}
								onClick={userMenuClose}
								role="button"
							>
								<ListItemIcon className="min-w-40">
									<Icon>store</Icon>
								</ListItemIcon>
								<ListItemText primary="Edit Company" />
							</MenuItem>
						)}
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
			</TippyMenu>
		</>
	);
}

export default UserMenu;
