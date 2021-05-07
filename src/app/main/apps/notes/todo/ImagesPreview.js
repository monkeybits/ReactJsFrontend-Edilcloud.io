import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MobileStepper, Button } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import clsx from 'clsx';
import * as ICONS from 'app/main/apps/constants';
// import loadable from '@loadable/component';
const DrawImage = React.lazy(() => import('./DrawImage'));
const VideoListItem = React.lazy(() => import('app/VideoPlayer/VideoListItem'));

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
	const [ImagePropert, setImagePropert] = React.useState({
		height: 400,
		width: 400
	});
	const maxSteps = props.images.length;
	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};
	const getMeta = url => {
		const img = new Image();
		img.onload = function () {
			const { height } = this;
			const { width } = this;
			setImagePropert({
				height,
				width
			});
			setOpenDrawer(true);
		};
		img.src = url;
	};
	return (
		<div className={clsx(classes.root, 'd-block mx-auto nomargin')}>
			<DrawImage
				imgSrc={props.images[activeStep].imgPath}
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				replaceUrl={url => props.replaceUrl(url, activeStep)}
			/>
			{/* <Paper square elevation={0} className={classes.header}>
				<Typography>{tutorialSteps[activeStep].label}</Typography>
			</Paper> */}
			{!props.hideModify && (
				<div className="flex justify-end items-end">
					<Button
						size="small"
						variant="contained"
						color="primary"
						className="mb-16 mr-12"
						onClick={() => {
							getMeta(props.images[activeStep].imgPath);
						}}
					>
						Modify
					</Button>
				</div>
			)}
			{props.images[activeStep].fileType == 'image' ? (
				<img className="object-cover h-288 w-full" src={props.images[activeStep].imgPath} />
			) : props.images[activeStep].fileType == 'video' ? (
				<VideoListItem width="100%" height="100%" video_url={props.images[activeStep].imgPath} />
			) : (
				<img src={ICONS.GENERIC_ICON_PATH} />
			)}
			<MobileStepper
				steps={maxSteps}
				position="static"
				variant="text"
				activeStep={activeStep}
				className="my-10"
				nextButton={
					<div>
						{activeStep !== maxSteps - 1 && (
							<Button size="small" onClick={handleNext}>
								Next
								{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
							</Button>
						)}
					</div>
				}
				backButton={
					<div>
						{activeStep !== 0 && (
							<Button size="small" onClick={handleBack}>
								{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
								Back
							</Button>
						)}
					</div>
				}
			/>
		</div>
	);
}
