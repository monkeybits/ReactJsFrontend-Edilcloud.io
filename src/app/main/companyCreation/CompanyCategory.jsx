import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Typography } from '@material-ui/core';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CompanyCategory({ optionList }) {
	// useEffect(() => {

	// }, [props.typologyList]);
	return (
		<Autocomplete
			multiple
			id="company-category"
			options={optionList}
			disableCloseOnSelect
			getOptionLabel={option => option.title}
			renderOption={(option, { selected }) => (
				<div>
					{option.mainTitle && <Typography className="h2 mb-8 ml-12">{option.mainTitle}</Typography>}
					<div>
						<Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
						{option.title}
					</div>
				</div>
			)}
			renderInput={params => <TextField {...params} variant="outlined" label="Company Categories" />}
		/>
	);
}
