import React, { useEffect } from 'react';
import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from 'app/main/apps/chat/store/actions';

function Navigation(props) {
	const dispatch = useDispatch();
	const navigation = useSelector(({ fuse }) => fuse.navigation);
	const history = useHistory();

	useEffect(() => {
		const pathName = window.location.pathname;
		if(!pathName.includes("/apps/projects/")) {
			dispatch(Actions.companyInfo());
		}
	}, [dispatch]);

	return (
		<FuseNavigation
			className={clsx('navigation', props.className)}
			navigation={navigation}
			layout={props.layout}
			dense={props.dense}
			active={props.active}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
