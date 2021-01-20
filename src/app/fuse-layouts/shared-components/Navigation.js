import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from 'app/main/apps/chat/store/actions';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

function Navigation(props) {
	const dispatch = useDispatch();
	const navigation = useSelector(({ fuse }) => fuse.navigation);
	const [isTourOpen, setIsTourOpen] = React.useState(true);
	useEffect(() => {
		dispatch(Actions.companyInfo());
	}, [dispatch]);
	const disableBody = target => disableBodyScroll(target);
	const enableBody = target => enableBodyScroll(target);
	const accentColor = '#5cb7b7';
	return (
		<>
			<FuseNavigation
				className={clsx('navigation', props.className)}
				navigation={navigation}
				layout={props.layout}
				dense={props.dense}
				active={props.active}
			/>
			<Tour
				onRequestClose={() => setIsTourOpen(false)}
				steps={tourConfig}
				isOpen={isTourOpen}
				// maskClassName="mask"
				// className="helper"
				// rounded={5}
				// accentColor={accentColor}
				onAfterOpen={disableBody}
				onBeforeClose={enableBody}
			/>
		</>
	);
}
const tourConfig = [
	{
		selector: '.first-step',
		content: `Select Project list`
	},
	{
		selector: '.second-step',
		content: `Create Project`
	}
];
Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
