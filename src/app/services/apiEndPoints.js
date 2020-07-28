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
export const REQUEST_LIST = '/api/frontend/profile/profile/request_list/';
export const RESET_PASSWORD = '/api/frontend/user/password/reset/confirm/';
export const FORGOT_PASSWORD = '/api/frontend/user/password/reset/';
export const REFRESH_TOKEN = id => `/api/frontend/user/token/refresh/${id}/`;
export const ADD_NEW_MEMBER = '/api/frontend/profile/company/profile_add/';
export const ADD_EXISTING_MEMBER = uid => `/api/frontend/profile/company/invite/profile_add/${uid}/`;

export const GET_STAFF_LIST = '/api/frontend/profile/company/approve/staff_list/?per_page=12';
export const GET_DISABLED_STAFF_LIST = 'api/frontend/profile/company/approve/staff_list/disabled/?per_page=12';
export const GET_WAITING_STAFF_LIST = '/api/frontend/profile/company/waiting/staff_list/?per_page=12';
export const GET_REFUSED_STAFF_LIST = '/api/frontend/profile/company/refuse/staff_list/?per_page=12';
export const UPDATE_MEMBER = id => `/api/frontend/profile/company/profile_edit/${id}/`;
export const DEACTIVATE_MEMBER = id => `/api/frontend/profile/company/profile_disable/${id}/`;
export const ACTIVATE_MEMBER = id => `/api/frontend/profile/company/profile_enable/${id}/`;

export const GET_MESSAGES_API = '/api/frontend/profile/company/message_list/all/?no_page=no_page';
export const SEND_MESSAGE_API = cid => `/api/frontend/message/message/company/${cid}/add/`;
export const COMPANY_DETAIL = '/api/frontend/profile/company/detail/';
export const ADD_PHOTO = cid => `/api/frontend/media/photo/company/${cid}/add/`;
export const ADD_VIDEO = cid => `/api/frontend/media/video/company/${cid}/add/`;
export const ADD_DOCUMENT = cid => `/api/frontend/document/document/company/${cid}/add/`;
export const ADD_FOLDER = cid => `/api/frontend/media/folder/company/${cid}/add/`;
export const PHOTO_LIST = cid => `/api/frontend/profile/company/company_photo_list/private/?companyId=${cid}`;
export const DOCUMENT_LIST = cid => `/api/frontend/profile/company/company_document_list/private/?companyId=${cid}`;
export const VIDEO_LIST = cid => `/api/frontend/profile/company/company_video_list/private/?companyId=${cid}`;
export const FOLDER_LIST = cid => `/api/frontend/media/folder/company/${cid}/list/`;
export const DOWNLOAD_PHOTO = did => `/api/frontend/media/photo/download/${did}`;
export const DOWNLOAD_VIDEO = did => `/api/frontend/media/video/download/${did}`;
export const DOWNLOAD_DOCUMENT = did => `/api/frontend/document/document/download/${did}`;

export const PHOTO_DELETE = pid => `/api/frontend/media/photo/delete/${pid}/`;
export const VIDEO_DELETE = vid => `/api/frontend/media/video/delete/${vid}/ `;
export const DOCUMENT_DELETE = did => `/api/frontend/document/document/delete/${did}/ `;
export const FOLDER_DELETE = (cid, path) => `/api/frontend/media/folder/company/${cid}/delete/?name=${path}`;
export const SEARCH_USER = searchString =>
	`/api/frontend/profile/profiles/active_list/?filter__first_name__icontains=${searchString}&filter__last_name__icontains=${searchString}&filter__company__name__icontains=${searchString}&filter__email__exact=${searchString}&no_page=no_page`;
export const SEARCH_USER_BY_EMAIL = searchString =>
	`/api/frontend/profile/profiles/active_list/?filter__email__exact=${searchString}&no_page=no_page`;

export const ACCEPT_INVITATION = (uidb36, token) => `/api/frontend/profile/profile/accept_invite/${uidb36}-${token}/`;
export const REFUSE_INVITATION = (uidb36, token) => `/api/frontend/profile/profile/refuse_invite/${uidb36}-${token}/`;

export const GET_MAIN_PROFILE = id => `/api/frontend/profile/profile/${id}`;

export const GET_COMPANY_PROFILE = id => `/api/frontend/profile/company/profile_detail/${id}`