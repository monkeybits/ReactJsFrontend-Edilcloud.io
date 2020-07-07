import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';
import clsx from 'clsx';
import React from 'react';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';

import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));
const GreenRadio = withStyles({
	root: {
		color: green[400],
		'&$checked': {
			color: green[600]
		}
	},
	checked: {}
})(props => <Radio color="default" {...props} />);
function BasicInfo({ form, handleChange, resetForm, value, setValue }) {
	const classes = useStyles();
	const handleRadioChange = event => {
		setValue(event.target.value);
	};

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384">
						<CardContent className="flex flex-col items-center justify-center p-32">
							<form name="registerForm" noValidate className="flex flex-col justify-center w-full">
								<TextField
									className="mb-8"
									label="First Name"
									autoFocus
									type="text"
									name="fname"
									value={form.fname}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
								<TextField
									className="mb-8"
									label="Last Name"
									autoFocus
									type="text"
									name="lname"
									value={form.lname}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>
								<TextField
									disabled
									className="mb-8"
									label="Email"
									type="email"
									name="email"
									value={form.email}
									onChange={handleChange}
									variant="outlined"
									required
									fullWidth
								/>

								<FormControl component="fieldset">
									<FormLabel component="legend">Language</FormLabel>
									<RadioGroup
										row
										aria-label="Language"
										name="Language1"
										value={value}
										onChange={handleRadioChange}
									>
										<FormControlLabel value="English" control={<GreenRadio />} label="English" />
										<FormControlLabel value="Italian" control={<GreenRadio />} label="Italian" />
									</RadioGroup>
								</FormControl>
							</form>
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default BasicInfo;
