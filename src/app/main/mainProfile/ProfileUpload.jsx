import React from 'react';
import { Input } from '@material-ui/core';

export default function ProfileUpload({ setFile, file }) {
	const getPhoto = e => {
		e.preventDefault();
		let fileData = e.target.files[0];
		console.log('files', fileData);
		let reader = new FileReader();
		setFile({
			...file,
			file: e.target.files
		});
		reader.onloadend = () => {
			setFile({
				fileData: fileData,
				imagePreviewUrl: reader.result
			});
		};

		reader.readAsDataURL(e.target.files[0]);
	};
	return (
		<div>
			<Input type="file" onChange={getPhoto} />
		</div>
	);
}
