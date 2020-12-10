import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Typography from '@material-ui/core/Typography';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Grid, Switch } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

function TodoList(props) {
	const setting = useSelector(({ SettingApp }) => SettingApp.setting);
	// const changeSetting=()=>{
	// 	apiCall
	// }
	return (
		// <List className="p-0">
		<FuseAnimateGroup
			enter={{
				animation: 'transition.slideUpBigIn'
			}}
		>
			<div>
				<Typography variant="h4" component="h2" gutterBottom>
					Setting
      			</Typography>
				  <Typography variant="h6" component="h2" gutterBottom>
				  Notifications
      			</Typography>

				
				{console.log({ setting })}
				<Grid container spacing={5}>
					<Grid item xs={12} sm={6}>
						<List>
							{setting?.notification && (
								<>
									<ListItem key="Bell" className="px-12">
										<ListItemText className="setting-label-main">
											Bell
										</ListItemText>
										<ListItemSecondaryAction>
											<Switch
												checked={true}
												name="checkedA"
												inputProps={{ 'aria-label': 'secondary checkbox' }}
											/>
										</ListItemSecondaryAction>
									</ListItem>
									<Divider />
									{setting.notification.bell.typology.map((item, index) => (
										<div>
											<ListItem key={index} className="px-24">
												<ListItemText className="setting-label">
													{item.name}
												</ListItemText>
												<ListItemSecondaryAction>
													<Switch
														checked={true}
														name="checkedA"
														inputProps={{ 'aria-label': 'secondary checkbox' }}
													/>
												</ListItemSecondaryAction>

											</ListItem>
											<Divider />
										</div>
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
										<ListItemText className="setting-label-main">
											Email
										</ListItemText>
										<ListItemSecondaryAction>
											<Switch
												checked={true}
												name="checkedA"
												inputProps={{ 'aria-label': 'secondary checkbox' }}
											/>
										</ListItemSecondaryAction>
									</ListItem>
									<Divider />
									{setting.notification.bell.typology.map((item, index) => (
										<div>
											<ListItem key={index} className="px-24">
												<ListItemText className="setting-label">
													{item.name}
												</ListItemText>
												<ListItemSecondaryAction>
													<Switch
														checked={true}
														name="checkedA"
														inputProps={{ 'aria-label': 'secondary checkbox' }}
													/>
												</ListItemSecondaryAction>

											</ListItem>
											<Divider />
										</div>
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
