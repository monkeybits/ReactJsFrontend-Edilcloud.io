import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MobileStepper, Button } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
// import loadable from '@loadable/component';
const VideoListItem = React.lazy(() => import('app/VideoPlayer/VideoListItem'));
const ImagePreviewDialog = React.lazy(() => import('app/ImagePreviewDialog'));

const AutoPlaySwipeableViews = autoPlay(SwipeableViews); // SwipeableViews;
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
		height: 300,
		maxWidth: 400,
		overflow: 'hidden',
		display: 'block',
		width: '100%'
	}
}));

export default function PostedImages(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [ImagePropert, setImagePropert] = useState({
		height: 400,
		width: 400
	});
	const { media } = props;
	const [open, setOpen] = useState(false);
	const [activtStep, setActivtStep] = useState(0);
	const openImage = index => {
		const selected = media.filter(file => file.id === props.images[index].id)[0];
		// console.log(files[index], media.files, selected);
		if (selected) {
			setOpen(true);
			setActivtStep(selected.index);
		}
	};
	const maxSteps = props.images.length;
	const handleNext = () => {
		setActiveStep(prevActiveStep => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep(prevActiveStep => prevActiveStep - 1);
	};
	if (props.images.length === 0) {
		return null;
	}
	const handleStepChange = step => {
		setActiveStep(step);
	};
	return (
		<div className={clsx(classes.root, 'd-block mx-auto nomargin')}>
			<AutoPlaySwipeableViews
				axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
				index={activeStep}
				onChangeIndex={handleStepChange}
				enableMouseEvents
			>
				{/* {props.images[activeStep]?.type == 'image' || true ? (
					<img className={classes.img} src={props.images[activeStep].media_url} />
				) : (
					<video className={classes.img} src={props.images[activeStep].imgPath} autoPlay />
				)} */}
				{props.images.map((step, index) => (
					<div key={step.label}>
						{Math.abs(activeStep - index) <= 2 && props.images[activeStep]?.type ? (
							<>
								{/* // props.images[activeStep]?.type == 'image' || true ? ( */}
								{props.images[activeStep]?.type?.split('/')[0] == 'image' ? (
									<img
										className="object-cover h-288 w-full"
										src={props.images[activeStep].media_url}
										onClick={() => openImage(index)}
									/>
								) : (
									<VideoListItem
										width="100%"
										height="100%"
										video_url={props.images[activeStep].media_url}
									/>
									// <video className={classes.img} src={props.images[activeStep].media_url} autoPlay />
								)}
							</>
						) : null}
					</div>
				))}
			</AutoPlaySwipeableViews>
			{!props.hideNavigation && maxSteps && maxSteps > 1 && (
				<MobileStepper
					steps={maxSteps}
					position="static"
					variant="text"
					activeStep={activeStep}
					className="my-10"
					nextButton={
						<div>
							{activeStep !== maxSteps - 1 && (
								<Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
									Next
									{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
								</Button>
							)}
						</div>
					}
					backButton={
						<div>
							{activeStep !== 0 && (
								<Button size="small" onClick={handleBack} disabled={activeStep === 0}>
									{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
									Back
								</Button>
							)}
						</div>
					}
				/>
			)}

			{!!props.media && (
				<ImagePreviewDialog
					isOpenViewFile={open}
					imagesArray={props.media}
					activtStep={activtStep}
					closeViewFile={() => setOpen(false)}
					nameSpace="todo_project"
				/>
			)}
		</div>
	);
}
