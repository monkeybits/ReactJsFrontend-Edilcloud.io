import _ from '@lodash';
import {Checkbox, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';
import { withFormsy } from 'formsy-react';
import React from 'react';

function CheckboxFormsy(props) {
	const importedProps = _.pick(props, [
		'checkedIcon',
		'classes',
		'color',
		'disabled',
		'disableRipple',
		'icon',
		'id',
		'indeterminate',
		'indeterminateIcon',
		'inputProps',
		'inputRef',
		'onChange',
		'variant'
	]);

	// An error message is returned only if the component is invalid
	const { errorMessage, value } = props;

	function changeValue(event) {
		props.setValue(event.target.checked);
		if (props.onChange) {
			props.onChange(event);
		}
	}

	return (
		<FormControl
			error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
			className={props.className}
		>
			<FormControlLabel
				control={<Checkbox {...importedProps} type="checkbox" checked={value} onChange={changeValue} />}
				label={props.label}
			/>
			{Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
		</FormControl>
	);
}

export default React.memo(withFormsy(CheckboxFormsy));
