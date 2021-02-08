import { Button, Grid } from '@material-ui/core';
import { SYSTEM_ROLES } from 'app/constants';
import ImageCropper from 'app/main/mainProfile/ImageCropper';
import { getCompressFile, getHeaderToken } from 'app/services/serviceUtils';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import Icon from '@material-ui/core/Icon';
import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import FuseUtils from '@fuse/utils';
import MoreOption from './MoreOption';
import DeleteConfirmDialog from '../../file-manager/DeleteConfirmDialog';
import { DELETE_MEMBER_FROM_PROJECT } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { useTranslation } from 'react-i18next';

export default function ContactCard(props) {
	const {
		id,
		name,
		lastName,
		role,
		email,
		position,
		status,
		avatar,
		address,
		company,
		phone,
		language,
		can_access_chat,
		can_access_files,
		onCardClick,
		editPermission
	} = props;
	const { t } = useTranslation('contacts_project');
	const dispatch = useDispatch();
	const inputFile = useRef(null);
	const [viewCroper, setViewCroper] = useState(false);
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [userData, setUserData] = useState(null);
	const [image, setImage] = useState(null);
	const [permission, setPermission] = useState({
		can_access_chat,
		can_access_files
	});
	const [fileData, setFile] = useState({
		file: undefined,
		imagePreviewUrl: undefined
	});
	const [hasRender, setHasRender] = React.useState(false);
	const routeParams = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.routeParams);
	const notificationPanel = useSelector(({ notificationPanel }) => notificationPanel);
	const scrollRef = useRef(null);
	const hasNotifcationOnThisItem = notificationPanel.notificationData?.notification?.object_id == id;
	useEffect(() => {
		if (hasNotifcationOnThisItem) {
			setTimeout(() => {
				setHasRender(true);
			}, 300);
		} else {
			setHasRender(true);
		}
	}, [id, hasNotifcationOnThisItem]);

	useEffect(() => {
		let notification = notificationPanel.notificationData?.notification;
		if (notificationPanel.viewing && notification?.content_type == 'team' && hasRender && scrollRef.current) {
			dispatch(notificationActions.removeFrmViewNotification());
			FuseUtils.notificationBackrondColor(scrollRef, 'custom-notification-bg');
		}
	}, [notificationPanel.viewing, scrollRef, hasRender]);
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
	const options = ['Edit', 'Delete', 'Report as inapropriate'];
	const [anchorEl, setAnchorEl] = React.useState(null);
	const handleClick = event => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const openDeleteContactDialog = () => setIsOpenDeleteDialog(true);
	const colseDeleteContactDialog = () => setIsOpenDeleteDialog(false);
	const handleClose = event => {
		event.stopPropagation();
		setAnchorEl(null);
	};
	const onDeactivate = () => {
		const { id, email } = userData;
		let url = DELETE_MEMBER_FROM_PROJECT(id);
		apiCall(
			url,
			{},
			res => {
				dispatch(Actions.removeContact(email));
				colseDeleteContactDialog();
				dispatch(Actions.getContacts(routeParams));
			},
			err => console.log(err),
			METHOD.DELETE,
			getHeaderToken()
		);
	};
	const openMenu = Boolean(anchorEl);
	return viewCroper ? (
		<ImageCropper image={image} viewCroper={viewCroper} onCrop={getPhoto} onHide={() => setViewCroper(false)} />
	) : (
		<Grid className="px-6 mb-20" item xs={6} sm={6} md={3} xl={3}>
			<DeleteConfirmDialog
				text={
					<>
						<Typography>Are you sure want to delete ?</Typography>
						{/* {filterKey != 'deactivated' && (
							<Typography>Account will be deactivated untill you not activet this user again!</Typography>
						)} */}
					</>
				}
				isOpenDeleteDialog={isOpenDeleteDialog}
				colseDeleteFileDialog={colseDeleteContactDialog}
				onYes={onDeactivate}
				onNo={colseDeleteContactDialog}
			/>
			<div
				ref={notificationPanel.notificationData?.notification?.object_id == id ? scrollRef : null}
				class="card-container flex flex-col px-10 text-13"
			>
				<span class={`pro ${String(status).toLowerCase()}`}>{status}</span>
				{/* {editPermission && ( */}
					<div className="team-action">
						<MoreOption
							canHaveDeleteOption={editPermission}
							deleteHandler={ev => {
								ev.stopPropagation();
								setUserData(props);
								openDeleteContactDialog();
							}}
							onView={onCardClick}
						/>
					</div>
				{/* )} */}
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
				<img class="round" src={image ? image : avatar} alt="user" />
				<h4 className="font-weight-600 mb-8">{`${name} ${lastName}`}</h4>
				{/* <h6>{address}</h6> */}
				<p className="font-500 text-muted mb-8">
					{position ? position : 'N/A'} - {role}
				</p>
				{/* <h3 className="font-weight-600 mb-8">
					Job Title
				</h3> */}

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
