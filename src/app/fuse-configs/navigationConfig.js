import { authRoles } from 'app/auth';
import MaterialUIComponentsNavigation from 'app/main/documentation/material-ui-components/MaterialUIComponentsNavigation';
import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'DASHBOARD',
		title: 'DASHBOARD',
		translate: 'DASHBOARD',
		type: 'group',
		children: [
			{
				id: '',
				title: 'Dashboard',
				translate: 'Dashboard',
				type: 'item',
				icon: 'dashboard',
				url: '/apps/todo/all',
				
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
				translate: 'Projects List',
				type: 'item',
				icon: 'work_outline',
				url: '/apps/projects',
				
			},
			
		]
	},	
	{
		id: 'MY COMPANY',
		title: 'MY COMPANY',
		translate: 'MY COMPANY',
		type: 'group',
		children: [
			{
				id: '',
				title: 'Company Team',
				translate: 'Company Team',
				type: 'item',
				icon: 'people_outline',
				url: '/apps/contacts/all',
				
			},
			{
				id: '',
				title: 'Company File-Manager',
				translate: 'Company File-Manager',
				type: 'item',
				icon: 'folder_shared',
				url: '/apps/file-manager',
				
			},
			{
				id: '',
				title: 'Company Chat',
				translate: 'Company Chat',
				type: 'item',
				icon: 'chat',
				url: '/apps/chat',
				
			},
		]
	},		
	{
		id: 'HOW TO USE',
		title: 'HOW TO USE?',
		translate: 'HOW TO USE?',
		type: 'group',
		children: [
			{
				id: '',
				title: 'Edilcloud Academy',
				translate: 'Edilcloud Academy',
				type: 'item',
				icon: 'class',
				url: '/apps/academy/courses',
				
			},
			{
				id: '',
				title: 'Help Center',
				translate: 'Help Center',
				type: 'item',
				icon: 'help_center',
				url: 'https://edilcloud.io/helpcenter/',
				
			},
			
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
				translate: 'General Settings',
				type: 'item',
				icon: 'settings',
				url: '/apps/settings',
				
			},
		
			
		]
	},
	{
		id: 'NOTIFICATIONS',
		title: 'NOTIFICATIONS',
		translate: 'NOTIFICATIONS',
		type: 'group',
		children: [
			{
				id: '',
				title: 'Notifications',
				translate: 'Notifications',
				type: 'item',
				icon: 'notifications_active',
				url: 'mazz',
				
			},
		
			
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
				translate: 'Logout',
				type: 'item',
				icon: 'exit_to_app',
				url: 'mizz',
				
			},
		
			
		]
	},
];

export default navigationConfig;
