import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import ContactDialog from './ContactDialog';
import ViewContactDialog from './ViewContactDialog';
import ContactsHeader from './ContactsHeader';
import ContactsList from './ContactsList';
import ContactsSidebarContent from './ContactsSidebarContent';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import TeamFloationButton from './TeamFloationButton';
import { LinearProgress, Typography } from '@material-ui/core';
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
	useDeepCompareEffect(() => {
		dispatch(Actions.getContacts(handleSetLoading));
		dispatch(Actions.getUserData());
		return dispatch(Actions.resetContact());
	}, [dispatch]);
	if (loading.loadingApprove || loading.loadingRefuse || loading.loadingWaiting || loading.loadingDeactivate) {
		return (
			<div className="flex flex-1 flex-col items-center justify-center">
				<Typography style={{ height: 'auto' }} className="text-20 mb-16" color="textSecondary">
					Loading contacts...
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
					leftSidebar: 'w-256 border-0',
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
			<ContactDialog handleSetLoading={handleSetLoading} />
			<ViewContactDialog />
		</>
	);
}

export default withReducer('contactsApp', reducer)(ContactsApp);
