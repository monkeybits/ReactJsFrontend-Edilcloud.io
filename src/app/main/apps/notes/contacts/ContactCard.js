import { Grid, Typography, Icon, Button } from '@material-ui/core';
import { SYSTEM_ROLES } from 'app/constants';
import { getCompressFile, getHeaderToken } from 'app/services/serviceUtils';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import FuseUtils from '@fuse/utils';
import { REJECT_PROJECT_INVITATION } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const ImageCropper = loadable(() => import('app/main/mainProfile/ImageCropper'));
const DeleteConfirmDialog = loadable(() => import('../../file-manager/DeleteConfirmDialog'));
const MoreOption = loadable(() => import('./MoreOption'));

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
		editPermission,
		profile
	} = props;
	const { t } = useTranslation('contacts_project');
	const dispatch = useDispatch();
	const inputFile = useRef(null);
	const [viewCroper, setViewCroper] = useState(false);
	const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
	const [isNoDataModal, setIsNoDataModal] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
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
		const notification = notificationPanel.notificationData?.notification;
		if (notificationPanel.viewing && notification?.content_type == 'team' && hasRender && scrollRef.current) {
			dispatch(notificationActions.removeFrmViewNotification());
			FuseUtils.notificationBackrondColor(scrollRef, 'custom-notification-bg');
		}
	}, [notificationPanel.viewing, scrollRef, hasRender]);
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
		const url = REJECT_PROJECT_INVITATION(id);
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
			METHOD.PUT,
			getHeaderToken()
		);
	};
	const openMenu = Boolean(anchorEl);
	return viewCroper ? (
		<ImageCropper image={image} viewCroper={viewCroper} onCrop={getPhoto} onHide={() => setViewCroper(false)} />
	) : (
		<Grid className="px-6 mb-20 justify-center" item xs={6} sm={6} md={3} xl={3}>
			<DeleteConfirmDialog
				text={
					<>
						<Typography>Are you sure want to delete ?</Typography>
					</>
				}
				isOpenDeleteDialog={isOpenDeleteDialog}
				colseDeleteFileDialog={colseDeleteContactDialog}
				onYes={onDeactivate}
				onNo={colseDeleteContactDialog}
				status="Waiting"
			/>
			<div
				ref={notificationPanel.notificationData?.notification?.object_id == id ? scrollRef : null}
				className="card-container flex flex-col px-10 text-13 border-grey-600 border-1 mx-auto"
			>
				<span className={`pro ${String(status).toLowerCase()}`}>{status}</span>
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
				<img className="round" src={image || avatar} alt="user" />
				<h4 className="font-weight-600 mb-8">{`${name} ${lastName}`}</h4>
				{/* <h6>{address}</h6> */}
				<p className="font-500 text-muted mb-8">{profile.position || 'N/A'}</p>
				<p className="font-500 text-muted mb-8">{profile.role}</p>
				<p className="font-500 text-muted mb-8">{company}</p>
				<div className="flex items-center justify-center mt-12 -mx-10">
				{
						email ? (
							<a
								className="flex w-full font-700 whitespace-no-wrap normal-case text-muted justify-center items-center py-8 border-grey-600 border-1"
								href={`mailto:${email}`}
							>
								<Icon size="small" className="mr-8">
									email
								</Icon>
								Email
							</a>
						) : (
							<Button
								disableRipple
								className="flex w-full font-700 whitespace-no-wrap normal-case text-muted justify-center items-center py-8 border-grey-600 border-1 border-solid"
								color="inherit"
								onClick={() => {
									setIsNoDataModal(true)
									setSelectedOption('an email')
								}}
							>
								<Icon size="small" className="mr-8">
									email
								</Icon>
								Email
							</Button>
						)
					}
					{
						phone ? (
							<a
								className="flex w-full font-700 whitespace-no-wrap normal-case text-muted justify-center items-center py-8 border-grey-600 border-1"
								href={`tel:${phone}`}
							>
								<Icon size="small" className="mr-8">
									call
								</Icon>
								Call
							</a>
						) : (
							<Button
								disableRipple
								className="flex w-full font-700 whitespace-no-wrap normal-case text-muted justify-center items-center py-8 border-grey-600 border-1 border-solid"
								color="inherit"
								onClick={() => {
									setIsNoDataModal(true)
									setSelectedOption('a phone number')
								}}
							>
								<Icon size="small" className="mr-8">
									call
								</Icon>
								Call
							</Button>
						)
					}
				</div>
			</div>
		</Grid>
	);
}
