import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
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
	const companies = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.companies);
	const user = useSelector(({ contactsAppProject }) => contactsAppProject.user);
	const company = useSelector(({ chatApp }) => chatApp.company);
	const filterKey = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.filterKey);
	const filterKeyName = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.filterKeyName);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	const classes = useStyles(props);
	const getListItemClassName = key => (key == filterKey ? clsx(classes.listItem, 'active') : classes.listItem);
	const getListItemClassNameForCompany = (key, id) =>
		key + id == filterKey ? clsx(classes.listItem, 'active') : classes.listItem;
	return (
		<div className="p-0 lg:ltr:pr-24 lg:ltr:pl-0 lg:rtl:pr-0 lg:rtl:pl-24">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<div>
					{/* <div className="p-24 flex items-center">
						<Avatar alt={projectDetail.name} src={projectDetail.logo}>
							{' '}
							{projectDetail?.name?.split('')?.[0] ? projectDetail.name.split('')[0] : 'E'}
						</Avatar>
						<Typography className="mx-12">{projectDetail.name}</Typography>
					</div> */}
					{/* <Divider /> */}
					<Typography className="ml-24 text-muted uppercase">Filters</Typography>
					<List className="team-page-filter text-default">
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
					</List>
					{!!companies?.length && (
						<List>
							<ListSubheader className={classes.listSubheader} disableSticky>
								Company
							</ListSubheader>
							{companies.map(d => (
								<ListItem
									button
									onClick={() => {
										dispatch(Actions.filterByKey('company' + d.profile.company.id));
										dispatch(Actions.addFilterByKey(d.profile.company.id));
									}}
									className={getListItemClassNameForCompany('company', d.profile.company.id)}
								>
									<Icon
										className="list-item-icon"
										style={{ color: d.profile.company?.color_project }}
										color="action"
									>
										label
									</Icon>
									<ListItemText
										className="truncate"
										primary={d.profile.company.name}
										disableTypography
									/>
								</ListItem>
							))}
						</List>
					)}
				</div>
			</FuseAnimate>
		</div>
	);
}

export default ContactsSidebarContent;
