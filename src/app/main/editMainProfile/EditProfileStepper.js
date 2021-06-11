import React, { useRef, useEffect } from 'react';
import { useForm } from '@fuse/hooks';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, Card, CardContent } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter, useHistory } from 'react-router-dom';
import { getCompressFile } from 'app/services/serviceUtils';
import { EDIT_PROFILE } from 'app/services/apiEndPoints';
import clsx from 'clsx';
import FuseAnimate from '@fuse/core/FuseAnimate';
import * as userActions from 'app/auth/store/actions';
import { useTranslation } from 'react-i18next';
import axios from '../../services/axiosConfig';
import loadable from '@loadable/component';
const ProfileUpload = loadable(() => import('./FileUpload'));
const BasicInfo = loadable(() => import('./BasicInfo'));

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		background: `#ffffff)`,
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
	return ['BASIC_INFORMATION', 'UPLOAD_PROFILE_PICTURE'];
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
	const { t } = useTranslation('edit_mainProfile');
	const { form, handleChange, resetForm, setForm } = useForm({
		fname: user && user.user.first_name,
		lname: user && user.user.last_name,
		email: user && user.email ? user.email : ''
	});
	const dispatch = useDispatch();
	const authuser = useSelector(({ auth }) => auth.user);

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
	useEffect(() => {
		setForm({
			fname: user && user.user.first_name,
			lname: user && user.user.last_name,
			email: user && user.user.email ? user.user.email : ''
		});
		setValue(user && user.user?.language == 'en' ? 'English' : 'Italian');
		setFile({
			imagePreviewUrl: user?.user?.photo
		});
	}, [user]);
	const handleReset = () => {
		setActiveStep(0);
	};
	const handleSubmit = async () => {
		const formData = new FormData();
		const values = {
			first_name: form.fname,
			last_name: form.lname,
			language: value == 'English' ? 'en' : 'it',
			photo: file && file.fileData ? await getCompressFile(file.fileData) : undefined
		};
		const token = localStorage.getItem('jwt_access_token');
		for (const key in values) {
			if (values[key]) formData.append(key, values[key]);
		}
		axios
			.put(EDIT_PROFILE(user.user.id), formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `JWT ${token}`
				}
			})
			.then(({ data }) => {
				dispatch(userActions.setUserData(data));
				const nextPath = history.location.state?.nextPath;
				history.push(nextPath || '/apps/todo/all');
			})
			.catch(err => {
				// console.log(err);
			});
	};
	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0')}>
			<div className="flex flex-col w-full px-0">
				<FuseAnimate animation="transition.expandIn">
					<Card>
						<CardContent className="flex flex-col">
							<Paper square elevation={0} className={clsx(classes.resetContainer, 'pb-10')}>
								<Typography>{t('EDIT_YOUR_PROFILE')}</Typography>
							</Paper>
							<Stepper className="px-0" activeStep={activeStep} orientation="vertical">
								{steps.map((label, index) => (
									<Step key={label}>
										<StepLabel>{t(label)}</StepLabel>
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
														{t('BACK')}
													</Button>
													<Button
														size="large"
														variant="contained"
														color="primary"
														onClick={handleNext}
														className={classes.button}
													>
														{activeStep === steps.length - 1 ? t('FINISH') : t('NEXT')}
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
