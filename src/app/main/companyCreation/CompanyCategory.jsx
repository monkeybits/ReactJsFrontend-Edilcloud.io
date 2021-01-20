import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CompanyCategory({ optionList }) {
	// useEffect(() => {
	const { t } = useTranslation('company_create');

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
			renderInput={params => <TextField {...params} variant="outlined" label={t('COMPANY_CATEGORIES')} />}
		/>
	);
}
