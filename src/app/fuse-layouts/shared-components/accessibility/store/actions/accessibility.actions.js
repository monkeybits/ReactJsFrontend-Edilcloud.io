export const TOGGLE_ACCESSIBILITY_PANEL = '[Accessibility] TOGGLE ACCESSIBILITY PANEL';
export const GET_ACCESSIBILITY_PANEL_DATA = '[Accessibility] GET DATA';

export function toggleAccessibility() {
	return {
		type: TOGGLE_ACCESSIBILITY_PANEL
	};
}

export function getAccessibilityData(payload) {
	return {
		type: GET_ACCESSIBILITY_PANEL_DATA,
		payload
	};
}
