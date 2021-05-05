import withReducer from 'app/store/withReducer';
import loadable from '@loadable/component';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FusePageSimple from '@fuse/core/FusePageSimple';
import * as Actions from './store/actions';
import reducer from './store/reducers';
const TodoHeader = loadable(() => import('./TodoHeader'))
const TodoSidebarContent = loadable(() => import('./TodoSidebarContent'))
const TodoList = loadable(() => import('./TodoList'))
const UserStorageChart = loadable(() => import('./UserStorageChart'))
const BillingContent = loadable(() => import('./BillingContent'))
const CompanyCreationStepper = loadable(() => import('app/main/companyCreation/CompanyCreationStepper'))
const EditProfileStepper = loadable(() => import('app/main/editMainProfile/EditProfileStepper'))

function SettingApp() {
	const dispatch = useDispatch();

	const filterKey = useSelector(({ SettingApp }) => SettingApp.setting.filterKey);

	console.log('filterKey??????????????', filterKey)

	const pageLayout = useRef(null);
	// const routeParams = useParams();

	useEffect(() => {
		dispatch(Actions.getSettings());
	}, []);

	// useDeepCompareEffect(() => {
	// 	dispatch(Actions.getTodos(routeParams));
	// }, [dispatch, routeParams]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-350 border-0 setting-left-sidebar',
					// header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					customHeader: 'flex flex-auto flex-col container z-10 h-full chat-header-bg-remove',
					wrapper: 'min-h-0 team-tab'
				}}
				header={<TodoHeader pageLayout={pageLayout} />}
				content={
					<>
						{
							filterKey === 'edit_profile' &&
							<EditProfileStepper />
						}
						{
							filterKey === 'company' &&
							<CompanyCreationStepper />
						}
						{
							filterKey === 'billings' &&
							<BillingContent />
						}
						{
							filterKey === 'storage' &&
							<UserStorageChart />
						}
						{
							filterKey === 'notifications' &&
							<TodoList />
						}
					</>
				}
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
