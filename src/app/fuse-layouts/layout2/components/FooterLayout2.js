import React from 'react';
import loadable from '@loadable/component';
import { AppBar, Toolbar } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const PoweredByLinks = loadable(() => import('app/fuse-layouts/shared-components/PoweredByLinks'));
const PurchaseButton = loadable(() => import('app/fuse-layouts/shared-components/PurchaseButton'));

function FooterLayout2(props) {
	const footerTheme = useSelector(({ fuse }) => fuse.settings.footerTheme);

	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className="relative z-10"
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.default }}
			>
				<Toolbar className="px-16 py-0 flex items-center">
					<div className="flex flex-1">
						<PurchaseButton />
					</div>

					<div>{/* <PoweredByLinks /> */}</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default React.memo(FooterLayout2);
