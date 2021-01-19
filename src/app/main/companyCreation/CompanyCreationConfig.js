import React from 'react';

import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'company_create', en);
i18next.addResourceBundle('it', 'company_create', it);
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
		},
		{
			path: '/edit-company',
			component: React.lazy(() => import('./CompanyCreationStepper'))
		}
	]
};

export default CompanyCreationConfig;
