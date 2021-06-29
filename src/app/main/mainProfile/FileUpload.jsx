import React, { useRef, useState, useEffect } from 'react';
import { Icon, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ImageCropper from './ImageCropper';

export default function FileUpload({ setFile, file, remove, isCompany, nameSpace = 'company_create' }) {
	const { t } = useTranslation(nameSpace);
	const [image, setImage] = useState(null);
	const inputRef = useRef(null);
	const [viewCroper, setViewCroper] = useState(false);
	const [deviceType, setDeviceType] = React.useState('');

	useEffect(() => {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			setDeviceType('window phone')
		}

		if (/android/i.test(userAgent)) {
			setDeviceType('android')
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			setDeviceType('ios')
		}

		const iPad = (userAgent.match(/(iPad)/)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
		if (iPad !== false) {
			setDeviceType('ios')
		}
	}, []);

	const getPhoto = fileData => {
		// e.preventDefault();
		const reader = new FileReader();
		// setFile({
		// 	...file,
		// 	file: fileData
		// });
		reader.onloadend = () => {
			setFile({
				fileData,
				imagePreviewUrl: reader.result
			});
		};

		reader.readAsDataURL(fileData);
	};

	useEffect(() => {
		window.fileUpload = fileUpload;
	}, []);

	const dataURLtoFile = (dataurl, filename) => {
		const arr = dataurl.split(',');
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);

		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}

		return new File([u8arr], filename, { type: mime });
	};

	function handleOpenFileClick(e) {
		inputRef.current.click();
	}
	
	const fileUpload = async string => {
		const files = [];
		const extToMimes = {
			'image/jpeg': '.jpg',
			'image/png': '.png',
			'application/pdf': '.pdf',
			'application/json': '.json',
			'application/vnd.ms-excel': '.xls',
			'text/csv': '.csv',
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
			'audio/mp4': '.mp4a',
			'video/mp4': '.mp4',
			'application/mp4': '.mp4'
		};

		let randomName = '';
		for (let i = 0; i < 8; i++) {
			const random = Math.floor(Math.random() * 27);
			randomName += String.fromCharCode(97 + random);
		}

		const dataWithMimeType = string.substr(0, string.indexOf(';'));
		const mimeT = dataWithMimeType.split(':')[1];
		const fileObject = dataURLtoFile(string, randomName + extToMimes[mimeT]);
		files.push(fileObject);

		const fileToCompress = files[0];
		setImage(URL.createObjectURL(fileToCompress));
	};

	const onAddPhoto = () => {
		try {
			if (window.webkit.messageHandlers) {
				window.webkit.messageHandlers.UploadImage.postMessage('fileUpload');
			}
		} catch (e) {
			// console.log('error', e);
		}
	};

	return viewCroper ? (
		<ImageCropper image={image} viewCroper={viewCroper} onCrop={getPhoto} onHide={() => setViewCroper(false)} />
	) : file?.imagePreviewUrl ? (
		<>
			<div className="flex justify-center">
				<img className="profile-img" src={file.imagePreviewUrl} alt="profile" />
			</div>
			<div className="text-center mt-10">
				<Button variant="contained" onClick={remove}>
					{t('REMOVE')}
				</Button>
			</div>
		</>
	) : (
		<>
			{isCompany ? (
				<Icon onClick={deviceType === 'ios' ? onAddPhoto : handleOpenFileClick} className="company-icon flex mx-auto">
					business
				</Icon>
			) : (
				<div className="flex justify-center mt-16 mb-20">
					<img className="profile-img" src="/assets/images/avatars/profile-img.png" alt="profile" />
				</div>
			)}

			<div className="flex justify-center mt-16 mb-20">
				<input
					id="add_user"
					hidden
					type="file"
					ref={inputRef}
					onChange={e => {
						setImage(URL.createObjectURL(e.currentTarget.files[0]));
						setViewCroper(true);
					}}
				/>
				<label onClick={deviceType === 'ios' ? onAddPhoto : handleOpenFileClick} className="text-2xl cursor-pointer">
					<Icon fontSize="inherit" className="align-middle">
						add_circle
					</Icon>{' '}
					{t('UPLOAD_PHOTO')}
				</label>
			</div>
		</>
	);
}
