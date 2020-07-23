import React, { useRef } from 'react';
import { useForm } from '@fuse/hooks';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import BasicInfo from './BasicInfo';
import ProfileUpload from './FileUpload';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from '../../services/axiosConfig';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import { USER_MAIN_PROFILE } from 'app/services/apiEndPoints';
import clsx from 'clsx';
import { darken } from '@material-ui/core/styles/colorManipulator';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	},
	button: {
		marginTop: theme.spacing(1),
		width: '190px'
	},
	actionsContainer: {
		marginBottom: theme.spacing(2)
	},
	resetContainer: {
		padding: theme.spacing(3)
	}
}));

function getSteps() {
	return ['Basic Information', 'Upload Profile Picture'];
}

function getStepContent(step, elementProps) {
	switch (step) {
		case 0:
			return <BasicInfo {...elementProps} />;
		case 1:
			return <ProfileUpload {...elementProps} />;
		default:
			return 'Unknown step';
	}
}

function VerticalLinearStepper({ user, history }) {
	const { form, handleChange, resetForm } = useForm({
		fname: '',
		lname: '',
		email: user && user.email ? user.email : ''
	});
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);
	const steps = getSteps();
	const [value, setValue] = React.useState('');
	const [file, setFile] = React.useState(null);

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
		if (activeStep == 1) {
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
			first_name: form.fname,
			last_name: form.lname,
			language: value == 'English' ? 'en' : 'it',
			photo: file && file.fileData ? file.fileData : undefined
		};
		let token = localStorage.getItem('jwt_access_token');
		for (let key in values) {
			if (values[key]) formData.append(key, values[key]);
		}
		axios
			.post(USER_MAIN_PROFILE, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `JWT ${token}`
				}
			})
			.then(res => {
				history.push('/create-company');
			})
			.catch(err => {
				console.log(err);
			});
	};
	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-20 md:p-40'
			)}
		>
			<div className="flex flex-col items-center justify-center w-full px-0">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-512">
						<CardContent className="flex flex-col items-center justify-center">
							<Paper square elevation={0} className={clsx(classes.resetContainer, 'pb-10')}>
								<Typography>a few more steps and you can start using Edilcloud</Typography>
							</Paper>
							<Stepper className="px-0" activeStep={activeStep} orientation="vertical">
								{steps.map((label, index) => (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
										<StepContent>
											<Typography>
												{getStepContent(
													index,
													index == 0
														? { form, handleChange, resetForm, value, setValue }
														: { setFile, file, remove: () => setFile(null) }
												)}
											</Typography>
											<div
												className={clsx(
													classes.actionsContainer,
													'text-center custom-btn-group mt-12'
												)}
											>
												<div>
													<Button
														variant="contained"
														disabled={activeStep === 0}
														onClick={handleBack}
														size="large"
														className={clsx(classes.button, 'mr-8')}
													>
														Back
													</Button>
													<Button
														size="large"
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
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

function mapStateToProps({ auth }) {
	return {
		user: auth.user.data
	};
}

export default withRouter(connect(mapStateToProps)(VerticalLinearStepper));