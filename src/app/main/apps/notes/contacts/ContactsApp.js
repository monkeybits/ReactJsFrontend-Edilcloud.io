import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import { LinearProgress, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ContactsList from './ContactsList';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import loadable from '@loadable/component';
import TeamFloationButton from './TeamFloationButton';

const ViewContactDialog = loadable(() => import('./ViewContactDialog'));
const AddTeamMemberToProject = loadable(() => import('./AddTeamMemberToProject'));
const ContactsSidebarContent = loadable(() => import('./ContactsSidebarContent'));
const ContactsHeader = loadable(() => import('./ContactsHeader'));

const useStyles = makeStyles({
	addButton: {
		position: 'fixed',
		right: 90,
		bottom: 65,
		zIndex: 999999
	}
});

function ContactsApp(props) {
	const dispatch = useDispatch();
	const { t } = useTranslation('contacts_project');
	const [defaultMenu, setDefaultMenu] = useState(true);
	const [foldedAndOpened, setFoldedAndOpened] = useState(false);
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const toggleSidebarMenu = useSelector(({ fuse }) => fuse.settings.toggleSidebarMenu);
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const navbar = useSelector(({ fuse }) => fuse.navbar);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const { folded } = config.navbar;
	
	useEffect(() => {
		if (toggleSidebarMenu) {
			setDefaultMenu(false);
		} else {
			setDefaultMenu(true);
		}
	}, [toggleSidebarMenu]);

	const foldedAndClosed = folded && !navbar.foldedOpen;
	useEffect(() => {
		const foldedAndOpened = folded && navbar.foldedOpen;
		setTimeout(() => {
			if (foldedAndOpened) {
				setDefaultMenu(false);
				setFoldedAndOpened(foldedAndOpened);
			}
		}, 200);
		if (!foldedAndOpened) {
			setFoldedAndOpened(foldedAndOpened);
		}
	}, [folded, navbar]);

	const [loading, setLoading] = useState({
		loadingApprove: false,
		loadingRefuse: false,
		loadingWaiting: false
	});
	const handleSetLoading = data =>
		setLoading(loading => ({
			...loading,
			...data
		}));
	useDeepCompareEffect(() => {
		dispatch(Actions.getContacts(routeParams.id, handleSetLoading));
		dispatch(Actions.getUserData());
		return dispatch(Actions.resetContact());
	}, [dispatch, routeParams]);
	const userInfo = decodeDataFromToken();
	const companyIdFromCompany = userInfo?.extra?.profile?.company;
	const roleFromCompany = userInfo?.extra?.profile?.role;
	if (loading.loadingApprove || loading.loadingRefuse || loading.loadingWaiting) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center h-full">
				<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
					{t('LOADING_CONTACTS')}...
				</Typography>
				<LinearProgress className="w-xs" color="secondary" />
			</div>
		);
	}
	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'h-full p-24',
					content: 'flex flex-col h-full',
					leftSidebar: `mobile-h-full w-350 border-0 ${foldedAndOpened || defaultMenu ? 'ml-19' : ''}`,
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0 team-tab'
				}}
				header={<ContactsHeader onOpen={props.setOpenDialog} pageLayout={pageLayout} />}
				content={<ContactsList pageLayout={pageLayout} />}
				leftSidebarContent={<ContactsSidebarContent pageLayout={pageLayout} />}
				leftSidebarVariant
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{(roleFromCompany == 'o' || roleFromCompany == 'd') && (
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<TeamFloationButton
						color="secondary"
						className=" ltr:left-0 rtl:right-0 mx-16 z-999"
						callAction={name => {
							dispatch(Actions.openNewContactDialog(name));
							// setIsOpenDrawer(true);
							// return name == 'Folder' ? setRadioBtnValue('folder') : setRadioBtnValue('file');
						}}
					/>
				</FuseAnimate>
			)}
			<AddTeamMemberToProject handleSetLoading={handleSetLoading} />
			<ViewContactDialog />
		</>
	);
}

export default withReducer('contactsAppProject', reducer)(ContactsApp);
