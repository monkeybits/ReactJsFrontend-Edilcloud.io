import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import * as Actions from './store/actions';
import { useSelector, useDispatch } from 'react-redux';
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
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		}
	}
}));

function ContactsSidebarContent(props) {
	const dispatch = useDispatch();
	const user = useSelector(({ contactsApp }) => contactsApp.user);
	const company = useSelector(({ chatApp }) => chatApp.company);
	const filterKey = useSelector(({ contactsApp }) => contactsApp.contacts.filterKey);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const classes = useStyles(props);
	const getListItemClassName = key => (key == filterKey ? clsx(classes.listItem, 'active') : classes.listItem);
	return (
		<div className="p-0 lg:ltr:pr-24 lg:ltr:pl-0 lg:rtl:pr-0 lg:rtl:pl-24">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
					<div className="p-24 flex items-center">
						<Avatar alt={projectDetail.name} src={projectDetail.logo}>
							{' '}
							{projectDetail?.name?.split('')?.[0] ? projectDetail.name.split('')[0] : 'E'}
						</Avatar>
						<Typography className="mx-12">{projectDetail.name}</Typography>
					</div>
					<Divider />
					<List>
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('all'))}
							className={getListItemClassName('all')}
						>
							<ListItemText className="truncate" primary="All Team members" disableTypography />
						</ListItem>

						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('approved'))}
							className={getListItemClassName('approved')}
						>
							<ListItemText className="truncate" primary="Approved Team members" disableTypography />
						</ListItem>

						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('waiting'))}
							className={getListItemClassName('waiting')}
						>
							<ListItemText className="truncate" primary="Waiting Team members" disableTypography />
						</ListItem>

						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('refused'))}
							className={getListItemClassName('refused')}
						>
							<ListItemText className="truncate" primary="Refused Team members" disableTypography />
						</ListItem>
					
						{/* <ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('deactivated'))}
							className={getListItemClassName('deactivated')}
						>
							<ListItemText className="truncate" primary="Deactivated Team members" disableTypography />
						</ListItem> */}
					
						{/* <Divider /> */}
					
						{/* <ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('owner'))}
							className={getListItemClassName('owner')}
						>
							<ListItemText className="truncate" primary="Owner" disableTypography />
						</ListItem> */}
					
						{/* <ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('delegate'))}
							className={getListItemClassName('delegate')}
						>
							<ListItemText className="truncate" primary="Delegate" disableTypography />
						</ListItem> */}
					
						{/* <ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('manager'))}
							className={getListItemClassName('manager')}
						>
							<ListItemText className="truncate" primary="Manager" disableTypography />
						</ListItem> */}
					
						{/* <ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('worker'))}
							className={getListItemClassName('worker')}
						>
							<ListItemText className="truncate" primary="Worker" disableTypography />
						</ListItem> */}

					</List>
				</Paper>
			</FuseAnimate>
		</div>
	);
}

export default ContactsSidebarContent;
