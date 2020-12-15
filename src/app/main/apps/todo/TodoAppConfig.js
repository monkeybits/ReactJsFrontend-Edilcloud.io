import React from 'react';
import { Redirect } from 'react-router-dom';

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
			component: React.lazy(() => import('app/paymentGateway'))
		},
		{
			path: '/apps/todo',
			component: () => <Redirect to="/apps/todo/all" />
		}
	]
};

export default TodoAppConfig;
