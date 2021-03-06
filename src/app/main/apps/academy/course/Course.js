import FusePageSimple from '@fuse/core/FusePageSimple';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { green } from '@material-ui/core/colors';
import { Fab, Hidden, Icon, IconButton, Paper, Step, StepLabel, Stepper, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import SwipeableViews from 'react-swipeable-views';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import ReactPlayer from 'react-player';

const useStyles = makeStyles(theme => ({
	stepLabel: {
		cursor: 'pointer!important'
	},
	successFab: {
		background: `${green[500]}!important`,
		color: 'white!important'
	}
}));

function Course(props) {
	const dispatch = useDispatch();
	const course = useSelector(({ academyApp }) => academyApp.course);
	const theme = useTheme();

	const routeParams = useParams();
	const classes = useStyles(props);
	const pageLayout = useRef(null);

	useDeepCompareEffect(() => {
		/**
		 * Get the Course Data
		 */
		dispatch(Actions.getCourse(routeParams));
	}, [dispatch, routeParams]);

	useEffect(() => {
		/**
		 * If the course is opened for the first time
		 * Change ActiveStep to 1
		 */
		if (course && course.activeStep === 0) {
			dispatch(Actions.updateCourse({ activeStep: 1 }));
		}
	}, [dispatch, course]);

	function handleChangeActiveStep(index) {
		dispatch(Actions.updateCourse({ activeStep: index + 1 }));
	}

	function handleNext() {
		dispatch(Actions.updateCourse({ activeStep: course.activeStep + 1 }));
	}

	function handleBack() {
		dispatch(Actions.updateCourse({ activeStep: course.activeStep - 1 }));
	}

	const activeStep = course && course.activeStep !== 0 ? course.activeStep : 1;

	return (
		<FusePageSimple
			classes={{
				content: 'flex flex-col flex-auto overflow-hidden',
				header: 'h-72 min-h-72'
			}}
			header={
				<div className="flex flex-1 items-center px-16 lg:px-24">
					<Hidden lgUp>
						<IconButton
							onClick={ev => pageLayout.current.toggleLeftSidebar()}
							aria-label="open left sidebar"
						>
							<Icon>menu</Icon>
						</IconButton>
					</Hidden>
					<IconButton to="/apps/academy/courses" component={Link}>
						<Icon>{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
					</IconButton>
					{course && <Typography className="flex-1 text-20 mx-16">{course.title}</Typography>}
				</div>
			}
			content={
				course && (
					<div className="flex flex-1 relative overflow-hidden">
						<FuseScrollbars className="w-full overflow-auto">
							<SwipeableViews
								className="overflow-hidden"
								index={activeStep - 1}
								enableMouseEvents
								onChangeIndex={handleChangeActiveStep}
							>
								{course.steps.map((step, index) => {
									return <div
										className="flex justify-center p-16 pb-64 sm:p-24 sm:pb-64 md:p-48 md:pb-64"
										key={step.id}
									>
										<Paper className="w-full max-w-lg rounded-8 p-16 md:p-24" elevation={1}>
											<div
												dir={theme.direction}
												dangerouslySetInnerHTML={{ __html: step.content }}
											/>
											<div className="flex my-44">
												<img src="https://app.edilcloud.io/assets/images/logos/fuse.svg" />
											</div>
											<div
												dir={theme.direction}
												dangerouslySetInnerHTML={{ __html: step.section1 }}
											/>
											<div className="flex my-44">
												<ReactPlayer
													// ref={this.ref}
													url="https://www.youtube.com/watch?v=qDDONLWhiKo"
													// style={{ width: '100%', height: '100%', left: '0px', top: '0px' }}
													controls
													// onDuration={this.onDuration}
													// onPlay={this.onPlay}
													loop={false}
													// onEnded={this.onEnded}
													playing={true}
												/>
											</div>
											<div
												dir={theme.direction}
												dangerouslySetInnerHTML={{ __html: step.section2 }}
											/>
										</Paper>
									</div>
								})}
							</SwipeableViews>
						</FuseScrollbars>

						<div className="flex justify-center w-full absolute left-0 right-0 bottom-0 pb-16 md:pb-32">
							<div className="flex justify-between w-full max-w-xl px-8">
								<div>
									{activeStep !== 1 && (
										<Fab className="" color="secondary" onClick={handleBack}>
											<Icon>{theme.direction === 'ltr' ? 'chevron_left' : 'chevron_right'}</Icon>
										</Fab>
									)}
								</div>
								<div>
									{activeStep < course.steps.length ? (
										<Fab className="" color="secondary" onClick={handleNext}>
											<Icon>{theme.direction === 'ltr' ? 'chevron_right' : 'chevron_left'}</Icon>
										</Fab>
									) : (
										<Fab className={classes.successFab} to="/apps/academy/courses" component={Link}>
											<Icon>check</Icon>
										</Fab>
									)}
								</div>
							</div>
						</div>
					</div>
				)
			}
			leftSidebarContent={
				course && (
					<Stepper classes={{ root: 'bg-transparent' }} activeStep={activeStep - 1} orientation="vertical">
						{course.steps.map((step, index) => {
							return (
								<Step key={step.id} onClick={() => handleChangeActiveStep(index)}>
									<StepLabel classes={{ root: classes.stepLabel }}>{step.title}</StepLabel>
								</Step>
							);
						})}
					</Stepper>
				)
			}
			innerScroll
			ref={pageLayout}
		/>
	);
}

export default withReducer('academyApp', reducer)(Course);
