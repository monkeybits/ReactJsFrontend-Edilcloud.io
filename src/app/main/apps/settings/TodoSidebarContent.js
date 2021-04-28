import FuseAnimate from '@fuse/core/FuseAnimate';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			// pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			fontSize: 16,
			width: 16,
			height: 16,
			marginRight: 16
		}
	},
	listSubheader: {
		paddingLeft: 24
	}
}));

function TodoSidebarContent(props) {
	const dispatch = useDispatch();

	const classes = useStyles(props);

	const filterKey = useSelector(({ SettingApp }) => SettingApp.setting.filterKey);

	const getListItemClassName = key => (key == filterKey ? clsx(classes.listItem, 'active') : classes.listItem);

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={400}>
			<div className="flex-auto border-l-1 border-solid">
				{/* <div className="p-24">
					<Button
						onClick={() => {
							dispatch(Actions.openNewTodoDialog());
						}}
						variant="contained"
						color="primary"
						className="w-full"
					>
						ADD TASK
					</Button>
				</div> */}

				<div className={classes.listWrapper}>
					<List>
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('edit_profile'))}
							className={getListItemClassName('edit_profile')}
						>
							<ListItemText className={classes.listSubheader} primary="MAIN PROFILE" disableTypography />
						</ListItem>
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('company'))}
							className={getListItemClassName('company')}
						>
							<ListItemText className={classes.listSubheader} primary="COMPANY" disableTypography />
						</ListItem>
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('billings'))}
							className={getListItemClassName('billings')}
						>
							<ListItemText className={classes.listSubheader} primary="BILLINGS" disableTypography />
						</ListItem>
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('storage'))}
							className={getListItemClassName('storage')}
						>
							<ListItemText className={classes.listSubheader} primary="STORAGE" disableTypography />
						</ListItem>
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('notifications'))}
							className={getListItemClassName('notifications')}
						>
							<ListItemText className={classes.listSubheader} primary="NOTIFICATION" disableTypography />
						</ListItem>
					</List>
				</div>
			</div>
		</FuseAnimate>
	);
}

export default TodoSidebarContent;
