/* =============================================================================
 TODO: NotesApp.js
 ===============================================================================
*This NotesApp is for project list page 
TODO: created for select project from project listing
*/
import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Fab from '@material-ui/core/Fab';
import { makeStyles, createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import { useTranslation } from 'react-i18next';
import AddProjectDialog from './AddProjectDialog';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import NotesHeader from './NotesHeader';
import NoteList from './NoteList';

function NotesApp(props) {
	const dispatch = useDispatch();
	const userInfo = decodeDataFromToken();
	const { t } = useTranslation('projects');
	const [loading, setLoading] = useState({
		loadingProjects: true,
		loadingProjectRequest: true
	});
	const getRole = () => userInfo?.extra?.profile.role;
	const useStyles = makeStyles(theme => ({
		addButton: {
			position: 'fixed',
			right: 100,
			bottom: 30,
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
		setLoading(loading => ({
			...loading,
			...data
		}));
	useEffect(() => {
		dispatch({
			type: Actions.RESET_PROEJECTS
		});
		// handleSetLoading({
		// 	loadingProjects: true,
		// 	loadingProjectRequest: true
		// });
		dispatch(Actions.getProjects(handleSetLoading));
		dispatch(Actions.getRequest(handleSetLoading));
	}, [dispatch]);
	const jss = create({
		...jssPreset(),
		plugins: [...jssPreset().plugins, jssExtend(), rtl()],
		insertionPoint: document.getElementById('jss-insertion-point')
	});

	const generateClassName = createGenerateClassName();
	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-16 sm:p-24 md:px-32 pb-80 sm:pb-80',
					content: 'flex min-h-full',
					leftSidebar: 'w-256 border-0',
					header: 'project_list p-16 sm:p-32 h-auto min-h-auto sm:pb-0'
				}}
				header={<NotesHeader pageLayout={pageLayout} />}
				content={
					<div className="flex flex-col w-full items-center">
						{/* <NewNote /> */}
						{/* <Button onClick={handleDownload}>Download</Button> */}
						<NoteList {...loading} handleSetLoading={handleSetLoading} />
						<AddProjectDialog />
						{/* <NoteDialog /> */}
						{/* <LabelsDialog /> */}
					</div>
				}
				// leftSidebarContent={<NotesSidebarContent />}
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
