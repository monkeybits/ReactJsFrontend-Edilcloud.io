import withReducer from 'app/store/withReducer';
import loadable from '@loadable/component';
import React, { useRef } from 'react';
import FusePageSimple from '@fuse/core/FusePageSimple';
import reducer from './store/reducers';
const BillingContent = loadable(() => import('./BillingContent'))

function BillingApp() {
	const pageLayout = useRef(null);
	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'h-full',
					content: 'flex flex-col h-full p-24 bg-gray-custom',
					leftSidebar: 'w-256 border-0',
					// header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					customHeader: 'flex flex-auto flex-col container z-10 h-full chat-header-bg-remove',
					wrapper: 'min-h-0 team-tab'
				}}
				content={<BillingContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
		</>
	);
}

export default withReducer('BillingApp', reducer)(BillingApp);
