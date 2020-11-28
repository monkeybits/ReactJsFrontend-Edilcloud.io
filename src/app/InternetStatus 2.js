import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

const getOnLineStatus = () =>
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean' ? navigator.onLine : true;
    
export default function InternetStatus() {
	const [status, setStatus] = React.useState(getOnLineStatus());
	const [toastId, setToastId] = React.useState(null);

	const setOnline = () => setStatus(true);
	const setOffline = () => setStatus(false);

	React.useEffect(() => {
		window.addEventListener('online', setOnline);
		window.addEventListener('offline', setOffline);

		return () => {
			window.removeEventListener('online', setOnline);
			window.removeEventListener('offline', setOffline);
		};
	}, []);

	React.useEffect(() => {
		if (!status && !toastId) {
			setToastId(
				toast.warn('No Internet Connection', {
					autoClose: status,
					position: 'top-center'
				})
			);
		}
		if (status && toastId) {
			toast.dismiss(toastId);
			setToastId(null);
		}
	}, [status]);
	return null;
}
