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
import { withStyles, TextField, Avatar } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import UploadProjectImage from './UploadProjectImage';
import { useSelector, useDispatch } from 'react-redux';
import { useDeepCompareEffect } from '@fuse/hooks';
import * as Actions from 'app/main/apps/notes/store/actions';
import { useParams } from 'react-router';
import { SEARCH_PROJECT_CORDINATOR, ADD_PROJECT } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import moment from 'moment';

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
		padding: theme.spacing(2)
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
	const [isFormValid, setIsFormValid] = useState(false);
	const [file, setFile] = useState(null);
	// const contacts = useSelector(({ contactsApp }) => contactsApp.contacts.entities);
	const [filteredData, setFilteredData] = useState([]);
	const [projectCoordinators, setProjectCoordinators] = useState([]);
	const getdate = date => (date ? moment(date).format('YYYY-MM-DD') : undefined);

	const [projectDate, setProjectDate] = useState({
		startDate: new Date(),
		endDate: undefined
	});

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
	function handleSubmit(model) {
		const { name, description, note } = model;
		const values = {
			name,
			description,
			referent: getProjectCordinateIds(),
			date_start: getdate(projectDate.startDate),
			date_end: getdate(projectDate.endDate),
			logo: file && file.fileData ? file.fileData : undefined,
			note
		};
		var formData = new FormData();
		for (let key in values) {
			if (values[key]) formData.append(key, values[key]);
		}
		apiCall(
			ADD_PROJECT,
			formData,
			res => {
				dispatch(Actions.closeProjectDialog());
				dispatch(Actions.getProjects());
			},
			err => console.log(err),
			METHOD.POST,
			getHeaderToken()
		);
	}
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
		<DialogContent dividers className="w-400">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center md:overflow-hidden"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="name"
					label="Project Name"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					required
					variant="outlined"
				/>
				<TextFieldFormsy
					variant="outlined"
					className="mb-16"
					type="text"
					name="address"
					label="Project Address"
				/>
				<TextFieldFormsy
					variant="outlined"
					className="mb-16"
					type="text"
					name="description"
					label="Project Description"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					required
				/>
				<div className="flex-1 ">
					<FuseChipSelect
						className=""
						onChange={value => setProjectCoordinators(value)}
						isMulti
						placeholder="Search Project coordinators"
						textFieldProps={{
							onChange: e => retrieveDataAsynchronously(e.target.value),
							variant: 'outlined'
						}}
						options={filteredData.map(member => ({
							data: member,
							value: member.first_name,
							label: (
								<span className="flex items-center">
									<Avatar className="w-32 h-32" src={member.photo} />
									<span className="mx-8">{member.first_name}</span>
								</span>
							)
						}))}
						variant="outlined"
					/>
				</div>
				<div className="flex-1 ">
					<div className="flex items-center mt-16 mb-12">
						<Typography className="font-600 text-16 ">Start Date</Typography>
					</div>
					<DatePicker
						className="mb-16"
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
				</div>
				<div className="flex-1 ">
					<div className="flex items-center mt-16 mb-12">
						<Typography className="font-600 text-16">End Date</Typography>
					</div>
					<DatePicker
						className="mb-16"
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
				</div>
				<UploadProjectImage {...{ setFile, file, remove: () => setFile(null) }} />
				<TextFieldFormsy
					variant="outlined"
					className="mb-16"
					type="textarea"
					name="note"
					label="Project Notes"
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="mx-auto mt-32 mb-80"
					aria-label="LOG IN"
					disabled={!isFormValid}
				>
					add
				</Button>
			</Formsy>
		</DialogContent>
	);
}

export default AddProjectForm;
