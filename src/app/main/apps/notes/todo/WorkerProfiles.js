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
			{workers &&
				workers.map(worker => (
					<Avatar
						classes={{
							root: 'h-32 w-32'
						}}
						alt="Remy Sharp"
						src={worker.profile.photo}
					>
						{!!worker.profile.first_name?.length && [...worker.profile.first_name][0]}
					</Avatar>
				))}
		</div>
	);
}
