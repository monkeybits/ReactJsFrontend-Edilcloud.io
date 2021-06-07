import { Button, Icon, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';

function Breadcrumb({ className, selected }) {
	const { t } = useTranslation('filemanaer_project');
	const dispatch = useDispatch();

	const updatePath = index => {
		const newFolders = selected.filter((d, i) => i <= index);
		dispatch(Actions.updateFolderPath(newFolders));
	};
	return (
		<Typography className={className}>
			{selected.map(({ name }, i) => {
				// let list = path.split('/');
				// const folderName = list[list.length - 1];
				return (
					<span key={i} className="flex items-center">
						{i == 0 ? (
							<Button onClick={() => updatePath(i)}>{t('MY_DRIVE')}</Button>
						) : (
							<Button onClick={() => updatePath(i)}>{name}</Button>
						)}
						{selected.length - 1 !== i && <Icon>chevron_right</Icon>}
					</span>
				);
			})}
		</Typography>
	);
}

export default Breadcrumb;
