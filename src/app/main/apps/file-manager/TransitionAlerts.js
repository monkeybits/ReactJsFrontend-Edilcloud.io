import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2)
		}
	}
}));

export default function TransitionAlerts({ open, setOpen, text }) {
	const classes = useStyles();

	return (
		<div className={clsx(classes.root,"mt-8")}>
			<Collapse in={open}>
				<Alert
					variant="outlined"
					severity="warning"
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					{text}
				</Alert>
			</Collapse>
		</div>
	);
}