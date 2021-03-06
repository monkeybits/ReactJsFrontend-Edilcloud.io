import FuseAnimate from '@fuse/core/FuseAnimate';
import { AppBar, Toolbar, IconButton, Icon, List, ListItem, ListItemText, ListSubheader, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import * as Actions from './store/actions';

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
	},
	small: {
		width: theme.spacing(3),
		height: theme.spacing(3),
		marginRight: 10
	}
}));

function ContactsSidebarContent(props) {
	const { t } = useTranslation('contacts_project');
	const dispatch = useDispatch();
	const companies = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.companies);
	const filterKey = useSelector(({ contactsAppProject }) => contactsAppProject.contacts.filterKey);
	const classes = useStyles(props);
	const getListItemClassName = key => (key == filterKey ? clsx(classes.listItem, 'active') : classes.listItem);
	const getListItemClassNameForCompany = (key, id) =>
		key + id == filterKey ? clsx(classes.listItem, 'active') : classes.listItem;
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={400}>
			<div className="flex-auto border-l-1 border-solid">
				<div>
					<List className="p-0">
						<AppBar position="static" elevation={1}>
							<Toolbar className="p-0">
								<IconButton className="p-32" color="inherit">
									<Icon className="text-32">filter_list</Icon>
								</IconButton>
								<Typography className="mx-8 p-32 text-24" color="inherit">
									Filtri
								</Typography>
							</Toolbar>
						</AppBar>
					</List>
					x
					<List className="team-page-filter text-default">
						<div className="pt-0 ">
							<ListSubheader className={classes.listSubheader} disableSticky>
								Filtri Generali
							</ListSubheader>

							<ListItem
								button
								onClick={() => dispatch(Actions.filterByKey('all'))}
								className={getListItemClassName('all')}
							>
								<ListItemText className="truncate" primary={t('ALL_TEAM_MEMBERS')} disableTypography />
							</ListItem>

							<ListItem
								button
								onClick={() => dispatch(Actions.filterByKey('approved'))}
								className={getListItemClassName('approved')}
							>
								<ListItemText
									className="truncate"
									primary={t('APPROVED_TEAM_MEMBERS')}
									disableTypography
								/>
							</ListItem>

							<ListItem
								button
								onClick={() => dispatch(Actions.filterByKey('waiting'))}
								className={getListItemClassName('waiting')}
							>
								<ListItemText
									className="truncate"
									primary={t('WAITING_TEAM_MEMBERS')}
									disableTypography
								/>
							</ListItem>

							<ListItem
								button
								onClick={() => dispatch(Actions.filterByKey('refused'))}
								className={getListItemClassName('refused')}
							>
								<ListItemText
									className="truncate"
									primary={t('REFUSED_TEAM_MEMBERS')}
									disableTypography
								/>
							</ListItem>
						</div>
					</List>
					{!!companies?.length && (
						<List>
							<div className="pt-0 ">
								<ListSubheader className={classes.listSubheader} disableSticky>
									{t('COMAPNY')}
								</ListSubheader>
								{companies.map(d => (
									<ListItem
										button
										onClick={() => {
											dispatch(Actions.filterByKey(`company${d.profile.company.id}`));
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
							</div>
						</List>
					)}
				</div>
			</div>
		</FuseAnimate>
	);
}

export default ContactsSidebarContent;
