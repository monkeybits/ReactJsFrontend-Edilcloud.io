import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { amber, red } from '@material-ui/core/colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import moment from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import { useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import { Slider, withStyles } from '@material-ui/core';
import { GET_COMPANY_PROJECT_TEAM_MEMBER_LIST } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { getHeaderToken } from 'app/services/serviceUtils';
import CreatePostForm from './CreatePostForm';
import CloseIcon from '@material-ui/icons/Close';
import CanvasDraw from 'react-canvas-draw';

export default function DrawImage({ open, onClose, imgSrc }) {
	return (
		<Dialog open={open} onClose={onClose} fullWidth className="rs-dialog-sm-full">
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex w-full">
					<div className="absolute right-0 mr-4">
						<IconButton onClick={onClose} edge="start" color="inherit" aria-label="close">
							<CloseIcon />
						</IconButton>
					</div>
					<Typography variant="subtitle1" color="inherit">
						Draw Image
					</Typography>
				</Toolbar>
			</AppBar>

			<DialogContent classes={{ root: 'p-0' }}>
				<CanvasDraw brushColor="rgba(155,12,60,0.3)" imgSrc={imgSrc} />
			</DialogContent>
		</Dialog>
	);
}
