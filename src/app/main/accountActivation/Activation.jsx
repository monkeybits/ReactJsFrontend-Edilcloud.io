import React, { useEffect, useState } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { CircularProgress } from '@material-ui/core';
import { apiCall, METHOD } from '../../services/baseUrl';
import { USER_ACTIVATION } from 'app/services/apiEndPoints';
import { Link } from 'react-router-dom';
const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Activation(props) {
	const [isActivated, setIsActivated] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	useEffect(() => {
		localStorage.clear();
	}, []);
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
	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">
							{!error && (
								<>
									<div className="m-32">
										<Icon className="text-96" color="action">
											check
										</Icon>
									</div>
									<Typography variant="h5" className="text-center mb-16">
										we {success ? 'activated' : 'are activating'} your profile!
									</Typography>

									<Typography className="text-center mb-16 w-full" color="textSecondary">
										{success ? success : 'please wait'}
									</Typography>
								</>
							)}
							{error ? (
								<Typography className="text-center mb-16 w-full" color="textSecondary">
									{error}
								</Typography>
							) : isActivated ? (
								<div className="flex flex-col items-center justify-center pt-32 pb-24">
									<Link className="font-medium" to="/pages/auth/login">
										Go back to login
									</Link>
								</div>
							) : (
								<div className="flex flex-col items-center justify-center pt-32 pb-24">
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
