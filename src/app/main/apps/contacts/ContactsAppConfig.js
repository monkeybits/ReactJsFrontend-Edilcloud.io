/* =============================================================================
 ContactsApp.js
 ===============================================================================
*This file is created for ContactsApp
TODO: we are setting company team routes here
*/
import React from 'react';
import { Redirect } from 'react-router-dom';
import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'contacts', en);
i18next.addResourceBundle('it', 'contacts', it);
const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/contacts/:id',
			component: React.lazy(() => import('./ContactsApp'))
		},
		{
			path: '/apps/contacts',
			component: () => <Redirect to="/apps/contacts/all" />
		}
	]
};

export default ContactsAppConfig;
