import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Typography from '@material-ui/core/Typography';
import { decodeDataFromToken, getHeaderToken } from 'app/services/serviceUtils';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Grid, Switch } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { UPDATE_SETTINGS_PREFERENCES } from 'app/services/apiEndPoints';
import * as Actions from './store/actions';

function SettingListItem(props) {
	const dispatch = useDispatch();
	const setting = useSelector(({ SettingApp }) => SettingApp.setting);
	const changeSetting = () => {
		apiCall(
			UPDATE_SETTINGS_PREFERENCES,
			{ ...setting },
			res => {
				console.log(res);
			},
			err => console.log(err),
			METHOD.PUT,
			getHeaderToken()
		);
	};
	console.log({ props });
	return (
		<div>
			<ListItem className="px-24">
				<ListItemText className="setting-label">{props.item.name}</ListItemText>
				<ListItemSecondaryAction>
					<Switch
						checked={props.item.status}
						onChange={e => dispatch(Actions.updateByIndex(props.index, e.target.checked, props.isEmail))}
					/>
				</ListItemSecondaryAction>
			</ListItem>
			<Divider />
		</div>
		// </List>
	);
}
export default SettingListItem;
