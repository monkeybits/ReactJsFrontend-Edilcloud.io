import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
import './dhtmlxgantt.css';
import connect from 'react-redux/es/connect/connect';
import moment from 'moment';
import * as Actions from '../todo/store/actions';
import { bindActionCreators } from 'redux';
import { fileDragAndDrop } from './common/dhx_file_dnd';
import { withRouter } from 'react-router';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { EDIT_TASK_TO_PROJECT, ADD_TASK_TO_PROJECT, EDIT_ACTIVITY_TO_TASK } from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import axios from 'app/services/axiosConfig';
import { Button } from '@material-ui/core';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from '@material-ui/core/Typography';
import FuseAnimate from '@fuse/core/FuseAnimate';
import {
	faFilePdf,
	faFile,
	faFileExcel,
	faFileVideo,
	faFileAudio,
	faFileImage,
	faFileWord,
	faFileCode,
	faFileArchive,
	faArrowAltCircleLeft,
	faArrowAltCircleRight
} from '@fortawesome/free-regular-svg-icons';
import { faDownload, faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons';
// data: [
// 	{ id: 1, text: 'Task #1', start_date: '15-04-2019', duration: 3, progress: 0.6 },
// 	{ id: 2, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 }
// ],
// links: [{ id: 1, source: 1, target: 2, type: '0' }]
function ganttInitZoom() {
	var zoomConfig = {
		startDate: new Date(),
		maxColumnWidth: 92,
		minColumnWidth: 20,
		levels: [
			{
				name: 'hour1',
				scale_unit: 'day',
				date_scale: '%d %M',
				scale_height: 60,
				min_column_width: 30,
				subscales: [{ unit: 'hour', step: 1, date: '%H' }]
			},
			{
				name: 'hour2',
				scale_unit: 'day',
				date_scale: '%d %M',
				scale_height: 60,
				min_column_width: 45,
				subscales: [{ unit: 'hour', step: 1, date: '%H' }]
			},
			{
				name: 'day1',
				min_column_width: 60,
				scale_unit: 'week',
				date_scale: '#%W',
				subscales: [{ unit: 'day', step: 1, date: '%d %M' }],
				scale_height: 60
			},
			{
				name: 'day2',
				min_column_width: 70,
				scale_unit: 'week',
				date_scale: '#%W',
				subscales: [{ unit: 'day', step: 1, date: '%d %M' }],
				scale_height: 60
			},
			{
				name: 'month1',
				min_column_width: 80,
				scale_unit: 'month',
				date_scale: '%F',
				scale_height: 60,
				subscales: [{ unit: 'week', step: 1, date: '#%W' }]
			},
			{
				name: 'year1',
				min_column_width: 92,
				scale_unit: 'year',
				date_scale: '%Y',
				scale_height: 60,
				subscales: [{ unit: 'year', step: 1, date: '%d %M %Y' }]
			}
		]
	};
	gantt.ext.zoom.init(zoomConfig);
}
function to_snake_case(name) {
	return (name + '').toLowerCase().replace(/ /, '_');
}

function loadTable(mapping, data) {
	var ganttDataset = {
		data: [],
		links: []
	};

	data.forEach(function (item) {
		var copy = {};
		for (var i in item) {
			if (mapping[i]) {
				copy[mapping[i]] = item[i];
			} else {
				copy[to_snake_case(i)] = item[i];
			}

			copy.open = true;
			if (copy.wbs) {
				var wbs = copy.wbs + '';
				copy.id = wbs;
				var parts = wbs.split('.');
				parts.pop();
				copy.parent = parts.join('.');
			}
		}
		ganttDataset.data.push(copy);
	});

	gantt.clearAll();
	gantt.parse(ganttDataset);
}

function getOptions(selectedIndex) {
	return ['wbs', 'text', 'start_date', 'duration', 'end_date', 'id', 'parent']
		.map(function (name, index) {
			return (
				"<option value='" + name + "' " + (selectedIndex == index ? 'selected' : '') + '>' + name + '</option>'
			);
		})
		.join('');
}
function shiftTask(task_id, direction) {
	var task = gantt.getTask(task_id);

	task.start_date = gantt.date.add(task.start_date, direction, 'day');
	task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
	gantt.updateTask(task.id);
}
function sortHolders(a, b) {
	return a.mainId > b.mainId ? 1 : a.mainId < b.mainId ? -1 : 0;
}
class Gantt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			toggleLeft: false,
			tasks: undefined,
			zoomLevel: 2,
			expandAll: false,
			openTasks: []
		};
		this.fileDnD = null;
	}

	componentWillUnmount() {
		if (this.dataProcessor) {
			this.dataProcessor.destructor();
			this.dataProcessor = null;
		}
	}
	componentDidMount() {
		gantt.clearAll();
		ganttInitZoom();
		this.addDragEvent();
		gantt.plugins({
			multiselect: true,
			fullscreen: true,
			marker: true
		});
		gantt.config.multiselect = true;
		document.addEventListener('fullscreenchange', exitHandler);
		document.addEventListener('webkitfullscreenchange', exitHandler);
		document.addEventListener('mozfullscreenchange', exitHandler);
		document.addEventListener('MSFullscreenChange', exitHandler);

		function exitHandler() {
			if (
				!document.fullscreenElement &&
				!document.webkitIsFullScreen &&
				!document.mozFullScreen &&
				!document.msFullscreenElement
			) {
				if (!gantt.getState().fullscreen) {
					document.body.className = '';
				}
			}
		}

		this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
			return new Promise((resolve, reject) => {
				if (item.parent == 0) {
					this.editTodo(
						{
							name: item.data.name,
							description: item.data.note,
							id: item.data.id,
							company: item.data.assigned_company,
							progress: item.data.progress,
							date_start: item.start_date,
							date_end: item.end_date
						},
						this.props.match.params.id
					);
				} else {
					this.editTodoActivty({
						name: item.data.title,
						description: item.data.description,
						id: item.data.id,
						profile: item.data.workers,
						date_start: item.start_date,
						date_end: item.end_date
					});
				}
				resolve();
			});
		});
	}
	editTodo = (todo, pid) => {
		let values = {
			name: todo.name,
			note: todo.description,
			progress: todo.progress,
			date_start: moment(todo.date_start).format('YYYY-MM-DD'),
			date_end: moment(todo.date_end).format('YYYY-MM-DD'),
			assigned_company: todo.company && todo.company[0] ? todo.company[0].data.profile.company.id : null,
			project: pid,
			date_completed: null,
			alert: false,
			starred: false
		};
		apiCall(
			EDIT_TASK_TO_PROJECT(todo.id),
			values,
			res => {
				this.props.getTodos(this.props.match.params.id, true);
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
	editTodoActivty = todo => {
		let values = {
			title: todo.name,
			description: todo.description,
			datetime_start: moment(todo.date_start).format('YYYY-MM-DD'),
			datetime_end: moment(todo.date_end).format('YYYY-MM-DD'),
			workers: todo.profile?.length ? todo.profile.map(d => d.id) : undefined
		};

		apiCall(
			EDIT_ACTIVITY_TO_TASK(todo.id),
			values,
			res => {
				this.props.getTodos(this.props.match.params.id, true);
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
	shouldComponentUpdate(nextProps, nextState) {
		const { todos, company, projectDetail } = nextProps;
		if (
			(company && projectDetail.company && JSON.stringify(company) != JSON.stringify(this.props.company)) ||
			JSON.stringify(projectDetail.company) != JSON.stringify(this.props.projectDetail.company)
		) {
			this.templatePermissions(projectDetail, company);
			return true;
		} else if (
			this.props.todos?.entities &&
			todos?.entities &&
			JSON.stringify(todos.entities) !== JSON.stringify(this.props.todos.entities)
		) {
			this.ganttInit(todos);
			return false;
		} else if (this.state.toggleLeft != nextState.toggleLeft) {
			return true;
		} else if (!nextState.tasks?.data?.length) {
			return true;
		}
		return false;

		// if (this.props.zoom !== nextProps.zoom && this.state.tasks) {
		// 	this.createGantt(this.state.tasks);
		// 	return true;
		// }

		// if (!this.state.tasks) {
		// 	return true;
		// }
	}

	ganttInit = todos => {
		gantt.config.start_date = new Date([2018]);
		gantt.config.end_date = new Date([2022]);

		let tasks = {
			data: Object.values(todos.entities).map((data, i) => {
				return data.parent == 0
					? {
							...{
								id: data.id,
								text: data.name,
								start_date: data.date_start,
								end_date: data.date_end, //new Date(data.date_end.split('-'), 23, 59, 59, 100), //new Date(2018, 11, 24, 23, 59, 59, 100), //end_date: moment(data.date_end).add(1, 'days').format('YYYY-MM-DD'),
								progress: data.progress / 100,
								company: data?.assigned_company?.name,
								parent: 0,
								mainId: data.id
							},
							data
					  }
					: {
							...{
								id: Math.floor(Math.random() * 9999),
								text: data.title,
								start_date: data.datetime_start,
								end_date: data.datetime_end, //new Date(data.datetime_end.split('-'), 23, 59, 59, 100), //end_date: moment(data.date_end).add(1, 'days').format('YYYY-MM-DD'),
								progress: data.status == 'completed' ? 1 : 0,
								company: data?.assigned_company?.name,
								mainId: data.id,
								parent: data.task
							},
							data
					  };
			})
		};

		this.ganttCallback(
			() =>
				this.setState(
					{
						tasks
					},
					() => this.createGantt(tasks)
				),
			() => gantt.clearAll()
		);
	};

	createGantt = tasks => {
		gantt.config.xml_date = '%Y-%m-%d %H:%i';
		if (this.state.toggleLeft) {
			gantt.config.columns = [];
			// start block for resize
			gantt.config.layout = {
				css: 'gantt_container',
				cols: [
					{
						rows: [
							{ view: 'timeline', scrollX: 'scrollHor', scrollY: 'scrollVer' },
							{ view: 'scrollbar', id: 'scrollHor' }
						]
					},
					{ view: 'scrollbar', id: 'scrollVer' }
				]
			};
		} else {
			gantt.config.columns = [
				{ name: 'text', label: 'Task name', tree: true, width: 150 },
				{ name: 'start_date', label: 'Start Date', width: 100 },
				{ name: 'end_date', label: 'End Date', width: 100 },
				{ name: 'company', label: 'Company', width: 100 },
				{ name: 'add', width: 44, min_width: 44, max_width: 44 }
			];
			// start block for resize
			gantt.config.layout = {
				css: 'gantt_container',
				cols: [
					{
						width: 500,
						min_width: 400,

						// adding horizontal scrollbar to the grid via the scrollX attribute
						rows: [
							{ view: 'grid', scrollX: 'gridScroll', scrollable: true, scrollY: 'scrollVer' },
							{ view: 'scrollbar', id: 'gridScroll' }
						]
					},
					{ resizer: true, width: 1 },
					{
						rows: [
							{ view: 'timeline', scrollX: 'scrollHor', scrollY: 'scrollVer' },
							{ view: 'scrollbar', id: 'scrollHor' }
						]
					},
					{ view: 'scrollbar', id: 'scrollVer' }
				]
			};
		}
		gantt.init(this.ganttContainer);
		gantt.parse(tasks);
		gantt.templates.grid_date_format = function (date, column) {
			if (column === 'end_date') {
				let newDate = new Date(date.setHours(23, 59, 59, 100));
				return moment(newDate).format('YYYY-MM-DD');
			} else {
				return moment(date).format('YYYY-MM-DD');
			}
		};
		// end block for resize
		if (gantt._onTemplatesReadyHandler) {
			gantt.detachEvent(gantt._onTemplatesReadyHandler);
		}
		gantt._onTemplatesReadyHandler = gantt.attachEvent('onTemplatesReady', function () {
			var toggle = document.getElementById('fullScreen');

			toggle.onclick = function () {
				if (!gantt.getState().fullscreen) {
					document.body.className = 'gantt-custom-full-screen';
					gantt.expand();
				} else {
					document.body.className = '';
					setTimeout(() => {
						gantt.collapse();
					}, 300);
				}
			};
		});
		if (gantt._onTaskClickHandler) {
			gantt.detachEvent(gantt._onTaskClickHandler);
		}
		gantt._onTaskClickHandler = gantt.attachEvent('onTaskClick', (id, e) => {
			//any custom logic here
			setTimeout(() => {
				let task = gantt.getTask(id);
				if (task.$open) {
					this.setState(prev => ({
						openTasks: [...prev.openTasks, task.id]
					}));
				} else {
					this.setState(prev => ({
						openTasks: prev.openTasks.filter(tid => tid != id)
					}));
				}
			}, 500);

			return true;
		});
		gantt.ext.fullscreen.getFullscreenElement = function () {
			return document.getElementById('myCover');
		};

		gantt.sort(sortHolders);
		this.unSelectAllTask();
		if (this.state.expandAll) {
			this.openAll();
		} else {
			this.openTasksOnInit();
		}
		gantt.showLightbox = id => {
			let savedTask = gantt.getTask(id);
			if (gantt.isTaskExists(id)) {
				if (savedTask.$new == true) {
					delete savedTask.$new;
					gantt.deleteTask(id);
					if (savedTask.$level == 1) {
						let captureData = gantt.getTask(savedTask.parent);
						// let captureData = this.state.tasks.data.filter(task => task.id == savedTask.parent);
						// captureData = captureData && captureData.length ? captureData[0] : undefined;
						this.props.openAddActivityTodoDialog({ ...captureData.data, isGantt: true });
					} else {
						this.props.openNewTodoDialog({ isGantt: true });
					}
				} else {
					let captureData = savedTask; //this.state.tasks.data.filter(task => task.id == id);
					// captureData = captureData && captureData.length ? captureData[0] : undefined;

					if (captureData.data.parent) {
						return this.props.openTimelineDialog({
							todo: captureData.data,
							task: gantt.getTask(captureData.parent).data,
							isGantt: true
						});
					} else {
						const userInfo = decodeDataFromToken();
						const getRole = () => userInfo?.extra?.profile.role;
						if (getRole() == 'o' || getRole() == 'd') {
							return this.props.openTaskContent({ ...captureData.data, isGantt: true });
						} else {
							return null;
						}
					}
				}
			}
		};
		gantt.templates.scale_cell_class = function (date) {
			if (date.getDay() == 0 || date.getDay() == 6) {
				return 'weekend';
			}
		};
		gantt.templates.timeline_cell_class = function (task, date) {
			if (date.getDay() == 0 || date.getDay() == 6) {
				return 'weekend';
			}
		};
		this.createMarker(tasks);
		this.setState({
			loading: false
		});
	};
	templatePermissions = (projectDetail, company) => {
		const userInfo = decodeDataFromToken();
		const getRole = () => userInfo?.extra?.profile.role;
		if (projectDetail.company && company) {
			gantt.templates.grid_header_class = (CN, C) => {
				if (CN == 'add') {
					if (projectDetail.company?.id != company.id) {
						return 'hide_add';
					} else if (getRole() == 'w' || getRole() == 'm') {
						return 'hide_add';
					}
				}
			};
			gantt.templates.grid_row_class = (start, end, task) => {
				const userInfo = decodeDataFromToken();
				const getRole = () => userInfo?.extra?.profile.role;
				let className = '';
				if (task.$level >= 1) {
					className += ' nested_task';
				}
				if (!task.company) {
					className += ' hide_add';
				}
				if (task.data?.assigned_company?.id != company.id) {
					className += ' hide_add hide_tree_icon';
				}
				return className;
			};
			gantt.templates.task_class = (start, end, task) => {
				const userInfo = decodeDataFromToken();
				const getRole = () => userInfo?.extra?.profile.role;
				let className = '';
				if (task.parent) {
					className += ' nested_task_right hide_progress_drag';
				}
				if (task.parent == 0 && projectDetail.company?.id != company.id) {
					className += ' hide_date_drag';
				}
				if (
					(task.parent == 0 && company.id != projectDetail.company?.id) ||
					getRole() == 'm' ||
					getRole() == 'w'
				) {
					className += ' block_row_events';
				}
				return className;
			};
		}
	};
	createMarker = tasks => {
		if (tasks.data?.length) {
			var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
			var markerId = gantt.addMarker({
				start_date: new Date(),
				css: 'today',
				text: 'Now',
				title: dateToStr(new Date())
			});
			gantt.getMarker(markerId);
			let startDates = tasks.data.map(a => a.start_date && new Date(a.start_date.split('-')));
			let min = new Date(Math.min.apply(null, startDates));
			// min.setDate(min.getDate() + 1);
			{
				let markerId = gantt.addMarker({
					start_date: min,
					css: 'status_line',
					text: 'Start project',
					title: 'Start project: ' //+ dateToStr(new Date(min))
				});
				gantt.getMarker(markerId);
			}
		}
	};
	componentDidUpdate() {
		gantt.render();
	}
	setZoom(value) {
		switch (value) {
			case 'Hours' || 1:
				gantt.config.scale_unit = 'day';
				gantt.config.date_scale = '%d %M';
				gantt.config.scale_height = 60;
				gantt.config.min_column_width = 30;
				gantt.config.subscales = [{ unit: 'hour', step: 1, date: '%H' }];
				break;
			case 'Days' || 2:
				gantt.config.min_column_width = 70;
				gantt.config.scale_unit = 'week';
				gantt.config.date_scale = '#%W';
				gantt.config.subscales = [{ unit: 'day', step: 1, date: '%d %M' }];
				gantt.config.scale_height = 60;
				break;
			case 'Months' || 3:
				gantt.config.min_column_width = 44;
				gantt.config.scale_unit = 'month';
				gantt.config.date_scale = '%F';
				gantt.config.scale_height = 60;
				gantt.config.subscales = [{ unit: 'week', step: 1, date: '#%W' }];
				break;
			case 'Years' || 4:
				// {subscale_unit: "year", unit: "year", step: 1, date: "%Y"},
				// {
				// 	unit: "year", step: 5, template: function (date) {
				// 		var dateToStr = gantt.date.date_to_str("%Y");
				// 		var endDate = gantt.date.add(gantt.date.add(date, 5, "year"), -1, "day");
				// 		return dateToStr(date) + " - " + dateToStr(endDate);
				// 	}
				// }
				gantt.config.min_column_width = 70;
				gantt.config.scale_unit = 'year';
				gantt.config.date_scale = '%Y';
				gantt.config.scale_height = 60;
				gantt.config.subscales = [{ unit: 'year', step: 1, date: '%d %M %Y' }];
				break;
			default:
				break;
		}
	}
	onTaskSelectHandler = () => {
		// gantt.attachEvent('onTaskSelected', id => {
		//any custom logic here
		const userInfo = decodeDataFromToken();
		const getRole = () => userInfo?.extra?.profile.role;
		gantt.batchUpdate(() => {
			gantt.eachSelectedTask(task_id => {
				let task = gantt.getTask(task_id);
				if (task.$level == 1) {
					return;
				} else if (
					this.props.company.id != this.props.projectDetail.company?.id &&
					(getRole() == 'o' || getRole() == 'd')
				) {
					gantt.unselectTask(task_id);
				}
			});
		});
		// });
	};
	unSelectAllTask = () => {
		gantt.batchUpdate(function () {
			gantt.eachSelectedTask(function (task_id) {
				gantt.unselectTask(task_id);
			});
		});
	};
	handleUploadListOfTasks = list => {
		let token = localStorage.getItem('jwt_access_token');
		axios
			.post(ADD_TASK_TO_PROJECT(this.props.match.params.id), list, {
				headers: {
					Authorization: `JWT ${token}`
				}
			})
			.then(res => {
				this.props.getTodos(this.props.match.params.id, true);
			})
			.catch(err => console.log(err));
	};
	closeAll = () => {
		this.setState({
			expandAll: false
		});
		gantt.eachTask(function (task) {
			task.$open = false;
		});
		gantt.render();
	};

	openAll = () => {
		this.setState({
			expandAll: true
		});
		gantt.eachTask(task => {
			if (task.data.assigned_company?.id == this.props.company.id) {
				task.$open = true;
			}
		});
		gantt.render();
	};
	openTasksOnInit = () => {
		gantt.eachTask(task => {
			if (this.state.openTasks.includes(task.id)) {
				task.$open = true;
			}
		});
		gantt.render();
	};
	zoomIn = () => {
		gantt.ext.zoom.zoomIn();
		gantt.render();
	};
	zoomOut = () => {
		gantt.ext.zoom.zoomOut();
		gantt.render();
	};
	setZoomDefaultLevel = () => {
		gantt.ext.zoom.setLevel('month1');
	};
	exportPNG = () => {
		gantt.exportToPNG({
			name: 'mygantt.png',
			header: '<h1>My company</h1>',
			footer: '<h4>Bottom line</h4>',
			locale: 'en',
			start: '01-04-2013',
			end: '11-04-2013',
			skin: 'terrace',
			server: 'https://export.dhtmlx.com/gantt',
			raw: true
		});
	};
	exportPDF = () => {
		gantt.exportToPDF({
			name: 'mygantt.pdf',
			header: '<h1>My company</h1>',
			footer: '<h4>Bottom line</h4>',
			locale: 'en',
			skin: 'terrace',
			server: 'https://export.dhtmlx.com/gantt',
			raw: true
		});
	};
	exportMSProject = () => {
		gantt.exportToMSProject({
			skip_circular_links: false,
			server: 'https://export.dhtmlx.com/gantt'
		});
	};
	exportExcel = () => {
		gantt.exportToExcel();
	};
	moveForward = () => {
		gantt.eachSelectedTask(function (task_id) {
			shiftTask(task_id, 1);
		});
	};
	moveBackward = () => {
		gantt.eachSelectedTask(function (task_id) {
			shiftTask(task_id, -1);
		});
	};
	toggleLeftPanel = () => {
		if (!this.state.loading) {
			this.setState(
				prev => ({
					toggleLeft: !prev.toggleLeft,
					loading: true
				}),
				() => this.ganttInit(this.props.todos)
			);
		}
	};
	importExcel = fileInput => {
		if (fileInput.files[0]) {
			gantt.importFromExcel({
				server: 'https://export.dhtmlx.com/gantt',
				data: fileInput.files[0],
				callback: project => {
					if (project) {
						try {
							var header = [];
							var headerControls = [];
							var body = [];
							let listOfData = project.map(item => ({
								name: item['Task name'],
								progress: item['Completed percentage'],
								date_start: item['Start time']
									? moment(item['Start time']).format('YYYY-MM-DD')
									: undefined,
								date_end: item['End time'] ? moment(item['End time']).format('YYYY-MM-DD') : undefined
							}));
							project.forEach(function (task) {
								var cols = [];
								if (!header.length) {
									for (var i in task) {
										header.push(i);
									}
									header.forEach(function (col, index) {
										cols.push('<th>' + col + '</th>');
										headerControls.push(
											"<td><select data-column-mapping='" +
												col +
												"'>" +
												getOptions(index) +
												'</select>'
										);
									});
									body.push('<tr>' + cols.join('') + '</tr>');
									body.push('<tr>' + headerControls.join('') + '</tr>');
								}
								cols = [];
								header.forEach(function (col) {
									cols.push('<td>' + task[col] + '</td>');
								});
								body.push('<tr>' + cols.join('') + '</tr>');
							});

							var div = gantt.modalbox({
								title: 'Assign columns',
								type: 'excel-form',
								text:
									'<div class="table-responsive"> <table class="table m-0">' +
									body.join('') +
									'</table> </div>',
								buttons: [
									{ label: 'Save', css: 'link_save_btn', value: 'save' },
									{ label: 'Cancel', css: 'link_cancel_btn', value: 'cancel' }
								],
								callback: result => {
									switch (result) {
										case 'save':
											this.handleUploadListOfTasks(listOfData, () => {});
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
											//Cancel
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
	addDragEvent = () => {
		gantt.config.autoscroll = true;
		gantt.config.autoscroll_speed = 50;
	};
	ganttCallback = (actionCall, permissionsCall = this.onTaskSelectHandler) => {
		let myFirstPromise = new Promise((resolve, reject) => {
			// We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
			// In this example, we use setTimeout(...) to simulate async code.
			// In reality, you will probably be using something like XHR or an HTML5 API.
			permissionsCall();
			resolve();
		});

		myFirstPromise.then(() => {
			// successMessage is whatever we passed in the resolve(...) function above.
			// It doesn't have to be a string, but if it is only a succeed message, it probably will be.
			actionCall();
		});
	};
	render() {
		// const { zoom } = this.props;
		// this.setZoom(zoom);
		const userInfo = decodeDataFromToken();
		const getRole = () => userInfo?.extra?.profile.role;
		const permissionByRole = getRole() == 'o' || getRole() == 'd';
		const isUserHavePermssionsFromAdmin =
			this.props.company?.id == this.props.projectDetail?.company?.id && permissionByRole;
		return (
			<div>
				<div className="flex w-full justify-between bg-blue items-center p-24 pb-16">
					<div className="mr-20">
						
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="h5" className="font-weight-900 text-white mb-4">
								Project Name
							</Typography>
						</FuseAnimate>
						<Typography variant="subtitle1" className="text-14 font-weight-600 text-white">
							Via San Giovanni Bosco 3, Bariano (BG) Italia
						</Typography>
					</div>
					<Button className="badge-btn" color="secondary">
						Open Details
					</Button>
				</div>

				<div class="demo-main-container">
					<div class="header gantt-demo-header">
						<ul class="gantt-controls">
							<li class="gantt-menu-item" onClick={this.toggleLeftPanel}>
								<a data-action="collapseAll">
									{this.state.toggleLeft ? (
										<FontAwesomeIcon icon={faToggleOff} style={{ fontSize: '1.5rem' }} />
									) : (
										<FontAwesomeIcon icon={faToggleOn} style={{ fontSize: '1.5rem' }} />
									)}

									<span class="header-text"> Toggle left </span>
								</a>
							</li>
							<li class="gantt-menu-item" onClick={this.closeAll}>
								<a data-action="collapseAll">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_collapse_all_24.png" />
									<span class="header-text">Collapse</span>
								</a>
							</li>
							<li class="gantt-menu-item gantt-menu-item-last" onClick={this.openAll}>
								<a data-action="expandAll">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_expand_all_24.png" />
									<span class="header-text">Expand</span>
								</a>
							</li>
							{permissionByRole && (
								<li class="gantt-menu-item" onClick={() => this.ganttCallback(this.moveBackward)}>
									<a data-action="toggleCriticalPath">
										<FontAwesomeIcon icon={faArrowAltCircleLeft} style={{ fontSize: '1.5rem' }} />

										<span class="header-text">Move Backward</span>
									</a>
								</li>
							)}
							{permissionByRole && (
								<li class="gantt-menu-item" onClick={() => this.ganttCallback(this.moveForward)}>
									<a data-action="toggleAutoScheduling">
										<FontAwesomeIcon icon={faArrowAltCircleRight} style={{ fontSize: '1.5rem' }} />
										<span class="header-text">Move Forword</span>
									</a>
								</li>
							)}

							{isUserHavePermssionsFromAdmin && (
								<li class="gantt-menu-item">
									<a>
										<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_export_24.png" />
										<span class="header-text">Import</span>
									</a>
									<ul class="gantt-controls">
										<li
											class="gantt-menu-item"
											onClick={() => {
												document.getElementById('excelFile').click();
											}}
										>
											<input
												type="file"
												id="excelFile"
												name="file"
												accept=".xlsx,.xls"
												onChange={e => this.importExcel(e.target)}
												hidden
											/>
											<a data-action="toExcel">
												<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
												Excel
											</a>
										</li>
										<li class="gantt-menu-item">
											<a
												class="xlsx-sample"
												href="/assets/files/DemoProject.xlsx"
												target="_blank"
											>
												<FontAwesomeIcon icon={faDownload} style={{ fontSize: '1.5rem' }} />
												DemoProject.xlsx
											</a>
										</li>
									</ul>
								</li>
							)}
							<li class="gantt-menu-item">
								<a>
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_export_24.png" />
									<span class="header-text">Export</span>
								</a>
								<ul class="gantt-controls w-125">
									<li class="gantt-menu-item" onClick={this.exportPDF}>
										<a data-action="toPDF">
											<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
											PDF
										</a>
									</li>
									<li class="gantt-menu-item" onClick={this.exportPNG}>
										<a data-action="toPNG">
											<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
											PNG
										</a>
									</li>
									<li class="gantt-menu-item" onClick={this.exportExcel}>
										<a data-action="toExcel">
											<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
											Excel
										</a>
									</li>
									<li class="gantt-menu-item" onClick={this.exportMSProject}>
										<a data-action="toMSProject">
											<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
											MS Project
										</a>
									</li>
								</ul>
							</li>

							<li class="gantt-menu-item gantt-menu-item-last" onClick={this.setZoomDefaultLevel}>
								<a data-action="zoomToFit">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_zoom_to_fit_24.png" />
									<span class="header-text">Zoom to Fit</span>
								</a>
							</li>
							<li class="gantt-menu-item" onClick={this.zoomOut}>
								<a data-action="zoomOut">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_zoom_out.png" />
									<span class="header-text">Zoom Out</span>
								</a>
							</li>
							<li class="gantt-menu-item" onClick={this.zoomIn}>
								<a data-action="zoomIn">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_zoom_in.png" />
									<span class="header-text">Zoom In</span>
								</a>
							</li>
							<li
								class="gantt-menu-item"
								id="fullScreen"
								// onClick={() => {
								// 	gantt.ext.fullscreen.toggle();
								// }}
							>
								<a data-action="fullscreen">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_fullscreen_24.png" />
									<span class="header-text">Fullscreen</span>
								</a>
							</li>
						</ul>
					</div>

					<div
						ref={input => {
							this.ganttContainer = input;
						}}
						style={{ width: '100%', height: '100%' }}
						className="gantt-min-height"
					></div>
				</div>
			</div>
		);
	}
}
function mapStateToProps({ todoAppNote }) {
	return {
		todos: todoAppNote.todos
	};
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			openTaskContent: Actions.openTaskContent,
			openNewTodoDialog: Actions.openNewTodoDialog,
			editTodo: Actions.editTodo,
			getTodos: Actions.getTodos,
			openAddActivityTodoDialog: Actions.openAddActivityTodoDialog,
			openTimelineDialog: Actions.openTimelineDialog
		},
		dispatch
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Gantt));
