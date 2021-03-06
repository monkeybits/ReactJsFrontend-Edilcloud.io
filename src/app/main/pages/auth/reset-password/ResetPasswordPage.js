import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { RESET_PASSWORD } from 'app/services/apiEndPoints';

const useStyles = makeStyles(theme => ({
	root: {
		background: `#ffffff)`,
		color: theme.palette.primary.contrastText
	}
}));

function ResetPasswordPage({ match: { params }, history }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user.data);
	const { form, handleChange, resetForm } = useForm({
		password: '',
		passwordConfirm: ''
	});

	function isFormValid() {
		return form.password.length > 0 && form.password.length > 3 && form.password === form.passwordConfirm;
	}

	function handleSubmit(ev) {
		const { password } = form;
		const { uid, token } = params;
		ev.preventDefault();
		apiCall(
			RESET_PASSWORD,
			{
				new_password1: password,
				new_password2: password,
				uid,
				token
			},
			res => {
				resetForm();
				history.push('/pages/auth/login');
			},
			err => {
				// console.log(err);
			},
			METHOD.POST
		);
	}

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">
							<img width="128" src="assets/images/logos/fuse.svg" alt="logo" />

							<Typography variant="h6" className="mt-16 mb-32">
								RESET YOUR PASSWORD
							</Typography>

							<form
								name="resetForm"
								noValidate
								className="flex flex-col justify-center w-full"
								onSubmit={handleSubmit}
							>
								<TextField
									className="mb-16"
									label="Password"
									type="password"
									name="password"
									value={form.password}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>

								<TextField
									className="mb-16"
									label="Password (Confirm)"
									type="password"
									name="passwordConfirm"
									value={form.passwordConfirm}
									onChange={handleChange}
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
									RESET MY PASSWORD
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

export default ResetPasswordPage;
