import { authRoles } from 'app/auth';
import loadable from '@loadable/component';
const AdminRoleExample = loadable(() => import('./AdminRoleExample'));

const AdminRoleExampleConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.admin, // ['admin']
	routes: [
		{
			path: '/auth/admin-role-example',
			component: AdminRoleExample
		}
	]
};

export default AdminRoleExampleConfig;
