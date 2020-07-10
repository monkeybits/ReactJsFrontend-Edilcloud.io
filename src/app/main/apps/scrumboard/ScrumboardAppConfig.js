import React from 'react';
import { Redirect } from 'react-router-dom';

const ScrumboardAppConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: true
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
	routes: [
		{
			path: '/apps/companies/:boardId/:boardUri?',
			component: React.lazy(() => import('./board/Board'))
		},
		{
			path: '/apps/companies',
			component: React.lazy(() => import('./boards/Boards'))
		},
		{
			path: '/apps/companies',
			component: () => <Redirect to="/apps/scrumboard/boards" />
		}
	]
};

export default ScrumboardAppConfig;
