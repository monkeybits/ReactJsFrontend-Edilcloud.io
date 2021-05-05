import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { TextField, Radio } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
	root: {
		background: `#ffffff)`,
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
	const handleChange = handleChangeAfterRemoveError;
	const classes = useStyles();
	const handleRadioChange = event => {};
	const { t } = useTranslation('company_create');

	console.log('form???????????????', form)
	return (
		<form name="registerForm" className="flex flex-col justify-center w-full">
			<TextField
				error={error.name.length}
				helperText={!!error.name.length && error.name[0]}
				className="mb-8"
				label={t('COMPANY_NAME')}
				autoFocus
				type="text"
				name="name"
				value={form.name}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
			/>
		</form>
	);
}

export default CompanyDetails;
