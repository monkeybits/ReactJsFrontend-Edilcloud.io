import React from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'filemanager', en);
i18next.addResourceBundle('it', 'filemanager', it);
const FileManagerAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/file-manager',
			component: React.lazy(() => import('./FileManagerApp')),
			exact: true
		}
	]
};

export default FileManagerAppConfig;
