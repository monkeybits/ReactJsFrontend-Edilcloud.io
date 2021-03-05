/* =============================================================================
 TeamFloationButton.js
 ===============================================================================
*This file is created for ContactsApp
TODO: add contact or search contact of other company floating button
*/
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import FolderOutlinedIcon from '@material-ui/icons/FolderOutlined';
import clsx from 'clsx';
import { Icon } from '@material-ui/core';

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
	{ icon: <Icon>search</Icon>, name: 'Search' },
	{ icon: <Icon>add_circle</Icon>, name: 'Invite' }
];

export default function TeamFloationButton(props) {
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
