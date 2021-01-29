import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import LabelsDialog from '../dialogs/labels/LabelsDialog';
import NoteDialog from '../dialogs/note/NoteDialog';
import NewNote from '../NewNote';
import NoteList from '../NoteList';
import ProjectDetailHeader from './ProjectDetailHeader';
import NotesSidebarContent from '../NotesSidebarContent';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import ProjectContent from './ProjectContent';
import { useParams, useRouteMatch } from 'react-router';
import ProjectInfo from './ProjectInfo';
import CreatePostDialog from '../todo/CreatePostDialog';
import TodoDialog from '../todo/TodoDialog';
import TaskContentDialog from '../todo/Dialog/TaskContentDialog';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';

function ProjectDetails(props) {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(0);
	const [openDialog, setOpenDialog] = React.useState(false);
	const pageLayout = useRef(null);
	const params = useParams();
	let havePaddingTabs = [0];

	useEffect(() => {
		if (params.id) {
			if (params.dataId) {
				let key = params.tab == 'task' ? 'task_id' : 'activity_id';
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

			let tab = params.tab;
			if (tab == 'chat') {
				setValue(1);
			} else if (tab == 'task' || tab == 'activity') {
				setValue(2);
			} else if (tab == 'filemanager') {
				setValue(3);
			} else if (tab == 'gantt') {
				setValue(4);
			} else {
				setValue(0);
			}
		}
	}, [dispatch, params.id]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: value == 4 ? '' : havePaddingTabs.includes(value) ? 'pb-60' : 'pb-60',
					content: 'flex min-h-full tabs-content custom-padding-small',
					leftSidebar: 'w-256 border-0',
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
		</>
	);
}

export default withReducer('notesApp', reducer)(ProjectDetails);
