/* =============================================================================
 ContactCard.js
 ===============================================================================
*This file is created for ContactsApp
TODO: contatcard is view of GRID
*/
import { Grid, Typography, Button, Icon, Link } from '@material-ui/core';
import { SYSTEM_ROLES } from 'app/constants';
import ImageCropper from 'app/main/mainProfile/ImageCropper';
import { decodeDataFromToken, getCompressFile, getHeaderToken } from 'app/services/serviceUtils';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_MEMBER_FROM_PROJECT } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const DeleteConfirmDialog = loadable(() => import('../file-manager/DeleteConfirmDialog'));
const MoreOption = loadable(() => import('./MoreOption'));

export default function ContactCard(props) {
	const { t } = useTranslation('contacts');
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
		const reader = new FileReader();

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
		const newformData = {
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
		const { id, email } = userData;
		const url = DELETE_MEMBER_FROM_PROJECT(id);
		apiCall(
			url,
			{},
			res => {
				dispatch(Actions.removeContact(email));
				colseDeleteContactDialog();
				dispatch(Actions.getContacts(routeParams));
			},
			err => {
				// console.log(err),
			},
			METHOD.DELETE,
			getHeaderToken()
		);
	};
	const preventDefault = event => event.preventDefault();

	return viewCroper ? (
		<ImageCropper image={image} viewCroper={viewCroper} onCrop={getPhoto} onHide={() => setViewCroper(false)} />
	) : (
		<Grid className="px-6 mb-20" item xs={6} sm={6} md={3} xl={3}>
			<DeleteConfirmDialog
				text={
					userData && (
						<>
							<Typography>Are you sure want to delete ?</Typography>
						</>
					)
				}
				isOpenDeleteDialog={isOpenDeleteDialog}
				colseDeleteFileDialog={colseDeleteContactDialog}
				onYes={onDeactivate}
				onNo={colseDeleteContactDialog}
			/>
			<div className="card-container flex flex-col px-10 text-13 border-grey-600 border-1">
				<span className={`pro ${String(status).toLowerCase()}`}>{status}</span>
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
					className="round"
					src={image || avatar}
					onClick={editPermission && handleOpenFileClick}
					alt="user"
				/>
				<h4 className="font-weight-600 mb-8">
					{first_name} {last_name}
				</h4>
				{/* <h6>{address}</h6> */}
				<p className="font-500 text-muted mb-8">{position || 'N/A'}</p>
				<p className="font-500 text-muted mb-8">{role}</p>
				<p className="font-500 text-muted mb-8">{company}</p>
				<div className="flex items-center justify-center mt-12 -mx-10">
					<a
						className="flex w-full font-700 whitespace-no-wrap normal-case text-muted justify-center items-center py-8 border-grey-600 border-1"
						href={`mailto:${email}`}
					>
						<Icon size="small" className="mr-8">
							email
						</Icon>
						Email
					</a>
					<a
						className="flex w-full font-700 whitespace-no-wrap normal-case text-muted justify-center items-center py-8 border-grey-600 border-1"
						href={`tel:${phone}`}
					>
						<Icon size="small" className="mr-8">
							call
						</Icon>
						Call
					</a>
				</div>
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
