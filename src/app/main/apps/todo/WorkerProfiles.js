/* =============================================================================
 TODO: WorkerProfiles.js
 ===============================================================================
This is part of dashboard 
TODO: This file is used to show workers on activity 
*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1)
		}
	}
}));

export default function ImageAvatars({ workers }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{workers.map(({ profile }) => (
				<Avatar
					classes={{
						root: 'h-28 w-28 my-3 mt-10 mx-4 text-18'
					}}
					alt="Remy Sharp"
					src={profile.photo}
				>
					{!!profile.first_name?.length && [...profile.first_name][0]}
				</Avatar>
			))}
		</div>
	);
}
