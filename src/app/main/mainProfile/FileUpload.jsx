import React, { useRef, useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Input, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ImageCropper from './ImageCropper';

export default function FileUpload({ setFile, file, remove, isCompany, nameSpace = 'company_create' }) {
	const { t } = useTranslation(nameSpace);
	const [image, setImage] = useState(null);
	const inputRef = useRef(null);
	const [viewCroper, setViewCroper] = useState(false);
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
				<Icon onClick={() => inputRef.current.click()} className="company-icon flex mx-auto">
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
				<label onClick={() => inputRef.current.click()} className="text-2xl cursor-pointer">
					<Icon fontSize="inherit" className="align-middle">
						add_circle
					</Icon>{' '}
					{t('UPLOAD_PHOTO')}
				</label>
			</div>
		</>
	);
}
