import React from 'react';

import i18next from 'i18next';
import en from './i18n/en';
import it from './i18n/it';

i18next.addResourceBundle('en', 'edit_mainProfile', en);
i18next.addResourceBundle('it', 'edit_mainProfile', it);
const EditProfileConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
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
			path: '/edit-profile',
			component: React.lazy(() => import('./EditProfileStepper'))
		}
	]
};

export default EditProfileConfig;
