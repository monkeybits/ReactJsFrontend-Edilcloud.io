import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Input, Button } from '@material-ui/core';
import ImageCropper from 'app/main/mainProfile/ImageCropper';

export default function UploadProjectImage({ setFile, file, remove }) {
	const [image, setImage] = useState(null);
	const [viewCroper, setViewCroper] = useState(false);
	const getPhoto = fileData => {
		// e.preventDefault();
		let reader = new FileReader();
		// setFile({
		// 	...file,
		// 	file: fileData
		// });
		reader.onloadend = () => {
			setFile({
				fileData: fileData,
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
					Remove
				</Button>
			</div>
		</>
	) : (
		<>
			<div className="flex justify-center mt-16 mb-20">
				<img className="custom-img rounded" src="/assets/images/avatars/default-image.png" alt="Custom Image" />
			</div>
			<div className="flex justify-center mt-16 mb-20">
				<input
					id="add_user"
					hidden
					type="file"
					className="custom-img"
					onChange={e => {
						setImage(URL.createObjectURL(e.currentTarget.files[0]));
						setViewCroper(true);
					}}
				/>
				<label htmlFor="add_user" className="font-size-18 cursor-pointer">
					<Icon fontSize="inherit" className="align-middle">
						add_circle
					</Icon>{' '}
					Upload Project photo
				</label>
			</div>
		</>
	);
}
