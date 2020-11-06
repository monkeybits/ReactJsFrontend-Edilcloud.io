import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import JWTRegisterTab from 'app/main/register/tabs/JWTRegisterTab';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

function RegisterPage() {
	const classes = useStyles();

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
							<Typography variant="h5" className="text-center font-600 mt-20 mb-28">
								Set up your edilcloud account
							</Typography>
							<JWTRegisterTab />
							<div className="font-600 text-center text-muted mt-20">
								By signing up, I agree to the edilcloud
								<Link className="text-primary font-600" to="/">
									{' '}
									 Privacy policy{' '}
								</Link>{' '}
								and 
								<Link className="text-primary font-600" to="/">
									 Terms of service.{' '}
								</Link>
							</div>
							<div className="flex flex-col items-center justify-center w-full pt-24">
								<span className="text-custom font-600 mr-6">Already have an account?</span>
								<Link className="text-primary font-600 inline" to="/pages/auth/login">
									Sign In
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

export default RegisterPage;
