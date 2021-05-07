import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Actions from './store/actions';
import reducer from './store/reducers';
// import loadable from '@loadable/component';
const MailDetails = React.lazy(() => import('./mail/MailDetails'));
const MailToolbar = React.lazy(() => import('./mail/MailToolbar'));
const MailAppHeader = React.lazy(() => import('./MailAppHeader'));
const MailAppSidebarContent = React.lazy(() => import('./MailAppSidebarContent'));
const MailAppSidebarHeader = React.lazy(() => import('./MailAppSidebarHeader'));
const MailList = React.lazy(() => import('./mails/MailList'));
const MailsToolbar = React.lazy(() => import('./mails/MailsToolbar'));

function MailApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	const routeParams = useParams();

	useEffect(() => {
		dispatch(Actions.getFilters());
		dispatch(Actions.getFolders());
		dispatch(Actions.getLabels());
	}, [dispatch]);

	return (
		<FusePageCarded
			classes={{
				root: 'w-full',
				content: 'flex flex-col',
				header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<MailAppHeader pageLayout={pageLayout} />}
			contentToolbar={routeParams.mailId ? <MailToolbar /> : <MailsToolbar />}
			content={routeParams.mailId ? <MailDetails /> : <MailList />}
			leftSidebarHeader={<MailAppSidebarHeader />}
			leftSidebarContent={<MailAppSidebarContent />}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('mailApp', reducer)(MailApp);
