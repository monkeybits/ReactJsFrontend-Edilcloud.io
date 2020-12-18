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
import Grid from '@material-ui/core/Grid';
import FacebookIcon from '@material-ui/icons/Facebook';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TermsModal from './TermsModal';
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

function SimpleSelect() {
	const classes = useStyles();
	const [age, setAge] = React.useState('');

	const handleChange = event => {
		setAge(event.target.value);
	};
}
function LoginPage() {
	const [open, setOpen] = React.useState(false);
	const [title, setTitle] = React.useState('Terms');
	const classes = useStyles();

	return (
		<>
			<div
				className={clsx(
					classes.root,
					'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-20 sm:p-32 bg-white'
				)}
			>
				<img className="ht-100" src="assets/images/logos/fuse.svg" alt="logo" />
				<div className="flex flex-col items-center justify-center w-full max-w-425">
					<FuseAnimate animation="transition.expandIn">
						<Card className="w-full">
							<CardContent className="flex flex-col items-center justify-center p-20 sm:p-32">
								<Typography variant="h6" className="text-center font-600 mt-20 mb-4">
									Improve Construction communication
								</Typography>
								<Typography variant="subtitle1" className="text-muted mb-40">
									Join Edicloud, it's for all!
								</Typography>
								<Grid container spacing={2}>
									<Grid item xs={6}>
										<Button
											variant="outlined"
											color="primary"
											size="large"
											className="border-1 normal-case w-full"
										>
											<img
												src="assets/images/social-icons/facebook.png"
												className="h-20 mr-8"
												alt="Facebook"
											/>
											Facebook
										</Button>
									</Grid>
									<Grid item xs={6}>
										<Button
											variant="outlined"
											color="primary"
											size="large"
											className="border-1 normal-case w-full"
										>
											<img
												src="assets/images/social-icons/google.png"
												className="h-20 mr-8"
												alt="Google"
											/>
											Google
										</Button>
									</Grid>
								</Grid>

								<div className="my-28 flex items-center justify-center or-container">
									<Divider className="w-full" />
									<span className="mx-8 font-size-16 whitespace-no-wrap text-muted">
										Or sign in with email
									</span>
									<Divider className="w-full" />
								</div>

								<JWTLoginTab />

								<div className="flex items-center justify-center w-full pt-28">
									<span className="text-custom font-600 mr-6">Don't have an account?</span>
									<Link className="text-primary font-600 inline" to="/pages/auth/register">
										Sign Up
									</Link>
								</div>
							</CardContent>
						</Card>
					</FuseAnimate>
					<div className="flex items-center justify-between mt-8 w-full text-default font-600">
						<FormControl className={clsx(classes.formControl, 'custom-select-remove-border')}>
							<InputLabel id="demo-simple-select-label">Language</InputLabel>
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
							<a href="javascript:;" className="text-muted mr-20">
								Help
							</a>
							<a
								href="javascript:;"
								className="text-muted mr-20"
								onClick={() => {
									setTitle('Privacy');
									setOpen(true);
								}}
							>
								Privacy
							</a>
							<a
								href="javascript:;"
								className="text-muted"
								onClick={() => {
									setOpen(true);
									setTitle('Terms');
								}}
							>
								Terms
							</a>
						</div>
					</div>
				</div>
			</div>
			<TermsModal open={open} setOpen={setOpen} title={title} />
		</>
	);
}

export default LoginPage;
