/* =============================================================================
 TODO:NoteList.js
 ===============================================================================
*This file is part of project list page 
TODO: All Projects listed here
*/

import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import { Typography, Avatar, Grid, Badge, Paper, IconButton, Icon, Input } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import * as Actions from 'app/main/apps/notes/store/actions';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import { ACCEPT_PROJECT_INVITATION, REJECT_PROJECT_INVITATION } from 'app/services/apiEndPoints';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useTranslation } from 'react-i18next';
import loadable from '@loadable/component';
const ReuestsDrawer = loadable(() => import('../scrumboard/boards/ReuestsDrawer'))
const ProjectListitem = loadable(() => import('./ProjectListitem'))

const useStyles = makeStyles(theme => ({
	// root: {
	// 	maxWidth: 345,
	// },
	root: {
		flexGrow: 1
	},

	media: {
		height: 0,
		paddingTop: '56.25%' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: 'white'
	},
	board: {
		cursor: 'pointer',
		boxShadow: theme.shadows[0],
		transitionProperty: 'box-shadow border-color',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		background: theme.palette.primary.light,
		color: theme.palette.getContrastText(theme.palette.primary.light),
		'&:hover': {
			boxShadow: theme.shadows[6]
		}
	}
}));

function NoteList(props) {
	const [hasRenderd, setHasRenderd] = useState(false);

	const orderBy = useSelector(({ notesApp }) => notesApp.project.orderBy);
	const orderDescending = useSelector(({ notesApp }) => notesApp.project.orderDescending);

	const filters = useSelector(({ notesApp }) => notesApp.filters);
	const usedKeys = useSelector(({ notesApp }) => notesApp.filters.usedKeys);
	const activeFilter = useSelector(({ notesApp }) => notesApp.filters.activeFilter);
	const activeFilterKey = useSelector(({ notesApp }) => notesApp.filters.activeFilterKey);

	const projects = useSelector(({ notesApp }) => notesApp.project.entities);
	const companies = useSelector(({ notesApp }) => notesApp.project.companies);
	const variateDescSize = useSelector(({ notesApp }) => notesApp.notes.variateDescSize);
	const searchText = useSelector(({ notesApp }) => notesApp.project.searchText);
	const canSelectMultiple = ['companyFilter'];

	const classes = useStyles();
	const dispatch = useDispatch();
	const [isShowRequests, setIsShowRequests] = useState(false);
	const [request, setRequest] = useState({});
	const [filteredData, setFilteredData] = useState(null);
	const { t } = useTranslation('projects');

	// useEffect(() => {
	// 	function filterData() {
	// 		const { params } = props.match;
	// 		const { id, labelId } = params;

	// 		let data = Object.keys(projects).map(_id => projects[_id]);

	// 		console.log('data???????????????????????', id)

	// 		if (labelId) {
	// 			data = data.filter(note => note.labels.includes(labelId) && !note.archive);
	// 		}

	// 		if (!id) {
	// 			data = data.filter(note => !note.archive);
	// 		}

	// 		if (id === 'archive') {
	// 			data = data.filter(note => note.archive);
	// 		}

	// 		if (id === 'reminders') {
	// 			data = data.filter(note => Boolean(note.reminder) && !note.archive);
	// 		}

	// 		if (searchText.length === 0) {
	// 			return data;
	// 		}

	// 		data = FuseUtils.filterArrayByString(data, searchText);

	// 		return data;
	// 	}

	// 	if (projects) {
	// 		setFilteredData(filterData());
	// 	}
	// }, [projects, searchText, props.match]);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		if (projects) {
			new Promise((resolve, reject) => {
				const data = _.orderBy(
					getFilteredArray(projects, searchText),
					[orderBy],
					[orderDescending ? 'desc' : 'asc']
				);
				resolve(data);
			}).then(data => {
				setFilteredData(setFilterByKey(activeFilter, data, activeFilterKey));
				handleDoFilter();
			});
		}
	}, [projects, searchText, orderBy, orderDescending]);

	useEffect(() => {
		handleDoFilter();
	}, [activeFilterKey, usedKeys, projects]);

	const handleDoFilter = () => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}
		if (projects) {
			let list = _.orderBy(getFilteredArray(projects, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
			if (usedKeys && usedKeys.length) {
				for (const key in usedKeys) {
					if (usedKeys.hasOwnProperty(key)) {
						const element = usedKeys[key];
						if (canSelectMultiple.includes(element)) {
							const selectedFilters = filters[element].map(d => {
								if (d.isActive) {
									return element == 'peopleFilter' ? d.id : d.name;
								}
							});
							list = setFilterByKey(element, list, selectedFilters);
						} else {
							filters[element].map(d => {
								if (d.isActive) {
									list = setFilterByKey(element, list, element == 'peopleFilter' ? d.id : d.name);
								}
							});
						}
					}
				}
				setFilteredData(list);
				// let listDiv = document.getElementById('list-content');
				// listDiv.scrollTop = 0;
			} else {
				setFilteredData(list);
			}
			setTimeout(() => {
				setHasRenderd(true);
			}, 3000);
		}
	};
	
	const setFilterByKey = (activeFilter, list, activeFilterKey) => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}
		switch (activeFilter) {
			case 'genrealFilter':
				var result = [];
				const userInfo = decodeDataFromToken();
				if (activeFilterKey === '' && userInfo) {
					result = list.filter((l) => parseInt(l.status) === 1, []);
				} else if (activeFilterKey === '') {
					result = list.filter((l) => parseInt(l.status) === 1, []);
				} else {
					result = list.filter((l) => parseInt(l.status) === 1, []);
				}
				return result;
			case 'companyFilter':
				var result = list.filter((l) => {
					if (activeFilterKey.includes(l.company?.name)) {
						return l;
					}
				}, []);
				return result;
			case 'timeFilter':
				var result = [];
				if (activeFilterKey === 'TODAY') {
					result = list.filter((l) => {
						const startDate = new Date(l.date_start);
						const endDate = new Date(l.date_end);
						const date = new Date();
						if (
							(date.getTime() <= endDate.getTime() && date.getTime() >= startDate.getTime())
						) {
							return l
						}
					}, []);
				} else if (activeFilterKey === 'NEXT_WEEK') {
					result = list.filter((l) => {
						const startDate = new Date(l.date_start);
						const endDate = new Date(l.date_end);
						const fromDate = new Date();
						const toDate = new Date();
						const pastDate = toDate.getDate() + 7;
						toDate.setDate(pastDate);
						if (
							(startDate.getTime() <= toDate.getTime() && endDate.getTime() >= fromDate.getTime())
						) {
							return l
						}
					}, []);
				} else if (activeFilterKey === 'IN_LATE') {
					result = list.filter((l) => {
						const endDate = new Date(l.date_end);
						const date = new Date();
						if ((date.getTime() >= endDate.getTime() && parseInt(l.completed) < 100)) {
							return l
						}
					}, []);
				} else {
					result = list.filter((l) => parseInt(l.completed) === 100, []);
				}
				return result;
			default:
				return _.orderBy(getFilteredArray(projects, searchText), [orderBy], [orderDescending ? 'desc' : 'asc']);
		}
	};

	const handleInvitation = () => {
		dispatch({
			type: Actions.RESET_PROEJECTS
		});
		dispatch(Actions.getProjects(props.handleSetLoading));
		dispatch(Actions.getRequest(props.handleSetLoading));
		setIsShowRequests(false);
	};
	if (projects.length === 0) {
		if (props.loadingProjects || props.loadingProjectRequest) {
			return (
				<div className="flex flex-1 flex-col items-center justify-center">
					<Typography className="text-20 mb-16" color="textSecondary">
						{t('LOADING_PROJECTS')}...
					</Typography>
					<LinearProgress className="w-xs" color="secondary" />
				</div>
			);
		}
		if (projects && projects.length == 0) {
			return (
				<div>
					<div className="flex flex-1 mb-20px items-center justify-center ">
						<img
							width="600px"
							src="https://www.edilcloud.io/wp-content/uploads/2021/01/Risorsa-4fsad-1.png"
						/>
					</div>
					<div className="flex flex-1 mt-30 items-center justify-center ">
						<Typography color="textSecondary" variant="h5">
							{t('NO_PROJECTS_HEADER')}
						</Typography>
					</div>
					<div className="flex flex-1 mt-20 items-center justify-center ">
						<Typography color="textSecondary" variant="h6">
							{t('CREATE_PROJECT_ADVICE_MESSAGE')}
						</Typography>
					</div>
				</div>
			);
		}
	}

	if (!filteredData) {
		return null;
	}
	
	return (
		<>
			<div id="project-list" className="flex flex-wrap w-full">
				<div className={classes.root}>
					
					{companies.map((data, index) => (
						<>
							<div className="flex justify-start items-center pb-8 mb-16">
								<Avatar className="mr-4" aria-label="recipe" src={data?.logo} sizes="25">
									{data?.name?.split('')[0]}
								</Avatar>
								<Typography variant="subtitle1" className="font-size-18 font-600">
									{data.name}
								</Typography>
							</div>
							<Grid container spacing={12} className="grid-space-remove">
								{filteredData.length > 0 && filteredData.map((project, index) => {
									if (data.id = project.company?.id)
										return project.isApproved ? (
											<Grid className="px-12 mb-32 project_box" item xs={12} sm={6} md={4} xl={3}>
												<ProjectListitem
													key={index}
													index={index}
													{...{ project, classes, setRequest }}
												/>
											</Grid>
										) : (
											<Grid className="px-12 mb-32 project_box" item xs={12} sm={6} md={4} xl={3}>
												{' '}
												<Badge
													invisible={project.isApproved}
													color="secondary"
													className="h-full flex flex-col"
													badgeContent="New"
													onClick={e => {
														e.stopPropagation();
														e.preventDefault();
														setIsShowRequests(true);
														setRequest(project);
													}}
												>
													<ProjectListitem
														key={index}
														index={index}
														{...{ project, classes, setRequest }}
													/>
												</Badge>
											</Grid>
										);
								})}
							</Grid>
						</>
					))}
					{!!projects.filter((project, index) => !project.company?.id).length && (
						<div className="mb-16 border-b-1">
							<Typography variant="subtitle1" className="font-size-18 font-600">
								Requests
							</Typography>
						</div>
					)}
					<Grid container spacing={12} className="grid-space-remove">
						{projects.map((project, index) => {
							if (!project.company?.id)
								return project.isApproved ? (
									<Grid className="px-12 mb-32 project_box" item xs={12} sm={6} md={4} xl={3}>
										<ProjectListitem
											key={index}
											index={index}
											{...{ project, classes, setRequest }}
										/>
									</Grid>
								) : (
									<Grid className="px-12 mb-32 project_box" item xs={12} sm={6} md={4} xl={3}>
										{' '}
										<Badge
											invisible={project.isApproved}
											color="secondary"
											className="h-full flex flex-col"
											onClick={e => {
												e.stopPropagation();
												e.preventDefault();
												setIsShowRequests(true);
												setRequest(project);
											}}
											badgeContent="New"
										>
											<ProjectListitem
												key={index}
												index={index}
												{...{ project, classes, setRequest }}
											/>
										</Badge>
									</Grid>
								);
						})}
					</Grid>
				</div>
			</div>
			<ReuestsDrawer
				afterSuccess={handleInvitation}
				isShowRequests={isShowRequests}
				setIsShowRequests={setIsShowRequests}
				request={request}
				acceptAPI={ACCEPT_PROJECT_INVITATION(request.mainId)}
				rejectAPI={REJECT_PROJECT_INVITATION(request.mainId)}
			/>
		</>
	);
}

export default withRouter(NoteList);
