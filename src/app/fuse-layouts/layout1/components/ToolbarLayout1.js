import FuseSearch from '@fuse/core/FuseSearch';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import AppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import ChatPanelToggleButton from 'app/fuse-layouts/shared-components/chatPanel/ChatPanelToggleButton';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import NotificationToggleButton from 'app/fuse-layouts/shared-components/notification/NotificationToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import clsx from 'clsx';
import { Icon, IconButton } from '@material-ui/core';

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
	const contacts = useSelector(({ chatPanel }) => chatPanel.contacts.entities);
	const [totalCount, setTotalCount] = useState(0);

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

						<Hidden lgUp>
							<div className={clsx(classes.separator, 'custom-separator')} />

							<ChatPanelToggleButton totalCount={totalCount} />
						</Hidden>

						<div className={clsx(classes.separator, 'custom-separator')} />

						<LanguageSwitcher />

						<div className={clsx(classes.separator, 'custom-separator')} />
						<NotificationToggleButton />
						
						<div className={clsx(classes.separator, 'custom-separator')} />

						<QuickPanelToggleButton>
							<Icon>report_problem</Icon>
						</QuickPanelToggleButton>
					</div>

					{config.navbar.display && config.navbar.position === 'right' && (
						<Hidden lgUp>
							<NavbarMobileToggleButton />
						</Hidden>
					)}
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(ToolbarLayout1);
