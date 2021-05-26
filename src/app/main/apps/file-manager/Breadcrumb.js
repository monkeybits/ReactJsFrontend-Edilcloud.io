/* =============================================================================
 TODO: Breadcrumb.js
 ===============================================================================
*This File is part of Company File manager
TODO: We can jump on specifc file or folder from this file 
*/
import { Button, Icon, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';

function Breadcrumb({ className, selected }) {
	const dispatch = useDispatch();
	const { t } = useTranslation('filemanager');

	const updatePath = index => {
		const newFolders = selected.filter((d, i) => i <= index);
		dispatch(Actions.updateFolderPath(newFolders));
	};
	return (
		<Typography className={className}>
			{selected.map(({ name = '' }, i) => {
				// let list = path.split('/');
				// const folderName = list[list.length - 1];
				return (
					<span key={i} className="flex items-center">
						{i == 0 ? (
							<Button className="font-bold underline" onClick={() => updatePath(i)}>
								{t('MY_DRIVE')}
							</Button>
						) : (
							<Button className="font-bold underline" onClick={() => updatePath(i)}>
								{name}
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
