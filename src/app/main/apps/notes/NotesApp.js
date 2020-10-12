import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { decodeDataFromToken } from 'app/services/serviceUtils';
function NotesApp(props) {
	const dispatch = useDispatch();
	const userInfo = decodeDataFromToken();
	const [loading, setLoading] = useState({
		loadingProjects: false,
		loadingProjectRequest: false
	});
	const getRole = () => userInfo?.extra?.profile.role;
	const useStyles = makeStyles(theme => ({
		addButton: {
			position: 'fixed',
			right: 82,
			bottom: 12,
			zIndex: 99,
			[theme.breakpoints.down('md')]: {
				right: 24,
				bottom: 24
			}
		}
	}));
	const classes = useStyles(props);
	const pageLayout = useRef(null);
	const handleSetLoading = data =>
		setLoading(loading=>({
			...loading,
			...data
		}));
	useEffect(() => {
		dispatch({
			type: Actions.RESET_PROEJECTS
		});
		handleSetLoading({
			loadingProjects: true,
			loadingProjectRequest: true
		});
		dispatch(Actions.getProjects(handleSetLoading));
		dispatch(Actions.getRequest(handleSetLoading));
	}, [dispatch]);

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-16 sm:p-24 pb-80 sm:pb-80',
					content: 'flex min-h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72'
				}}
				header={<NotesHeader pageLayout={pageLayout} />}
				content={
					<div className="flex flex-col w-full items-center">
						{/* <NewNote /> */}
						<NoteList {...loading} />
						<AddProjectDialog />
						{/* <NoteDialog /> */}
						{/* <LabelsDialog /> */}
					</div>
				}
				leftSidebarContent={<NotesSidebarContent />}
				sidebarInner
				ref={pageLayout}
				// innerScroll
			/>
			{(getRole() == 'o' || getRole() == 'd') && (
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<Fab
						color="primary"
						aria-label="add"
						className={classes.addButton}
						onClick={() => dispatch(Actions.openProjectDialog('new'))}
					>
						<FontAwesomeIcon icon={faPlus} size="1x" />
					</Fab>
				</FuseAnimate>
			)}
		</>
	);
}

export default withReducer('notesApp', reducer)(NotesApp);
