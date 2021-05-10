import React, { useEffect } from 'react';
import { useForm } from '@fuse/hooks';
import loadable from '@loadable/component';
import { makeStyles } from '@material-ui/core/styles';
import {
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Button,
	Paper,
	Typography,
	Box,
	CircularProgress,
	Card,
	CardContent
} from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import { TYPOLOGY_LIST, TYPOLOGY_LIST_BY_CODE, USER_ADD_COMPANY, USER_EDIT_COMPANY } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken, getCompressFile } from 'app/services/serviceUtils';
import clsx from 'clsx';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { darken } from '@material-ui/core/styles/colorManipulator';
import * as Actions from 'app/main/apps/chat/store/actions';
import { useTranslation } from 'react-i18next';
import axios from '../../services/axiosConfig';

const FileUpload = loadable(() => import('../mainProfile/FileUpload'));
const CompanyCategory = loadable(() => import('./CompanyCategory'));
const CompanyDetails = loadable(() => import('./CompanyDetails'));

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
	},
	progBox: {
		position: 'absolute',
		top: '10px',
		right: 0,
		width: '50px'
	}
}));

function getSteps() {
	return ['COMPANY_DETAILS', 'COMPANY_LOGO'];
}

function getStepContent(step, elementProps) {
	switch (step) {
		case 0:
			return <CompanyDetails {...elementProps} />;
		case 1:
			return <FileUpload isCompany {...elementProps} />;
		default:
			return 'Unknown step';
	}
}

function CompanyCreationStepper({ user, history }) {
	const { t } = useTranslation('company_create');
	const location = useLocation();
	const { form, handleChange, resetForm, setForm } = useForm({
		name: '',
		desc: '',
		email: '',
		vat_number: '',
		url: '',
		phone: ''
	});
	const company = useSelector(({ chatApp }) => chatApp.company);
	const dispatch = useDispatch();
	const [typologyList, setTypologyList] = React.useState([]);
	const [optionList, setOptionList] = React.useState([]);
	const [progress, setProgress] = React.useState(0);
	const [isEdit, setIsEdit] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const routeHistory = useHistory();

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

	useEffect(() => {
		apiCall(
			TYPOLOGY_LIST,
			{},
			res => {
				const typologyListRes = res;
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
								const subCategory = [];
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

	useEffect(() => {
		dispatch(Actions.companyInfo());
	}, []);

	useEffect(() => {
		if (routeHistory) {
			console.log({ routeHistory });
			if (
				routeHistory.location.pathname == '/apps/settings' ||
				routeHistory.location.pathname == '/edit-company'
			) {
				setIsEdit(true);
				console.log({ company });
				setFile({
					imagePreviewUrl: company.logo
				});
				setForm({
					id: company.id,
					name: company.name,
					desc: company.description,
					email: company.email,
					vat_number: company.vat_number,
					url: company.url,
					phone: company.phone
				});
			}
		}
	}, [routeHistory, company]);

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

	const handleSubmit = async () => {
		const formData = new FormData();
		const values = {
			name: form.name,
			slug: form.name.split(' ').join('_'),
			description: form.desc,
			url: form.url,
			vat_number: form.vat_number,
			email: form.email,
			phone: form.phone,
			logo: file && file.fileData ? await getCompressFile(file.fileData) : undefined
		};
		const token = localStorage.getItem('jwt_access_token');
		for (const key in values) {
			if (values[key]) formData.append(key, values[key]);
		}
		const request = isEdit
			? axios.put(USER_EDIT_COMPANY(company.id), formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `JWT ${token}`
					},
					onUploadProgress(progressEvent) {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setProgress(percentCompleted);
					}
			  })
			: axios.post(USER_ADD_COMPANY, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `JWT ${token}`
					},
					onUploadProgress(progressEvent) {
						const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
						setProgress(percentCompleted);
					}
			  });

		request
			.then(res => {
				setProgress(0);
				if (isEdit) {
					console.log('routeHistorynextPath', routeHistory.location.state.nextPath);
					routeHistory.push(routeHistory.location.state.nextPath);
				} else {
					routeHistory.push('/apps/companies');
				}
			})
			.catch(err => {
				setProgress(0);
				const { name, url, email, vat_number, phone } = err.response.data;
				setError({
					name: name || [],
					url: url || [],
					email: email || [],
					vat_number: vat_number || [],
					phone: phone || []
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

	const isMainWrap = !!(location.pathname === '/create-company' || location.pathname === '/edit-company');

	return (
		<div
			className={clsx(
				classes.root,
				`flex flex-col flex-auto flex-shrink-0 ${isMainWrap ? 'items-center justify-center p-20 md:p-40' : ''}`
			)}
		>
			<div className={`flex flex-col w-full ${isMainWrap ? 'items-center justify-center' : ''}`}>
				<FuseAnimate animation="transition.expandIn">
					<Card className={`${isMainWrap ? 'w-full max-w-512' : ''}`}>
						<CardContent className={`flex flex-col ${isMainWrap ? 'items-center justify-center' : ''}`}>
							<Stepper activeStep={activeStep} orientation="vertical">
								{steps.map((label, index) => (
									<Step key={label}>
										<StepLabel>{t(label)}</StepLabel>
										<StepContent>
											<Typography>
												{getStepContent(
													index,
													index == 0
														? { form, handleChangeAfterRemoveError, error }
														: index == 1
														? { setFile, file, remove: () => setFile(null) }
														: { typologyList, optionList }
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
														size="large"
														className={clsx(classes.button, 'mr-8')}
														disabled={activeStep === 0}
														onClick={handleBack}
													>
														{t('BACK')}
													</Button>
													<Button
														size="large"
														variant="contained"
														color="primary"
														className={classes.button}
														onClick={handleNext}
													>
														{activeStep === steps.length - 1 ? t('FINISH') : t('NEXT')}
													</Button>
												</div>
											</div>
										</StepContent>
									</Step>
								))}
							</Stepper>
							{/* {activeStep !== steps.length && ( */}
							<>
								<Paper square elevation={0} className={classes.resetContainer}>
									<Typography>{t('STEP_COMPLETE_MESSAGE')}</Typography>
									{progress > 0 && (
										<Box position="relative" display="inline-flex" className={classes.progBox}>
											<CircularProgress variant="static" color="primary" value={progress} />
											<Box
												top={0}
												left={0}
												bottom={0}
												right={0}
												position="absolute"
												display="flex"
												alignItems="center"
												justifyContent="center"
											>
												<Typography
													variant="caption"
													component="div"
													color="textInfo"
												>{`${Math.round(progress)}%`}</Typography>
											</Box>
										</Box>
									)}
								</Paper>
							</>
							{/* )} */}
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

export default withRouter(connect(mapStateToProps)(CompanyCreationStepper));
