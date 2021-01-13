import FuseUtils from '@fuse/utils';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NoteListItem from './NoteListItem';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Icon from '@material-ui/core/Icon';
import * as Actions from 'app/main/apps/notes/store/actions';
import ProjectListitem from './ProjectListitem';
import ReuestsDrawer from '../scrumboard/boards/ReuestsDrawer';
import { Badge } from '@material-ui/core';
import { ACCEPT_PROJECT_INVITATION, REJECT_PROJECT_INVITATION } from 'app/services/apiEndPoints';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';

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
	const projects = useSelector(({ notesApp }) => notesApp.project.entities);
	const companies = useSelector(({ notesApp }) => notesApp.project.companies);
	const variateDescSize = useSelector(({ notesApp }) => notesApp.notes.variateDescSize);
	const searchText = useSelector(({ notesApp }) => notesApp.project.searchText);
	const classes = useStyles();
	const dispatch = useDispatch();
	const [isShowRequests, setIsShowRequests] = useState(false);
	const [request, setRequest] = useState({});
	const [filteredData, setFilteredData] = useState([]);
	const { t } = useTranslation('projects');
	useEffect(() => {
		function filterData() {
			const { params } = props.match;
			const { id, labelId } = params;

			let data = Object.keys(projects).map(_id => projects[_id]);

			if (labelId) {
				data = data.filter(note => note.labels.includes(labelId) && !note.archive);
			}

			if (!id) {
				data = data.filter(note => !note.archive);
			}

			if (id === 'archive') {
				data = data.filter(note => note.archive);
			}

			if (id === 'reminders') {
				data = data.filter(note => Boolean(note.reminder) && !note.archive);
			}

			if (searchText.length === 0) {
				return data;
			}

			data = FuseUtils.filterArrayByString(data, searchText);

			return data;
		}

		if (projects) {
			setFilteredData(filterData());
		}
	}, [projects, searchText, props.match]);
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
		} else if (projects && projects.length == 0) {
			return (
				<div>
					<div className="flex flex-1 mb-20px items-center justify-center ">
						<img
							width="600px"
							src="https://www.edilcloud.io/wp-content/uploads/2021/01/Risorsa-4fsad-1.png"
						></img>
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
	return (
		<>
			<div id="project-list" className="flex flex-wrap w-full">
				<div className={classes.root}>
					{/* <div className="flex items-center justify-between my-16 sm:my-12 sm:mb-20 pb-16 border-b-1">
						<Typography variant="h6">All Projects</Typography>
						<Button
							variant="contained"
							color="secondary"
							className={classes.button, 'm-0'}
							startIcon={<AddIcon />}
						>
							Add Project
						</Button>
					</div>
					<div className="mb-16">
						<Typography variant
						="subtitle1" className="font-size-18 font-600">Edil Cloud (My Company)</Typography>
					</div> */}
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
								{projects.map((project, index) => {
									if (data.id == project.company?.id)
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
