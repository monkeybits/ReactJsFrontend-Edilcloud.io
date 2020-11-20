import { Button, Grid } from '@material-ui/core';
import { SYSTEM_ROLES } from 'app/constants';
import ImageCropper from 'app/main/mainProfile/ImageCropper';
import { getCompressFile } from 'app/services/serviceUtils';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';
import Icon from '@material-ui/core/Icon';


export default function ContactCard({
	id,
	name,
	lastName,
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
			name,
			lastName,
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
		<Grid className="px-6 mb-20" item xs={6} sm={6} md={3} xl={3}>
			<div class="card-container flex flex-col px-10 text-13">
				<span class="pro approved">Approved</span>
				<div className="team-action">
					<Icon>more_vert</Icon>
				</div>
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
				<h4 className="font-weight-600 mb-8">
					{name} {lastName}
				</h4>
				{/* <h6>{address}</h6> */}
				<p className="font-500 text-muted mb-8">
					{position ? position : 'N/A'} - {role}
				</p>
				{/* <h3 className="font-weight-600 mb-8">
					Job Title
				</h3> */}
				<p className="font-500 text-muted mb-8">Company Name</p>
				<p className="font-500 text-muted mb-8">email@email.com</p>
				<p className="font-500 text-muted">9876543210</p>
				
				{/* <div className="my-12 block mx-auto">
					<Button
						variant={permission.can_access_files ? 'contained' : 'outlined'}
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
				</div> */}

				{/* <div class="skills">
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
				</div> */}
			</div>
		</Grid>
		
	);
}
