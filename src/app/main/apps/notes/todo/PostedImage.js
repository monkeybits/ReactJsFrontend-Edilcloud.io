import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { MobileStepper, Button } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import loadable from '@loadable/component';
const VideoListItem = loadable(() => import('app/VideoPlayer/VideoListItem'));
const ImagePreviewDialog = loadable(() => import('app/ImagePreviewDialog'));

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

export default function PostedImage(props) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const [open, setOpen] = useState(false);
	const [activtStep, setActivtStep] = useState(0);
	const openImage = index => {
        setOpen(true);
        setActivtStep(index);
	};
	if (props.images.length === 0) {
		return null;
	}
	const handleStepChange = step => {
		setActiveStep(step);
	};
	return (
		<div className={clsx(classes.root, 'd-block mx-auto nomargin')}>
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
			<ImagePreviewDialog
				isOpenViewFile={open}
				imagesArray={props.images}
				activtStep={activtStep}
				closeViewFile={() => setOpen(false)}
				nameSpace="todo_project"
				isSingle={true}
			/>
		</div>
	);
}
