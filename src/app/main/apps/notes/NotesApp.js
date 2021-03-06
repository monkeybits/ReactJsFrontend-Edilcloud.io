/* =============================================================================
 TODO: NotesApp.js
 ===============================================================================
*This NotesApp is for project list page 
TODO: created for select project from project listing
*/
import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { makeStyles, createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import { useTranslation } from 'react-i18next';
import reducer from './store/reducers';
import * as Actions from './store/actions';
import loadable from '@loadable/component';
const AddProjectDialog = loadable(() => import('./AddProjectDialog'));
const NotesHeader = loadable(() => import('./NotesHeader'));
const NoteList = loadable(() => import('./NoteList'));
const NotesSidebarContent = loadable(() => import('./NotesSidebarContent'));
const ConfirmDeleteDialog = loadable(() => import('./ConfirmDeleteDialog'));
const ConfirmArchiveDialog = loadable(() => import('./ConfirmArchiveDialog'));
const ProjectFloationButton = loadable(() => import('./ProjectFloationButton'));

function NotesApp(props) {
	const dispatch = useDispatch();
	const userInfo = decodeDataFromToken();
	const { t } = useTranslation('projects');
	const [defaultMenu, setDefaultMenu] = useState(false);
	const [foldedAndOpened, setFoldedAndOpened] = useState(false);
	const config = useSelector(({ fuse }) => fuse.settings.current.layout.config);
	const navbar = useSelector(({ fuse }) => fuse.navbar);
	const toggleSidebarMenu = useSelector(({ fuse }) => fuse.settings.toggleSidebarMenu);
	const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	const { folded } = config.navbar;

	useEffect(() => {
		if (toggleSidebarMenu) {
			setDefaultMenu(false);
		} 
		// else {
		// 	setDefaultMenu(true);
		// }
	}, [toggleSidebarMenu]);

	const foldedAndClosed = folded && !navbar.foldedOpen;
	useEffect(() => {
		const foldedAndOpened = folded && navbar.foldedOpen;
		setTimeout(() => {
			if (foldedAndOpened) {
				setDefaultMenu(false);
				setFoldedAndOpened(foldedAndOpened);
			}
		}, 200);
		if (!foldedAndOpened) {
			setFoldedAndOpened(foldedAndOpened);
		}
	}, [folded, navbar]);

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
					content: `flex min-h-full`,
					leftSidebar: `w-350 border-0 ${foldedAndOpened || defaultMenu ? 'ml-19' : ''}`
				}}
				header={<NotesHeader pageLayout={pageLayout} />}
				content={
					<div className="flex flex-col w-full items-center">
						<NoteList pageLayout={pageLayout} {...loading} handleSetLoading={handleSetLoading} />
						<AddProjectDialog />
					</div>
				}
				leftSidebarContent={<NotesSidebarContent pageLayout={pageLayout} />}
				leftSidebarVariant
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			{(getRole() == 'o' || getRole() == 'd') && (
				<FuseAnimate animation="transition.expandIn" delay={300}>
					<ProjectFloationButton
						color="secondary"
						className=" ltr:left-0 rtl:right-0 mx-16 z-999"
						callAction={name => {
							dispatch(Actions.openProjectDialog('new', name));
						}}
					/>
				</FuseAnimate>
			)}
			<ConfirmDeleteDialog />
			<ConfirmArchiveDialog />
		</>
	);
}

export default withReducer('notesApp', reducer)(NotesApp);
