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

function TodoList(props) {
	const user = useSelector(({ auth }) => auth.user.data.company);

	return (
		// <List className="p-0">
		<FuseAnimateGroup
			enter={{
				animation: 'transition.slideUpBigIn'
			}}
		>
			<div>
				<h2>Settings</h2>

				<h3>Notifications</h3>
				<List>
					{user?.preference?.notification &&
						user.preference.notification.bell.typology.map((item, index) => (
							<ListItem key={index} className="px-12">
								{item.name}
							</ListItem>
						))}
				</List>
			</div>
		</FuseAnimateGroup>
		// </List>
	);
}
export default TodoList;
