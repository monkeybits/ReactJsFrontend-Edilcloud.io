import React, { useRef, useEffect } from 'react';
import { useForm } from '@fuse/hooks';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { USER_MAIN_PROFILE } from 'app/services/apiEndPoints';
import CompanyDetails from './CompanyDetails';
import CompanyCategory from './CompanyCategory';
import FileUpload from '../mainProfile/FileUpload';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { TYPOLOGY_LIST, TYPOLOGY_LIST_BY_CODE, USER_ADD_COMPANY } from 'app/services/apiEndPoints';
import { getHeaderToken } from 'app/services/serviceUtils';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	actionsContainer: {
		marginBottom: theme.spacing(2)
	},
	resetContainer: {
		padding: theme.spacing(3)
	}
}));

function getSteps() {
	return ['Company Details', 'Company Categories', 'Company Logo'];
}

function getStepContent(step, elementProps) {
	switch (step) {
		case 0:
			return <CompanyDetails {...elementProps} />;
		case 1:
			return <CompanyCategory {...elementProps} />;
		case 2:
			return <FileUpload {...elementProps} />;
		default:
			return 'Unknown step';
	}
}

function CompanyCreationStepper({ user, history }) {
	const { form, handleChange, resetForm } = useForm({
		name: '',
		desc: '',
		email: '',
		vat_number: '',
		url: '',
		phone: ''
	});
	const [typologyList, setTypologyList] = React.useState([]);
	const [optionList, setOptionList] = React.useState([]);
	useEffect(() => {
		apiCall(
			TYPOLOGY_LIST,
			{},
			res => {
				let typologyListRes = res;
				if (Array.isArray(res)) {
					let list = [];
					typologyListRes.map((typology, index) => {
						apiCall(
							TYPOLOGY_LIST_BY_CODE(typology.code),
							{},
							subCategoryRes => {
								if (Array.isArray(subCategoryRes)) {
									subCategoryRes.map((subCate, index) => {
										subCategoryRes[index] = {
											...subCategoryRes[index],
											mainTitle: index == 0 ? typology.name : undefined,
											title: subCategoryRes[index].name
										};
									});
									list = [...list, ...subCategoryRes];
									setOptionList([...list]);
								}
								typologyListRes[index] = { ...typologyListRes[index], subCategory: subCategoryRes };
								let subCategory = [];
								setTypologyList(typologyListRes);
							},
							listErr => console.log({ listErr }),
							METHOD.GET,
							getHeaderToken()
						);
					});
				}
			},
			err => console.log(err),
			METHOD.GET,
			getHeaderToken()
		);
	}, []);

	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();
	const [value, setValue] = React.useState('English');
	const [file, setFile] = React.useState(null);
	const [error, setError] = React.useState({
		name: [],
		slug: [],
		url: [],
		email: [],
		vat_number: [],
		phone: []
	});

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
		if (activeStep == 2) {
			handleSubmit();
		}
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};
	const handleSubmit = () => {
		var formData = new FormData();
		let values = {
			name: form.name,
			slug: form.name,
			url: form.url,
			vat_number: form.vat_number,
			email: form.email,
			phone: form.phone,
			logo: file && file.fileData ? file.fileData : undefined
		};
		let token = localStorage.getItem('jwt_access_token');
		for (let key in values) {
			if (values[key]) formData.append(key, values[key]);
		}
		axios
			.post(USER_ADD_COMPANY, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `JWT ${token}`
				},
				baseURL: 'http://ec2-3-9-170-59.eu-west-2.compute.amazonaws.com:8000/'
			})
			.then(res => {
				history.push('/apps/companies');
			})
			.catch(err => {
				const { name, url, email, vat_number, phone } = err.response.data;
				setError({
					name: name ? name : [],
					url: url ? url : [],
					email: email ? email : [],
					vat_number: vat_number ? vat_number : [],
					phone: phone ? phone : []
				});
				setActiveStep(0);
			});
	};
	const handleChangeAfterRemoveError = e => {
		setError({
			name: [],
			slug: [],
			url: [],
			email: [],
			vat_number: [],
			phone: []
		});
		handleChange(e);
	};
	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
						<StepContent>
							<Typography>
								{getStepContent(
									index,
									index == 0
										? { form, handleChangeAfterRemoveError, error }
										: index == 1
										? { typologyList, optionList }
										: { setFile, file }
								)}
							</Typography>
							<div className={classes.actionsContainer}>
								<div>
									<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
										Back
									</Button>
									<Button
										variant="contained"
										color="primary"
										onClick={handleNext}
										className={classes.button}
									>
										{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
				))}
			</Stepper>
			{activeStep === steps.length && (
				<Paper square elevation={0} className={classes.resetContainer}>
					<Typography>All steps completed - you&apos;re finished</Typography>
				</Paper>
			)}
		</div>
	);
}

function mapStateToProps({ auth }) {
	return {
		user: auth.user.data
	};
}

export default withRouter(connect(mapStateToProps)(CompanyCreationStepper));
