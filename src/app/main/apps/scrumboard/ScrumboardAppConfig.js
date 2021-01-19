import React from 'react';
import { Redirect } from 'react-router-dom';

import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'companies', en);
i18next.addResourceBundle('it', 'companies', it);
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
			component: () => <Redirect to="/apps/companies" />
		}
	]
};

export default ScrumboardAppConfig;
