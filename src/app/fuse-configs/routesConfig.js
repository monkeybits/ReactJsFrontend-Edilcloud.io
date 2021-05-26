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
import { getMainProfileId } from 'app/services/serviceUtils';

// ! added all page routes here
//  TODO: create apps and import app routes here
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
const path = localStorage.getItem('redirect_path');
const routes = [
	// if you want to make whole app auth protected by default change defaultAuth for example:
	// ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
	// The individual route configs which has auth option won't be overridden.
	...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin', 'staff', 'user']),
	{
		path: '/',
		exact: true,
		component: () => <Redirect to={getMainProfileId() ? '/apps/todo/all' : '/apps/companies'} /> // when user have main profile it will redirect default on  /apps/todo/all  else have to redirect on /apps/companies
	}, // if user login but not selected company then company page else todo page
	{
		path: '/index.html', // * in live website it will look for index.html but we don't have such path so will redirect it to below path besaed on coditions
		exact: true,
		component: () => <Redirect to={getMainProfileId() ? '/apps/todo/all' : '/apps/companies'} />
	},
	{
		component: () => <Redirect to="/pages/errors/error-404" /> // !if any path not found it goes to 404 page
	}
];

export default routes;
