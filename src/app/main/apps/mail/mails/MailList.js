import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import FuseUtils from '@fuse/utils';
import { List, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import * as Actions from '../store/actions';
import loadable from '@loadable/component';
const MailListItem = loadable(() => import('./MailListItem'));

function MailList(props) {
	const dispatch = useDispatch();
	const mails = useSelector(({ mailApp }) => mailApp.mails.entities);
	const searchText = useSelector(({ mailApp }) => mailApp.mails.searchText);

	const routeParams = useParams();
	const [filteredData, setFilteredData] = useState(null);
	const { t } = useTranslation('mailApp');

	useDeepCompareEffect(() => {
		dispatch(Actions.getMails(routeParams));
	}, [dispatch, routeParams]);

	useEffect(() => {
		function getFilteredArray() {
			const arr = Object.keys(mails).map(id => mails[id]);
			if (searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, searchText);
		}

		if (mails) {
			setFilteredData(getFilteredArray());
		}
	}, [mails, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<FuseAnimate delay={100}>
				<div className="flex flex-1 items-center justify-center h-full">
					<Typography color="textSecondary" variant="h5">
						{t('NO_MESSAGES')}
					</Typography>
				</div>
			</FuseAnimate>
		);
	}

	return (
		<List className="p-0">
			<FuseAnimateGroup
				enter={{
					animation: 'transition.slideUpBigIn'
				}}
			>
				{filteredData.map(mail => (
					<MailListItem mail={mail} key={mail.id} />
				))}
			</FuseAnimateGroup>
		</List>
	);
}

export default withRouter(MailList);
