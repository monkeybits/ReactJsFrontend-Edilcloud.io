import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { TextField, Radio, Checkbox } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { useTranslation } from 'react-i18next';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
function BasicInfo({ form, handleChange, resetForm, value, setValue }) {
	const classes = useStyles();
	const { t } = useTranslation('mainProfile');

	return (
		<form name="registerForm" noValidate className="flex flex-col justify-center w-full">
			<TextField
				className="mb-8"
				label={t('FIRST_NAME')}
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
				label={t('LAST_NAME')}
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
				label={t('EMAIL')}
				type="email"
				name="email"
				value={form.email}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
			/>

			<Autocomplete
				options={['English', 'Italian']}
				disableCloseOnSelect
				getOptionLabel={option => option}
				renderOption={(option, { selected }) => (
					<>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option}
					</>
				)}
				inputValue={value}
				renderInput={params => <TextField {...params} variant="outlined" label={t('LANGUAGE')} />}
				onInputChange={(e, value) => setValue(value)}
			/>
		</form>
	);
}

export default BasicInfo;
