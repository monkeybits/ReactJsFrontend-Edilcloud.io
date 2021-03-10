import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import loadable from '@loadable/component';
const MailDetails = loadable(() => import('./mail/MailDetails'))
const MailToolbar = loadable(() => import('./mail/MailToolbar'))
const MailAppHeader = loadable(() => import('./MailAppHeader'))
const MailAppSidebarContent = loadable(() => import('./MailAppSidebarContent'))
const MailAppSidebarHeader = loadable(() => import('./MailAppSidebarHeader'))
const MailList = loadable(() => import('./mails/MailList'))
const MailsToolbar = loadable(() => import('./mails/MailsToolbar'))

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
