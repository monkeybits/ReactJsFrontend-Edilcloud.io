import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from 'app/main/apps/chat/store/actions';
import Tour from 'reactour';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import withReducer from 'app/store/withReducer';
import reducer from './store/reducers';

function ProjectTour(props) {
	const dispatch = useDispatch();

	const [isTourOpen, setIsTourOpen] = React.useState(true);

	const disableBody = target => disableBodyScroll(target);
	const enableBody = target => enableBodyScroll(target);
	const accentColor = '#5cb7b7';
	return (
		<Tour
			onRequestClose={() => setIsTourOpen(false)}
			steps={tourConfig}
			isOpen={isTourOpen}
			// disableKeyboardNavigation={['esc']}
			onAfterOpen={target => (document.body.style.overflowY = 'hidden')}
			onBeforeClose={target => (document.body.style.overflowY = 'auto')}
			maskSpace={5}
			// inViewThreshold={2000}
			// maskClassName="mask"
			// className="helper"
			rounded={20}
			accentColor="red"
			onAfterOpen={disableBody}
			onBeforeClose={enableBody}
		/>
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

export default withReducer('tour', reducer)(React.memo(ProjectTour));
