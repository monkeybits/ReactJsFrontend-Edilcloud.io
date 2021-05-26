import React from 'react';
import loadable from '@loadable/component';
import FuseDialog from '@fuse/core/FuseDialog';
import FuseMessage from '@fuse/core/FuseMessage';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import FuseSuspense from '@fuse/core/FuseSuspense';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from 'app/AppContext';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import RightSideLayout3 from './components/RightSideLayout3';

const FooterLayout3 = loadable(() => import('./components/FooterLayout3'));
const LeftSideLayout3 = loadable(() => import('./components/LeftSideLayout3'));
const NavbarWrapperLayout3 = loadable(() => import('./components/NavbarWrapperLayout3'));
const ToolbarLayout3 = loadable(() => import('./components/ToolbarLayout3'));
const SettingsPanel = loadable(() => import('app/fuse-layouts/shared-components/SettingsPanel'));

const useStyles = makeStyles(theme => ({
	root: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		height: '100%',
		overflow: 'hidden',
		'&.boxed': {
			maxWidth: 1120,
			margin: '0 auto',
			boxShadow: theme.shadows[3]
		},
		'&.container': {
			'& .container': {
				maxWidth: 1120,
				width: '100%',
				margin: '0 auto'
			},
			'& .navigation': {}
		}
	},
	content: {
		display: 'flex',
		overflow: 'auto',
		flex: '1 1 auto',
		flexDirection: 'column',
		width: '100%',
		'-webkit-overflow-scrolling': 'touch',
		zIndex: 4
	},
	toolbarWrapper: {
		display: 'flex',
		position: 'relative',
		zIndex: 5
	},
	toolbar: {
		display: 'flex',
		flex: '1 0 auto'
	},
	footerWrapper: {
		position: 'relative',
		zIndex: 5
	},
	footer: {
		display: 'flex',
		flex: '1 0 auto'
	}
}));

function Layout3(props) {
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);

	const classes = useStyles(props);

	return (
		<AppContext.Consumer>
			{({ routes }) => (
				<div id="fuse-layout" className={clsx(classes.root, config.mode)}>
					{config.leftSidePanel.display && <LeftSideLayout3 />}

					<div className="flex flex-1 flex-col overflow-hidden relative">
						{config.toolbar.display && config.toolbar.position === 'above' && <ToolbarLayout3 />}

						{config.navbar.display && <NavbarWrapperLayout3 />}

						{config.toolbar.display && config.toolbar.position === 'below' && <ToolbarLayout3 />}

						<FuseScrollbars className={clsx(classes.content)} scrollToTopOnRouteChange>
							<FuseDialog />

							<div className="flex flex-auto flex-col relative h-full">
								<FuseSuspense>{renderRoutes(routes)}</FuseSuspense>

								{props.children}

								{config.footer.display && config.footer.style === 'static' && <FooterLayout3 />}
							</div>
						</FuseScrollbars>

						{config.footer.display && config.footer.style === 'fixed' && <FooterLayout3 />}

						<SettingsPanel />
					</div>

					{config.rightSidePanel.display && <RightSideLayout3 />}

					<FuseMessage />
				</div>
			)}
		</AppContext.Consumer>
	);
}

export default React.memo(Layout3);
