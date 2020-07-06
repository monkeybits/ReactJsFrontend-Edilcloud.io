import React from 'react';

const CompanyCreationConfig = {
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
			path: '/create-company',
			component: React.lazy(() => import('./CompanyCreationStepper'))
		}
	]
};

export default CompanyCreationConfig;
