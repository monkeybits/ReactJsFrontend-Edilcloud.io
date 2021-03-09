import React from 'react';
import loadable from '@loadable/component';
import FuseSearch from '@fuse/core/FuseSearch';
import FuseShortcuts from '@fuse/core/FuseShortcuts';
import { AppBar, Hidden, Toolbar } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
const ChatPanelToggleButton = loadable(() => import('app/fuse-layouts/shared-components/chatPanel/ChatPanelToggleButton'))
const NavbarMobileToggleButton = loadable(() => import('app/fuse-layouts/shared-components/NavbarMobileToggleButton'))
const QuickPanelToggleButton = loadable(() => import('app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton'))
const UserMenu = loadable(() => import('app/fuse-layouts/shared-components/UserMenu'))
const LanguageSwitcher = loadable(() => import('../../shared-components/LanguageSwitcher'))

const useStyles = makeStyles(theme => ({
	separator: {
		width: 1,
		height: 64,
		backgroundColor: theme.palette.divider
	}
}));

function ToolbarLayout2(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const toolbarTheme = useSelector(({ fuse }) => fuse.settings.toolbarTheme);

	const classes = useStyles(props);

	return (
		<ThemeProvider theme={toolbarTheme}>
			<AppBar
				id="fuse-toolbar"
				className="flex relative z-10 asdf"
				color="default"
				style={{ backgroundColor: toolbarTheme.palette.background.default }}
			>
				<Toolbar className="container p-0 lg:px-24">
					{config.navbar.display && (
						<Hidden lgUp>
							<NavbarMobileToggleButton className="w-64 h-64 p-0" />
							<div className={classes.separator} />
						</Hidden>
					)}

					<div className="flex flex-1">
						<Hidden mdDown>
							<FuseShortcuts />
						</Hidden>
					</div>

					<div className="flex">
						<UserMenu />

						<div className={classes.separator} />

						<FuseSearch />

						<Hidden lgUp>
							<div className={classes.separator} />

							<ChatPanelToggleButton />
						</Hidden>

						<div className={classes.separator} />

						<LanguageSwitcher />

						<div className={classes.separator} />

						<QuickPanelToggleButton />
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(ToolbarLayout2);
