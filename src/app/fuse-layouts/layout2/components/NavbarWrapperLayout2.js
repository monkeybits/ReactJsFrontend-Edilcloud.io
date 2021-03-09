import React from 'react';
import loadable from '@loadable/component';
import { useDispatch, useSelector } from 'react-redux';
import { Drawer, Hidden, Paper} from '@material-ui/core';
import * as Actions from 'app/store/actions';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
const NavbarMobileLayout2 = loadable(() => import('app/fuse-layouts/layout2/components/NavbarMobileLayout2'))
const NavbarMobileToggleFab = loadable(() => import('app/fuse-layouts/shared-components/NavbarMobileToggleFab'))
const NavbarLayout2 = loadable(() => import('./NavbarLayout2'))

const navbarWidth = 280;

const useStyles = makeStyles(theme => ({
	navbar: {
		display: 'flex',
		overflow: 'hidden',
		height: 64,
		minHeight: 64,
		alignItems: 'center',
		boxShadow: theme.shadows[3],
		zIndex: 6
	},
	navbarMobile: {
		display: 'flex',
		overflow: 'hidden',
		flexDirection: 'column',
		width: navbarWidth,
		minWidth: navbarWidth,
		height: '100%',
		zIndex: 4,
		transition: theme.transitions.create(['width', 'min-width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.shorter
		}),
		boxShadow: theme.shadows[3]
	}
}));

function NavbarWrapperLayout2(props) {
	const dispatch = useDispatch();
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const navbarTheme = useSelector(({ fuse }) => fuse.settings.navbarTheme);
	const navbar = useSelector(({ fuse }) => fuse.navbar);

	const classes = useStyles(props);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<Hidden mdDown>
					<Paper className={classes.navbar} square>
						<NavbarLayout2 />
					</Paper>
				</Hidden>

				<Hidden lgUp>
					<Drawer
						anchor="left"
						variant="temporary"
						open={navbar.mobileOpen}
						classes={{
							paper: classes.navbarMobile
						}}
						onClose={ev => dispatch(Actions.navbarCloseMobile())}
						ModalProps={{
							keepMounted: true // Better open performance on mobile.
						}}
					>
						<NavbarMobileLayout2 />
					</Drawer>
				</Hidden>
			</ThemeProvider>

			{config.navbar.display && !config.toolbar.display && (
				<Hidden lgUp>
					<NavbarMobileToggleFab />
				</Hidden>
			)}
		</>
	);
}

export default React.memo(NavbarWrapperLayout2);
