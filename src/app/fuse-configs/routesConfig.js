import FuseUtils from '@fuse/utils';
import appsConfigs from 'app/main/apps/appsConfigs';
import authRoleExamplesConfigs from 'app/main/auth/authRoleExamplesConfigs';
import CallbackConfig from 'app/main/callback/CallbackConfig';
import DocumentationConfig from 'app/main/documentation/DocumentationConfig';
import LoginConfig from 'app/main/login/LoginConfig';
import AccountActivationConfig from 'app/main/accountActivation/AccountActivationConfig';
import LogoutConfig from 'app/main/logout/LogoutConfig';
import pagesConfigs from 'app/main/pages/pagesConfigs';
import RegisterConfig from 'app/main/register/RegisterConfig';
import UserInterfaceConfig from 'app/main/user-interface/UserInterfaceConfig';
import MainProfileConfig from 'app/main/mainProfile/MainProfileConfig';
import CompanyCreationConfig from 'app/main/companyCreation/CompanyCreationConfig';
import EditProfileConfig from 'app/main/editMainProfile/EditProfileConfig.js'; 

import React from 'react';
import { Redirect } from 'react-router-dom';

const routeConfigs = [
	...appsConfigs,
	...pagesConfigs,
	...authRoleExamplesConfigs,
	UserInterfaceConfig,
	DocumentationConfig,
	LogoutConfig,
	LoginConfig,
	RegisterConfig,
	LogoutConfig,
	CallbackConfig,
	AccountActivationConfig,
	MainProfileConfig,
	CompanyCreationConfig,
	EditProfileConfig
];

const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to="/apps/todo/all" />
	},
	{
		path: '/index.html',
		exact: true,
		component: () => <Redirect to="/apps/todo/all" />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" />
	}
];

export default routes;
