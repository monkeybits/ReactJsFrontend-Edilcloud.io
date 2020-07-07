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

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

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
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">
							<div className="w-128 m-32">
								<img src="assets/images/logos/fuse.svg" alt="logo" />
							</div>

							<Typography variant="h6" className="mt-16 mb-32">
								RECOVER YOUR PASSWORD
							</Typography>

							<form
								name="recoverForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit}
							>
								<TextField
									error={error.email.length}
									className="mb-16"
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
									className="w-224 mx-auto mt-16"
									aria-label="Reset"
									disabled={!isFormValid()}
									type="submit"
								>
									SEND RESET LINK
								</Button>
							</form>

							<div className="flex flex-col items-center justify-center pt-32 pb-24">
								<Link className="font-medium" to="/pages/auth/login">
									Go back to login
								</Link>
							</div>
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default withRouter(ForgotPasswordPage);
