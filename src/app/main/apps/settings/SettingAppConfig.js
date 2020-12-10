import React from 'react';
import { Redirect } from 'react-router-dom';

const TodoAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/apps/settings'],
			component: React.lazy(() => import('./UserSettings'))
		}
	]
};

export default TodoAppConfig;
