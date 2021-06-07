import React from 'react';
import { Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	root: {
		transform: 'translateZ(0px)',
		flexGrow: 1
	},
	exampleWrapper: {
		position: 'relative',
		marginTop: theme.spacing(3),
		height: 380
	},
	radioGroup: {
		margin: theme.spacing(1, 0)
	},
	speedDial: {
		position: 'absolute',
		'&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
			bottom: theme.spacing(2),
			right: theme.spacing(2)
		},
		'&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
			top: theme.spacing(2),
			left: theme.spacing(2)
		}
	},
	fab: {
		'&:hover': {
			backgroundColor: '#295da2'
		}
	}
}));

const tooltipUseStyles = makeStyles(theme => ({
	staticTooltipLabel: {
		width: 140
	}
}));

export default function CreateTasks(props) {
	const classes = useStyles();
	const tooltipClasses = tooltipUseStyles();
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleToggle = () => {
		setOpen(prevHidden => !prevHidden);
	};

	const actions = [
		{ icon: <Icon>import_export</Icon>, name: 'Importa de excel', handler: props.importExcel },
		{ icon: <Icon>add</Icon>, name: 'Crea una fase', handler: props.createTasks }
	];
	return (
		<div className={clsx(classes.root, 'speeddial-btn')}>
			<div className={classes.exampleWrapper}>
				<SpeedDial
					ariaLabel="SpeedDial example"
					className={clsx(classes.speedDial, 'custom-float-btn')}
					icon={<SpeedDialIcon />}
					onClose={handleClose}
					onOpen={handleOpen}
					// onClick={handleToggle}
					open={open}
					direction="up"
				>
					{actions.map(action => (
						<SpeedDialAction
							classes={tooltipClasses}
							className={classes.fab}
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							tooltipOpen
							onClick={ev => {
								action.handler(ev);
								handleClose();
							}}
						/>
					))}
				</SpeedDial>
			</div>
		</div>
	);
}
