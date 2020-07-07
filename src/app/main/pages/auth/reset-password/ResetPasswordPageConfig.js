import React from 'react';
import { authRoles } from 'app/auth';

const ResetPasswordPageConfig = {
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
			// /reset-password-confirm/MzM/5hz-6c80d01067b54cc80d9f/
			path: '/reset-password-confirm/:uid/:token',
			component: React.lazy(() => import('./ResetPasswordPage'))
		}
	]
};

export default ResetPasswordPageConfig;
