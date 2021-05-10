import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import loadable from '@loadable/component';
const ProductsHeader = loadable(() => import('./ProductsHeader'));
const ProductsTable = loadable(() => import('./ProductsTable'));

function Products() {
	return (
		<FusePageCarded
			classes={{
				content: 'flex',
				header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
			}}
			header={<ProductsHeader />}
			content={<ProductsTable />}
			innerScroll
		/>
	);
}

export default withReducer('eCommerceApp', reducer)(Products);
