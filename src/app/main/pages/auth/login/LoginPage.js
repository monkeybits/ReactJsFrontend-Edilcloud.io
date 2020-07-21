import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import JWTLoginTab from 'app/main/login/tabs/JWTLoginTab';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function LoginPage() {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">
							<img className="w-128" src="assets/images/logos/fuse.svg" alt="logo" />

							<Typography variant="h6" className="mt-16 mb-32">
								LOGIN TO YOUR ACCOUNT
							</Typography>

							<JWTLoginTab />

							<div className="my-20 flex items-center justify-center">
								<Divider className="w-full" />
								<span className="mx-8 font-bold">OR</span>
								<Divider className="w-full" />
							</div>

							<Button
								variant="contained"
								color="secondary"
								className="normal-case w-full mb-12"
							>
								Log in with Google
							</Button>

							<Button variant="contained" color="primary" className="normal-case w-full">
								Log in with Facebook
							</Button>

							<div className="flex flex-col items-center justify-center pt-32 pb-8">
								<span className="font-medium">Don't have an account?</span>
								<Link className="font-medium mt-4" to="/pages/auth/register">
									Create an account
								</Link>
							</div>
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default LoginPage;
