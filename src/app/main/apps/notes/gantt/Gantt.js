import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
import connect from 'react-redux/es/connect/connect';
import moment from 'moment';
import * as Actions from '../todo/store/actions';
import { bindActionCreators } from 'redux';

// data: [
// 	{ id: 1, text: 'Task #1', start_date: '15-04-2019', duration: 3, progress: 0.6 },
// 	{ id: 2, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 }
// ],
// links: [{ id: 1, source: 1, target: 2, type: '0' }]
class Gantt extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tasks: undefined
		};
	}

	componentDidMount() {
		// gantt.config.xml_date = '%Y-%m-%d %H:%i';
		// const { tasks } = this.props;
		// gantt.init(this.ganttContainer);
		// gantt.parse(tasks);
	}
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
			let newtasks = Object.values(todos.entities).map((data, index) => ({
				...{
					id: index + 1,
					text: data.name,
					start_date: data.date_start,
					end_date: data.date_end,
					duration: moment(data.date_start).diff(moment(data.date_end)),
					progress: data.progress / 100,
					mainId: data.id
				},
				data
			}));
			console.log({
				cond: JSON.stringify(newtasks) == JSON.stringify(this.state.tasks.data)
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
			data: Object.values(todos.entities).map((data, index) => ({
				...{
					id: index + 1,
					text: data.name,
					start_date: data.date_start,
					end_date: data.date_end,
					duration: moment(data.date_start).diff(moment(data.date_end)),
					progress: data.progress / 100,
					mainId: data.id
				},
				data
			}))
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
			<div
				ref={input => {
					this.ganttContainer = input;
				}}
				style={{ width: '100%', height: '100%' }}
				className="gantt-min-height"
			></div>
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
			openNewTodoDialog: Actions.openNewTodoDialog
		},
		dispatch
	);
}
export default connect(mapStateToProps, mapDispatchToProps)(Gantt);
