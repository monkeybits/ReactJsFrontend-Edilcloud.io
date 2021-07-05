import React from 'react';

import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'billing', en);
i18next.addResourceBundle('it', 'billing', it);
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
			path: '/billing',
			component: React.lazy(() => import('./Billing'))
		}
	]
};

export default CompanyCreationConfig;
