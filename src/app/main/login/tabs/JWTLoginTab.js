import React, { useEffect, useRef, useState } from 'react';
import { TextFieldFormsy } from '@fuse/core/formsy';
import { Button, IconButton, Icon, InputAdornment, CircularProgress, FormControl, FormHelperText } from '@material-ui/core';
import * as authActions from 'app/auth/store/actions';
import Formsy from 'formsy-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as notificationActions from 'app/fuse-layouts/shared-components/notification/store/actions';

function JWTLoginTab(props) {
	const dispatch = useDispatch();
	const login = useSelector(({ auth }) => auth.login);
	const { t } = useTranslation('login');

	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [nonFieldError, setNonFieldError] = useState('');

	const formRef = useRef(null);

	useEffect(() => {
		if (login.error?.non_field_errors) {
			setNonFieldError(login.error.non_field_errors[0]);
		}
		if (login.error && (login.error.email || login.error.password)) {
			formRef.current.updateInputsWithError({
				...login.error
			});
			disableButton();
		}
	}, [login.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		setNonFieldError('');
		dispatch(authActions.submitLogin(model));
		dispatch(notificationActions.resetNotificationData());
	}

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-24"
					type="text"
					name="email"
					label={t('USERNAME_OR_EMAIL')}
					value="admin"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>
				<FormControl error>
					<TextFieldFormsy
						className="mb-24"
						type="password"
						name="password"
						label={t('PASSWORD')}
						value="admin"
						validations={{
							minLength: 4
						}}
						validationErrors={{
							minLength: 'Min character length is 4'
						}}
						InputProps={{
							className: 'pr-2',
							type: showPassword ? 'text' : 'password',
							endAdornment: (
								<InputAdornment position="end">
									<IconButton onClick={() => setShowPassword(!showPassword)}>
										<Icon className="text-20" color="action">
											{showPassword ? 'visibility' : 'visibility_off'}
										</Icon>
									</IconButton>
								</InputAdornment>
							)
						}}
						variant="outlined"
						required
					/>
					{nonFieldError && <FormHelperText id="component-error-text">{nonFieldError}</FormHelperText>}
				</FormControl>
				<div className="flex items-center justify-end">
					{/* <FormControl>
						<FormControlLabel
							control={<Checkbox name="remember" checked={form.remember} onChange={handleChange} />}
							label="Remember Me"
						/>
					</FormControl> */}

					<Link className="text-primary font-600" to="/pages/auth/forgot-password">
						{t('FORGOT_PASSWORD')}
					</Link>
				</div>
				<Button
					type="submit"
					variant="contained"
					size="large"
					color="secondary"
					className="w-full mx-auto mt-16 uppercase"
					aria-label="Sign In"
					disabled={!isFormValid}
					value="legacy"
				>
					{t('SIGN_IN_BUTTON')}
					{'  '} {login.loadingLogin && <CircularProgress size={20} color="white" className="ml-20" />}
				</Button>
			</Formsy>
		</div>
	);
}

export default JWTLoginTab;
