import React from 'react';
// import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

const PoweredByLinks = React.lazy(() => import('app/fuse-layouts/shared-components/PoweredByLinks'));
const PurchaseButton = React.lazy(() => import('app/fuse-layouts/shared-components/PurchaseButton'));

function FooterLayout3(props) {
	const footerTheme = useSelector(({ fuse }) => fuse.settings.footerTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className="relative z-10"
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.default }}
			>
				<Toolbar className="flex items-center container py-0 px-16 lg:px-24">
					<div className="flex flex-1">
						<PurchaseButton />
					</div>

					<div>{/* <PoweredByLinks /> */}</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(FooterLayout3);
