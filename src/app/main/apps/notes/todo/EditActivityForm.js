import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';
import moment from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import { Button, CircularProgress, Select, Slider, withStyles } from '@material-ui/core';
import { GET_COMPANY_PROJECT_TEAM_MEMBER_LIST } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import { Autocomplete } from '@material-ui/lab';

const defaultFormState = {
	id: '',
	title: '',
	notes: '',
	startDate: new Date(),
	dueDate: new Date(),
	completed: false,
	starred: false,
	important: false,
	deleted: false,
	labels: []
};
const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const marks = [
	{
		value: 0
	},
	{
		value: 10
	},
	{
		value: 20
	},
	{
		value: 30
	},
	{
		value: 40
	},
	{
		value: 50
	},
	{
		value: 60
	},
	{
		value: 70
	},
	{
		value: 80
	},
	{
		value: 90
	},
	{
		value: 100
	}
];

const IOSSlider = withStyles({
	root: {
		color: '#3880ff',
		height: 2,
		padding: '15px 0'
	},
	thumb: {
		height: 28,
		width: 28,
		backgroundColor: '#fff',
		boxShadow: iOSBoxShadow,
		marginTop: -14,
		marginLeft: -14,
		'&:focus, &:hover, &$active': {
			boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
			// Reset on touch devices, it doesn't add specificity
			'@media (hover: none)': {
				boxShadow: iOSBoxShadow
			}
		}
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 12px)',
		top: -22,
		'& *': {
			background: 'transparent',
			color: '#000'
		}
	},
	track: {
		height: 2
	},
	rail: {
		height: 2,
		opacity: 0.5,
		backgroundColor: '#bfbfbf'
	},
	mark: {
		backgroundColor: '#bfbfbf',
		height: 8,
		width: 1,
		marginTop: -3
	},
	markActive: {
		opacity: 1,
		backgroundColor: 'currentColor'
	}
})(Slider);

export default function EditActivityForm(props) {
	const dispatch = useDispatch();
	const todoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.todoDialog);
	const companies = useSelector(({ contactsApp }) => contactsApp.contacts.approvedCompanies);
	const [labelMenuEl, setLabelMenuEl] = useState(null);
	const { form, handleChange, setForm, resetForm } = useForm({ ...defaultFormState });
	const startDate = moment(form.startDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	const dueDate = moment(form.dueDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	const [company, setCompany] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [profileData, setProfileData] = useState([]);
	const [progress, setProgress] = useState('to-do');
	const [loading, setLoading] = useState(false);
	const routeParams = useParams();
	const [taskDate, setTaskDate] = useState({
		startDate: new Date(),
		endDate: undefined
	});

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (todoDialog.props.openTimelineDialog) {
			setForm({ ...todoDialog.data.todo, notes: todoDialog.data.todo.description });
			getProjectCompanyTeamProfiles();
			setTaskDate({
				startDate: new Date(todoDialog.data.todo.datetime_start),
				endDate: new Date(todoDialog.data.todo.datetime_end)
			});
			setProgress(todoDialog.data.todo.status);
			setProfileData(
				todoDialog.data.todo.workers.map(profile => ({
					data: profile,
					value: getName(profile),
					label: <span className="flex items-center pl-12">{getName(profile)}</span>
				}))
			);
			return () => {
				resetForm();
			};
		}
	}, []);

	const getProjectCompanyTeamProfiles = value => {
		// console.log(routeParams.id, todoDialog, value);
		apiCall(
			GET_COMPANY_PROJECT_TEAM_MEMBER_LIST(routeParams.id, todoDialog.data.task.assigned_company.id, value),
			{},
			res => setProfiles(res),
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	};
	const getName = profile => profile.first_name + ' ' + profile.last_name;
	const getUsername = profile => profile.profile.first_name + ' ' + profile.profile.last_name;

	return (
		<div className="pl-10">
			<FormControl className="mt-8 mb-24" required fullWidth>
				<TextField
					label="Task Title"
					autoFocus
					name="title"
					value={form.title}
					onChange={handleChange}
					required
					variant="outlined"
				/>
			</FormControl>

			<FuseChipSelect
				placeholder="Select Profile"
				variant="fixed"
				isMulti
				textFieldProps={{
					label: 'Profile',
					InputLabelProps: {
						shrink: true
					},
					variant: 'outlined'
					// onChange: e => getProjectCompanyTeamProfiles(e.target.value)
				}}
				onChange={value => {
					setProfileData(value);
				}}
				value={profileData}
				options={profiles.map(profile => ({
					data: profile,
					value: getUsername(profile),
					label: <span className="flex items-center">{getUsername(profile)}</span>
				}))}
				className="select-dropdown mb-16"
			/>

			<FormControl className="mt-8 mb-16" required fullWidth>
				<TextField
					label="Notes"
					name="notes"
					multiline
					rows="4"
					value={form.notes}
					onChange={handleChange}
					variant="outlined"
				/>
			</FormControl>
			<div className="flex -mx-4">
				<div className="mt-8 mb-16 mx-4 relative static-form-label flex-1">
					<label>Start Date</label>
					<DatePicker
						dateFormat="dd/MM/yyyy"
						selected={taskDate.startDate}
						// minDate={taskDate.startDate}
						onChange={startDate => {
							setTaskDate({
								...taskDate,
								startDate
							});
						}}
					/>
					<Icon className="icon">calendar_today</Icon>
				</div>
				<div className="mt-8 mb-16 mx-4 relative static-form-label flex-1">
					<label>End Date</label>
					<DatePicker
						dateFormat="dd/MM/yyyy"
						selected={taskDate.endDate}
						minDate={taskDate.startDate}
						onChange={endDate => {
							setTaskDate({
								...taskDate,
								endDate
							});
						}}
					/>
					<Icon className="icon">calendar_today</Icon>
				</div>
			</div>
			{/* <div className="mt-8 mb-16"> */}
			<FormControl className="mt-8 mb-16" variant="outlined" required fullWidth>
				<Select native value={progress} onChange={e => setProgress(e.target.value)}>
					<option value={'to-do'}>to-do</option>
					<option value={'completed'}>completed</option>
				</Select>
			</FormControl>
			{/* <Autocomplete
					options={['to-do', 'completed']}
					inputValue={progress}
					getOptionLabel={option => option}
					renderInput={params => <TextField variant="outlined" {...params} value={progress} />}
					onInputChange={(e, value) => setProgress(value)}
				/> */}
			{/* </div> */}
			{/* <div className="mt-24 mx-12 zoom-125">
				<IOSSlider
					aria-label="ios slider"
					defaultValue={0}
					marks={marks}
					onChange={(e, v) => setProgress(v)}
					valueLabelDisplay="on"
				/>
			</div> */}
			<div className="flex justify-end">
				<Button
					variant="contained"
					color="primary"
					onClick={() => {
						setLoading(true);
						dispatch(
							Actions.editActivity(
								{
									...form,
									id: todoDialog.data.todo.id,
									profile: profileData,
									progress,
									...taskDate
								},
								routeParams.id,
								setLoading,
								todoDialog.data.isGantt
							)
						);
					}}
				>
					Save {loading && <CircularProgress size={15} color="secondary" />}
				</Button>
			</div>
		</div>
	);
}
