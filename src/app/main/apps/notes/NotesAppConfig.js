import React from 'react';

const NotesAppConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: true
				},
				toolbar: {
					display: true
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: true
				},
				rightSidePanel: {
					display: true
				}
			}
		}
	},
	routes: [
		{
			exact: true,
			path: '/apps/projects',
			component: React.lazy(() => import('./NotesApp'))
		},
		{
			exact: true,
			path: '/apps/projects/:id',
			component: React.lazy(() => import('./ProjectDetail/ProjectDetailsApp'))
		},
		{
			exact: true,
			path: '/apps/projects/:id/:tab',
			component: React.lazy(() => import('./ProjectDetail/ProjectDetailsApp'))
		}
	]
};

export default NotesAppConfig;
