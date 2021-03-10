import React from 'react';

const TodoAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: ['/apps/settings'],
			component: React.lazy(() => import('./UserSettings'))
		},
		{
			path: ['/apps/storage'],
			component: React.lazy(() => import('./UserStorage'))
		}
	]
};

export default TodoAppConfig;
