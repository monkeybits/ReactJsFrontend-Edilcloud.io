import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
// import loadable from '@loadable/component';
const OrdersHeader = React.lazy(() => import('./OrdersHeader'));
const OrdersTable = React.lazy(() => import('./OrdersTable'));

function Orders() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<OrdersHeader />}
			content={<OrdersTable />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Orders);
