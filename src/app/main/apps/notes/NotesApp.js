import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
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
import { Button } from '@material-ui/core';
// import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import DownloadPdf from './DownloadPdf';
import TodoList from './todo/TodoList';
import { create } from 'jss';
import jssExtend from 'jss-plugin-extend';
import rtl from 'jss-rtl';
import { createGenerateClassName, jssPreset, StylesProvider } from '@material-ui/core/styles';
import Provider from 'react-redux/es/components/Provider';
import { Router } from 'react-router-dom';
import store from 'app/store';
import history from '@history';
import TodoApp from './todo/TodoApp';

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
	const handleDownload = () => {
		let Comp = () => (
			<StylesProvider jss={jss} generateClassName={generateClassName}>
				<Provider store={store}>
					<Router history={history}>
						<TodoApp />
					</Router>
				</Provider>
			</StylesProvider>
		);
		let a = ReactDOM.render(<Comp />, document.getElementById('rootpdf'));
		console.log({
			a
		});
		// const input = document.getElementById("project-list");
		// html2canvas(input)
		// 	.then((canvas) => {
		// 		const imgData = canvas.toDataURL('image/png');
		// 		const pdf = new jsPDF();
		// 		pdf.addImage(imgData, 'PNG', 0, 0);
		// 		pdf.save("download.pdf");
		// 	});
		// ;
	};
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
						<Button onClick={handleDownload}>Download</Button>
						{/* <DownloadPdf label="Download" id="project-list" /> */}
						<NoteList {...loading} />
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
