import _ from '@lodash';
import { getHeaderToken } from 'app/services/serviceUtils';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListItem, ListItemText, ListItemSecondaryAction, Switch, Divider } from '@material-ui/core';
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
