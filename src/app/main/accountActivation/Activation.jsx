import React, { useEffect, useState } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import clsx from 'clsx';
import { CircularProgress } from '@material-ui/core';
import { USER_ACTIVATION } from 'app/services/apiEndPoints';
import { useHistory } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { apiCall, METHOD } from '../../services/baseUrl';

const useStyles = makeStyles(theme => ({
	root: {
		background: `#ffffff)`,
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

function Activation(props) {
	const [isActivated, setIsActivated] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	useEffect(() => {
		const { token, uidb64 } = props.match.params;
		apiCall(
			USER_ACTIVATION(uidb64, token),
			{},
			res => {
				setSuccess(res.detail);
				setIsActivated(true);
			},
			err => {
				setError(err);
			},
			METHOD.GET
		);
	}, [props.match]);
	const classes = useStyles();
	const history = useHistory();

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
							<img className="ht-100" src="assets/images/logos/fuse.svg" alt="logo" />
							{!error && (
								<>
									<div className="mt-24">
										<CheckCircleIcon className="text-green text-48" />
									</div>
									<Typography variant="h5" className="text-center font-weight-600 mb-16">
										We {success ? 'Activated' : 'are Activating'} Your Profile!
									</Typography>

									<Typography className="text-muted text-center font-600 mb-16 w-full">
										{success || 'Please Wait...'}
									</Typography>
								</>
							)}
							{error ? (
								<>
									<div className="mt-24">
										<CancelIcon className="text-red text-48" />
									</div>
									<Typography variant="h5" className="text-center font-600 mt-20 mb-28">
										{error}
									</Typography>
									<div className="flex items-center justify-center w-full">
										<Button
											type="button"
											variant="contained"
											size="large"
											color="primary"
											className="w-full mx-auto mt-0 uppercase"
											aria-label="Go Back To Login"
											onClick={() => {
												history.push('/pages/auth/login');
											}}
										>
											Go back to login
										</Button>
									</div>
								</>
							) : isActivated ? (
								<div className="flex items-center justify-center w-full pt-20">
									<Button
										type="button"
										variant="contained"
										size="large"
										color="primary"
										className="w-full mx-auto mt-0 uppercase"
										aria-label="Go Back To Login"
										onClick={() => {
											history.push('/pages/auth/login');
										}}
									>
										Go back to login
									</Button>
								</div>
							) : (
								<div className="flex items-center justify-center w-full pt-24">
									<CircularProgress />
								</div>
							)}
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default Activation;
