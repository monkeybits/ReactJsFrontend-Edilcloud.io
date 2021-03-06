import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from '@material-ui/lab';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
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

const actions = [
	{ icon: <InsertDriveFileOutlinedIcon />, name: 'File' },
	{ icon: <FolderOutlinedIcon />, name: 'Folder' }
];

export default function FloatingButtonUpload(props) {
	const classes = useStyles();
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

	return (
		<div className={clsx(classes.root, 'speeddial-btn')}>
			<div className={classes.exampleWrapper}>
				<SpeedDial
					ariaLabel="SpeedDial example"
					className={clsx(classes.speedDial, 'custom-float-btn file-manage-btn')}
					icon={<SpeedDialIcon />}
					onClose={handleClose}
					onOpen={handleOpen}
					// onClick={handleToggle}
					open={open}
					direction="up"
				>
					{actions.map(action => (
						<SpeedDialAction
							className={classes.fab}
							key={action.name}
							icon={action.icon}
							tooltipTitle={action.name}
							tooltipOpen
							onClick={() => {
								props.callAction(action.name);
								handleClose();
							}}
						/>
					))}
				</SpeedDial>
			</div>
		</div>
	);
}
