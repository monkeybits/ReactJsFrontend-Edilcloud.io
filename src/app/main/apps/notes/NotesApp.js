import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import LabelsDialog from './dialogs/labels/LabelsDialog';
import NoteDialog from './dialogs/note/NoteDialog';
import NewNote from './NewNote';
import NoteList from './NoteList';
import NotesHeader from './NotesHeader';
import NotesSidebarContent from './NotesSidebarContent';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import AddProjectDialog from './AddProjectDialog';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

function NotesApp(props) {
	const dispatch = useDispatch();

	const useStyles = makeStyles({
		addButton: {
			position: 'absolute',
			right: 12,
			bottom: 12,
			zIndex: 99
		}
	});
	const classes = useStyles(props);
	const pageLayout = useRef(null);

	useEffect(() => {
		dispatch(Actions.getProjects());
		// dispatch(Actions.getLabels());
	}, [dispatch]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-16 sm:p-24 pb-80',
					content: 'flex min-h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72'
				}}
				header={<NotesHeader pageLayout={pageLayout} />}
				content={
					<div className="flex flex-col w-full items-center">
						{/* <NewNote /> */}
						<NoteList />
						<AddProjectDialog />
						{/* <NoteDialog /> */}
						{/* <LabelsDialog /> */}
					</div>
				}
				leftSidebarContent={<NotesSidebarContent />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<FuseAnimate animation="transition.expandIn" delay={300}>
				<Fab
					color="primary"
					aria-label="add"
					className={classes.addButton}
				>
					<Icon>person_add</Icon>
				</Fab>
			</FuseAnimate>
			
		</>
	);
}

export default withReducer('notesApp', reducer)(NotesApp);
