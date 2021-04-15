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
			title: 'Aggiungi i Tuoi Collaboratori',
			content: 'Testing',
			contentTitle: 'Benvenuti in EdilCLoud',
			contentDescription: 'Inizia a creare il tuo team inviando una richiesta ai tuoi collaboratori, in questo modo tutti avrete accesso alle informazioni aziendali sulla base del ruolo scelto.',
			link: '/apps/contacts/all',
			linkText: 'Aggiungi un collaboratore',
			linkTextAll: 'Vai a Team',
			image: '',
			video: 'assets/videos/perp.m4v',
			iconSelection: 'team'
		},
		{
			title: 'Crea un nuovo progetto',
			content: 'Testing',
			contentTitle: '',
			contentDescription:
				'Il progetto è il modo che utilizzerai per tenere traccia dei tuoi cantieri, oppure per documentare i tuoi lavori alle aziende committenti.',
			link: '/apps/projects',
			linkText: 'Add project page',
			linkTextAll: 'Vai alla pagina dei progetti',
			image: '',
			video: 'assets/videos/sample.mp4',
			iconSelection: 'project'
		},
		{
			title: 'Crea una fase di lavoro',
			content: 'Testing',
			contentTitle: '',
			contentDescription: 'La fase di lavoro è un task completo che nei progetti viene assegnato alle aziende, è un contenitore per condividere contenuti.',
			link: projects !== undefined && projects.length > 0 ? `/apps/projects/${projects[0].id}` : '',
			linkText: 'Add task page',
			linkTextAll: 'Vai alla pagina fasi',
			image: '',
			video: 'assets/videos/sample.mp4',
			iconSelection: 'task'
		},
		{
			title: 'Crea un post',
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
			title: 'Scarica app per il tuo smartphone',
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
			title: 'Scopri la dashboard',
			content: 'Testing',
			contentTitle: '',
			contentDescription: 'La Dashboard è il posto in cui troverai la maggior parte delle informazioni hn',
			link: '',
			linkText: '',
			linkTextAll: '',
			image: '',
			video: 'assets/videos/sample.mp4',
			iconSelection: 'discover'
		},
		{
			title: ' Guarda la Guida di base',
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
