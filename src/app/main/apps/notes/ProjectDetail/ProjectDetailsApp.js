import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import LabelsDialog from '../dialogs/labels/LabelsDialog';
import NoteDialog from '../dialogs/note/NoteDialog';
import NewNote from '../NewNote';
import NoteList from '../NoteList';
import NotesHeader from '../NotesHeader';
import NotesSidebarContent from '../NotesSidebarContent';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import ProjectContent from './ProjectContent';
import { useRouteMatch } from 'react-router';

function ProjectDetails(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	const match = useRouteMatch();

	useEffect(() => {
		if (match.params) {
			dispatch(Actions.getProjectDetail(match.params.id));
		}
	}, [dispatch, match]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-16 sm:p-24 pb-80',
					content: 'flex min-h-full tabs-content',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72'
				}}
				header={<NotesHeader pageLayout={pageLayout} />}
				content={<ProjectContent />}
				// leftSidebarContent={<NotesSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
		</>
	);
}

export default withReducer('notesApp', reducer)(ProjectDetails);
