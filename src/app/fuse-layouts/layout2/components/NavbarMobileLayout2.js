import React from 'react';
// import loadable from '@loadable/component';
import clsx from 'clsx';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { AppBar, Hidden, Icon } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const Logo = React.lazy(() => import('app/fuse-layouts/shared-components/Logo'));
const NavbarFoldedToggleButton = React.lazy(() =>
	import('app/fuse-layouts/shared-components/NavbarFoldedToggleButton')
);
const NavbarMobileToggleButton = React.lazy(() =>
	import('app/fuse-layouts/shared-components/NavbarMobileToggleButton')
);
const Navigation = React.lazy(() => import('app/fuse-layouts/shared-components/Navigation'));
const UserNavbarHeader = React.lazy(() => import('app/fuse-layouts/shared-components/UserNavbarHeader'));

const useStyles = makeStyles({
	content: {
		overflowX: 'hidden',
		overflowY: 'auto',
		'-webkit-overflow-scrolling': 'touch',
		background:
			'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
		backgroundRepeat: 'no-repeat',
		backgroundSize: '100% 40px, 100% 10px',
		backgroundAttachment: 'local, scroll'
	}
});

function NavbarMobileLayout2(props) {
	const classes = useStyles(props);
	const theme = useTheme();

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<AppBar
				color="primary"
				position="static"
				elevation={0}
				className="flex flex-row items-center flex-shrink h-64 min-h-64 px-12"
			>
				<div className="flex flex-1 mx-8">
					<Logo />
				</div>

				<Hidden mdDown>
					<NavbarFoldedToggleButton className="w-40 h-40 p-0" />
				</Hidden>

				<Hidden lgUp>
					<NavbarMobileToggleButton className="w-40 h-40 p-0">
						<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}"</Icon>
					</NavbarMobileToggleButton>
				</Hidden>
			</AppBar>

			<FuseScrollbars className={clsx(classes.content)}>
				<UserNavbarHeader />

				<Navigation layout="vertical" />
			</FuseScrollbars>
		</div>
	);
}

export default React.memo(NavbarMobileLayout2);
