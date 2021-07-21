import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';
import './Gantt.css';
import './dhtmlxgantt.css';
import connect from 'react-redux/es/connect/connect';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { EDIT_TASK_TO_PROJECT, EDIT_ACTIVITY_TO_TASK } from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinearProgress } from '@material-ui/core';
import {
	faArrowAltCircleLeft,
	faArrowAltCircleRight
} from '@fortawesome/free-regular-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import * as Actions from '../todo/store/actions';
import { withTranslation } from 'react-i18next';
import loadable from '@loadable/component';
const FullscreenAsk = loadable(() => import('./FullscreenAsk'));

function ganttInitZoom() {
	const zoomConfig = {
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
				max_column_width: 92,
				scale_unit: 'year',
				date_scale: '%Y',
				scale_height: 60,
				subscales: [{ unit: 'year', step: 1, date: '%d %M %Y' }]
			}
		]
	};
	gantt.ext.zoom.init(zoomConfig);
	gantt.ext.zoom.setLevel('day2');
}
function to_snake_case(name) {
	return `${name}`.toLowerCase().replace(/ /, '_');
}

function loadTable(mapping, data) {
	const ganttDataset = {
		data: [],
		links: []
	};

	data.forEach(function (item) {
		const copy = {};
		for (const i in item) {
			if (mapping[i]) {
				copy[mapping[i]] = item[i];
			} else {
				copy[to_snake_case(i)] = item[i];
			}

			copy.open = true;
			if (copy.wbs) {
				const wbs = `${copy.wbs}`;
				copy.id = wbs;
				const parts = wbs.split('.');
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
			return `<option value='${name}' ${selectedIndex == index ? 'selected' : ''}>${name}</option>`;
		})
		.join('');
}
function shiftTask(task_id, direction) {
	const task = gantt.getTask(task_id);

	task.start_date = gantt.date.add(task.start_date, direction, 'day');
	task.end_date = gantt.calculateEndDate(task.start_date, task.duration);
	gantt.updateTask(task.id);
}
function sortHolders(a, b) {
	return a.mainId > b.mainId ? 1 : a.mainId < b.mainId ? -1 : 0;
}
function exitHandler() {
	if (
		!document.fullscreenElement &&
		!document.webkitIsFullScreen &&
		!document.mozFullScreen &&
		!document.msFullscreenElement
	) {
		if (!gantt.getState().fullscreen) {
			document.body.className = '';
			setTimeout(() => {
				gantt.collapse();
			}, 300);
		}
	}
}
class Gantt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			toggleLeft: false,
			tasks: undefined,
			zoomLevel: 3,
			expandAll: false,
			openTasks: [],
			open: false,
			language: 'en'
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
		gantt.config.show_errors = false;
		gantt._onTemplatesReadyHandler = gantt.attachEvent('onTemplatesReady', function () {
			// {
			// 	name: 'day2',
			// 	min_column_width: 70,
			// 	scale_unit: 'week',
			// 	date_scale: '#%W',
			// 	subscales: [{ unit: 'day', step: 1, date: '%d %M' }],
			// 	scale_height: 60
			// },

			const toggle = document.getElementById('fullScreen');

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
		this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
			// let end_date = new Date(item.end_date);
			// console.log({ entityType, action, item, id, task: gantt.getTask(id) });
			// if (action == 'update') {
			// 	end_date.setDate(end_date.getDate() - 1);
			// 	gantt.getTask(id).end_date = end_date;
			// 	gantt.render();
			// }
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
		const values = {
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
			err => {
				// console.log(err),
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};

	editTodoActivty = todo => {
		const values = {
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
			err => {
				// console.log(err),
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};

	shouldComponentUpdate(nextProps, nextState) {
		const { todos, company, projectDetail } = nextProps;
		if (this.state.language != nextProps.i18n.language) {
			this.setState({
				language: nextProps.i18n.language
			});
			return true;
		}
		if (
			(company && projectDetail.company && JSON.stringify(company) != JSON.stringify(this.props.company)) ||
			JSON.stringify(projectDetail.company) != JSON.stringify(this.props.projectDetail.company)
		) {
			return this.templatePermissions(projectDetail, company);
			// return true;
		}
		if (this.props.todos.isLoadingTodos != nextProps.todos.isLoadingTodos) {
			return true;
		}
		if (
			this.props.todos?.entities &&
			todos?.entities &&
			JSON.stringify(todos.entities) !== JSON.stringify(this.props.todos.entities)
		) {
			this.ganttInit(todos);
			return false;
		}
		if (this.state.toggleLeft != nextState.toggleLeft) {
			return true;
		}
		if (this.state.open != nextState.open) {
			return true;
		}
		if (!nextState.tasks?.data?.length) {
			return true;
		}
		if (nextProps.orientation == 'portrait') {
			if (this.state.open) {
				this.setState({
					open: false
				});
			}
			document.body.className = '';
			setTimeout(() => {
				gantt.collapse();
			});
			return false;
		}
		if (
			nextProps.orientation == 'landscape' &&
			nextProps.value == 4 &&
			!gantt.getState().fullscreen &&
			localStorage.getItem('askFullscreen') != 'false' &&
			!this.state.open
		) {
			this.setState({
				open: true
			});
			return false;
		}
		if (nextProps.value == 4) {
			gantt.render();
			return false;
		}
		return false;
	}

	ganttInit = todos => {
		const tasks = {
			data: Object.values(todos.entities).map((data, i) => {
				return data.parent == 0
					? {
							...{
								id: data.id,
								text: data.name,
								start_date: data.date_start,
								end_date: data.date_end, // new Date(data.date_end.split('-'), 23, 59, 59, 100), //new Date(2018, 11, 24, 23, 59, 59, 100), //end_date: moment(data.date_end).add(1, 'days').format('YYYY-MM-DD'),
								progress: data.progress / 100,
								company: data?.assigned_company?.name,
								parent: 0,
								color: data?.assigned_company?.color_project, // hexToRgbA(data?.assigned_company?.color_project),
								mainId: data.id
							},
							data
					  }
					: {
							...{
								id: Math.floor(Math.random() * 9999),
								text: data.title,
								start_date: data.datetime_start,
								end_date: data.datetime_end, // new Date(data.datetime_end.split('-'), 23, 59, 59, 100), //end_date: moment(data.date_end).add(1, 'days').format('YYYY-MM-DD'),
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
			const { t } = this.props;

			gantt.config.columns = [
				{ name: 'text', label: t('TASK_NAME'), tree: true, width: 150 },
				{ name: 'start_date', label: t('START_DATE'), width: 100 },
				{ name: 'end_date', label: t('END_DATE'), width: 100 },
				{ name: 'company', label: t('COMPANY'), width: 100 },
				// { name: 'add', width: 44, min_width: 44, max_width: 44 }
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
				const newDate = new Date(date.setHours(23, 59, 59, 100));
				return moment(newDate).format('YYYY-MM-DD');
			}
			return moment(date).format('YYYY-MM-DD');
		};
		// end block for resize
		if (gantt._onTemplatesReadyHandler) {
			gantt.detachEvent(gantt._onTemplatesReadyHandler);
		}

		if (gantt._onTaskClickHandler) {
			gantt.detachEvent(gantt._onTaskClickHandler);
		}
		gantt._onTaskClickHandler = gantt.attachEvent('onTaskClick', (id, e) => {
			// any custom logic here
			setTimeout(() => {
				const task = gantt.getTask(id);
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
			const savedTask = gantt.getTask(id);
			if (gantt.isTaskExists(id)) {
				if (savedTask.$new == true) {
					if (savedTask.$level == 1) {
						const captureData = gantt.getTask(savedTask.parent);
						this.props.openAddActivityTodoDialog({ ...captureData.data, isGantt: true });
					} else {
						this.props.openNewTodoDialog({ isGantt: true });
					}
					delete savedTask.$new;
					gantt.deleteTask(id);
				} else {
					const captureData = savedTask;
					if (captureData.data.parent) {
						return this.props.openTimelineDialog({
							todo: captureData.data,
							task: gantt.getTask(captureData.parent).data,
							isGantt: true
						});
					}
					return this.props.openTaskContent({ ...captureData.data, isGantt: true });
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
		if (projectDetail.company && company) {
			gantt.templates.grid_header_class = (CN, C) => {
				if (CN == 'add') {
					return 'hide_add';
				}
			};
			gantt.templates.grid_row_class = (start, end, task) => {
				const userInfo = decodeDataFromToken();
				const getRole = () => userInfo?.extra?.profile.role;
				let className = '';
				if(task.data.assigned_company?.id !== company.id || getRole() === 'w') {
					className += ' hide_add';
				}
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
				let className = '';
				if (task.parent) {
					className += ' nested_task_right hide_progress_drag';
				}
				if (task.parent == 0 && projectDetail.company?.id != company.id) {
					className += ' hide_date_drag';
				}
				return className;
			};
		}
		return true;
	};

	createMarker = tasks => {
		if (tasks.data?.length) {
			const dateToStr = gantt.date.date_to_str(gantt.config.task_date);
			const markerId = gantt.addMarker({
				start_date: new Date(),
				css: 'today',
				text: 'Adesso',
				title: dateToStr(new Date())
			});
			gantt.getMarker(markerId);
			const startDates = tasks.data.map(a => a.start_date && new Date(a.start_date.split('-')));
			const min = new Date(Math.min.apply(null, startDates));
			// min.setDate(min.getDate() + 1);
			{
				const markerId = gantt.addMarker({
					start_date: min,
					css: 'status_line',
					text: 'Inizio Progetto',
					title: 'Inizio Progetto: ' // + dateToStr(new Date(min))
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
		// any custom logic here
		const userInfo = decodeDataFromToken();
		const getRole = () => userInfo?.extra?.profile.role;
		gantt.batchUpdate(() => {
			gantt.eachSelectedTask(task_id => {
				const task = gantt.getTask(task_id);
				if (task.$level == 1) {
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
		const startDates = this.state.tasks.data.map(a => a.start_date && new Date(a.start_date.split('-')));
		const endDates = this.state.tasks.data.map(a => a.end_date && new Date(a.end_date.split('-')));
		const min = new Date(Math.min.apply(null, startDates));
		const max = new Date(Math.min.apply(null, endDates));
		gantt.exportToPNG({
			name: 'mygantt.png',
			header: '<h1>My company</h1>',
			footer: '<h4>Bottom line</h4>',
			locale: 'en',
			// start: '01-04-2013',
			// end: '11-04-2013',
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

	addDragEvent = () => {
		gantt.config.autoscroll = true;
		gantt.config.autoscroll_speed = 50;
	};

	ganttCallback = (actionCall, permissionsCall = this.onTaskSelectHandler) => {
		const myFirstPromise = new Promise((resolve, reject) => {
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
		const { t } = this.props;
		// this.setZoom(zoom);
		const userInfo = decodeDataFromToken();
		const getRole = () => userInfo?.extra?.profile.role;
		const permissionByRole = getRole() == 'o' || getRole() == 'd';
		const isUserHavePermssionsFromAdmin =
			this.props.company?.id == this.props.projectDetail?.company?.id && permissionByRole;
		return (
			<div>
				{/* <div className="flex w-full justify-between items-center p-24 pb-16">
					<div className="mr-20">
						<Typography variant="h5" className="mb-4">
							Gantt
						</Typography>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography variant="subtitle1" className="font-weight-700 mb-4">
								Project Name
							</Typography>
						</FuseAnimate>
						<Typography variant="subtitle1" className="text-14 font-weight-600 text-muted">
							Nuernbergerstrasse 45, Elsfleth, Niedersachsen, 26931
						</Typography>
					</div>
					<Button className="badge-btn" color="secondary">
						Open Details
					</Button>
				</div> */}

				<div className="demo-main-container">
					{this.props.todos?.isLoadingTodos && <LinearProgress color="secondary" />}
					<FullscreenAsk
						open={this.state.open}
						setOpen={open =>
							this.setState({
								open
							})
						}
						onYes={() => {
							this.fullscreenRef.click();
						}}
						onNeverAsk={open => localStorage.setItem('askFullscreen', false)}
					/>
					<div className="header gantt-demo-header">
						<ul className="gantt-controls">
							{/* <li class="gantt-menu-item" onClick={this.toggleLeftPanel}>
								<a data-action="collapseAll">
									{this.state.toggleLeft ? (
										<FontAwesomeIcon icon={faToggleOff} style={{ fontSize: '1.5rem' }} />
									) : (
										<FontAwesomeIcon icon={faToggleOn} style={{ fontSize: '1.5rem' }} />
									)}

									<span class="header-text"> Toggle left </span>
								</a>
							</li> */}
							<li className="gantt-menu-item" onClick={this.closeAll}>
								<a data-action="collapseAll">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_collapse_all_24.png" />
									<span className="header-text">{t('COLLAPSE')}</span>
								</a>
							</li>
							<li className="gantt-menu-item gantt-menu-item-last" onClick={this.openAll}>
								<a data-action="expandAll">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_expand_all_24.png" />
									<span className="header-text">{t('EXPAND')}</span>
								</a>
							</li>
							{permissionByRole && (
								<li className="gantt-menu-item" onClick={() => this.ganttCallback(this.moveBackward)}>
									<a data-action="toggleCriticalPath">
										<FontAwesomeIcon icon={faArrowAltCircleLeft} style={{ fontSize: '1.5rem' }} />

										<span className="header-text">{t('MOVE_BACKWARD')}</span>
									</a>
								</li>
							)}
							{permissionByRole && (
								<li className="gantt-menu-item" onClick={() => this.ganttCallback(this.moveForward)}>
									<a data-action="toggleAutoScheduling">
										<FontAwesomeIcon icon={faArrowAltCircleRight} style={{ fontSize: '1.5rem' }} />
										<span className="header-text">{t('MOVE_FORWORD')}</span>
									</a>
								</li>
							)}

							{isUserHavePermssionsFromAdmin && (
								<li className="gantt-menu-item">
									<a>
										<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_export_24.png" />
										<span className="header-text">{t('IMPORT')}</span>
									</a>
									<ul className="gantt-controls">
										<li
											className="gantt-menu-item"
											onClick={() => {
												document.getElementById('excelFile').click();
											}}
										>
											<input
												type="file"
												id="excelFile"
												name="file"
												accept=".xlsx,.xls"
												onChange={e => this.props.importExcel(e.target.files[0])}
												hidden
											/>
											<a data-action="toExcel">
												<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
												Excel
											</a>
										</li>
										<li className="gantt-menu-item">
											<a
												className="xlsx-sample"
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
							<li className="gantt-menu-item">
								<a>
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_export_24.png" />
									<span className="header-text">{t('EXPORT')}</span>
								</a>
								<ul className="gantt-controls w-125">
									<li className="gantt-menu-item" onClick={this.exportPDF}>
										<a data-action="toPDF">
											<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
											PDF
										</a>
									</li>
									<li className="gantt-menu-item" onClick={this.exportPNG}>
										<a data-action="toPNG">
											<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
											PNG
										</a>
									</li>
									<li className="gantt-menu-item" onClick={this.exportExcel}>
										<a data-action="toExcel">
											<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
											Excel
										</a>
									</li>
									<li className="gantt-menu-item" onClick={this.exportMSProject}>
										<a data-action="toMSProject">
											<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_file_24.png" />
											MS Project
										</a>
									</li>
								</ul>
							</li>

							<li className="gantt-menu-item gantt-menu-item-last" onClick={this.setZoomDefaultLevel}>
								<a data-action="zoomToFit">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_zoom_to_fit_24.png" />
									<span className="header-text">{t('ZOOM_TO_FIT')}</span>
								</a>
							</li>
							<li className="gantt-menu-item" onClick={this.zoomOut}>
								<a data-action="zoomOut">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_zoom_out.png" />
									<span className="header-text">{t('ZOOM_OUT')}</span>
								</a>
							</li>
							<li className="gantt-menu-item" onClick={this.zoomIn}>
								<a data-action="zoomIn">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_zoom_in.png" />
									<span className="header-text">{t('ZOOM_IN')}</span>
								</a>
							</li>
							<li
								className="gantt-menu-item"
								id="fullScreen"
								ref={ref => (this.fullscreenRef = ref)}
								// onClick={() => {
								// 	gantt.ext.fullscreen.toggle();
								// }}
							>
								<a data-action="fullscreen">
									<img src="https://dhtmlx.com/docs/products/dhtmlxGantt/demo/imgs/ic_fullscreen_24.png" />
									<span className="header-text">{t('FULLSCREEN')}</span>
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
					/>
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
			openTimelineDialog: Actions.openTimelineDialog,
			setLoading: Actions.setLoading
		},
		dispatch
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withTranslation('gantt_project')(Gantt)));
