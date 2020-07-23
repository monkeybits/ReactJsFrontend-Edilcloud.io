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
import { useSelector } from 'react-redux';

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
	const user = useSelector(({ contactsApp }) => contactsApp.user);
	const company = useSelector(({ chatApp }) => chatApp.company);

	const classes = useStyles(props);

	return (
		<div className="p-0 lg:p-24 lg:ltr:pr-4 lg:rtl:pl-4">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<Paper className="rounded-0 shadow-none lg:rounded-8 lg:shadow-1">
					<div className="p-24 flex items-center">
						<Avatar alt={user.name} src={company.logo}>
							{' '}
							{company.name.split('')[0]}
						</Avatar>
						<Typography className="mx-12">{company.name}</Typography>
					</div>
					<Divider />
					<List>
						<ListItem
							button
							component={NavLinkAdapter}
							to="/apps/contacts/all"
							activeClassName="active"
							className={classes.listItem}
						>
							<ListItemText className="truncate" primary="All Team members" disableTypography />
						</ListItem>
						<Divider />
						<ListItem
							button
							component={NavLinkAdapter}
							to="/apps/contacts/approved"
							activeClassName="active"
							className={classes.listItem}
						>
							<ListItemText className="truncate" primary="Approved Team members" disableTypography />
						</ListItem>
						<Divider />
						<ListItem
							button
							component={NavLinkAdapter}
							to="/apps/contacts/waiting"
							activeClassName="active"
							className={classes.listItem}
						>
							<ListItemText className="truncate" primary="Waiting Team members" disableTypography />
						</ListItem>
						<Divider />
						<ListItem
							button
							component={NavLinkAdapter}
							to="/apps/contacts/refused"
							activeClassName="active"
							className={classes.listItem}
						>
							<ListItemText className="truncate" primary="Refused Team members" disableTypography />
						</ListItem>
						<Divider />
						<ListItem
							button
							component={NavLinkAdapter}
							to="/apps/contacts/owner"
							activeClassName="active"
							className={classes.listItem}
						>
							<ListItemText className="truncate" primary="Owner" disableTypography />
						</ListItem>
						<Divider />
						<ListItem
							button
							component={NavLinkAdapter}
							to="/apps/contacts/delegate"
							activeClassName="active"
							className={classes.listItem}
						>
							<ListItemText className="truncate" primary="Delegate" disableTypography />
						</ListItem>
						<Divider />
						<ListItem
							button
							component={NavLinkAdapter}
							to="/apps/contacts/manager"
							activeClassName="active"
							className={classes.listItem}
						>
							<ListItemText className="truncate" primary="Manager" disableTypography />
						</ListItem>

						<Divider />
						<ListItem
							button
							component={NavLinkAdapter}
							to="/apps/contacts/worker"
							activeClassName="active"
							className={classes.listItem}
						>
							<ListItemText className="truncate" primary="Worker" disableTypography />
						</ListItem>
					</List>
				</Paper>
			</FuseAnimate>
		</div>
	);
}

export default ContactsSidebarContent;
