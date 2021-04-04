import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { useDispatch, useSelector } from 'react-redux';
import withReducer from 'app/store/withReducer';
import reducer from 'app/main/apps/notes/store/reducers';
import { decodeDataFromToken } from 'app/services/serviceUtils';
import GuideListItem from './GuideListItem';
import * as Actions from './store/actions';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		// maxWidth: 360,
		backgroundColor: '#ffffff',
		padding: 0,
		borderRadius: 10
	},
	nested: {
		paddingLeft: theme.spacing(4)
	}
}));

function Guide(props) {
	const dispatch = useDispatch();
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const userInfo = decodeDataFromToken();
	const getRole = () => userInfo?.extra?.profile.role;

	const projects = useSelector(({ notesApp }) => notesApp?.project?.entities);

	const [quickStartList, setQuickStartList] = React.useState([
		{
			title: 'Add Collaborators',
			content: 'Testing',
			contentTitle: 'Welcome to EdilCloud',
			contentDescription: 'Add your collaborators and let them access the company.',
			link: '/apps/contacts/all',
			linkText: 'Add team page',
			linkTextAll: 'View teams',
			image: '',
			video: 'assets/videos/samplevideo.mp4',
			iconSelection: 'team'
		},
		{
			title: 'Create a project',
			content: 'Testing',
			contentTitle: '',
			contentDescription:
				'You can create a project and assign task to other companies, or assign them to your company only',
			link: '/apps/projects',
			linkText: 'Add project page',
			linkTextAll: 'View projects',
			image: '',
			video: 'assets/videos/samplevideo.mp4',
			iconSelection: 'project'
		},
		{
			title: 'Create a task',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: projects !== undefined && projects.length > 0 ? `/apps/projects/${projects[0].id}` : '',
			linkText: 'Add task page',
			linkTextAll: 'View tasks',
			image: '',
			video: 'assets/videos/samplevideo.mp4',
			iconSelection: 'task'
		},
		{
			title: 'Create a post',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: projects !== undefined && projects.length > 0 ? `/apps/projects/${projects[0].id}` : '',
			linkText: 'Add post page',
			linkTextAll: 'View posts',
			image: '',
			video: 'assets/videos/sample.mp4',
			iconSelection: 'post'
		},
		{
			title: 'Download app for smartphone',
			content: 'Testing',
			contentTitle: '',
			contentDescription:
				'Download the app for your phone or tablet and use EdilCloud from the construction site field',
			link: '',
			linkText: 'Download App',
			linkTextAll: '',
			image: '',
			video: 'assets/videos/sample.mp4',
			iconSelection: 'downloadApp'
		},
		{
			title: 'Discover Dashboard',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: '',
			linkText: '',
			linkTextAll: '',
			image: '',
			video: 'assets/videos/sample.mp4',
			iconSelection: 'discover'
		},
		{
			title: 'Creat Knowledge Base',
			content: 'Testing',
			contentTitle: '',
			contentDescription: '',
			link: '',
			linkText: '',
			linkTextAll: '',
			image: '',
			video: 'assets/videos/sample.mp4',
			iconSelection: 'knowledge'
		}
	]);

	return (
		<List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
			{quickStartList.map((d, i) => {
				if (d.iconSelection === 'team' || d.iconSelection === 'project' || d.iconSelection === 'task') {
					if (getRole() != 'm' && getRole() != 'w') {
						return (
							<GuideListItem
								{...{
									data: d,
									index: i
								}}
							/>
						);
					}
				} else {
					return (
						<GuideListItem
							{...{
								data: d,
								index: i
							}}
						/>
					);
				}
			})}
		</List>
	);
}

export default withReducer('notesApp', reducer)(Guide);
