import FuseAnimate from '@fuse/core/FuseAnimate';
import loadable from '@loadable/component';
import { useForm } from '@fuse/hooks';
import { Button, Card, CardContent, TextField, Typography, InputLabel, MenuItem, FormControl, Icon, InputAdornment, ListItemText } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { FORGOT_PASSWORD } from 'app/services/apiEndPoints';
import * as MainActions from 'app/store/actions';
import 'tippy.js/themes/light-border.css';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
const TippyMenu = loadable(() => import('app/TippyMenu'))

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 150
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));
const languages = [
	{
		id: 'en',
		title: 'English',
		flag: 'us'
	},
	{
		id: 'it',
		title: 'Italian',
		flag: 'tr'
	}
];
function SimpleSelect() {
	const classes = useStyles();
	const [age, setAge] = React.useState('');

	const handleChange = event => {
		setAge(event.target.value);
	};
}

function ForgotPasswordPage({ history }) {
	const classes = useStyles();
	const { i18n } = useTranslation();
	const { t } = useTranslation('login');
	const dispatch = useDispatch();
	const currentLng = languages.find(lng => lng.id === i18n.language);
	const theme = useTheme();
	const [error, setError] = useState({
		email: []
	});
	const { form, handleChange, resetForm } = useForm({
		email: ''
	});

	function isFormValid() {
		return form.email.length > 0;
	}

	function handleSubmit(ev) {
		ev.preventDefault();
		apiCall(
			FORGOT_PASSWORD,
			{
				email: form.email
			},
			res => {
				history.push('/pages/auth/mail-confirm', {
					email: form.email
				});
			},
			err => {
				const { email } = err;
				setError({ email });
			},
			METHOD.POST
		);
		// resetForm();
	}
	const handleChangeAndRemoveError = e => {
		setError({
			email: []
		});
		handleChange(e);
	};

	function handleLanguageChange(lng) {
		const newLangDir = i18n.dir(lng.id);
		localStorage.setItem('language', lng.id);
		/*
        Change Language
         */
		i18n.changeLanguage(lng.id);

		/*
        If necessary, change theme direction
         */
		if (newLangDir !== theme.direction) {
			dispatch(MainActions.setDefaultSettings({ direction: newLangDir }));
		}

		// userMenuClose();
	}

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-20 sm:p-32 bg-white'
			)}
		>
			<div className="flex flex-col items-center justify-center w-full max-w-425">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full">
						<CardContent className="flex flex-col items-center justify-center p-20 sm:p-32">
							<img width="200" src="assets/images/logos/fuse.svg" alt="logo" />
							<Typography variant="h5" className="text-center font-600 mt-20 mb-28">
								Recover Password
							</Typography>
							<form
								name="recoverForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit}
							>
								<TextField
									error={error.email.length}
									className="mb-4"
									label="Email"
									autoFocus
									type="email"
									name="email"
									value={form.email}
									onChange={handleChangeAndRemoveError}
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<Icon className="text-20" color="action">
													mail
												</Icon>
											</InputAdornment>
										)
									}}
									variant="outlined"
									required
									fullWidth
								/>

								<Button
									variant="contained"
									color="primary"
									size="large"
									className="w-full mx-auto mt-16 uppercase"
									aria-label="Reset"
									disabled={!isFormValid()}
									type="submit"
								>
									Send Reset Link
								</Button>
							</form>

							<div className="flex flex-col items-center justify-center pt-24">
								<Link className="text-primary font-600" to="/pages/auth/login">
									Return to Sign In
								</Link>
							</div>
						</CardContent>
					</Card>
				</FuseAnimate>
				<div className="flex items-center justify-between mt-8 w-full text-default font-600 px-32">
					<FormControl className={clsx(classes.formControl, 'custom-select-remove-border')}>
						<TippyMenu
							icon={
								<>
									{/* <InputLabel id="demo-simple-select-label">{t('LANGUAGE')}</InputLabel> */}
									<InputLabel id="demo-simple-select-label">
										{currentLng.title}{' '}
										<span className="arrow-icon">
											{' '}
											<KeyboardArrowDownIcon />{' '}
										</span>{' '}
									</InputLabel>
								</>
							}
							// ref={menuRef}
							outsideClick
						>
							{languages.map(lng => (
								<MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
									<ListItemText primary={lng.title} />
								</MenuItem>
							))}
						</TippyMenu>
						{/* <Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								// value={age}
								// onChange={handleChange}
							>
								{languages.map(lng => (
									<MenuItem key={lng.id} onClick={() => handleLanguageChange(lng)}>
										<ListItemText primary={lng.title} />
									</MenuItem>
								))}
							</Select> */}
					</FormControl>
					{/* <FormControl className={clsx(classes.formControl, 'custom-select-remove-border')}>
						<InputLabel id="demo-simple-select-label">English (United States)</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
							
						>
							<MenuItem value={10}>India</MenuItem>
							<MenuItem value={30}>U.K.</MenuItem>
							<MenuItem value={20}>Germany</MenuItem>
						</Select>
					</FormControl> */}
					<div className="flex">
						<a href="javascript:;" className="text-muted mr-20">
							Help
						</a>
						<a href="javascript:;" className="text-muted mr-20">
							Privacy
						</a>
						<a href="javascript:;" className="text-muted">
							Terms
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(ForgotPasswordPage);
