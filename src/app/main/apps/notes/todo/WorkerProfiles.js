import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';

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
							root: 'h-28 w-28 my-3 mt-10 mx-4 text-18'
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
