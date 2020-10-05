import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/api.js';
import './Gantt.css';
import connect from 'react-redux/es/connect/connect';
import moment from 'moment';
import * as Actions from '../todo/store/actions';
import { bindActionCreators } from 'redux';
import { fileDragAndDrop } from './common/dhx_file_dnd';
import { withRouter } from 'react-router';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { EDIT_TASK_TO_PROJECT } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
// data: [
// 	{ id: 1, text: 'Task #1', start_date: '15-04-2019', duration: 3, progress: 0.6 },
// 	{ id: 2, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 }
// ],
// links: [{ id: 1, source: 1, target: 2, type: '0' }]

function to_snake_case(name){
	return (name + "").toLowerCase().replace(/ /, "_");
}

function loadTable(mapping, data){
	var ganttDataset = {
		data:[],
		links: []
	};

	data.forEach(function(item){
		var copy = {};
		for(var i in item){
			if(mapping[i]){
				copy[mapping[i]] = item[i];
			}else{
				copy[to_snake_case(i)] = item[i];
			}

			copy.open = true;
			if(copy.wbs){
				var wbs = copy.wbs + "";
				copy.id = wbs;
				var parts = wbs.split(".");
				parts.pop();
				copy.parent = parts.join(".");
			}
		}
		ganttDataset.data.push(copy);
	});

	gantt.clearAll();
	gantt.parse(ganttDataset);

}

function getOptions(selectedIndex){
	return [
		"wbs", "text", "start_date", "duration", "end_date", "id", "parent"
	].map(function(name, index){
		return "<option value='"+name+"' "+(selectedIndex == index ? "selected":"")+">" + name +"</option>";
	}).join("");
}

class Gantt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: undefined
		};
		this.fileDnD = null;
	}
	// initGanttDataProcessor() {
	// 	const onDataUpdated = this.props.onDataUpdated;
	// 	this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
	// 		console.log({ entityType, action, item, id });
	// 		return new Promise((resolve, reject) => {
	// 			if (onDataUpdated) {
	// 				onDataUpdated(entityType, action, item, id);
	// 			}
	// 			return resolve();
	// 		});
	// 	});
	// }
	componentWillUnmount() {
		if (this.dataProcessor) {
			this.dataProcessor.destructor();
			this.dataProcessor = null;
		}
	}
	componentDidMount() {
		// gantt.config.xml_date = '%Y-%m-%d %H:%i';
		// const { tasks } = this.props;
		// gantt.init(this.ganttContainer);
		// gantt.parse(tasks);
		this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
			return new Promise((resolve, reject) => {
				// if (onDataUpdated) {
				// onDataUpdated(entityType, action, item, id);
				console.log({ entityType, action, item, id });
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
				resolve();
				// }
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
		console.log({ values });
		apiCall(
			EDIT_TASK_TO_PROJECT(todo.id),
			values,
			res => {},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
	shouldComponentUpdate(nextProps) {
		const { todos } = nextProps;
		console.log({
			todos: Object.values(todos.entities),
			tasks: this.state.tasks
		});
		if (!this.state.tasks) {
			//this.state.tasks?.length !== Object.values(todos.entities)
			this.ganttInit(todos);
			return true;
		} else if (this.state.tasks && this.state.tasks.data) {
			/// .length !== Object.values(todos.entities).length
			let newtasks = Object.values(todos.entities).map((data, index) => {
				var startDate = moment(moment(data.date_start).format('DD.MM.YYYY'), 'DD.MM.YYYY"');
				var endDate = moment(moment(data.date_end).format('DD.MM.YYYY'), 'DD.MM.YYYY"');
				let duration = endDate.diff(startDate, 'days');
				return {
					...{
						id: index + 1,
						text: data.name,
						start_date: data.date_start,
						end_date: data.date_end, // end_date: moment(data.date_end).add(1, 'days').format('YYYY-MM-DD'),
						duration: duration + 1,
						progress: data.progress / 100,
						mainId: data.id
					},
					data
				};
			});
			if (JSON.stringify(newtasks) !== JSON.stringify(this.state.tasks.data)) {
				this.ganttInit(todos);
				return true;
			}
			if (this.props.zoom !== nextProps.zoom) {
				return true;
			}
		}
	}
	ganttInit = todos => {
		let tasks = {
			data: Object.values(todos.entities).map((data, index) => {
				var startDate = moment(moment(data.date_start).format('DD.MM.YYYY'), 'DD.MM.YYYY"');
				var endDate = moment(moment(data.date_end).format('DD.MM.YYYY'), 'DD.MM.YYYY"');
				let duration = endDate.diff(startDate, 'days');
				// let duration = moment(data.date_start, 'DD.MM.YYYY').diff(moment(data.date_end, 'DD.MM.YYYY'), 'days');
				console.log(
					typeof duration,
					duration,
					data.date_start,
					data.date_end,
					startDate,
					endDate,
					endDate.diff(startDate, 'days')
				);
				return {
					...{
						id: index + 1,
						text: data.name,
						start_date: data.date_start,
						end_date: data.date_end, //end_date: moment(data.date_end).add(1, 'days').format('YYYY-MM-DD'),
						duration: duration + 1,
						progress: data.progress / 100,
						mainId: data.id
					},
					data
				};
			})
		};
		gantt.config.xml_date = '%Y-%m-%d %H:%i';
		gantt.init(this.ganttContainer);
		gantt.parse(tasks);
		gantt.showLightbox = id => {
			let captureData = this.state.tasks.data?.[id - 1]?.data;
			console.log({ object: this.state.tasks.data[id - 1], id, data: this.state.tasks.data });
			if (this.state.tasks.data[id - 1]) {
				return this.props.openTaskContent(captureData);
			} else {
				this.props.openNewTodoDialog();
			}
		};
		// gantt.templates.task_class = function (start, end, task) {
		// 	console.log({ start, end: moment().diff(moment(task.data.date_end)), task });
		// 	if (moment().diff(moment(task.data.date_end)) > 0) {
		// 		return 'important';
		// 	} else {
		// 		return '';
		// 	}
		// };

		this.setState({
			tasks
		});
	};
	componentDidUpdate() {
		gantt.render();
	}
	setZoom(value) {
		switch (value) {
			case 'Hours':
				gantt.config.scale_unit = 'day';
				gantt.config.date_scale = '%d %M';

				gantt.config.scale_height = 60;
				gantt.config.min_column_width = 30;
				gantt.config.subscales = [{ unit: 'hour', step: 1, date: '%H' }];
				break;
			case 'Days':
				gantt.config.min_column_width = 70;
				gantt.config.scale_unit = 'week';
				gantt.config.date_scale = '#%W';
				gantt.config.subscales = [{ unit: 'day', step: 1, date: '%d %M' }];
				gantt.config.scale_height = 60;
				break;
			case 'Months':
				gantt.config.min_column_width = 70;
				gantt.config.scale_unit = 'month';
				gantt.config.date_scale = '%F';
				gantt.config.scale_height = 60;
				gantt.config.subscales = [{ unit: 'week', step: 1, date: '#%W' }];
				break;
			default:
				break;
		}
	}

	render() {
		const { zoom } = this.props;
		this.setZoom(zoom);
		return (
			<>
				<p>
					You can use any XLSX file or download this sample{' '}
					<a class="xlsx-sample" href="../common/DemoProject.xlsx" target="_blank">
						DemoProject.xlsx
					</a>
				</p>
				<p>
					<form>
						<input type="file" id="excelFile" name="file" accept=".xlsx,.xls" />
						<button
							id="excelImportBtn"
							type="button"
							onClick={() => {
								var fileInput = document.getElementById('excelFile');
								if (fileInput.files[0]) {
									gantt.importFromExcel({
										server: 'https://export.dhtmlx.com/gantt',
										data: fileInput.files[0],
										callback: function (project) {
											if (project) {
												var header = [];
												var headerControls = [];
												var body = [];

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
													callback: function (result) {
														switch (result) {
															case 'save':
																var selects = div.querySelectorAll(
																	'[data-column-mapping]'
																);
																var mapping = {};
																selects.forEach(function (select) {
																	mapping[
																		select.getAttribute('data-column-mapping')
																	] = select.value;
																});
																loadTable(mapping, project);
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
							}}
						>
							Load from Excel
						</button>
					</form>
				</p>
				<div
					ref={input => {
						this.ganttContainer = input;
					}}
					style={{ width: '100%', height: '100%' }}
					className="gantt-min-height"
				></div>
			</>
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
			editTodo: Actions.editTodo
		},
		dispatch
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Gantt));
