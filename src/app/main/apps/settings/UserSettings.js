import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import TodoHeader from './TodoHeader';
import TodoSidebarContent from './TodoSidebarContent';
import TodoSidebarHeader from './TodoSidebarHeader';
import TodoList from './TodoList';
import FusePageSimple from '@fuse/core/FusePageSimple';

function SettingApp() {
	// const dispatch = useDispatch();

	const pageLayout = useRef(null);
	// const routeParams = useParams();

	// useEffect(() => {
	// 	// dispatch(Actions.getFilters());
	// 	// dispatch(Actions.getFolders());
	// 	// dispatch(Actions.getLabels());
	// }, [dispatch]);

	// useDeepCompareEffect(() => {
	// 	dispatch(Actions.getTodos(routeParams));
	// }, [dispatch, routeParams]);

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
				header={<TodoHeader pageLayout={pageLayout} />}
				content={<TodoList />}
				leftSidebarContent={<TodoSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{/* <FusePageCarded
				classes={{
					root: 'w-full',
					header: 'items-center min-h-72 h-72 sm:h-136 sm:min-h-136'
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				content={<TodoList />}
				// leftSidebarHeader={<TodoSidebarHeader />}
				// leftSidebarContent={<TodoSidebarContent />}
				ref={pageLayout}
				innerScroll
			/> */}
		</>
	);
}

export default withReducer('SettingApp', reducer)(SettingApp);
