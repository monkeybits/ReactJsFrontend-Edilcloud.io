import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import { LinearProgress, Typography, Box } from '@material-ui/core';
import { useStyles } from '@material-ui/pickers/views/Calendar/SlideTransition';
import { useTranslation } from 'react-i18next';
function LinearProgressWithLabel(props) {
	const { t } = useTranslation('filemanaer_project');
	const classes = useStyles1();
	return (
		<Box display="flex" alignItems="center" className={classes.progressBox}>
			<Box width="100%" mr={1}>
				<LinearProgressProg variant="determinate" {...props} value={100} />
			</Box>
			<Box className={classes.root}>
				{/* <Typography variant="body2" color="textSecondary">{`${Math.round(props.value)}%`}</Typography> */}
				<Typography>
					{t(props.label)} {`${Math.round(props.value)}%`}
				</Typography>
			</Box>
		</Box>
	);
}
LinearProgressWithLabel.defaultProps = {
	label: '' // 'PROCESSING_UPLOADING_FILE'
};

const useStyles1 = makeStyles({
	root: {
		position: 'absolute',
		zIndex: '50',
		textAlign: 'center',
		width: '100%',
		color: ' white'
	},
	progressBox: {
		width: '300px',
		margin: '0 auto',
		position: 'relative',
		top: '-20px'
	}
});
const LinearProgressProg = withStyles({
	root: {
		height: 36,
		width: 300,
		backgroundColor: lighten('#53b987', 0),
		animation: `$myEffect 2s linear infinite`,
		borderRadius: 20,
		backgroundImage:
			'-webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, rgba(255, 255, 255, .2)), color-stop(.25, transparent), color-stop(.5, transparent), color-stop(.5, rgba(255, 255, 255, .2)), color-stop(.75, rgba(255, 255, 255, .2)), color-stop(.75, transparent), to(transparent) )',
		backgroundSize: '50px 50px'
	},
	bar: {
		width: '100%',
		backgroundColor: 'transparent'
	},
	'@keyframes myEffect': {
		'0%': {
			backgroundPosition: '0px 0px'
		},
		'100%': {
			backgroundPosition: '50px 50px'
		}
	}
})(LinearProgress);

export default function LinearWithValueLabel({ progress }) {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<LinearProgressWithLabel color="secondary" value={progress} />
		</div>
	);
}
