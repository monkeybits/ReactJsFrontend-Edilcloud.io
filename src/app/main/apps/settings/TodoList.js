import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import loadable from '@loadable/component';
import _ from '@lodash';
import { Typography, List, ListItem, ListItemSecondaryAction, ListItemText, Button, Grid, Switch, Divider } from '@material-ui/core';
import { getHeaderToken } from 'app/services/serviceUtils';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { UPDATE_SETTINGS_PREFERENCES } from 'app/services/apiEndPoints';
import { toast } from 'react-toastify';
import * as Actions from './store/actions';
const SettingListItem = loadable(() => import('./SettingListItem'))

function TodoList(props) {
	const dispatch = useDispatch();
	const setting = useSelector(({ SettingApp }) => SettingApp.setting);
	const changeSetting = () => {
		apiCall(
			UPDATE_SETTINGS_PREFERENCES,
			{ ...setting },
			res => {
				console.log(res);
				toast.success('Updated');
			},
			err => {
				console.log(err);
				toast.error('try again after sometime..');
			},
			METHOD.PUT,
			getHeaderToken()
		);
	};
	return (
		// <List className="p-0">
		<FuseAnimateGroup
			enter={{
				animation: 'transition.slideUpBigIn'
			}}
		>
			<div>
				<div className="flex justify-between mr-24">
					<Typography variant="h4" component="h2" gutterBottom>
						Setting
					</Typography>
					{setting?.notification && (
						<Button color="secondary" onClick={changeSetting}>
							Save
						</Button>
					)}
				</div>

				<Typography variant="h6" component="h2" gutterBottom>
					Notifications
				</Typography>
				<Grid container spacing={5}>
					<Grid item xs={12} sm={6}>
						<List>
							{setting?.notification && (
								<>
									<ListItem key="Bell" className="px-12">
										<ListItemText className="setting-label-main">Bell</ListItemText>
										<ListItemSecondaryAction>
											<Switch
												onChange={e =>
													dispatch(Actions.updateFullArray(e.target.checked, false))
												}
											/>
										</ListItemSecondaryAction>
									</ListItem>
									<Divider />
									{setting.notification.bell.typology.map((item, index) => (
										<SettingListItem item={item} index={index} isEmail={false} />
									))}
								</>
							)}
						</List>
					</Grid>
					<Grid item xs={12} sm={6}>
						<List>
							{setting.notification && (
								<>
									<ListItem key="Bell" className="px-12">
										<ListItemText className="setting-label-main">Email</ListItemText>
										<ListItemSecondaryAction>
											<Switch
												onChange={e =>
													dispatch(Actions.updateFullArray(e.target.checked, true))
												}
											/>
										</ListItemSecondaryAction>
									</ListItem>
									<Divider />
									{setting.notification.email.typology.map((item, index) => (
										<SettingListItem item={item} index={index} isEmail />
									))}
								</>
							)}
						</List>
					</Grid>
				</Grid>
			</div>
		</FuseAnimateGroup>
		// </List>
	);
}
export default TodoList;
