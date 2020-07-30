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
import ProjectListitem from './ProjectDetail/ProjectListitem';
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
		backgroundColor: red[500]
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
	const variateDescSize = useSelector(({ notesApp }) => notesApp.notes.variateDescSize);
	const searchText = useSelector(({ notesApp }) => notesApp.project.searchText);
	const classes = useStyles();
	const dispatch = useDispatch();

	const [filteredData, setFilteredData] = useState([]);

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

	return (
		<div className="flex flex-wrap w-full">
			<div className={classes.root}>
				<Grid container spacing={12}>
					<Grid className="px-12 mb-32" item xs={12} md={6} xl={3}>
						<Card
							className="h-full flex flex-col"
							onClick={() => dispatch(Actions.openProjectDialog('new'))}
						>
							<CardContent>
								<div className="p-16 mx-auto">
									<div
										className={clsx(
											classes.board,
											'flex flex-col items-center justify-center w-full h-full rounded py-24'
										)}
										role="button"
										tabIndex={0}
									>
										<Icon className="text-56">add_circle</Icon>
										<Typography
											className="text-16 font-300 text-center pt-16 px-32"
											color="inherit"
										>
											Create new project
										</Typography>
									</div>
								</div>
							</CardContent>
						</Card>
						{console.log({ projects })}
					</Grid>
					{projects.map((project, index) => {
						return <ProjectListitem key={index} index={index} {...{ project, classes }} />;
					})}
				</Grid>
			</div>
		</div>
	);
}

export default withRouter(NoteList);
