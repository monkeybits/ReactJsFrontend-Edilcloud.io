
export const OPEN = '[TOUR APP] OPEN';
export const CLOSE = '[TOUR APP] CLOSE';

export function open() {
	return (dispatch, getState) => {
		dispatch({
			type: OPEN
		});
	};
}

export function close() {
	return (dispatch, getState) => {
		dispatch({
			type: CLOSE
		});
	};
}