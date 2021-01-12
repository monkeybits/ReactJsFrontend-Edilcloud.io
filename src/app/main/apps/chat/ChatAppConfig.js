import React from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'chat', en);
i18next.addResourceBundle('it', 'chat', it);
const ChatAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/chat',
			component: React.lazy(() => import('./ChatApp'))
		}
	]
};

export default ChatAppConfig;
