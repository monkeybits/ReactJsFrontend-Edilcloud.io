import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		alignItems: 'center',
		// height: 21,
		// borderRadius: 2,
		// padding: '0 6px',
		fontSize: 12,
		color: '#5C616F',
		// backgroundColor: 'rgba(0,0,0,.08);'
	},
	color: {
		width: 32,
		height: 8,
		marginRight: 6,
		borderRadius: '30%'
	}
}));

function TodoChip(props) {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root, props.className)}>
			<div className={classes.color} style={{ backgroundColor: props.color }} />
			<div>{props.title}</div>
		</div>
	);
}

export default TodoChip;
