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
import {
	faFilePdf,
	faFile,
	faFileExcel,
	faFileVideo,
	faFileAudio,
	faFileImage,
	faFileWord,
	faFileCode,
	faFileArchive
} from '@fortawesome/free-regular-svg-icons';
// data: [
// 	{ id: 1, text: 'Task #1', start_date: '15-04-2019', duration: 3, progress: 0.6 },
// 	{ id: 2, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 }
// ],
// links: [{ id: 1, source: 1, target: 2, type: '0' }]

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
class Gantt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			toggleLeft: false,
			tasks: undefined,
			zoomLevel: 2
		};
		this.fileDnD = null;
	}

	componentWillUnmount() {
		// if (this.dataProcessor) {
		// 	this.dataProcessor.destructor();
		// 	this.dataProcessor = null;
		// }
	}
	componentDidMount() {
		gantt.clearAll();
		this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
			return new Promise((resolve, reject) => {
				console.log({ entityType, action, item, id });

				// if (onDataUpdated) {
				// onDataUpdated(entityType, action, item, id);
				// console.log({ entityType, action, item, id });
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
			assigned_company: todo.company[0] ? todo.company[0].data.profile.company.id : undefined,
			project: pid,
			date_completed: null,
			alert: false,
			starred: false
		};
		// console.log({ values });
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

		// console.log({ todo, values });
		apiCall(
			EDIT_ACTIVITY_TO_TASK(todo.id),
			values,
			res => {},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
	shouldComponentUpdate(nextProps, nextState) {
		const { todos } = nextProps;
		if (this.props.todos && todos && JSON.stringify(todos) !== JSON.stringify(this.props.todos)) {
			this.templatePermissions();
			this.ganttInit(todos);
			return true;
		}

		if (this.props.zoom !== nextProps.zoom && this.state.tasks) {
			this.createGantt(this.state.tasks);
			return true;
		}
	}

	ganttInit = todos => {
		// alert();
		let allTodos = todos.entities;
		console.log({ allTodos });
		let tasks = {
			data: Object.values(todos.entities).map((data, i) => {
				return data.parent == 0
					? {
							...{
								id: data.id,
								text: data.name,
								start_date: data.date_start,
								end_date: data.date_end, //end_date: moment(data.date_end).add(1, 'days').format('YYYY-MM-DD'),
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
								end_date: data.datetime_end, //end_date: moment(data.date_end).add(1, 'days').format('YYYY-MM-DD'),

								progress: data.status == 'completed' ? 1 : 0,
								company: data?.assigned_company?.name,
								mainId: data.id,
								parent: data.task
							},
							data
					  };
			})
		};
		console.log({ tasks });
		this.setState(
			{
				tasks
			},
			() => this.createGantt(tasks)
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
			console.log({ layout: gantt.config.layout });
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
		gantt.plugins({
			fullscreen: true
		});
		// end block for resize
		gantt.attachEvent('onTemplatesReady', function () {
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
		gantt.ext.fullscreen.getFullscreenElement = function () {
			return document.getElementById('myCover');
		};
		gantt.init(this.ganttContainer);
		gantt.parse(tasks);
		gantt.showLightbox = id => {
			console.log({ ganttData: gantt.getTask(id) });
			if (gantt.getTask(id).$new == true) {
				if (gantt.getTask(id).$level == 1) {
					let captureData = this.state.tasks.data.filter(task => task.id == gantt.getTask(id).parent);
					captureData = captureData && captureData.length ? captureData[0] : undefined;
					gantt.deleteTask(id);
					return this.props.openAddActivityTodoDialog({ ...captureData.data, isGantt: true });
				} else {
					gantt.deleteTask(id);
					return this.props.openNewTodoDialog({ isGantt: true });
				}
			} else {
				let captureData = this.state.tasks.data.filter(task => task.id == id);
				captureData = captureData && captureData.length ? captureData[0] : undefined;
				console.log({ captureData, id, data: this.state.tasks.data });
				if (captureData) {
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
				} else {
					return this.props.openNewTodoDialog();
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
	};
	templatePermissions = () => {
		const userInfo = decodeDataFromToken();
		const getRole = () => userInfo?.extra?.profile.role;
		gantt.templates.grid_header_class = (CN, C) => {
			if (CN == 'add') {
				if (this.props.projectDetail.company?.id != this.props.company.id) {
					return 'hide_add';
				} else if (getRole() == 'w' || getRole() == 'm') {
					return 'hide_add';
				}
			}
		};
		gantt.templates.grid_row_class = (start, end, task) => {
			// console.log({
			// 	start,
			// 	end,
			// 	task,
			// 	assigned_company: task.data.assigned_company,
			// 	company: this.props.company.id
			// });
			if (task.$level >= 1) {
				return 'nested_task';
			} else if (!task.company) {
				return 'hide_add';
			} else if (task.data.assigned_company?.id != this.props.company.id) {
				return 'hide_add hide_tree_icon';
			}
			return '';
		};
		gantt.templates.task_class = function (start, end, task) {
			// console.log({ start, end, task });
			// console.log({ start, end: moment().diff(moment(task.data.date_end)), task });
			if (task.parent) {
				return 'nested_task_right hide_progress_drag';
			}
			// if (moment().diff(moment(task.data.date_end)) > 0) {
			// 	return 'important';
			// } else {
			// 	return '';
			// }
		};
		gantt.plugins({
			multiselect: true,
			marker: true
		});
		if (this.state.tasks?.data?.length) {
			var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
			var markerId = gantt.addMarker({
				start_date: new Date(),
				css: 'today',
				text: 'Now',
				title: dateToStr(new Date())
			});
			gantt.getMarker(markerId);

			var min = this.state.tasks?.data.reduce(function (a, b) {
				return a?.start_date < b?.start_date ? a?.start_date : b?.start_date;
			}, {});
			if (typeof min == 'string') {
				markerId = gantt.addMarker({
					start_date: new Date(min.split('-')),
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
				gantt.config.min_column_width = 70;
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
	handleUploadListOfTasks = list => {
		let token = localStorage.getItem('jwt_access_token');
		axios
			.post(ADD_TASK_TO_PROJECT(this.props.match.params.id), list, {
				headers: {
					Authorization: `JWT ${token}`
				}
			})
			.then(res => {
				console.log(res);
				this.props.getTodos(this.props.match.params.id, true);
			})
			.catch(err => console.log(err));
	};
	closeAll = () => {
		gantt.eachTask(function (task) {
			task.$open = false;
		});
		gantt.render();
	};

	openAll = () => {
		gantt.eachTask(task => {
			console.log({ task });
			if (task.data.assigned_company?.id == this.props.company.id) {
				task.$open = true;
			}
		});
		gantt.render();
	};
	zoomIn = () => {
		if (this.state.zoomLevel < 4) {
			this.setState(
				prev => ({
					zoomLevel: prev.zoomLevel + 1
				}),
				() => this.setZoom(this.state.zoomLevel)
			);
		}
	};
	zoomOut = () => {
		if (this.state.zoomLevel > 0) {
			this.setState(
				prev => ({
					zoomLevel: prev.zoomLevel - 1
				}),
				() => this.setZoom(this.state.zoomLevel)
			);
		}
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
			start: '01-04-2013',
			end: '11-04-2013',
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
			shiftTask(68, -1);
		});
	};
	toggleLeftPanel = () => {
		this.setState(
			prev => ({
				toggleLeft: !prev.toggleLeft
			}),
			() => this.ganttInit(this.props.todos)
		);
	};
	importExcel = fileInput => {
		if (fileInput.files[0]) {
			gantt.importFromExcel({
				server: 'https://export.dhtmlx.com/gantt',
				data: fileInput.files[0],
				callback: project => {
					if (project) {
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
							text: '<table>' + body.join('') + '</table>',
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
					}
				}
			});
		}
	};
	render() {
		const { zoom } = this.props;
		this.setZoom(zoom);
		return (
			<div>
				<div className="px-32 custom-gantt-toolbar">
					<p className="my-12">
						You can use any XLSX file or download this sample{' '}
						<a class="xlsx-sample" href="/assets/files/DemoProject.xlsx" target="_blank">
							DemoProject.xlsx
						</a>
					</p>
					<p className="mb-12">
						<form className="flex flex-wrap items-center">
							<input
								type="file"
								id="excelFile"
								name="file"
								accept=".xlsx,.xls"
								onChange={e => this.importExcel(e.target)}
								hidden
							/>
						</form>
					</p>
				</div>

				<div class="demo-main-container">
					<div class="header gantt-demo-header">
						<ul class="gantt-controls">
							<li class="gantt-menu-item" onClick={this.toggleLeftPanel}>
								<a data-action="collapseAll">Toggle left</a>
							</li>
							<li class="gantt-menu-item" onClick={this.closeAll}>
								<a data-action="collapseAll">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_collapse_all_24.png" />
									Collapse All
								</a>
							</li>
							<li class="gantt-menu-item gantt-menu-item-last" onClick={this.openAll}>
								<a data-action="expandAll">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_expand_all_24.png" />
									Expand All
								</a>
							</li>
							<li class="gantt-menu-item" onClick={this.moveForward}>
								<a data-action="toggleAutoScheduling">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_auto_scheduling_24.png" />
									Move Forword
								</a>
							</li>
							<li class="gantt-menu-item" onClick={this.moveBackward}>
								<a data-action="toggleCriticalPath">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_critical_path_24.png" />
									Move Backward
								</a>
							</li>
							<li class="gantt-menu-item">
								<a>
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_export_24.png" />
									Import
								</a>
								<ul class="gantt-controls">
									<li
										class="gantt-menu-item"
										onClick={() => {
											document.getElementById('excelFile').click();
										}}
									>
										<a data-action="toExcel">
											<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
											Excel
										</a>
									</li>
								</ul>
							</li>
							<li
								class="gantt-menu-item gantt-menu-item-right"
								id="fullScreen"
								// onClick={() => {
								// 	gantt.ext.fullscreen.toggle();
								// }}
							>
								<a data-action="fullscreen">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_fullscreen_24.png" />
									Fullscreen
								</a>
							</li>
							<li class="gantt-menu-item gantt-menu-item-right gantt-menu-item-last">
								<a data-action="zoomToFit">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_zoom_to_fit_24.png" />
									Zoom to Fit
								</a>
							</li>
							<li class="gantt-menu-item gantt-menu-item-right">
								<a data-action="zoomOut">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_zoom_out.png" />
									Zoom Out
								</a>
							</li>
							<li class="gantt-menu-item gantt-menu-item-right">
								<a data-action="zoomIn">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_zoom_in.png" />
									Zoom In
								</a>
							</li>

							<li class="gantt-menu-item gantt-menu-item-right gantt-menu-item-last">
								<a>
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_export_24.png" />
									Export
								</a>
								<ul class="gantt-controls">
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
