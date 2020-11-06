import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { FORGOT_PASSWORD } from 'app/services/apiEndPoints';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 150,
	  },
	  selectEmpty: {
		marginTop: theme.spacing(2),
	  },
}));

function SimpleSelect() {
	const classes = useStyles();
	const [age, setAge] = React.useState('');
  
	const handleChange = (event) => {
	  setAge(event.target.value);
	};
 }

function ForgotPasswordPage({ history }) {
	const classes = useStyles();
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
				history.push('/pages/auth/mail-confirm');
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
	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-20 sm:p-32 bg-white')}>
			<div className="flex flex-col items-center justify-center w-full max-w-425">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full">
						<CardContent className="flex flex-col items-center justify-center p-20 sm:p-32">
							<img className="ht-100" src="assets/images/logos/fuse.svg" alt="logo" />
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
				<div className="flex items-center justify-between mt-8 w-full text-default font-600">
					<FormControl className={clsx(classes.formControl, 'custom-select-remove-border')}>
						<InputLabel id="demo-simple-select-label">English (United States)</InputLabel>
						<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						// value={age}
						// onChange={handleChange}
						>
						<MenuItem value={10}>India</MenuItem>
						<MenuItem value={30}>U.K.</MenuItem>
						<MenuItem value={20}>Germany</MenuItem>
						</Select>
					</FormControl>
					<div className="flex">
						<a href="javascript:;" className="text-muted mr-20">Help</a>
						<a href="javascript:;" className="text-muted mr-20">Privacy</a>
						<a href="javascript:;" className="text-muted">Terms</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default withRouter(ForgotPasswordPage);
