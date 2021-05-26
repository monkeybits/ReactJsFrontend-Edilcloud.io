import _ from '@lodash';
import mock from '../mock';
/* eslint-disable camelcase */

const jwtConfig = {
	secret: 'some-secret-code-goes-here',
	expiresIn: '2 days' // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};

const authDB = {
	users: [
		{
			uuid: 'XgbuVEXBU5gtSKdbQRP1Zbbby1i1',
			from: 'custom-db',
			password: 'admin',
			role: 'admin',
			data: {
				displayName: 'Abbott Keitch',
				photoURL: 'assets/images/avatars/Abbott.jpg',
				email: 'admin',
				settings: {
					layout: {
						style: 'layout1',
						config: {
							scroll: 'content',
							navbar: {
								display: true,
								folded: true,
								position: 'left'
							},
							toolbar: {
								display: true,
								style: 'fixed',
								position: 'below'
							},
							footer: {
								display: true,
								style: 'fixed',
								position: 'below'
							},
							mode: 'fullwidth'
						}
					},
					customScrollbars: true,
					theme: {
						main: 'defaultDark',
						navbar: 'defaultDark',
						toolbar: 'defaultDark',
						footer: 'defaultDark'
					}
				},
				shortcuts: ['calendar', 'mail', 'contacts']
			}
		},
		{
			uuid: 'XgbuVEXBU6gtSKdbTYR1Zbbby1i3',
			from: 'custom-db',
			password: 'staff',
			role: 'staff',
			data: {
				displayName: 'Arnold Matlock',
				photoURL: 'assets/images/avatars/Arnold.jpg',
				email: 'staff',
				settings: {
					layout: {
						style: 'layout2',
						config: {
							mode: 'boxed',
							scroll: 'content',
							navbar: {
								display: true
							},
							toolbar: {
								display: true,
								position: 'below'
							},
							footer: {
								display: true,
								style: 'fixed'
							}
						}
					},
					customScrollbars: true,
					theme: {
						main: 'greeny',
						navbar: 'mainThemeDark',
						toolbar: 'mainThemeDark',
						footer: 'mainThemeDark'
					}
				},
				shortcuts: ['calendar', 'mail', 'contacts', 'todo']
			}
		}
	]
};

mock.onPost('/api/auth/user/update').reply(config => {
	const data = JSON.parse(config.data);
	const { user } = data;

	authDB.users = authDB.users.map(_user => {
		if (user.uuid === user.id) {
			return _.merge(_user, user);
		}
		return _user;
	});

	return [200, user];
});
