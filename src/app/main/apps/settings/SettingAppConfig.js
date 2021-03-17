import React from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'setting_app', en);
i18next.addResourceBundle('it', 'setting_app', it);

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
			path: ['/apps/billing'],
			component: React.lazy(() => import('./BillingSetting'))
		},
		{
			path: ['/apps/storage'],
			component: React.lazy(() => import('./UserStorage'))
		}
	]
};

export default TodoAppConfig;
