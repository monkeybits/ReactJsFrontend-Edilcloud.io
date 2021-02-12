/* =============================================================================
 TODO:NotesHeader.js
 ===============================================================================
*This file is part of project list page 
TODO: created for project Header
*/
import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotesSearch from './NotesSearch';
import * as Actions from './store/actions';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';

function NotesHeader(props) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const { t } = useTranslation('projects');
	return (
		<div className="flex w-full">
			<div className="flex w-full items-center justify-between pb-20 border-b-1">
				<Typography variant="h5">{t('ALL_PROJECTS')}</Typography>
				{/* <Button
					variant="contained"
					color="primary"
					className={'btn-primary normal-case m-0'}
					startIcon={<AddIcon />}
				>
					Add Project
				</Button> */}
			</div>
		</div>
	);
}

export default NotesHeader;
