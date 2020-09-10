import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import { amber, red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import TodoChip from './TodoChip';
import { Collapse, ListItemIcon, ListItemText, List } from '@material-ui/core';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_ACTIVITY_OF_TASK } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import TodoActivityListItem from './TodoActivityListItem';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
	card: {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	}
}));

function TodoListItem(props) {
	const dispatch = useDispatch();
	const labels = useSelector(({ todoAppNote }) => todoAppNote.labels);
	const todoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.todoDialog);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const [open, setOpen] = React.useState(false);
	const [id, setId] = React.useState(null);
	const [taskDetail, setTaskDetail] = useState([]);
	const classes = useStyles(props);
	const handleClick = () => {
		setOpen(!open);
	};
	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (todoDialog.type === 'activity' && todoDialog.props.open && todoDialog.data.id == props.todo.id) {
			setId(todoDialog.data.id);
		}

		if (todoDialog.type === 'activity' && todoDialog.props.open == false && props.todo.id == id) {
			getDetailOfTask();
			setId(null);
		}
	}, [todoDialog.props.open]);
	const getDetailOfTask = () => {
		// if (open === false) {

		apiCall(
			GET_ACTIVITY_OF_TASK(props.todo.id),
			{},
			res => {
				setTaskDetail(res.results);
				setOpen(true);
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
		// }
	};
	const getdate = date => (date ? moment(date).format('DD-MM-YYYY') : undefined);
	return (
		<>
			<Card
				className={clsx(classes.card, 'w-full mb-16 rounded-4 cursor-pointer border-1')}
				onClick={() => dispatch(Actions.openTaskContent(props.todo))}
			>
				{/* card body */}
				<div className="p-16 pb-0">
					{/* lebels are below */}
					<div className="flex flex-wrap mb-8 -mx-4">
						{props.todo.assigned_company?.name && (
							<Tooltip title={props.todo.assigned_company.name}>
								<div
									className={clsx('text-white', 'w-32  h-6 rounded-6 mx-4 mb-6')}
									style={{ borderColor: props.todo.assigned_company.color_project }}
								/>
							</Tooltip>
						)}

						{/* <Tooltip title={'hello'}>
							<div className={clsx('bg-orange text-white', 'w-32  h-6 rounded-6 mx-4 mb-6')} />
						</Tooltip> */}

						{/* <Tooltip title={'hello'}>
							<div className={clsx('bg-orange text-white', 'w-32  h-6 rounded-6 mx-4 mb-6')} />
						</Tooltip> */}
					</div>

					{/* content can be below */}
					<Typography className="font-600 mb-12">{projectDetail?.name}</Typography>
					<Typography className="font-600 mb-12"> {props.todo.name} </Typography>
					{props.todo.assigned_company && (
						<TodoChip
							title={props.todo.assigned_company?.name}
							color={props.todo.assigned_company?.color_project}
						/>
					)}
					{/* dates below */}
					<div class="flex items-center mb-12 -mx-4">
						{moment().diff(moment(props.todo.date_end)) > 0 && (
							<div class="flex items-center px-8 py-4 mx-4 rounded-sm bg-red text-white">
								<Icon className="text-16">access_time</Icon>
								<span class="mx-4">{moment(props.todo.date_end).format('MMM Do YY')}</span>
							</div>
						)}
						<div class="flex items-center px-8 py-4 mx-4 rounded-sm bg-grey-700 text-white">
							<Icon className="text-16">check_circle</Icon>
							<span class="mx-4">2/7</span>
						</div>
					</div>

					{/* members list who involved in this */}
					<div className="flex flex-wrap mb-12 -mx-4">
						<Tooltip title={'James Lewis'}>
							<Avatar className="mx-4 w-32 h-32" src={'/assets/images/avatars/james.jpg'} />
						</Tooltip>
						<Tooltip title={'James Lewis'}>
							<Avatar className="mx-4 w-32 h-32" src={'/assets/images/avatars/james.jpg'} />
						</Tooltip>
					</div>
				</div>

				{/* footer */}
				<div className="flex justify-between h-48 px-16 border-t-1">
					{/* left side footer */}
					<div className="flex items-center -mx-6">
						<Icon className="text-18 mx-6" color="action">
							remove_red_eye
						</Icon>
						<Icon className="text-18 mx-6" color="action">
							description
						</Icon>
					</div>

					{/* right side footer */}
					<div className="flex items-center justify-end -mx-6">
						<span className="flex items-center mx-6">
							<Icon className="text-18" color="action">
								attachment
							</Icon>
							<Typography className="mx-8" color="textSecondary">
								{12}
							</Typography>
						</span>
						{props.todo.assigned_company?.id == company.id && (
							<span className="flex items-center mx-6">
								{open ? (
									<Icon
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											setOpen(!open);
										}}
									>
										expand_more{' '}
									</Icon>
								) : (
									<Icon
										onClick={ev => {
											ev.preventDefault();
											ev.stopPropagation();
											if (props.todo.assigned_company?.id == company.id) {
												getDetailOfTask();
											}
										}}
									>
										chevron_right{' '}
									</Icon>
								)}
							</span>
						)}
					</div>
				</div>
			</Card>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List className="p-0">
					<FuseAnimateGroup
						enter={{
							animation: 'transition.slideUpBigIn'
						}}
					>
						{taskDetail &&
							!!taskDetail.length &&
							taskDetail.map(todo => <TodoActivityListItem todo={todo} key={todo.id} />)}
					</FuseAnimateGroup>
				</List>
			</Collapse>
		</>
	);
}

export default TodoListItem;
