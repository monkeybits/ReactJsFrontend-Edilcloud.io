import React from 'react';

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
