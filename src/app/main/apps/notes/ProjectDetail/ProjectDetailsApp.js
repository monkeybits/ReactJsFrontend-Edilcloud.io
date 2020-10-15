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
import { useRouteMatch } from 'react-router';
import ProjectInfo from './ProjectInfo';

function ProjectDetails(props) {
	const dispatch = useDispatch();
	const [value, setValue] = React.useState(4);
	const [openDialog, setOpenDialog] = React.useState(false);
	const pageLayout = useRef(null);
	const match = useRouteMatch();
	let havePaddingTabs = [0];
	useEffect(() => {
		if (match.params.id) {
			dispatch(Actions.getProjectDetail(match.params.id));
		}
	}, [dispatch, match.params.id]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: value==4 ? 'p-16 sm:p-24': havePaddingTabs.includes(value) ? 'p-16 sm:p-24 pb-80' : 'pb-80',
					content: 'flex min-h-full tabs-content custom-padding-small',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 '
				}}
				header={<ProjectDetailHeader onOpen={() => setOpenDialog(true)} pageLayout={pageLayout} />}
				content={<ProjectContent {...{ value, setValue }} />}
				// leftSidebarContent={<NotesSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<ProjectInfo openDialog={openDialog} closeDialog={() => setOpenDialog(false)} />
		</>
	);
}

export default withReducer('notesApp', reducer)(ProjectDetails);
