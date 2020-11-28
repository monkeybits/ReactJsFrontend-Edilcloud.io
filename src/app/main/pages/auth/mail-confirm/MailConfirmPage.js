import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
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
		minWidth: 150
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

function MailConfirmPage() {
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

							<Typography variant="h5" className="text-center font-600 mt-20 mb-24">
								Confirm Your Email Address!
							</Typography>

							<Typography className="text-muted font-600 text-center mb-16 w-full">
								A confirmation e-mail has been sent to <b>example@mymail.com</b>.
							</Typography>

							<Typography className="text-muted font-600 text-center w-full">
								Check your inbox and click on the "Confirm my email" link to confirm your email address.
							</Typography>

							<div className="flex items-center justify-center w-full pt-24">
								<Button
									type="button"
									variant="contained"
									size="large"
									color="primary"
									className="w-full mx-auto mt-0 uppercase"
									aria-label="Go Back To Login"
									onClick={() => { history.push('/pages/auth/login'); }}
								>
									Go back to login
								</Button>
							</div>
						</CardContent>
					</Card>
				</FuseAnimate>
				{/* <div className="flex items-center justify-between mt-8 w-full text-default font-600">
					<FormControl className={clsx(classes.formControl, 'custom-select-remove-border')}>
						<InputLabel id="demo-simple-select-label">Language</InputLabel>
						<Select
							labelId="demo-simple-select-label"
							id="demo-simple-select"
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
				</div> */}
			</div>
		</div>
	);
}

export default MailConfirmPage;
