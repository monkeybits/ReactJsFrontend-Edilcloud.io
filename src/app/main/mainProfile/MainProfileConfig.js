import React from 'react';

const MainProfileConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	routes: [
		{
			path: '/main-profile',
			component: React.lazy(() => import('./ProfileStepper'))
		}
	]
};

export default MainProfileConfig;
