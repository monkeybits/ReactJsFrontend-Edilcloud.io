import { Button, Grid } from '@material-ui/core';
import { SYSTEM_ROLES } from 'app/constants';
import ImageCropper from 'app/main/mainProfile/ImageCropper';
import { getCompressFile } from 'app/services/serviceUtils';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';

export default function ContactCard({
	id,
	first_name,
	last_name,
	role,
	email,
	position,
	status,
	avatar,
	address,
	language,
	can_access_chat,
	can_access_files,
	editPermission
}) {
	const dispatch = useDispatch();
	const inputFile = useRef(null);
	const [viewCroper, setViewCroper] = useState(false);
	const [image, setImage] = useState(null);
	const [permission, setPermission] = useState({
		can_access_chat,
		can_access_files
	});
	const [fileData, setFile] = useState({
		file: undefined,
		imagePreviewUrl: undefined
	});
	const getPhoto = fileData => {
		let reader = new FileReader();

		reader.onloadend = () => {
			setFile({
				file: fileData,
				imagePreviewUrl: reader.result
			});
			handleSubmit(undefined, permission, fileData);
		};

		reader.readAsDataURL(fileData);
	};
	const handleSubmit = async (afterSubmit, permissionData, file) => {
		let newformData = {
			id,
			first_name,
			last_name,
			email,
			role: SYSTEM_ROLES.filter(d => d.label == role)[0].key,
			language,
			position,
			photo: await getCompressFile(file),
			...permissionData
		};
		dispatch(Actions.updateContact(newformData, id, true));
		if (afterSubmit) {
			afterSubmit();
		}
	};
	function handleOpenFileClick(e) {
		inputFile.current.click();
	}
	return viewCroper ? (
		<ImageCropper image={image} viewCroper={viewCroper} onCrop={getPhoto} onHide={() => setViewCroper(false)} />
	) : (
		<Grid className="px-12 mb-32" item xs={12} sm={6} md={4} xl={3}>
			<div class="card-container flex flex-col">
				<span class="pro">PRO</span>
				<input
                    type="file"
                    accept="image/*"
					id="file"
					ref={inputFile}
					onChange={e => {
						setImage(URL.createObjectURL(e.currentTarget.files[0]));
						setViewCroper(true);
					}}
					style={{ display: 'none' }}
				/>
				<img
					class="round"
					src={image ? image : avatar}
					onClick={editPermission && handleOpenFileClick}
					alt="user"
				/>
				<h3>
					{first_name} {last_name}
				</h3>
				<h6>{address}</h6>
				<p>
					{position ? position : 'N/A'} - {role}
				</p>
				<div className="my-12 block mx-auto">
					<Button
						variant={permission.can_access_files ? 'contained' : 'outlined'}
						// disabled={getRole() == 'm' || getRole() == 'w'}
						size="small"
						color="secondary"
						className="mr-8"
						onClick={() => {
							if (editPermission) {
								let permissionData = {
									...permission,
									can_access_files: !permission.can_access_files
								};
								handleSubmit(() => {
									setPermission(permissionData);
								}, permissionData);
							}
						}}
					>
						Access File
					</Button>
					<Button
						variant={permission.can_access_chat ? 'contained' : 'outlined'}
						// disabled={getRole() == 'm' || getRole() == 'w'}
						size="small"
						color="secondary"
						onClick={() => {
							if (editPermission) {
								let permissionData = {
									...permission,
									can_access_chat: !permission.can_access_chat
								};
								handleSubmit(() => {
									setPermission(permissionData);
								}, permissionData);
							}
						}}
					>
						Access Chat
					</Button>
				</div>

				<div class="skills">
					<h6>Skills</h6>
					<ul>
						<li>UI / UX</li>
						<li>Front End Development</li>
						<li>HTML</li>
						<li>CSS</li>
						<li>JavaScript</li>
						<li>React</li>
						<li>Node</li>
					</ul>
				</div>
			</div>
		</Grid>
	);
}
