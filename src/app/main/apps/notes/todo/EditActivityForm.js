import { useForm } from '@fuse/hooks';
import _ from '@lodash';
import { FormControl, Icon, TextField, Button, CircularProgress, Select } from '@material-ui/core';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useParams } from 'react-router';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { GET_COMPANY_PROJECT_TEAM_MEMBER_LIST } from 'app/services/apiEndPoints';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';

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

export default function EditActivityForm(props) {
	const { t } = useTranslation('todo_project');
	const dispatch = useDispatch();
	const todoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.todoDialog);
	const companies = useSelector(({ contactsApp }) => contactsApp.contacts.approvedCompanies);
	const editActivityTodoDialog = useSelector(({ todoAppNote }) => todoAppNote.todos.editActivityTodoDialog);
	const [labelMenuEl, setLabelMenuEl] = useState(null);
	const { form, handleChange, setForm, resetForm } = useForm({ ...defaultFormState });
	const startDate = moment(form.startDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	const dueDate = moment(form.dueDate).format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS);
	const [company, setCompany] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [profileData, setProfileData] = useState([]);
	const companyDetail = useSelector(({ chatApp }) => chatApp?.company);
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
		if (todoDialog.props.openTimelineDialog || editActivityTodoDialog) {
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
		apiCall(
			GET_COMPANY_PROJECT_TEAM_MEMBER_LIST(routeParams.id, todoDialog.data.task.assigned_company.id, value),
			{},
			res => setProfiles(res),
			err => {
				// console.log(err),
			},
			METHOD.GET,
			getHeaderToken()
		);
	};
	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;
	const getName = profile => `${profile.first_name} ${profile.last_name}`;
	const getUsername = profile => `${profile.profile.first_name} ${profile.profile.last_name}`;
	const getIsDisabled = () =>
		(todoDialog.data?.task && todoDialog.data.task.assigned_company.id != companyDetail.id) || getRole() == 'w';
	return (
		<div className="sm:pl-10">
			{getIsDisabled() && (
				<div className="flex items-center mb-24">
					<Icon>lock</Icon> only company owner can change this details
				</div>
			)}
			<FormControl className="mt-8 mb-24" required fullWidth>
				<TextField
					label={t('TASK_TITLE')}
					autoFocus
					name="title"
					value={form.title}
					onChange={handleChange}
					required
					variant="outlined"
					disabled={getIsDisabled()}
				/>
			</FormControl>

			<FuseChipSelect
				placeholder={t('SELECT_PROFILE')}
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
				isDisabled={getIsDisabled()}
			/>

			<FormControl className="mt-8 mb-16" required fullWidth>
				<TextField
					label={t('NOTES')}
					name="notes"
					multiline
					rows="4"
					value={form.notes}
					onChange={handleChange}
					variant="outlined"
					disabled={getIsDisabled()}
				/>
			</FormControl>
			<div className="flex -mx-4">
				<div className="mt-8 mb-16 mx-4 relative static-form-label flex-1">
					{/* <label>{t('START_DATE')}</label>
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
						disabled={getIsDisabled()}
					/> */}
					<KeyboardDatePicker
						label={t('START_DATE')}
						inputVariant="outlined"
						format="DD/MM/yyyy"
						value={taskDate.startDate}
						onChange={startDate => {
							setTaskDate({
								...taskDate,
								startDate
							});
						}}
						className="mt-8 mb-16 w-full"
						disabled={getIsDisabled()}
						// minDate={projectDate.startDate}
					/>
				</div>
				<div className="mt-8 mb-16 mx-4 relative static-form-label flex-1">
					<KeyboardDatePicker
						label={t('END_DATE')}
						inputVariant="outlined"
						format="DD/MM/yyyy"
						value={taskDate.endDate}
						onChange={endDate => {
							setTaskDate({
								...taskDate,
								endDate
							});
						}}
						className="mt-8 mb-16 w-full"
						disabled={getIsDisabled()}
						minDate={taskDate.startDate}
					/>
				</div>
			</div>
			{/* <div className="mt-8 mb-16"> */}
			<FormControl className="mt-8 mb-16" variant="outlined" required fullWidth>
				<Select disabled={getIsDisabled()} native value={progress} onChange={e => setProgress(e.target.value)}>
					<option value="to-do">{t('TO_DO_STATE')}</option>
					<option value="completed">{t('COMPLETED_STATE')}</option>
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
								todoDialog.data.isGantt,
								editActivityTodoDialog
							)
						);
					}}
					disabled={getIsDisabled()}
				>
					{t('SAVE')} {loading && <CircularProgress size={15} color="secondary" />}
				</Button>
			</div>
		</div>
	);
}
