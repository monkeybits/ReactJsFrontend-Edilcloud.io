import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from './store/actions';
import { useTranslation } from 'react-i18next';

function Breadcrumb({ className, selected }) {
	const dispatch = useDispatch();
	const { t } = useTranslation('filemanager');

	const updatePath = index => {
		const newFolders = selected.filter((d, i) => i <= index);
		console.log({ newFolders });
		dispatch(Actions.updateFolderPath(newFolders));
	};
	return (
		<Typography className={className}>
			{selected.map((path, i) => {
				let list = path.split('/');
				const folderName = list[list.length - 1];
				return (
					<span key={i} className="flex items-center">
						{i == 0 ? (
							<Button className="font-bold underline" onClick={() => updatePath(i)}>
								{t('MY_DRIVE')}
							</Button>
						) : (
							<Button className="font-bold underline" onClick={() => updatePath(i)}>
								{folderName}
							</Button>
						)}
						{selected.length - 1 !== i && <Icon>chevron_right</Icon>}
					</span>
				);
			})}
		</Typography>
	);
}

export default Breadcrumb;
