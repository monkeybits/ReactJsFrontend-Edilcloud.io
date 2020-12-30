import { Button, Grid, Typography } from '@material-ui/core';
import { SYSTEM_ROLES } from 'app/constants';
import ImageCropper from 'app/main/mainProfile/ImageCropper';
import { decodeDataFromToken, getCompressFile, getHeaderToken } from 'app/services/serviceUtils';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import Icon from '@material-ui/core/Icon';
import DeleteConfirmDialog from '../file-manager/DeleteConfirmDialog';
import MoreOption from './MoreOption';
import { DEACTIVATE_MEMBER, ACTIVATE_MEMBER } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';

export default function ContactCard(props) {
	const {
		id,
		first_name,
		last_name,
		role,
		email,
		position,
		company,
		status,
		avatar,
		address,
		language,
		can_access_chat,
		can_access_files,
		editPermission,
		jobTitle,
		phone
	} = props;
	const dispatch = useDispatch();
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [userData, setUserData] = useState(null);
	const inputFile = useRef(null);
	const [viewCroper, setViewCroper] = useState(false);
	const routeParams = useSelector(({ contactsApp }) => contactsApp.contacts.routeParams);
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
	const openDeleteContactDialog = () => setIsOpenDeleteDialog(true);
	const colseDeleteContactDialog = () => setIsOpenDeleteDialog(false);
	function handleOpenFileClick(e) {
		inputFile.current.click();
	}
	const onDeactivate = () => {
		const { id, email, status } = userData;
		let url = status == 'Deactivated' ? ACTIVATE_MEMBER(id) : DEACTIVATE_MEMBER(id);
		apiCall(
			url,
			{},
			res => {
				dispatch(Actions.removeContact(email));
				colseDeleteContactDialog();
				dispatch(Actions.getContacts(routeParams));
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
	return viewCroper ? (
		<ImageCropper image={image} viewCroper={viewCroper} onCrop={getPhoto} onHide={() => setViewCroper(false)} />
	) : (
		<Grid className="px-6 mb-20" item xs={6} sm={6} md={3} xl={3}>
			<DeleteConfirmDialog
				text={
					userData && (
						<>
							<Typography>
								Are you sure want to {userData.status == 'Deactivated' ? 'activate' : 'deactivate'} ?
							</Typography>
							{userData.status != 'Deactivated' && (
								<Typography>
									Account will be deactivated untill you not activet this user again!
								</Typography>
							)}
						</>
					)
				}
				isOpenDeleteDialog={isOpenDeleteDialog}
				colseDeleteFileDialog={colseDeleteContactDialog}
				onYes={onDeactivate}
				onNo={colseDeleteContactDialog}
			/>
			<div class="card-container flex flex-col px-10 text-13">
				<span class={`pro ${String(status).toLowerCase()}`}>{status}</span>
				{console.log({ userInfo: decodeDataFromToken(), user: props.user?.id })}
				{!!editPermission && (
					<div className="team-action">
						<MoreOption
							status={status}
							editHandler={ev => {
								ev.stopPropagation();
								dispatch(Actions.openEditContactDialog(props));
							}}
							canHaveDeleteOption={props.currentUser.data.user_id != props.user?.id}
							deleteHandler={ev => {
								ev.stopPropagation();
								setUserData(props);
								openDeleteContactDialog();
							}}
						/>
					</div>
				)}
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
					{first_name} {last_name}
				</h4>
				{/* <h6>{address}</h6> */}
				<p className="font-500 text-muted mb-8">
					{position ? position : 'N/A'} - {role}
				</p>
				<p className="font-500 text-muted mb-8">{company}</p>
				<a className="font-700 text-muted mb-8" href={`mailto:${email}`}>
					{email}
				</a>
				<a className="font-700 text-muted mb-8" href={`tel:${phone}`}>
					{phone}
				</a>
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
