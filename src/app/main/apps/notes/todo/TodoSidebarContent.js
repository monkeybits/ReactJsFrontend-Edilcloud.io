import FuseAnimate from '@fuse/core/FuseAnimate';
import {
	Avatar,
	Icon,
	List,
	ListItem,
	ListItemText,
	ListSubheader,
	AppBar,
	Toolbar,
	IconButton,
	Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function TodoSidebarContent(props) {
	const dispatch = useDispatch();
	const company = useSelector(({ chatApp }) => chatApp?.company);

	const genrealFilter = useSelector(({ todoAppNote }) => todoAppNote.filters.genrealFilter);
	const timeFilter = useSelector(({ todoAppNote }) => todoAppNote.filters.timeFilter);
	const companyFilter = useSelector(({ todoAppNote }) => todoAppNote.filters.companyFilter);
	const peopleFilter = useSelector(({ todoAppNote }) => todoAppNote.filters.peopleFilter);
	const { t } = useTranslation('todo_project');

	const classes = useStyles(props);
	const changeFilter = (activeFilter, activeFilterKey) =>
		dispatch(Actions.changeFilters({ activeFilter, activeFilterKey }));
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
						<ListSubheader className={classes.listSubheader} disableSticky>
							{t('GENERAL_FILTERS')}
						</ListSubheader>

						{genrealFilter.length > 0 &&
							genrealFilter.map(filter => (
								<ListItem
									button
									onClick={() => changeFilter('genrealFilter', filter.name)}
									className={clsx(classes.listItem, { active: filter.isActive })}
									activeClassName="active"
									key={filter.name}
								>
									<Icon className="list-item-icon" color="action">
										{filter.icon}
									</Icon>
									<ListItemText primary={t(filter.name)} disableTypography />
								</ListItem>
							))}
					</List>

					<List>
						<ListSubheader className={classes.listSubheader} disableSticky>
							{t('TIME_FILTERS')}
						</ListSubheader>

						{timeFilter.length > 0 &&
							timeFilter.map(filter => (
								<ListItem
									button
									onClick={() => changeFilter('timeFilter', filter.name)}
									className={clsx(classes.listItem, { active: filter.isActive })}
									activeClassName="active"
									key={filter.name}
								>
									<Icon className="list-item-icon" color="action">
										{filter.icon}
									</Icon>
									<ListItemText primary={t(filter.name)} disableTypography />
								</ListItem>
							))}
					</List>

					<List>
						<ListSubheader className={classes.listSubheader} disableSticky>
							{t('COMPANY_FILTERS')}
						</ListSubheader>
						{companyFilter.length > 0 &&
							companyFilter.map(filter => (
								<ListItem
									button
									onClick={() => changeFilter('companyFilter', filter.name)}
									className={clsx(classes.listItem, { active: filter.isActive })}
									activeClassName="active"
									key={filter.name}
								>
									<Avatar src={filter.logo} className={classes.small} />
									<ListItemText primary={filter.name} disableTypography />
								</ListItem>
							))}
					</List>

					<List>
						<ListSubheader className={classes.listSubheader} disableSticky>
							{t('PEOPLE_FILTERS')}
						</ListSubheader>

						{peopleFilter.length > 0 &&
							peopleFilter.map(filter => {
								const name = `${filter.first_name} ${filter.last_name}`;
								return (
									<ListItem
										button
										key={filter.id}
										onClick={() => changeFilter('peopleFilter', filter.id)}
										className={clsx(classes.listItem, { active: filter.isActive })}
									>
										<Avatar className="h-24 w-24 mx-8" src={filter.photo} alt={filter.name}>
											{[...name][0]}
										</Avatar>
										<ListItemText primary={name} disableTypography />
									</ListItem>
								);
							})}
					</List>
				</div>
			</div>
		</FuseAnimate>
	);
}

export default TodoSidebarContent;
