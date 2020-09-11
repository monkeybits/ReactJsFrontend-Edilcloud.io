import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
import connect from 'react-redux/es/connect/connect';
import moment from 'moment';

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
		if (!this.state.tasks) {
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
					}
				}))
			};
			gantt.config.xml_date = '%Y-%m-%d %H:%i';
			gantt.init(this.ganttContainer);
			gantt.parse(tasks);
			this.setState({
				tasks
			});
		}
		return this.props.zoom !== nextProps.zoom;
	}

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

export default connect(mapStateToProps)(Gantt);
