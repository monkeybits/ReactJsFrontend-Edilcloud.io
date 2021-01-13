import React, { useState } from 'react';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { Input, Button } from '@material-ui/core';
import ImageCropper from 'app/main/mainProfile/ImageCropper';
import EditIcon from '@material-ui/icons/Edit';
import { useTranslation } from 'react-i18next';

export default function UploadProjectImage({ setFile, file, remove }) {
	const [image, setImage] = useState(null);
	const [viewCroper, setViewCroper] = useState(false);
	const { t } = useTranslation('projects');
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
					{t('REMOVE')}
				</Button>
			</div>
		</>
	) : (
				<>
				<div className="text-center">
					<div className="relative inline-block mx-auto">
						<div className="mt-16 mb-16">
							<img className="custom-img rounded" src="/assets/images/avatars/default-image.png" alt="Custom Image" />
						</div>
						<div>
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
							<label htmlFor="add_user" className="cursor-pointer">
								{/* <Icon fontSize="inherit" className="align-middle">
						add_circle
					</Icon>{' '}
					Upload Project photo */}
								<a className="edit-icon bg-grey text-center rounded-full cursor-pointer project-edit-position">
									<EditIcon fontSize="small" />
								</a>
							</label>

						</div>
					</div>
				</div>
				</>
			);
}
