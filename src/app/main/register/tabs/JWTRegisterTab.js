import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as authActions from 'app/auth/store/actions';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormControl, FormHelperText } from '@material-ui/core';
import { withRouter } from 'react-router';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

function JWTRegisterTab({ history }) {
	const dispatch = useDispatch();
	const register = useSelector(({ auth }) => auth.register);

	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const formRef = useRef(null);
	const [state, setState] = React.useState({
		termsFile: false,
		conditionFile: false
	});
	useEffect(() => {
		if (register.error && (register.error.username || register.error.password || register.error.email)) {
			formRef.current.updateInputsWithError({
				...register.error
			});
			disableButton();
		}
	}, [register.error]);

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(authActions.submitRegister({ ...model, history }));
	}
	const handleChange = event => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};
	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className="flex flex-col justify-center w-full"
				autoComplete="off"
			>
				<TextFieldFormsy
					className="mb-24"
					type="text"
					name="username"
					label="Username"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					// InputProps={{
					// 	endAdornment: (
					// 		<InputAdornment position="end">
					// 			<Icon className="text-20" color="action">
					// 				person
					// 			</Icon>
					// 		</InputAdornment>
					// 	)
					// }}
					variant="outlined"
					required
				/>
				<TextFieldFormsy
					className="mb-24"
					type="text"
					name="first_name"
					label="First name"
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
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-24"
					type="text"
					name="last_name"
					label="Last name"
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
									person
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-24"
					type="text"
					name="email"
					label="Email"
					validations="isEmail"
					validationErrors={{
						isEmail: 'Please enter a valid email'
					}}
					// InputProps={{
					// 	endAdornment: (
					// 		<InputAdornment position="end">
					// 			<Icon className="text-20" color="action">
					// 				email
					// 			</Icon>
					// 		</InputAdornment>
					// 	)
					// }}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-24"
					type="password"
					name="password"
					label="Password"
					validations="equalsField:password-confirm"
					validationErrors={{
						equalsField: 'Passwords do not match'
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

				<TextFieldFormsy
					className="mb-24"
					type="password"
					name="password-confirm"
					label="Confirm Password"
					validations="equalsField:password"
					validationErrors={{
						equalsField: 'Passwords do not match'
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

				{/* <FormControlLabel
					control={
						<Checkbox
							checked={state.termsFile}
							onChange={handleChange}
							name="termsFile"
							color="secondary"
						/>
					}
					label="Terms file"
				/>
				<FormControlLabel
					control={
						<Checkbox
							checked={state.conditionFile}
							onChange={handleChange}
							name="conditionFile"
							color="secondary"
						/>
					}
					label="Conditions files"
				/> */}
				<Button
					type="submit"
					variant="contained"
					size="large"
					color="primary"
					className="w-full mx-auto mt-0 uppercase"
					aria-label="Register"
					disabled={!isFormValid}
					value="legacy"
				>
					Get Started {register.loadingRegister && <CircularProgress size={15} color="secondary" />}
				</Button>
				{register.sucessData && (
					<FormControl>
						<FormHelperText id="component-success-text">{register.sucessData.detail}</FormHelperText>
					</FormControl>
				)}
			</Formsy>
		</div>
	);
}

export default withRouter(JWTRegisterTab);
