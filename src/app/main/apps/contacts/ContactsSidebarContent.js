/* =============================================================================
 ContactsSidebarContent.js
 ===============================================================================
*This file is created for ContactsApp
TODO: sidebar filters are decleared here.
*/
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Divider, List, ListItem, ListItemText, Typography } from '@material-ui/core';
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
	const { t } = useTranslation('contacts');

	const classes = useStyles(props);
	const getListItemClassName = key => (key == filterKey ? clsx(classes.listItem, 'active') : classes.listItem);
	return (
		<div className="p-0 lg:ltr:pr-24 lg:ltr:pl-0 lg:rtl:pr-0 lg:rtl:pl-24">
			<FuseAnimate animation="transition.slideLeftIn" delay={200}>
				<div>
					{/* <div className="p-24 flex items-center">
						<Avatar alt={user.name} src={company.logo}>
							{' '}
							{company?.name?.split('')?.[0] ? company.name.split('')[0] : 'E'}
						</Avatar>
						<Typography className="mx-12">{company.name}</Typography>
					</div>
					<Divider /> */}
					<Typography className="ml-24 text-muted uppercase">Filters</Typography>
					<List className="team-page-filter text-default">
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
							<ListItemText className="truncate" primary={t('APPROVED_TEAM_MEMBERS')} disableTypography />
						</ListItem>

						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('waiting'))}
							className={getListItemClassName('waiting')}
						>
							<ListItemText className="truncate" primary={t('WAITING_TEAM_MEMBERS')} disableTypography />
						</ListItem>

						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('refused'))}
							className={getListItemClassName('refused')}
						>
							<ListItemText className="truncate" primary={t('REFUSED_TEAM_MEMBERS')} disableTypography />
						</ListItem>
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('deactivated'))}
							className={getListItemClassName('deactivated')}
						>
							<ListItemText
								className="truncate"
								primary={t('DEACTIVATED_TEAM_MEMBERS')}
								disableTypography
							/>
						</ListItem>
						<Divider />
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('owner'))}
							className={getListItemClassName('owner')}
						>
							<ListItemText className="truncate" primary={t('OWNER')} disableTypography />
						</ListItem>
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('delegate'))}
							className={getListItemClassName('delegate')}
						>
							<ListItemText className="truncate" primary={t('DELEGATE')} disableTypography />
						</ListItem>
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('manager'))}
							className={getListItemClassName('manager')}
						>
							<ListItemText className="truncate" primary={t('MANAGER')} disableTypography />
						</ListItem>
						<ListItem
							button
							onClick={() => dispatch(Actions.filterByKey('worker'))}
							className={getListItemClassName('worker')}
						>
							<ListItemText className="truncate" primary={t('WORKER')} disableTypography />
						</ListItem>
					</List>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default ContactsSidebarContent;
