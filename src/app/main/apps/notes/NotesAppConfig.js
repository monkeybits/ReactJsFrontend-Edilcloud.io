import React from 'react';
import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';
import chat_en from './chat/i18n/en';
import chat_it from './chat/i18n/it';
import contacts_en from './contacts/i18n/en';
import contacts_it from './contacts/i18n/it';
import filemanaer_en from './file-manager/i18n/en';
import filemanaer_it from './file-manager/i18n/it';
import gantt_en from './gantt/i18n/en';
import gantt_it from './gantt/i18n/it';
import todo_en from './todo/i18n/en';
import todo_it from './todo/i18n/it';
i18next.addResourceBundle('en', 'projects', en);
i18next.addResourceBundle('it', 'projects', it);
i18next.addResourceBundle('en', 'todo_project', todo_en);
i18next.addResourceBundle('it', 'todo_project', todo_it);
i18next.addResourceBundle('en', 'gantt_project', gantt_en);
i18next.addResourceBundle('it', 'gantt_project', gantt_it);
i18next.addResourceBundle('en', 'filemanaer_project', filemanaer_en);
i18next.addResourceBundle('it', 'filemanaer_project', filemanaer_it);
i18next.addResourceBundle('en', 'chat_projects', chat_en);
i18next.addResourceBundle('it', 'chat_projects', chat_it);
i18next.addResourceBundle('en', 'contacts_project', contacts_en);
i18next.addResourceBundle('it', 'contacts_project', contacts_it);
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
		},
		{
			exact: true,
			path: '/apps/projects/:id/:tab/:dataId', // /apps/projects/2/task/10
			component: React.lazy(() => import('./ProjectDetail/ProjectDetailsApp'))
		},

		{
			exact: true,
			path: '/apps/projects/:id/:tab/:dataId/post/:pid', // /apps/projects/2/task/10/post/5
			component: React.lazy(() => import('./ProjectDetail/ProjectDetailsApp'))
		},
		{
			exact: true,
			path: '/apps/projects/:id/:tab/:dataId/post/:cid_pid/comment/:cid', // /apps/projects/2/task/10/post/5/comment/1
			component: React.lazy(() => import('./ProjectDetail/ProjectDetailsApp'))
		},
		{
			exact: true,
			path: '/apps/projects/:id/:tab/:dataId/activity/:aid', // /apps/projects/2/task/10/activity/1
			component: React.lazy(() => import('./ProjectDetail/ProjectDetailsApp'))
		},
		{
			exact: true,
			path: '/apps/projects/:id/:tab/:dataId/activity/:aid/post/:pid', // /apps/projects/2/task/10/activity/1/post/10
			component: React.lazy(() => import('./ProjectDetail/ProjectDetailsApp'))
		},
		{
			exact: true,
			path: '/apps/projects/:id/:tab/:dataId/activity/:aid/post/:cid_pid/comment/:cid', // /apps/projects/2/task/10/activity/1/post/5/comment/1
			component: React.lazy(() => import('./ProjectDetail/ProjectDetailsApp'))
		}
	]
};

export default NotesAppConfig;
// task/10/post/5/comment/1
