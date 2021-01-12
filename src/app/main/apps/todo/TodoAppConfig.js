import i18next from 'i18next';
import React from 'react';
import { Redirect } from 'react-router-dom';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'dashboard', en);
i18next.addResourceBundle('it', 'dashboard', it);
const TodoAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: [
				'/apps/todo/label/:labelHandle/:todoId?',
				'/apps/todo/filter/:filterHandle/:todoId?',
				'/apps/todo/:folderHandle/:todoId?'
			],
			component: React.lazy(() => import('./TodoApp'))
		},
		{
			path: '/apps/todo',
			component: () => <Redirect to="/apps/todo/all" />
		}
	]
};

export default TodoAppConfig;
