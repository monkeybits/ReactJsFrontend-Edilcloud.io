/* =============================================================================
 TODO: AddProjectForm.js
 ===============================================================================
*This file is part of project list page 
TODO: This File is created for showing add project form and on submit method we are creating new project and geting list of project
*/
import { useForm } from '@fuse/hooks';
import { Button, withStyles, CircularProgress, Grid, TextField } from '@material-ui/core';
import Formsy from 'formsy-react';
import React, { useRef, useState } from 'react';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from 'app/main/apps/notes/store/actions';
import { useParams } from 'react-router';
import { ADD_TEAM_BY_CODE } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

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

function AddCode() {
	const routeParams = useParams();
	const dispatch = useDispatch();
	const projectApp = useSelector(({ notesApp }) => notesApp.project);
    const formRef = useRef(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState('');
	const [isFormValid, setIsFormValid] = useState(false);
	const [code, setCode] = useState(false);
	const [file, setFile] = useState(null);
	const [filteredData, setFilteredData] = useState([]);
	const [projectCoordinators, setProjectCoordinators] = useState([]);
	const getdate = date => (date ? moment(date).format('YYYY-MM-DD') : undefined);
	const projects = useSelector(({ notesApp }) => notesApp.project.entities);
	const { t } = useTranslation('projects');

    const { form: cardForm, handleChange, setForm, setInForm } = useForm({
		code: ''
	});

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
        if(cardForm.code !== '') {
            setIsFormValid(true);
        }
	}

	const handleSubmit = () => {
		setLoading(true);
		apiCall(
			ADD_TEAM_BY_CODE,
			{unique_code: cardForm.code},
			res => {
				if(res.unique_code){
					dispatch(Actions.closeProjectDialog());
					dispatch(Actions.getProjects());
				} else {
					setError(true)
					setErrorMessage('Please enter correct code')
				}
				setLoading(false);
			},
			err => {
				setError(true)
				setErrorMessage(err.detail)
				setLoading(false);
			},
			METHOD.POST,
			getHeaderToken()
		);
	};

    function canBeSubmit() {
		return cardForm.code;
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
                        <TextField
                            className="mt-12"
                            label="Code"
                            type="text"
                            name="code"
                            variant="outlined"
                            value={cardForm.code}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
						{
							error &&
							<div className="text-red-700">{errorMessage}</div>
						}
					</Grid>
					<Grid item xs={12}>
						<div className="inline-block">
							<Button
								type="submit"
								variant="contained"
								color="primary"
								className="justify-start d-inline-block mb-20"
								aria-label="LOG IN"
								disabled={!canBeSubmit()}
							>
								Submit
								{loading && <CircularProgress size={20} color="secondary" />}
							</Button>
						</div>
					</Grid>
				</Grid>
			</Formsy>
		</DialogContent>
	);
}

export default AddCode;
