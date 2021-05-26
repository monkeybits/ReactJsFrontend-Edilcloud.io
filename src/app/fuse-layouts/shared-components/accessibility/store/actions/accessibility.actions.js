export const TOGGLE_ACCESSIBILITY_PANEL = '[Accessibility] TOGGLE ACCESSIBILITY PANEL';
export const OPEN_ACCESSIBILITY_PANEL = '[Accessibility] OPEN ACCESSIBILITY PANEL';
export const DOWNLOAD_SMARTPHONE_APP_PANEL = '[Accessibility] DOWNLOAD SMARTPHONE APP PANEL';
export const GET_ACCESSIBILITY_PANEL_DATA = '[Accessibility] GET DATA';
export const SET_MENU_OPEN_PANEL = '[Accessibility] SET MENU OPEN PANEL';
export const IS_TEAM = '[Accessibility] IS TEAM';
export const IS_PROJECT = '[Accessibility] IS PROJECT';
export const IS_TASK = '[Accessibility] IS TASK';
export const IS_POST = '[Accessibility] IS POST';
export const IS_DOWNLOAD_APP = '[Accessibility] IS DOWNLOAD APP';
export const SET_COUNT_APP_PANEL = '[Accessibility] SET COUNT APP PANEL';

export function toggleAccessibility() {
	return {
		type: TOGGLE_ACCESSIBILITY_PANEL
	};
}

export function openAccessibility() {
	return {
		type: OPEN_ACCESSIBILITY_PANEL
	};
}

export function setOpenMenu(payload) {
	return {
		type: SET_MENU_OPEN_PANEL,
		payload
	};
}

export function setIsTeam(payload) {
	return {
		type: IS_TEAM,
		payload
	};
}

export function setIsProject(payload) {
	return {
		type: IS_PROJECT,
		payload
	};
}

export function setIsTask(payload) {
	return {
		type: IS_TASK,
		payload
	};
}

export function setIsPost(payload) {
	return {
		type: IS_POST,
		payload
	};
}

export function setIsDownloadApp(payload) {
	return {
		type: IS_DOWNLOAD_APP,
		payload
	};
}

export function downloadSmartPhoneApp() {
	return {
		type: DOWNLOAD_SMARTPHONE_APP_PANEL
	};
}

export function getAccessibilityData(payload) {
	return {
		type: GET_ACCESSIBILITY_PANEL_DATA,
		payload
	};
}
