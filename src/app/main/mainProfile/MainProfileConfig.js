import React from 'react';

import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'mainProfile', en);
i18next.addResourceBundle('it', 'mainProfile', it);
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
