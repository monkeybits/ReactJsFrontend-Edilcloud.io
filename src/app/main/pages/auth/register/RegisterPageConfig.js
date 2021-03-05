import React from 'react';
import { authRoles } from 'app/auth';
import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'register', en);
i18next.addResourceBundle('it', 'register', it);
const RegisterPageConfig = {
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
			path: '/pages/auth/register',
			component: React.lazy(() => import('./RegisterPage'))
		}
	]
};

export default RegisterPageConfig;
