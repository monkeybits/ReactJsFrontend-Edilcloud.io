import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import clsx from 'clsx';
import DrawImage from './DrawImage';

const useStyles = makeStyles(theme => ({
	root: {
		width: '70%',
		flexGrow: 1,
		margin: 4
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		height: 50,
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default
	},
	img: {
		height: 255,
		maxWidth: 400,
		overflow: 'hidden',
		display: 'block',
		width: '100%'
	}
}));

export default function ImagesPreview(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [activeStep, setActiveStep] = React.useState(0);
	const [openDrawer, setOpenDrawer] = React.useState(false);
	const maxSteps = props.images.length;

	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};

	return (
		<div className={clsx(classes.root, 'd-block mx-auto')}>
			<DrawImage
				imgSrc={props.images[activeStep].imgPath}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
			/>
			{/* <Paper square elevation={0} className={classes.header}>
				<Typography>{tutorialSteps[activeStep].label}</Typography>
			</Paper> */}
			{props.images[activeStep].fileType == 'image' ? (
				<img className={classes.img} src={props.images[activeStep].imgPath} />
			) : (
				<video className={classes.img} src={props.images[activeStep].imgPath} autoPlay />
			)}
			<MobileStepper
				steps={maxSteps}
				position="static"
				variant="text"
				activeStep={activeStep}
				nextButton={
					<Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
						Next
						{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
					</Button>
				}
				backButton={
					<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
						{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
						Back
					</Button>
				}
			/>
			<Button size="small" onClick={() => setOpenDrawer(true)}>
				Modify
			</Button>
		</div>
	);
}
