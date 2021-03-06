import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import { useParams } from 'react-router';
import { makeStyles, Typography, Button } from '@material-ui/core';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { ADD_TASK_TO_PROJECT } from 'app/services/apiEndPoints';
import axios from 'app/services/axiosConfig';
import { toast } from 'react-toastify';
import { gantt } from 'dhtmlx-gantt';
import moment from 'moment';
import { ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from 'react-responsive';
import * as accessibilityPanelActions from 'app/fuse-layouts/shared-components/accessibility/store/actions';
import * as Actions from '../todo/store/actions';
import * as ChatActions from 'app/main/apps/chat/store/actions';
import loadable from '@loadable/component';
import useScript from './useScript'
const ImportExcelDialog = loadable(() => import('./ImportExcelDialog'));
const CreateTasks = loadable(() => import('./CreateTasks'));
// const useScript = loadable(() => import('./useScript'));
const TaskContentDialog = loadable(() => import('../todo/Dialog/TaskContentDialog'));
const CreatePostDialog = loadable(() => import('../todo/CreatePostDialog'));
const Gantt = loadable(() => import('./Gantt'));

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff'
	}
}));
function GanttWrapper(props) {
	useScript('https://export.dhtmlx.com/gantt/api.js');
	const classes = useStyles();
	const [target, setTarget] = React.useState(null);
	const [open, setOpen] = React.useState(false);
	const ganttRef = null;
	const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-device-width: 1224px)'
	});
	const dispatch = useDispatch();
	const routeParams = useParams();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const entities = useSelector(({ todoAppNote }) => todoAppNote.todos.entities);
	const [state, setState] = useState({
		device: 'computer',
		orientation: 'portrait'
	});
	const handleClickOpen = () => {
		setOpen(true);
	};
	const orientation = 'portrait';
	useDeepCompareEffect(() => {
		dispatch(Actions.getTodos(routeParams.id, true));
		dispatch(ChatActions.companyInfo());
		return () => {
			dispatch({
				type: Actions.GET_TODOS,
				payload: [],
				isGantt: true
			});
		};
	}, [dispatch, routeParams, props.value]);
	useEffect(() => {
		if (isDesktopOrLaptop) {
			setState(prev => ({ ...prev, orientation: 'desktop' }));
		} else if (isPortrait) {
			setState(prev => ({ ...prev, orientation: 'portrait' }));
		} else {
			setState(prev => ({ ...prev, orientation: 'landscape' }));
		}
	}, [isPortrait]);

	const isViewChart = state.orientation == 'desktop' || state.orientation == 'landscape';
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const handleUploadListOfTasks = list => {
		const token = localStorage.getItem('jwt_access_token');
		axios
			.post(ADD_TASK_TO_PROJECT(routeParams.id), list, {
				headers: {
					Authorization: `JWT ${token}`
				}
			})
			.then(res => {
				dispatch(Actions.getTodos(routeParams.id, true));
			})
			.catch(err => {
				// console.log(err)
			});
	};
	const importExcel = data => {
		const file = data || target;
		if (file) {
			setOpen(false);
			gantt.importFromExcel({
				server: 'https://export.dhtmlx.com/gantt',
				data: file,
				callback: project => {
					if (project) {
						try {
							const header = [];
							const headerControls = [];
							const body = [];
							const listOfData = project.map(item => ({
								name: item['Task name'],
								progress: item['Completed percentage'],
								date_start: item['Start time']
									? moment(item['Start time']).format('YYYY-MM-DD')
									: undefined,
								date_end: item['End time'] ? moment(item['End time']).format('YYYY-MM-DD') : undefined
							}));
							project.forEach(function (task) {
								let cols = [];
								if (!header.length) {
									for (const i in task) {
										header.push(i);
									}
									header.forEach(function (col, index) {
										cols.push(`<th>${col}</th>`);
										// headerControls.push(
										// 	"<td><select data-column-mapping='" +
										// 		col +
										// 		"'>" +
										// 		getOptions(index) +
										// 		'</select>'
										// );
									});
									body.push(`<tr>${cols.join('')}</tr>`);
									body.push(`<tr>${headerControls.join('')}</tr>`);
								}
								cols = [];
								header.forEach(function (col) {
									cols.push(`<td>${task[col]}</td>`);
								});
								body.push(`<tr>${cols.join('')}</tr>`);
							});

							const div = gantt.modalbox({
								title: 'Assign columns',
								type: 'excel-form',
								text: `<div class="table-responsive"> <table class="table m-0">${body.join(
									''
								)}</table> </div>`,
								buttons: [
									{ label: 'Save', css: 'link_save_btn', value: 'save' },
									{ label: 'Cancel', css: 'link_cancel_btn', value: 'cancel' }
								],
								callback: result => {
									switch (result) {
										case 'save':
											dispatch(Actions.setLoading(true));
											handleUploadListOfTasks(listOfData, () => {});
											// var selects = div.querySelectorAll(
											// 	'[data-column-mapping]'
											// );
											// var mapping = {};
											// selects.forEach(function (select) {
											// 	mapping[
											// 		select.getAttribute('data-column-mapping')
											// 	] = select.value;
											// });
											// loadTable(mapping, project);
											break;
										case 'cancel':
											// Cancel
											break;
									}
								}
							});
						} catch {
							toast.error('Not supported ');
						}
					}
				}
			});
		}
	};
	
	return (
		<div>
			<ThemeProvider theme={mainTheme}>
				<div className="flex flex-1 dashboard-todo-header w-full">
					<div className="project_list h-auto bg-dark-blue min-h-auto w-full p-16">
						<div>
							<Typography className="sm:flex pt-4 text-white mx-0 sm:mx-12" variant="h6">
								{projectDetail.name}
							</Typography>
							<Typography className="sm:flex pb-8 text-white mx-0 sm:mx-12" variant="p">
								{projectDetail.address}
							</Typography>
						</div>
						<div className="flex flex-1 items-center justify-between">
							<Typography className="sm:flex pt-4 pb-8 text-white mx-0 sm:mx-12" variant="h6">
								Gantt
							</Typography>
						</div>
					</div>
				</div>
			</ThemeProvider>
			<div className={!isViewChart && 'hidden'}>
			{/* <div> */}
				<Gantt
					{...{ ...props, company, projectDetail, orientation: state.orientation }}
					importExcel={importExcel}
				/>
				{projectDetail.company?.id == company.id && (getRole() == 'd' || getRole() == 'o') && (
					<CreateTasks
						importExcel={ev => {
							handleClickOpen();
						}}
						createTasks={ev => dispatch(Actions.openNewTodoDialog())}
					/>
				)}
				<ImportExcelDialog {...{ open, setOpen, target, setTarget }} onImport={() => importExcel(undefined)} />
			</div>
			<img className={isViewChart && 'hidden'} src="/assets/images/patterns/rotate_5146697.png" />
			<Typography className={`text-center py-16 ${isViewChart && 'hidden'}`} color="textSecondary" variant="h5">Rotate screen horizontal to see gantt.</Typography>
			<CreatePostDialog isGantt={props.value == 4} />
			<TaskContentDialog isGantt={props.value == 4} />
		</div>
	);
}

export default GanttWrapper;
