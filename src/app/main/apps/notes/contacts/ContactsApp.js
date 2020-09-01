import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import AddTeamMemberToProject from './AddTeamMemberToProject';
import ViewContactDialog from './ViewContactDialog';
import ContactsList from './ContactsList';
import ContactsSidebarContent from './ContactsSidebarContent';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import ContactsHeader from './ContactsHeader';

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

	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const company = useSelector(({ chatApp }) => chatApp?.company);

	useDeepCompareEffect(() => {
		dispatch(Actions.getContacts(routeParams.id));
		dispatch(Actions.getUserData());
		return dispatch(Actions.resetContact());
	}, [dispatch, routeParams]);
	const userInfo = decodeDataFromToken();
	const companyIdFromCompany = userInfo?.extra?.profile?.company;
	const roleFromCompany = userInfo?.extra?.profile?.role;
	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0 bg-white team-tab mt-16'
				}}
				header={<ContactsHeader pageLayout={pageLayout} />}
				content={<ContactsList />}
				leftSidebarContent={<ContactsSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{(roleFromCompany == 'o' || roleFromCompany == 'd') && (
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Fab
						color="primary"
						aria-label="add"
						className={classes.addButton}
						onClick={ev => dispatch(Actions.openNewContactDialog())}
					>
						<Icon>person_add</Icon>
					</Fab>
				</FuseAnimate>
			)}
			<AddTeamMemberToProject />
			<ViewContactDialog />
		</>
	);
}

export default withReducer('contactsApp', reducer)(ContactsApp);
