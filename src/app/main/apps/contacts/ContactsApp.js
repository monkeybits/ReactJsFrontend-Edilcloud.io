/* =============================================================================
 ContactsApp.js
 ===============================================================================
*This file is created for ContactsApp
TODO: ContactsApp is created for company teams
*/
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import { LinearProgress, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import loadable from '@loadable/component';
import TeamFloationButton from './TeamFloationButton';
const ContactDialog = loadable(() => import('./ContactDialog'))
const ViewContactDialog = loadable(() => import('./ViewContactDialog'))
const ContactsHeader = loadable(() => import('./ContactsHeader'))
const ContactsList = loadable(() => import('./ContactsList'))
const ContactsSidebarContent = loadable(() => import('./ContactsSidebarContent'))

const useStyles = makeStyles({
	addButton: {
		position: 'fixed',
		right: 90,
		bottom: 25,
		zIndex: 999999
	}
});

function ContactsApp(props) {
	const dispatch = useDispatch();
	const { t } = useTranslation('contacts');
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [loading, setLoading] = useState({
		loadingApprove: false,
		loadingRefuse: false,
		loadingDeactivate: false,
		loadingWaiting: false
	});
	const handleSetLoading = data =>
		setLoading(loading => ({
			...loading,
			...data
		}));
	
	const userInfo = decodeDataFromToken();
	const roleFromCompany = userInfo?.extra?.profile?.role;
	
	useDeepCompareEffect(() => {
		dispatch(Actions.getContacts(handleSetLoading));
		dispatch(Actions.getUserData());
		return dispatch(Actions.resetContact());
	}, [dispatch]);
	
	if (loading.loadingApprove || loading.loadingRefuse || loading.loadingWaiting || loading.loadingDeactivate) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center">
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
					contentWrapper: 'h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'mobile-h-full w-256 border-0',
					// header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					customHeader: 'flex flex-auto flex-col container z-10 h-full chat-header-bg-remove',
					wrapper: 'min-h-0 team-tab p-24'
				}}
				header={<ContactsHeader pageLayout={pageLayout} />}
				content={<ContactsList pageLayout={pageLayout} />}
				leftSidebarContent={<ContactsSidebarContent />}
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
			<ContactDialog handleSetLoading={handleSetLoading} />
			<ViewContactDialog />
		</>
	);
}

export default withReducer('contactsApp', reducer)(ContactsApp);
