/* =============================================================================
 TODO: AddProjectForm.js
 ===============================================================================
*This file is part of project list page 
TODO: This File is created for showing add project form and on submit method we are creating new project and geting list of project
*/
import { useForm } from '@fuse/hooks';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { TextFieldFormsy } from '@fuse/core/formsy';
import { Button, withStyles, Avatar, CircularProgress, Grid, TextField } from '@material-ui/core';
import Formsy from 'formsy-react';
import React, { useRef, useState, useEffect } from 'react';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from 'app/main/apps/notes/store/actions';
import { useParams } from 'react-router';
import { ADD_TEAM_BY_CODE } from 'app/services/apiEndPoints';
import { METHOD, apiCall } from 'app/services/baseUrl';
import { getHeaderToken, getCompressFile } from 'app/services/serviceUtils';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';

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
        console.log('res???????????????????????', cardForm.code)
		setLoading(true);
		apiCall(
			ADD_TEAM_BY_CODE(2),
			{unique_code: cardForm.code},
			res => {
                console.log('res???????????????????????', res)
				setLoading(false);
			},
			err => {
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
                            // disabled={getIsDisabled()}
                            type="text"
                            name="code"
                            variant="outlined"
                            value={cardForm.code}
                            onChange={handleChange}
                            fullWidth
                            required
                            // InputProps={{
                            //     endAdornment: (
                            //         <InputAdornment position="end">
                            //             <Icon className="text-20" color="action">
                            //                 remove_red_eye
                            //                             </Icon>
                            //         </InputAdornment>
                            //     )
                            // }}
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
