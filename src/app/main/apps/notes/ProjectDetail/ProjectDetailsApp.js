import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import loadable from '@loadable/component';
const StatusConfirmDialog = loadable(() => import('../../todo/StatusConfirmDialog'));
const TodoDialog = loadable(() => import('../todo/TodoDialog'));
const ProjectInfo = loadable(() => import('./ProjectInfo'));
const ProjectContent = loadable(() => import('./ProjectContent'));

function ProjectDetails(props) {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(2);
	const [openDialog, setOpenDialog] = React.useState(false);
	const pageLayout = useRef(null);
	const params = useParams();
	const havePaddingTabs = [0];

	useEffect(() => {
		if (params.id) {
			if (params.dataId) {
				const key = params.tab == 'task' ? 'task_id' : 'activity_id';
				dispatch(
					notificationActions.addNotificationData({
						notification: {
							body: {
								[key]: params.dataId,
								comment_id: params.cid
							},
							content_type: params.pid
								? 'post'
								: params.cid_pid
								? 'comment'
								: params.aid
								? 'activity'
								: params.tab,
							object_id: params.pid
								? params.pid
								: params.cid
								? params.cid
								: params.aid
								? params.aid
								: params.dataId
						}
					})
				);
			}
			dispatch(Actions.getProjectDetail(params.id));

			const { tab } = params;
			if (tab == 'chat') {
				setValue(1);
			} else if (tab == 'task' || tab == 'activity') {
				setValue(2);
			} else if (tab == 'filemanager') {
				setValue(3);
			} else if (tab == 'gantt') {
				setValue(4);
			} else {
				setValue(2);
			}
		}
	}, [dispatch, params.id]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: value == 4 ? '' : havePaddingTabs.includes(value) ? 'pb-60' : 'pb-60',
					content: 'flex min-h-full tabs-content custom-padding-small',
					leftSidebar: 'w-350 border-0',
					header: 'h-auto min-h-auto bg-body'
				}}
				// header={<ProjectDetailHeader onOpen={() => setOpenDialog(true)} pageLayout={pageLayout} />}
				content={<ProjectContent {...{ value, setValue, setOpenDialog }} />}
				// leftSidebarContent={<NotesSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<ProjectInfo openDialog={openDialog} closeDialog={() => setOpenDialog(false)} />
			{/* <CreatePostDialog /> */}
			<TodoDialog />
			{/* <TaskContentDialog /> */}
			<StatusConfirmDialog />
		</>
	);
}

export default withReducer('notesApp', reducer)(ProjectDetails);
