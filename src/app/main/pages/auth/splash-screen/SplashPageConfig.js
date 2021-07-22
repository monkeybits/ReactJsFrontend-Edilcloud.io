import React from 'react';
import { authRoles } from 'app/auth';
import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'splash', en);
i18next.addResourceBundle('it', 'splash', it);
const SplashPageConfig = {
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
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/pages/auth/splash',
			component: React.lazy(() => import('./SplashPage'))
		}
	]
};

export default SplashPageConfig;
