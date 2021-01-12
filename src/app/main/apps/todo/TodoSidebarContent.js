import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import { useTranslation } from 'react-i18next';

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
	const labels = useSelector(({ todoApp }) => todoApp.labels);
	const folders = useSelector(({ todoApp }) => todoApp.folders);
	const genrealFilter = useSelector(({ todoApp }) => todoApp.filters.genrealFilter);
	const timeFilter = useSelector(({ todoApp }) => todoApp.filters.timeFilter);
	const projectFilter = useSelector(({ todoApp }) => todoApp.filters.projectFilter);
	const companyFilter = useSelector(({ todoApp }) => todoApp.filters.companyFilter);
	const peopleFilter = useSelector(({ todoApp }) => todoApp.filters.peopleFilter);
	const activeFilterKey = useSelector(({ todoApp }) => todoApp.filters.activeFilterKey);
	const usedKeys = useSelector(({ todoApp }) => todoApp.filters.usedKeys);
	const { t } = useTranslation('dashboard');

	const classes = useStyles(props);
	const changeFilter = (activeFilter, activeFilterKey) =>
		dispatch(Actions.changeFilters({ activeFilter, activeFilterKey }));
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
					{/* <List>
						{folders.length > 0 &&
							folders.map(folder => (
								<ListItem
									button
									component={NavLinkAdapter}
									to={`/apps/todo/${folder.handle}`}
									key={folder.id}
									activeClassName="active"
									className={classes.listItem}
								>
									<Icon className="list-item-icon" color="action">
										{folder.icon}
									</Icon>
									<ListItemText primary={folder.title} disableTypography />
								</ListItem>
							))}
					</List> */}

					<List>
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
							{t('PROJECT_FILTERS')}
						</ListSubheader>
						{projectFilter.length > 0 &&
							projectFilter.map(filter => (
								<ListItem
									button
									onClick={() => changeFilter('projectFilter', filter.name)}
									className={clsx(classes.listItem, { active: filter.isActive })}
									activeClassName="active"
									key={filter.name}
								>
									<Icon className="list-item-icon" color="action">
										{filter.icon}
									</Icon>
									<ListItemText primary={filter.name} disableTypography />
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
									<Icon className="list-item-icon" color="action">
										{filter.icon}
									</Icon>
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
								let name = `${filter.first_name} ${filter.last_name}`;
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
