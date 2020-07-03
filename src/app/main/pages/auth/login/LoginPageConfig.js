import React from 'react';
import { authRoles } from 'app/auth';

const LoginPageConfig = {
	settings: {
		layout: {
			config: {}
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
