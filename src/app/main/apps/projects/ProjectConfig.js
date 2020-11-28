import React from 'react';
import { Redirect } from 'react-router-dom';

const TodoAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/apps/projects/all'],
			component: React.lazy(() => import('./ProjectApp'))
		},
		{
			path: '/apps/projects',
			component: () => <Redirect to="/apps/projects/all" />
		}
	]
};

export default TodoAppConfig;
