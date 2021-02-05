import FuseChipSelect from '@fuse/core/FuseChipSelect';
import Icon from '@material-ui/core/Icon';
import {
	CheckboxFormsy,
	FuseChipSelectFormsy,
	RadioGroupFormsy,
	SelectFormsy,
	TextFieldFormsy
} from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import Formsy from 'formsy-react';
import React, { useRef, useState, useEffect } from 'react';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { withStyles, TextField, Avatar, Box, LinearProgress, CircularProgress } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import UploadProjectImage from './UploadProjectImage';
import { useSelector, useDispatch } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import * as Actions from 'app/main/apps/notes/store/actions';
import { useParams } from 'react-router';
import { SEARCH_PROJECT_CORDINATOR, ADD_PROJECT, EDIT_PROJECT_DETAIL } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken, getCompressFile } from 'app/services/serviceUtils';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';

function sortByProperty(array, property, order = 'ASC') {
	return array.sort((a, b) =>
		order === 'ASC'
			? a[property] > b[property]
				? 1
				: a[property] < b[property]
				? -1
				: 0
			: a[property] > b[property]
			? -1
			: a[property] < b[property]
			? 1
			: 0
	);
}
const DialogContent = withStyles(theme => ({
	root: {
		padding: theme.spacing(2),
		flexGrow: 1
	}
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
	root: {
		margin: 0,
		padding: theme.spacing(1)
	}
}))(MuiDialogActions);
function AddProjectForm() {
	const routeParams = useParams();
	const dispatch = useDispatch();
	const projectApp = useSelector(({ notesApp }) => notesApp.project);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState({ name: '' });
	const [isFormValid, setIsFormValid] = useState(false);
	const [projectDetail, setProjectDetail] = useState(false);
	const [file, setFile] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [projectCoordinators, setProjectCoordinators] = useState([]);
	const getdate = date => (date ? moment(date).format('YYYY-MM-DD') : undefined);
	const projects = useSelector(({ notesApp }) => notesApp.project.entities);
	const { t } = useTranslation('projects');

	const [projectDate, setProjectDate] = useState({
		startDate: new Date(),
		endDate: undefined
	});
	useEffect(() => {
		if (projectApp.dialogType == 'edit') {
			setProjectDetail(projectApp.projectDetail);
			let projectCordinate = projectApp.projectDetail.referent
				? [
						{
							data: projectApp.projectDetail.referent,
							value: projectApp.projectDetail.referent.first_name,
							label: (
								<span className="flex items-center">
									<Avatar className="w-32 h-32" src={projectApp.projectDetail.referent.photo} />
									<span className="mx-8">{projectApp.projectDetail.referent.first_name}</span>
								</span>
							)
						}
				  ]
				: [];
			setProjectCoordinators(projectCordinate);
			setProjectDate({
				startDate: projectApp.projectDetail.date_start
					? new Date(projectApp.projectDetail.date_start)
					: undefined,
				endDate: projectApp.projectDetail.date_end ? new Date(projectApp.projectDetail.date_end) : undefined
			});
			setFile({
				fileData: undefined,
				imagePreviewUrl: projectApp.projectDetail?.logo
			});
			return () => {
				dispatch(Actions.updateProjectDetail({}));
			};
		}
	}, [projectApp.projectDialog]);
	const formRef = useRef(null);
	// useDeepCompareEffect(() => {
	// 	dispatch(Actions.getContacts(routeParams));
	// 	dispatch(Actions.getUserData());
	// 	return dispatch(Actions.resetContact());
	// }, [dispatch, routeParams]);

	function disableButton() {
		setIsFormValid(false);
	}

	// function getFilteredArrayByKey(entities, key, _searchText = []) {
	// 	if (_searchText.length === 0) {
	// 		return entities;
	// 	}
	// 	return entities.filter(item => _searchText.includes(item[key]));
	// }

	// useEffect(() => {
	// 	let results = sortByProperty(getFilteredArrayByKey(contacts, 'role', ['Delegate', 'Owner']), 'name');
	// 	setFilteredData(results);
	// }, [contacts]);

	function enableButton() {
		setIsFormValid(true);
	}
	const getProjectCordinateIds = () => (projectCoordinators.length ? projectCoordinators[0]?.data?.id : undefined);
	const handleSubmit = async model => {
		setLoading(true);
		const { name, description, note, address } = model;
		const values = {
			name,
			description,
			referent: getProjectCordinateIds(),
			date_start: getdate(projectDate.startDate),
			date_end: getdate(projectDate.endDate),
			logo: file && file.fileData ? await getCompressFile(file.fileData) : undefined,
			note,
			address
		};
		var formData = new FormData();
		for (let key in values) {
			if (values[key]) formData.append(key, values[key]);
		}
		apiCall(
			projectApp.dialogType == 'new' ? ADD_PROJECT : EDIT_PROJECT_DETAIL(projectDetail.id),
			formData,
			res => {
				setLoading(false);
				dispatch(Actions.closeProjectDialog());
				if (projectApp.dialogType == 'new') {
					dispatch(Actions.getProjects());
				} else {
					projects[projectDetail.index] = { ...projects[projectDetail.index], ...res };
					dispatch(Actions.updateProjectList(projects));
				}
			},
			err => {
				setLoading(false);
				formRef.current.updateInputsWithError({
					name: err.name[0],
					description: err.description[0],
					date_start: err.date_start[0],
					address: err.address[0]
				});

				console.log(err);
			},
			projectApp.dialogType == 'new' ? METHOD.POST : METHOD.PUT,
			getHeaderToken()
		);
	};
	function retrieveDataAsynchronously(searchText) {
		apiCall(
			SEARCH_PROJECT_CORDINATOR(String(searchText)),
			{},
			res => {
				setFilteredData(res);
			},
			err => {
				setFilteredData([]);
			},
			METHOD.GET,
			getHeaderToken()
		);
	}
	return (
		<DialogContent dividers>
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center md:overflow-hidden"
			>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<UploadProjectImage {...{ setFile, file, remove: () => setFile(null) }} />
					</Grid>
					<Grid item xs={12} md={6}>
						<TextFieldFormsy
							className="mb-12 w-full"
							type="text"
							name="name"
							label={t('PROJECT_NAME')}
							value={projectDetail.name}
							validations={{
								minLength: 4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
							required
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextFieldFormsy
							variant="outlined"
							className="mb-12 w-full"
							type="text"
							name="address"
							label={t('PROJECT_ADDRESS')}
							value={projectDetail.address}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextFieldFormsy
							variant="outlined"
							className="mb-12 w-full"
							type="text"
							name="description"
							value={projectDetail.description}
							label={t('PROJECT_DESCRIPTION')}
							validations={{
								minLength: 4
							}}
							validationErrors={{
								minLength: 'Min character length is 4'
							}}
							required
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<FuseChipSelect
							className="custom-dropdown"
							onChange={value => {
								setProjectCoordinators(value.splice(value.length - 1));
							}}
							isMulti
							value={projectCoordinators}
							placeholder={t('SEARCH_PROJECT_COORFINATORS')}
							textFieldProps={{
								onChange: e => retrieveDataAsynchronously(e.target.value),
								variant: 'outlined'
							}}
							variant="fixed"
							options={filteredData.map(member => ({
								data: member,
								value: member.first_name + ' ' + member.last_name,
								label: (
									<span className="flex items-center">
										<Avatar className="w-32 h-32" src={member.photo} />
										<span className="mx-8">
											{member.first_name} {member.last_name}
										</span>
									</span>
								)
							}))}
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						{/* <div className="flex items-center mb-12">
						<Typography className="font-600 text-16 ">Start Date</Typography>
					</div> */}
						<DatePicker
							className="mb-12"
							dateFormat="dd/MM/yyyy"
							selected={projectDate.startDate}
							minDate={projectDate.startDate}
							onChange={startDate => {
								setProjectDate({
									...projectDate,
									startDate
								});
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						{/* <div className="flex items-center mb-12">
						<Typography className="font-600 text-16">End Date</Typography>
					</div> */}
						<DatePicker
							className="mb-12"
							dateFormat="dd/MM/yyyy"
							selected={projectDate.endDate}
							minDate={projectDate.startDate}
							onChange={endDate => {
								setProjectDate({
									...projectDate,
									endDate
								});
							}}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextFieldFormsy
							variant="outlined"
							className="mb-16 w-full"
							type="textarea"
							name="note"
							label={t('PROJECT_NOTES')}
						/>
					</Grid>
					<Grid item xs={12}>
						<div className="inline-block">
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className="justify-start d-inline-block mb-20"
								aria-label="LOG IN"
								disabled={!isFormValid}
							>
								{projectApp.dialogType == 'new' ? t('ADD') : t('SAVE')}
								{loading && <CircularProgress size={20} color="secondary" />}
							</Button>
						</div>
					</Grid>
				</Grid>
			</Formsy>
		</DialogContent>
	);
}

export default AddProjectForm;
