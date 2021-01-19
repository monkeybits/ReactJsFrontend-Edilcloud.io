import React from 'react';
import { authRoles } from 'app/auth';
import en from './i18n/en';
import it from './i18n/it';
import i18next from 'i18next';

i18next.addResourceBundle('en', 'login', en);
i18next.addResourceBundle('it', 'login', it);
const LoginPageConfig = {
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
			path: '/pages/auth/login',
			component: React.lazy(() => import('./LoginPage'))
		}
	]
};

export default LoginPageConfig;
