import React, { useState } from 'react';
import loadable from '@loadable/component';
import { Avatar, Button, Icon, ListItemIcon, ListItemText, MenuItem, Typography } from '@material-ui/core';
import * as authActions from 'app/auth/store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getMainProfileId, decodeDataFromToken } from 'app/services/serviceUtils';

const TippyMenu = loadable(() => import('app/TippyMenu'));

function UserMenu(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user);
	const location = useLocation();
	const company = useSelector(({ chatApp }) => chatApp?.company);
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

	const isCompanies = !!(location.pathname === '/apps/companies');
	return (
		<>
			<TippyMenu
				icon={
					<>
						<Button className="h-64" onClick={userMenuClick}>
							<Avatar alt="user photo" src={userData?.photo}>
								{userData?.first_name?.split('')?.[0]}{' '}
							</Avatar>

							<div className="hidden md:flex flex-col mx-12 items-start">
								<Typography component="span" className="normal-case font-600 flex text-default">
									{userData?.first_name} {userData?.last_name}
								</Typography>
								<Typography className="text-11 capitalize text-muted">Profilo Principale</Typography>
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
						{
							!isCompanies && 
							<>
								<MenuItem
									component={Link}
									to={{
										pathname: '/billing',
										state: { nextPath: history.location.pathname }
									}}
									onClick={userMenuClose}
									role="button"
								>
									<ListItemIcon className="min-w-40">
										<Icon>receipt</Icon>
									</ListItemIcon>
									<ListItemText primary="Billing" />
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
							</>
						}
						<MenuItem
							onClick={() => {
								dispatch(authActions.logoutUser());
								
								if (window.flutter_inappwebview?.callHandler) {
									window.flutter_inappwebview
										.callHandler('FirebaseUnsubscribeUser', userInfo.extra.profile.id.toString())
										.then(function (result) {
											// console.log(JSON.stringify(result));
										});
								} else {
									if (window.FirebaseUnsubscribeUser?.postMessage) {
										window.FirebaseUnsubscribeUser.postMessage(userInfo.extra.profile.id.toString());
									}
								}
								try {
									window.webkit.messageHandlers.FirebaseUnsubscribeUser.postMessage(
										JSON.stringify({ userid: userInfo.extra.profile.id })
									);
								} catch (e) {
									// console.log('error', e);
								}

								// if (window.OneSignal) {
								// 	window.OneSignal.push(function () {
								// 		window.OneSignal.setExternalUserId('');
								// 	});
								// }
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
