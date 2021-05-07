import i18next from 'i18next';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/it';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('it', 'navigation', tr);

const navigationConfig = [
	{
		id: 'dashboards',
		title: 'Dashboards',
		translate: 'DASHBOARDS',
		type: 'group',
		icon: 'dashboard',
		children: [
			{
				id: '',
				title: 'Dashboard',
				translate: 'DASHBOARDS',
				type: 'item',
				icon: 'dashboard',
				url: '/apps/todo/all'
			}
		]
	},
	{
		id: 'PROJECTS',
		title: 'PROJECTS',
		translate: 'PROJECTS',
		type: 'group',
		children: [
			{
				id: '',
				title: 'Projects List',
				translate: 'PROJECTS_LIST',
				type: 'item',
				icon: 'work_outline',
				url: '/apps/projects'
			}
		]
	},
	{
		id: 'MY COMPANY',
		title: 'MY COMPANY',
		translate: 'MY_COMPANY',
		type: 'group',
		children: [
			{
				id: '',
				title: 'Company Team',
				translate: 'COMPANY_TEAM',
				type: 'item',
				icon: 'people_outline',
				url: '/apps/contacts/all'
			},
			{
				id: '',
				title: 'Company File-Manager',
				translate: 'COMPANY_FILEMANAGER',
				type: 'item',
				icon: 'folder_shared',
				url: '/apps/file-manager'
			},
			{
				id: '',
				title: 'Company Chat',
				translate: 'COMPANY_CHAT',
				type: 'item',
				icon: 'chat',
				url: '/apps/chat'
			}
		]
	},
	{
		id: 'HOW TO USE',
		title: 'HOW TO USE?',
		translate: 'HOW_TO_USE',
		type: 'group',
		children: [
			{
				id: '',
				title: 'Edilcloud Academy',
				translate: 'EDILCLOUD_ACADEMY',
				type: 'item',
				icon: 'class',
				url: '/apps/academy/courses'
			},
			{
				id: '',
				title: 'Help Center',
				translate: 'HELP_CENTER',
				type: 'item',
				icon: 'help_center',
				url: 'https://edilcloud.io/helpcenter/'
			}
		]
	},
	{
		id: 'SETTINGS',
		title: 'SETTINGS',
		translate: 'SETTINGS',
		type: 'group',
		children: [
			{
				id: '',
				title: 'General Settings',
				translate: 'GENERAL_SETTINGS',
				type: 'item',
				icon: 'settings',
				url: '/apps/settings'
			}
		]
	},
	// {
	// 	id: 'NOTIFICATIONS',
	// 	title: 'NOTIFICATIONS',
	// 	translate: 'NOTIFICATIONS',
	// 	type: 'group',
	// 	children: [
	// 		{
	// 			id: '',
	// 			title: 'Notifications',
	// 			translate: 'NOTIFICATIONS',
	// 			type: 'item',
	// 			icon: 'notifications_active',
	// 			url: 'mazz'
	// 		}
	// 	]
	// },
	{
		id: 'PLAN',
		title: 'PLAN',
		translate: 'PLAN',
		type: 'group',
		children: [
			{
				checkRole: true,
				roles: ['d', 'o'],
				id: '',
				title: 'Plan',
				translate: 'PLAN',
				type: 'item',
				icon: 'payment',
				isOutsideLink: true,
				tag: 'a',
				url: 'api/frontend/payments/customer-portal/?customer_id='
			}
		]
	},
	{
		id: 'LOGOUT',
		title: 'LOGOUT',
		translate: 'LOGOUT',
		type: 'group',
		children: [
			{
				id: '',
				title: 'Logout',
				translate: 'LOGOUT',
				type: 'item',
				icon: 'exit_to_app',
				url: '/pages/auth/login',
				isLogoutActionOnClick: true
			}
		]
	}
];

export default navigationConfig;
