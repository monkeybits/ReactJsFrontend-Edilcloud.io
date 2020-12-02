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

function ProjectDetails(props) {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(0);
	const [openDialog, setOpenDialog] = React.useState(false);
	const pageLayout = useRef(null);
	const params = useParams();
	let havePaddingTabs = [0];
	useEffect(() => {
		if (params.id) {
			dispatch(Actions.getProjectDetail(params.id));
			let tab = params.tab;
			if (tab == 'chat') {
				setValue(1);
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
			<CreatePostDialog />
			<TodoDialog />
			<TaskContentDialog />
		</>
	);
}

export default withReducer('notesApp', reducer)(ProjectDetails);
