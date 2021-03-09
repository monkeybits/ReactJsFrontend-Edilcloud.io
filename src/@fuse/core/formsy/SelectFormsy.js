import React from 'react';
import _ from '@lodash';
import {FilledInput, FormControl, FormHelperText, Input, InputLabel, OutlinedInput, Select} from '@material-ui/core';
import { withFormsy } from 'formsy-react';

function SelectFormsy(props) {
	const importedProps = _.pick(props, [
		'autoWidth',
		'children',
		'classes',
		'displayEmpty',
		'input',
		'inputProps',
		'MenuProps',
		'multiple',
		'native',
		'onChange',
		'onClose',
		'onOpen',
		'open',
		'renderValue',
		'SelectDisplayProps',
		'value',
		'variant'
	]);

	// An error message is returned only if the component is invalid
	const { errorMessage, value } = props;

	function input() {
		switch (importedProps.variant) {
			case 'outlined':
				return <OutlinedInput labelWidth={props.label.length * 8} id={props.name} />;
			case 'filled':
				return <FilledInput id={props.name} />;
			default:
				return <Input id={props.name} />;
		}
	}

	function changeValue(event) {
		props.setValue(event.target.value);
		if (props.onChange) {
			props.onChange(event);
		}
	}

	return (
		<FormControl
			error={Boolean((!props.isPristine && props.showRequired) || errorMessage)}
			className={props.className}
			variant={importedProps.variant}
		>
			{props.label && <InputLabel htmlFor={props.name}>{props.label}</InputLabel>}
			<Select {...importedProps} value={value} onChange={changeValue} input={input()} />
			{Boolean(errorMessage) && <FormHelperText>{errorMessage}</FormHelperText>}
		</FormControl>
	);
}

export default React.memo(withFormsy(SelectFormsy));
