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
export const USER_EDIT_COMPANY = cid => `/api/frontend/profile/company/${cid}/edit/`;
export const APPROVE_LIST = '/api/frontend/profile/profile/approve_list/?no_page=no_page';
export const REQUEST_LIST = '/api/frontend/profile/profile/request_list/';
export const RESET_PASSWORD = '/api/frontend/user/password/reset/confirm/';
export const FORGOT_PASSWORD = '/api/frontend/user/password/reset/';
export const REFRESH_TOKEN = id => `/api/frontend/user/token/refresh/${id}/`;
export const ADD_NEW_MEMBER = '/api/frontend/profile/company/profile_add/';
export const ADD_EXISTING_MEMBER = uid => `/api/frontend/profile/company/invite/profile_add/${uid}/`;

export const GET_STAFF_LIST = '/api/frontend/profile/company/approve/staff_list/?no_page=no_page';
export const GET_DISABLED_STAFF_LIST = 'api/frontend/profile/company/approve/staff_list/disabled/?no_page=no_page';
export const GET_WAITING_STAFF_LIST = '/api/frontend/profile/company/waiting/staff_list/?no_page=no_page';
export const GET_REFUSED_STAFF_LIST = '/api/frontend/profile/company/refuse/staff_list/?no_page=no_page';
export const UPDATE_MEMBER = id => `/api/frontend/profile/company/profile_edit/${id}/`;
export const DEACTIVATE_MEMBER = id => `/api/frontend/profile/company/profile_disable/${id}/`;
export const ACTIVATE_MEMBER = id => `/api/frontend/profile/company/profile_enable/${id}/`;

export const GET_MESSAGES_API = '/api/frontend/profile/company/message_list/all/?no_page=no_page';
export const GET_PROJECT_MESSAGES_API = pid => `/api/frontend/project/project/${pid}/message_list/?no_page=no_page`;
export const READ_ALL_MESSAGES = tid => `/api/frontend/message/talk/${tid}/read_all/`;
export const SEND_MESSAGE_API = cid => `/api/frontend/message/message/company/${cid}/add/`;
export const DELETE_MESSAGE = mid => `/api/frontend/message/message/delete/${mid}/`;
export const SEND_PROJECT_MESSAGE_API = pid => `/api/frontend/message/message/project/${pid}/add/`;
export const COMPANY_DETAIL = '/api/frontend/profile/company/detail/';
export const ADD_PHOTO = cid => `/api/frontend/media/photo/company/${cid}/add/`;
export const ADD_PHOTO_PROJECT = pid => `/api/frontend/media/photo/project/${pid}/add/`;
export const ADD_VIDEO = cid => `/api/frontend/media/video/company/${cid}/add/`;
export const ADD_VIDEO_PROJECT = pid => `/api/frontend/media/video/project/${pid}/add/`;
export const ADD_DOCUMENT = cid => `/api/frontend/document/document/company/${cid}/add/`;
export const ADD_DOCUMENT_PROJECT = pid => `/api/frontend/document/document/project/${pid}/add/`;
export const ADD_FOLDER = cid => `/api/frontend/media/folder/company/${cid}/add/`;
export const ADD_FOLDER_PROJECT = pid => `/api/frontend/media/folder/project/${pid}/add/`;
export const PHOTO_LIST = cid =>
	`/api/frontend/profile/company/company_photo_list/private/?companyId=${cid}&filter__folder__isnull=true&no_page=no_page`;
export const PHOTO_LIST_PROJECT = pid =>
	`/api/frontend/project/project/${pid}/photo_list/?filter__folder__isnull=true&no_page=no_page`;
export const DOCUMENT_LIST = cid =>
	`/api/frontend/profile/company/company_document_list/private/?companyId=${cid}&filter__folder__isnull=true&no_page=no_page`;
export const DOCUMENT_LIST_PROJECT = pid =>
	`/api/frontend/project/project/${pid}/document_list/?filter__folder__isnull=true&no_page=no_page`;
export const VIDEO_LIST = cid =>
	`/api/frontend/profile/company/company_video_list/private/?companyId=${cid}&filter__folder__isnull=true&no_page=no_page`;
export const VIDEO_LIST_PROJECT = pid =>
	`/api/frontend/project/project/${pid}/video_list/?filter__folder__isnull=true&no_page=no_page`;
export const FOLDER_STRUCTURE_LIST = cid => `/api/frontend/media/folder/company/${cid}/structure_list/?no_page=no_page`;
export const GET_FOLDERS_DETAIL = fid => `/api/frontend/media/folder/${fid}/detail/`;
export const FOLDER_LIST = cid => `/api/frontend/media/folder/company/${cid}/list/?no_page=no_page`;
export const FOLDER_LIST_PROJECT = pid => `/api/frontend/media/folder/project/${pid}/list/?no_page=no_page`;
export const FOLDER_STRUCTURE_LIST_PROJECT = pid =>
	`/api/frontend/media/folder/project/${pid}/structure_list/?no_page=no_page`;
export const DOWNLOAD_PHOTO = did => `/api/frontend/media/photo/download/${did}/`;
export const DOWNLOAD_VIDEO = did => `/api/frontend/media/video/download/${did}/`;
export const DOWNLOAD_DOCUMENT = did => `/api/frontend/document/document/download/${did}/`;

export const PHOTO_DELETE = pid => `/api/frontend/media/photo/delete/${pid}/`;
export const VIDEO_DELETE = vid => `/api/frontend/media/video/delete/${vid}/ `;
export const DOCUMENT_DELETE = did => `/api/frontend/document/document/delete/${did}/ `;
export const FOLDER_DELETE = fid => `/api/frontend/media/folder/${fid}/delete/`; // `/api/frontend/media/folder/company/${cid}/delete/?name=${path}`;
export const FOLDER_EDIT = fid => `/api/frontend/media/folder/${fid}/edit/`;
export const PHOTO_EDIT = photoId => `/api/frontend/media/photo/edit/${photoId}/`;
export const VIDEO_EDIT = videoId => `/api/frontend/media/video/edit/${videoId}/`;
export const DOCUMENT_EDIT = documentId => `/api/frontend/document/document/edit/${documentId}/`;
export const FOLDER_DELETE_PROJECT = (pid, path) => `/api/frontend/media/folder/project/${pid}/delete/?name=${path}`;
export const SEARCH_USER = searchString =>
	`/api/frontend/profile/profiles/active_list/?filter__first_name__icontains=${searchString}&filter__last_name__icontains=${searchString}&filter__company__name__icontains=${searchString}&filter__email__exact=${searchString}&no_page=no_page`;
export const SEARCH_USER_BY_EMAIL = searchString =>
	`/api/frontend/profile/profiles/active_list/?filter__email__exact=${searchString}&no_page=no_page`;

export const ACCEPT_INVITATION = (uidb36, token) => `/api/frontend/profile/profile/accept_invite/${uidb36}-${token}/`;
export const REFUSE_INVITATION = (uidb36, token) => `/api/frontend/profile/profile/refuse_invite/${uidb36}-${token}/`;

export const GET_MAIN_PROFILE = id => `/api/frontend/profile/profile/${id}/`;

export const GET_COMPANY_PROFILE = id => `/api/frontend/profile/company/profile_detail/${id}/`;
export const SEARCH_PROJECT_CORDINATOR = searchString =>
	`/api/frontend/profile/company/approve/staff_list_and_external/?filter__first_name__icontains=${searchString}&filter__last_name__icontains=${searchString}&filter__company__name__icontains=${searchString}&filter__email__exact=${searchString}&no_page=no_page`;
export const DELETE_PROJECT = pid => `api/frontend/project/project/delete/${pid}/`;
export const ADD_PROJECT = `/api/frontend/project/project/add/`;
export const PROJECT_LIST = `/api/frontend/profile/company/project_list/?no_page=no_page`;
export const PROJECT_INVIATION_LIST = `/api/frontend/project/team/inviation_list/`;
export const PROJECT_DETAIL = id => `/api/frontend/project/project/${id}/`;
export const DISABLE_PROJECT = id => `/api/frontend/project/project/disable/${id}/`;
export const ENABLE_PROJECT = id => `/api/frontend/project/project/enable/${id}/`;
export const EDIT_PROJECT_DETAIL = id => `/api/frontend/project/project/edit/${id}/`;
export const STAFF_LIST = (searchString, project_id) =>
	`/api/frontend/profile/company/approve/staff_list_and_external/?filter__first_name__icontains=${searchString}&filter__last_name__icontains=${searchString}&filter__company__name__icontains=${searchString}&filter__email__exact=${searchString}&project_id=${project_id}&per_page=12`;

export const COMPANY_STAFF_LIST = (searchString, project_id) =>
	`/api/frontend/profile/company/approve/staff_list_and_external/?filter__company__name__icontains=${searchString}&project_id=${project_id}&no_page=no_page`;
export const ADD_TEAM_MEMBER_TO_PROJECT = (pid, is_external) =>
	`/api/frontend/project/project/${pid}/team_add/?is_external=${is_external}`;
export const GET_PROJECT_STAFF_LIST = pid => `/api/frontend/project/project/${pid}/approve/team_list/?no_page=no_page`;
export const GET_PROJECT_STAFF_WAITING_LIST = pid =>
	`/api/frontend/project/project/${pid}/waiting/team_list/?no_page=no_page`;
export const GET_PROJECT_STAFF_REFUSE_LIST = pid =>
	`/api/frontend/project/project/${pid}/refuse/team_list/?no_page=no_page`;
export const ACCEPT_PROJECT_INVITATION = pid => `/api/frontend/project/team/enable/${pid}/`;
export const REJECT_PROJECT_INVITATION = pid => `/api/frontend/project/team/disable/${pid}/`;
export const DELETE_MEMBER_FROM_PROJECT = mid => `/api/frontend/project/team/delete/${mid}/`;
export const CHAT_LIST = `/api/frontend/profile/company/talk_list/`;
export const ADD_TASK_TO_PROJECT = pid => `/api/frontend/project/project/${pid}/task_add/`;
export const GET_TASK_LIST = pid => `/api/frontend/project/project/${pid}/task_list/?no_page=no_page`;
export const ADD_ACTIVITY_TO_TASK = tid => `/api/frontend/project/task/${tid}/activity_add/`;
export const EDIT_ACTIVITY_TO_TASK = aid => `/api/frontend/project/activity/edit/${aid}/`;
export const GET_COMPANY_PROJECT_TEAM_MEMBER_LIST = (pid, cid, searchString) =>
	`/api/frontend/project/project/${pid}/approve/team_list/?filter__profile__company__id=${cid}&no_page=no_page`;
export const GET_ACTIVITY_OF_TASK = tid => `/api/frontend/project/task/${tid}/activity_list/?no_page=no_page`;
export const ADD_POST_TO_ACTIVITY = aid => `/api/frontend/project/activity/${aid}/add_post/`;
export const ADD_POST_TO_TASK = tid => `/api/frontend/project/task/${tid}/add_post/`;
export const GET_POST_TO_ACTIVITY = aid => `/api/frontend/project/activity/${aid}/post_list/`;
export const GET_POST_FOR_TASK = tid => `/api/frontend/project/task/${tid}/post_list/`;
export const DELETE_POST = pid => `/api/frontend/project/post/delete/${pid}/`;
export const DELETE_COMMENT = cid => `/api/frontend/project/comment/delete/${cid}/`;
export const EDIT_COMMENT = cid => `/api/frontend/project/comment/${cid}/edit/`;
export const ADD_COMMENT_TO_POST = pid => `/api/frontend/project/post/${pid}/add_comment/`;
export const GET_COMMENT_OF_POST = pid => `/api/frontend/project/post/${pid}/comment_list/`;
export const GET_REPLIES_OF_COMMENT = cid => `/api/frontend/project/comment/${cid}/replies_list/`;
export const MOVE_PHOTO_FILE = pid => `/api/frontend/media/photo/${pid}/move/`;
export const MOVE_VIDEO_FILE = vid => `/api/frontend/media/video/${vid}/move/`;
export const MOVE_DOCUMENT_FILE = did => `/api/frontend/media/document/${did}/move/`;
export const EDIT_PROFILE = pid => `/api/frontend/profile/profile/edit/${pid}/`;
export const EDIT_TASK_TO_PROJECT = tid => `/api/frontend/project/task/edit/${tid}/`;
export const ALERTED_POSTS_TASKS = `/api/frontend/project/task/post_list_alert/?no_page=no_page`;
export const ALERTED_POSTS_ACTIVITY = `/api/frontend/project/activity/post_list_alert/?no_page=no_page`;
export const SHARE_ACTIVITY_POST_TO_TASK = pid => `/api/frontend/project/post/${pid}/share_to_task/`;
export const GET_SHARED_POSTS_FOR_TASKS = tid => `/api/frontend/project/task/${tid}/shared_posts/`;
export const ADD_ATTCHMENTS_TO_TASK = tid => `/api/frontend/project/task/${tid}/attachment_add/`;
export const EDIT_POST = pid => `/api/frontend/project/post/${pid}/edit/`;
export const GET_GANTT_TASK_LIST = pid => `/api/frontend/project/gantt/project/${pid}/task_list/?no_page=no_page`;
export const GET_ALL_PROJECT_TASKS = `/api/frontend/dashboard/projects/?no_page=no_page`;
export const EXPORT_DATA = pid => `/api/frontend/project/project/${pid}/export/?type=zip`; // api/frontend/project/project/id/export/?type=zip
export const GET_ALL_NOTIFICATIONS = (list, page) =>
	`/api/frontend/notify/notification/recipient/${list}/?page=${page}`;
export const GET_ALL_PAGES_NOTIFICATIONS = list =>
	`/api/frontend/notify/notification/recipient/${list}/?no_page=no_page`;
export const GET_TASK_BY_ID = tid => `/api/frontend/project/task/${tid}`;
export const GET_ACTIVITY_BY_ID = aid => `/api/frontend/project/activity/${aid}`;
export const GET_SETTINGS_PREFERENCES = `/api/frontend/profile/preference/detail/`;
export const UPDATE_SETTINGS_PREFERENCES = `/api/frontend/profile/preference/edit/`;
export const READ_NOTIFICATION = nid => `/api/frontend/notify/notification/read/${nid}/`;
export const READ_ALL_NOTIFICATION = `/api/frontend/notify/notification/read/all/`;
export const GET_NOTIFICATION_COUNT = `/api/frontend/notify/notification/recipient/count/`;
export const DELETE_NOTIFICATION_BY_ID = nid => `/api/frontend/notify/notification/delete/${nid}/`;
export const API_GOOGLE_AUTH_LOGIN = '/api/auth/socials/google/login/';
export const API_FACEBOOK_AUTH_LOGIN = '/api/auth/socials/facebook/login/';
export const API_GOOGLE_AUTH_REGISTER = '/api/auth/socials/google/register/';
export const API_FACEBOOK_AUTH_REGISTER = '/api/auth/socials/facebook/register/';

export const API_APPLE_AUTH_LOGIN = '/api/auth/socials/facebook/login/';
export const API_APPLE_AUTH_REGISTER = '/api/auth/socials/google/register/';
