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
function CompanyDetails({ form, handleChangeAfterRemoveError, error }) {
	let handleChange = handleChangeAfterRemoveError;
	const classes = useStyles();
	const handleRadioChange = event => {};

	return (
		<form name="registerForm" className="flex flex-col justify-center w-full">
			<TextField
				error={error.name.length}
				helperText={!!error.name.length && error.name[0]}
				className="mb-8"
				label="Company Name"
				autoFocus
				type="text"
				name="name"
				value={form.name}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
			/>
			<TextField
				className="mb-8"
				label="Description"
				autoFocus
				type="text"
				name="desc"
				value={form.desc}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
			/>
			<TextField
				className="mb-8"
				label="Company Email"
				type="email"
				name="email"
				value={form.email}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
			/>
			<TextField
				className="mb-8"
				label="VAT Number"
				type="text"
				name="vat_number"
				value={form.vat_number}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
			/>
			<TextField
				className="mb-8"
				label="Website Url"
				type="text"
				name="url"
				value={form.url}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
			/>
			<TextField
				className="mb-8"
				label="Telephone number"
				type="text"
				name="phone"
				value={form.phone}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
			/>
		</form>
	);
}

export default CompanyDetails;
