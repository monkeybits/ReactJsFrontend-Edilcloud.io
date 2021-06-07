import { authRoles } from 'app/auth';
import loadable from '@loadable/component';
const StaffRoleExample = loadable(() => import('./StaffRoleExample'));

const StaffRoleExampleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.staff, // ['admin','staff']
	routes: [
		{
			path: '/auth/staff-role-example',
			component: StaffRoleExample
		}
	]
};

export default StaffRoleExampleConfig;
