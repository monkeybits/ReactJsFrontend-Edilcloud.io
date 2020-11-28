import React from 'react';
import { authRoles } from 'app/auth';

const AccountActivationConfig = {
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
	auth: null,
	routes: [
		{
			path: '/user-account-activation/:uidb64/:token/',
			component: React.lazy(() => import('./Activation'))
		}
	]
};

export default AccountActivationConfig;
