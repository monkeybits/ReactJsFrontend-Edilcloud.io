import React, { useEffect, useState } from 'react';
import loadable from '@loadable/component';
import { AppBar, Hidden, Toolbar, Icon } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { useLocation } from 'react-router';

const ChatPanelToggleButton = loadable(() =>
	import('app/fuse-layouts/shared-components/chatPanel/ChatPanelToggleButton')
);
const NavbarMobileToggleButton = loadable(() =>
	import('app/fuse-layouts/shared-components/NavbarMobileToggleButton')
);
const QuickPanelToggleButton = loadable(() =>
	import('app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton')
);
const NotificationToggleButton = loadable(() =>
	import('app/fuse-layouts/shared-components/notification/NotificationToggleButton')
);
const UserMenu = loadable(() => import('app/fuse-layouts/shared-components/UserMenu'));
const NotificationWebSocket = loadable(() => import('app/NotificationWebSocket'));
const LanguageSwitcher = loadable(() => import('../../shared-components/LanguageSwitcher'));

const useStyles = makeStyles(theme => ({
	separator: {
		width: 1,
		height: 64,
		backgroundColor: theme.palette.divider
	}
}));

function ToolbarLayout1(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const count = useSelector(({ notificationPanel }) => notificationPanel.count);
	const contacts = useSelector(({ chatPanel }) => chatPanel.contacts.entities);
	const [totalCount, setTotalCount] = useState(0);
	const location = useLocation();
	const classes = useStyles(props);
	useEffect(() => {
		let newContacts = [];
		if (company && company.id && contacts) {
			newContacts = [
				{
					...company,
					type: 'company'
				},
				...contacts
			];
		}
		if (company && company.id) {
			let result = newContacts.reduce((unique, o) => {
				if (o.talks?.[0]?.unread_count) {
					unique.push(o.talks?.[0]?.unread_count);
				}
				return unique;
			}, []);
			result = result.reduce((a, b) => a + b, 0);
			setTotalCount(result);
		}
	}, [contacts, company]);
	const isCompanies = !!(location.pathname === '/apps/companies');
	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className="flex relative z-10 custom-header"
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.default }}
			>
				<Toolbar className="p-0">
					{config.navbar.display && config.navbar.position === 'left' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-64 h-64 p-0" />
							{/* <div className={clsx(classes.separator, 'custom-separator')} /> */}
						</Hidden>
					)}

					<div className="flex flex-1">
						{/* <Hidden mdDown>
							<FuseShortcuts className="px-16" />
						</Hidden> */}
					</div>

					<div className="flex">
						<UserMenu />

						{/* <div className={clsx(classes.separator, 'custom-separator')} /> */}

						{/* <FuseSearch /> */}

						<div className={clsx(classes.separator, 'custom-separator')} />

						<LanguageSwitcher />

						{/* {!location.pathname?.includes('companies') && ( */}
						{
							!isCompanies &&
							<>
								<div className={clsx(classes.separator, 'custom-separator')} />
								<NotificationWebSocket>
									<NotificationToggleButton totalCount={count} />
								</NotificationWebSocket>
							</>
						}
						{/* )} */}

						{/* {!location.pathname?.includes('companies') && ( */}
						{
							!isCompanies &&
							<>
								<div className={clsx(classes.separator, 'custom-separator')} />
								<QuickPanelToggleButton>
									<Icon>new_releases</Icon>
								</QuickPanelToggleButton>
							</>
						}
						{/* )} */}
					</div>

					{config.navbar.display && config.navbar.position === 'right' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton />
						</Hidden>
					)}
					<Hidden lgUp>
						{/* <div className={clsx(classes.separator, 'custom-separator')} /> */}

						<ChatPanelToggleButton totalCount={totalCount} />
					</Hidden>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(ToolbarLayout1);
