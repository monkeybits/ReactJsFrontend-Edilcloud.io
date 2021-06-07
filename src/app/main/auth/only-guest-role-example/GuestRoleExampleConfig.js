import { authRoles } from 'app/auth';
import loadable from '@loadable/component';
const GuestRoleExample = loadable(() => import('./GuestRoleExample'));

const GuestRoleExampleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.onlyGuest, // ['guest']
	routes: [
		{
			path: '/auth/guest-role-example',
			component: GuestRoleExample
		}
	]
};

export default GuestRoleExampleConfig;
