/* =============================================================================
 ContactCard.js
 ===============================================================================
*This file is created for ContactsApp
TODO: contatcard is view of GRID
*/
import { Grid, Typography, Button, Icon, Link, IconButton, Dialog } from '@material-ui/core';
import { SYSTEM_ROLES } from 'app/constants';
import ImageCropper from 'app/main/mainProfile/ImageCropper';
import { getCompressFile, getHeaderToken } from 'app/services/serviceUtils';
import React, { useRef, useState } from 'react';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch, useSelector } from 'react-redux';
import { ACTIVATE_MEMBER, DEACTIVATE_MEMBER, DELETE_MEMBER_FROM_CONTACT } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const DeleteConfirmDialog = loadable(() => import('../file-manager/DeleteConfirmDialog'));
const MoreOption = loadable(() => import('./MoreOption'));

const styles = theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500]
	}
});

const DialogTitle = withStyles(styles)(props => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		flexGrow: 1
	}
}))(MuiDialogContent);

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
	const [isNoDataModal, setIsNoDataModal] = useState(false);
	const [selectedOption, setSelectedOption] = useState('');
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
		const { id, email, status } = userData;
		const url = (status === 'Waiting' || status === 'Refused') ? DELETE_MEMBER_FROM_CONTACT(id) : status === 'Deactivated' ? ACTIVATE_MEMBER(id) : DEACTIVATE_MEMBER(id);
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
			(status === 'Waiting' || status === 'Refused') ? METHOD.DELETE : METHOD.PUT,
			getHeaderToken()
		);
	};
	const preventDefault = event => event.preventDefault();

	const handleClose = () => {
		setIsNoDataModal(false)
	}

	return viewCroper ? (
		<ImageCropper image={image} viewCroper={viewCroper} onCrop={getPhoto} onHide={() => setViewCroper(false)} />
	) : (
		<Grid className="px-6 mb-20 justify-center" item xs={6} sm={6} md={3} xl={3}>
			<DeleteConfirmDialog
				text={
					userData && (
						<>
							<Typography>Are you sure want to {userData.status === 'Waiting' ? 'Delete' : userData.status === 'Deactivated' ? 'activate' : 'deactivate' }?</Typography>
							{
								(userData.status === 'Deactivated' || userData.status === 'Approved') &&
								<Typography>Account will be {userData.status === 'Deactivated' ? 'activated' : 'deactivated' } until you not {userData.status === 'Deactivated' ? 'deactivate' : 'activate' } this user again!</Typography>
							}
						</>
					)
				}
				isOpenDeleteDialog={isOpenDeleteDialog}
				colseDeleteFileDialog={colseDeleteContactDialog}
				onYes={onDeactivate}
				onNo={colseDeleteContactDialog}
				status={userData?.status}
			/>
			<div className="card-container flex flex-col px-10 text-13 border-grey-600 border-1  mx-auto">
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
				<Dialog
					open={isNoDataModal}
					onClose={handleClose}
					aria-labelledby="customized-dialog-title"
					maxWidth="xs"
					fullWidth="true"
				>
					<DialogTitle id="customized-dialog-title" onClose={handleClose}>
						No Data
					</DialogTitle>
					<DialogContent dividers>
						<Typography className="text-lg">
							This user has not added {selectedOption}.
						</Typography>
						<div>
							<div className="flex mt-24 justify-end">
								<Button
									onClick={handleClose}
									variant="contained"
									className="justify-start d-inline-block mb-20 mr-10 bg-blue-500 text-white"
								>
									Ok
								</Button>
							</div>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</Grid>
	);
}
