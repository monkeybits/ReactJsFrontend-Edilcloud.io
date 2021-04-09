/* =============================================================================
 TODO: TodoSidebarContent.js
 ===============================================================================
This is part of dashboard 
TODO: This file is used to show Filters and apply filters on tasks 
*/
import FuseAnimate from '@fuse/core/FuseAnimate';
import { Avatar, Icon, List, ListItem, ListItemText, ListSubheader, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
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
	/**
	 * changeFilter is functtion to change filter
	 */
	const changeFilter = (activeFilter, activeFilterKey) =>
		dispatch(Actions.changeFilters({ activeFilter, activeFilterKey }));
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={400}>
			<div className="flex-auto border-l-1 border-solid">
				{/*
				// *The below old code was for UI, I just had to leave it here for you to see.
				<div className="p-24">
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

				<div className="lg:pl-48 pt-60">
					{/*
					// *The below old code was for UI, I just had to leave it here for you to see.
					<List>
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

					<List className="p-0">
						<AppBar position="static" elevation={1}>
							<Toolbar className="pl-12 pr-4">
								<IconButton
									color="inherit"
								>
									<Icon className="text-32">filter</Icon>
								</IconButton>
								<Typography className="mx-8 text-16" color="inherit">
									Filters
								</Typography>
								<div className="flex px-4 ml-16">
									<IconButton color="inherit" onClick={ev => {
										// console.log(props.pageLayout)
										// props.pageLayout.current.toggleLeftSidebar()
									}}>
										<Icon>close</Icon>
									</IconButton>
								</div>
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
