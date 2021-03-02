export const TOGGLE_ACCESSIBILITY_PANEL = '[Accessibility] TOGGLE ACCESSIBILITY PANEL';
export const OPEN_ACCESSIBILITY_PANEL = '[Accessibility] OPEN ACCESSIBILITY PANEL';
export const DOWNLOAD_SMARTPHONE_APP_PANEL = '[Accessibility] DOWNLOAD SMARTPHONE APP PANEL';
export const GET_ACCESSIBILITY_PANEL_DATA = '[Accessibility] GET DATA';

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
