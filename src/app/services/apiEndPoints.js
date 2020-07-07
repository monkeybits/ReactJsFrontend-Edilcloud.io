/**
 * All the api enpoints will define here.
 */
export const USER_LOGIN = '/api/frontend/user/login/';
export const USER_TOKEN_VERIFY = '/api/frontend/user/token/verify/';
export const USER_REGISTRATION = '/api/frontend/user/registration/';
export const USER_ACTIVATION = (uidb64, token) => `/api/frontend/user/activate/registration/${uidb64}/${token}/`;
export const USER_MAIN_PROFILE = '/api/frontend/profile/profile/add/';
export const TYPOLOGY_LIST = '/api/frontend/product/typology/?no_page=no_page&order_by__name=name';
export const TYPOLOGY_LIST_BY_CODE = typelogyCode =>
	`/api/frontend/product/typology/${typelogyCode}/category_list/?no_page=no_page&order_by__name=name`;
export const USER_ADD_COMPANY = '/api/frontend/profile/company/add/';
export const APPROVE_LIST = '/api/frontend/profile/profile/approve_list/';
export const RESET_PASSWORD = '/api/frontend/user/password/reset/confirm/';
export const FORGOT_PASSWORD = '/api/frontend/user/password/reset/';
