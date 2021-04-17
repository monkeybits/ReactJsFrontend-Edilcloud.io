import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseUtils from '@fuse/utils';
import { AppBar, Avatar, Icon, IconButton, Input, List, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Toolbar, Typography } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const TippyMenu = loadable(() => import('app/TippyMenu'))
const ContactListItem = loadable(() => import('./ContactListItem'))
const StatusIcon = loadable(() => import('./StatusIcon'))

const statusArr = [
	{
		title: 'Online',
		value: 'online'
	},
	{
		title: 'Away',
		value: 'away'
	},
	{
		title: 'Do not disturb',
		value: 'do-not-disturb'
	},
	{
		title: 'Offline',
		value: 'offline'
	}
];

function ChatsSidebar(props) {
	const { t } = useTranslation('chat_projects');
	const dispatch = useDispatch();
	const contacts = useSelector(({ chatAppProject }) => chatAppProject.contacts.entities);
	const user = useSelector(({ chatAppProject }) => chatAppProject.user);
	const userAuth = useSelector(({ auth }) => auth.user);

	const [searchText, setSearchText] = useState('');
	const [statusMenuEl, setStatusMenuEl] = useState(null);
	const [moreMenuEl, setMoreMenuEl] = useState(null);

	const userData = userAuth?.data?.user;

	function handleMoreMenuClick(event) {
		setMoreMenuEl(event.currentTarget);
	}

	function handleMoreMenuClose(event) {
		setMoreMenuEl(null);
	}

	function handleStatusMenuClick(event) {
		event.preventDefault();
		event.stopPropagation();
		setStatusMenuEl(event.currentTarget);
	}

	function handleStatusSelect(event, status) {
		event.preventDefault();
		event.stopPropagation();
		dispatch(
			Actions.updateUserData({
				...user,
				status
			})
		);
		setStatusMenuEl(null);
	}

	function handleStatusClose(event) {
		event.preventDefault();
		event.stopPropagation();
		setStatusMenuEl(null);
	}

	function handleSearchText(event) {
		setSearchText(event.target.value);
	}

	console.log('user?????????????????????', user)

	return (
		<div className="flex flex-col flex-auto h-full">
			<AppBar position="static" color="default" elevation={1} className="bg-white border-0">
			{/*		<Toolbar className="flex justify-between items-center px-4 bg-dark min-h-72 chat-border-right">
					{user && (
						<div
							className="relative w-48 h-48 p-0 mx-12 cursor-pointer chat-header-img"
							onClick={() => dispatch(Actions.openUserSidebar())}
							onKeyDown={() => dispatch(Actions.openUserSidebar())}
							role="button"
							tabIndex={0}
						>
							<Avatar src={userData?.photo} alt={user.name} className="w-48 h-48">
								{!user.avatar || user.avatar === '' ? user.name[0] : ''}
							</Avatar>

							<div
								className="absolute right-0 bottom-0 -m-2 z-10 cursor-pointer"
								aria-owns={statusMenuEl ? 'switch-menu' : null}
								aria-haspopup="true"
								onClick={handleStatusMenuClick}
								onKeyDown={handleStatusMenuClick}
								role="button"
								tabIndex={0}
							>
								<StatusIcon status={user.status} />
							</div>

							<Menu
								id="status-switch"
								anchorEl={statusMenuEl}
								open={Boolean(statusMenuEl)}
								onClose={handleStatusClose}
							>
								{statusArr.map(status => (
									<MenuItem onClick={ev => handleStatusSelect(ev, status.value)} key={status.value}>
										<ListItemIcon className="min-w-40">
											<StatusIcon status={status.value} />
										</ListItemIcon>
										<ListItemText primary={status.title} />
									</MenuItem>
								))}
							</Menu>
						</div>
					)}

					<div>
						<TippyMenu
							icon={
								<>
									<IconButton
										aria-owns={moreMenuEl ? 'chats-more-menu' : null}
										aria-haspopup="true"
										onClick={handleMoreMenuClick}
										className="text-white opacity-60"
									>
										<Icon>more_vert</Icon>
									</IconButton>
								</>
							}
							outsideClick
						>
							<MenuItem onClick={handleMoreMenuClose}>Profile</MenuItem>
							<MenuItem onClick={handleMoreMenuClose}>Logout</MenuItem>
						</TippyMenu>
					</div>
						</Toolbar> */}
		
				{useMemo(
					() => (
						<Toolbar className="mt-8 px-16">
							<Paper
								className="flex p-4 items-center w-full px-8 py-4 rounded-20 chat-search"
								elevation={1}
							>
								<Icon className="text-muted">search</Icon>

								<Input
									placeholder={t('SEARCH_PARTICIPANTS')}
									className="flex flex-1 px-8"
									disableUnderline
									fullWidth
									value={searchText}
									inputProps={{
										'aria-label': 'Search'
									}}
									onChange={handleSearchText}
								/>
							</Paper>
						</Toolbar>
					),
					[searchText]
				)}
			</AppBar>

			<FuseScrollbars className="overflow-y-auto flex-1">
				<List className="w-full">
					{useMemo(() => {
						function getFilteredArray(arr, _searchText) {
							if (_searchText.length === 0) {
								return arr;
							}
							return FuseUtils.filterArrayByString(arr, _searchText);
						}

						const chatListContacts =
							contacts.length > 0 && user && user.chatList
								? user.chatList.map(_chat => ({
										..._chat,
										...contacts.find(_contact => _contact.id === _chat.contactId)
								  }))
								: [];
						const contactsArr = getFilteredArray([...contacts], searchText);
						const chatListArr = getFilteredArray([...chatListContacts], searchText);

						return (
							<>
								<FuseAnimateGroup
									enter={{
										animation: 'transition.expandIn'
									}}
									className="flex flex-col flex-shrink-0"
								>
									{contactsArr.length > 0 && (
										<Typography className="font-weight-700 text-16 px-16 pb-8">
											{t('PARTICIPANTS')}
										</Typography>
									)}

									{contactsArr.map(contact => (
										<ContactListItem key={contact.id} contact={contact} />
									))}
								</FuseAnimateGroup>
							</>
						);
					}, [contacts, user, searchText, dispatch])}
				</List>
			</FuseScrollbars>
		</div>
	);
}

export default ChatsSidebar;
