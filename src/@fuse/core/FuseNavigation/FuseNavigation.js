import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { Divider, List, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import * as SettingActions from 'app/main/apps/settings/store/actions';
import FuseNavHorizontalCollapse from './horizontal/FuseNavHorizontalCollapse';
import FuseNavHorizontalGroup from './horizontal/FuseNavHorizontalGroup';
import FuseNavHorizontalItem from './horizontal/FuseNavHorizontalItem';
import FuseNavHorizontalLink from './horizontal/FuseNavHorizontalLink';
import FuseNavVerticalCollapse from './vertical/FuseNavVerticalCollapse';
import FuseNavVerticalGroup from './vertical/FuseNavVerticalGroup';
import FuseNavVerticalItem from './vertical/FuseNavVerticalItem';
import FuseNavVerticalLink from './vertical/FuseNavVerticalLink';
import FuseNavItem, { registerComponent } from './FuseNavItem';
import PlanFormAskDialog from './PlanFormAskDialog';
import PlanIosDialog from './PlanIosDialog';
import { useDispatch } from 'react-redux';

/*
Register Fuse Navigation Components
 */
registerComponent('vertical-group', FuseNavVerticalGroup);
registerComponent('vertical-collapse', FuseNavVerticalCollapse);
registerComponent('vertical-item', FuseNavVerticalItem);
registerComponent('vertical-link', FuseNavVerticalLink);
registerComponent('horizontal-group', FuseNavHorizontalGroup);
registerComponent('horizontal-collapse', FuseNavHorizontalCollapse);
registerComponent('horizontal-item', FuseNavHorizontalItem);
registerComponent('horizontal-link', FuseNavHorizontalLink);
registerComponent('vertical-divider', () => <Divider className="my-16" />);
registerComponent('horizontal-divider', () => <Divider className="my-16" />);

const useStyles = makeStyles(theme => ({
	navigation: {
		'& .list-item': {
			'&:hover': {
				backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.04)'
			},
			'&:focus:not(.active)': {
				backgroundColor: theme.palette.type === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,.05)'
			}
		}
	},
	verticalNavigation: {
		'&.active-square-list': {
			'& .list-item, & .active.list-item': {
				width: '100%',
				borderRadius: '0'
			}
		},
		'&.dense': {
			'& .list-item': {
				paddingTop: 0,
				paddingBottom: 0,
				height: 32
			}
		}
	},
	horizontalNavigation: {
		'&.active-square-list': {
			'& .list-item': {
				borderRadius: '0'
			}
		},
		'& .list-item': {
			padding: '8px 12px 8px 12px',
			height: 40,
			minHeight: 40,
			'&.level-0': {
				height: 44,
				minHeight: 44
			},
			'& .list-item-text': {
				padding: '0 0 0 8px'
			}
		}
	},
	'@global': {
		'.popper-navigation-list': {
			'& .list-item': {
				padding: '8px 12px 8px 12px',
				height: 40,
				minHeight: 40,
				'& .list-item-text': {
					padding: '0 0 0 8px'
				}
			},
			'&.dense': {
				'& .list-item': {
					minHeight: 32,
					height: 32,
					'& .list-item-text': {
						padding: '0 0 0 8px'
					}
				}
			}
		}
	}
}));

function FuseNavigation(props) {
	const classes = useStyles(props);
	const [companyValidate, setCompanyValidate] = useState(false);
	const [isPlanModal, setIsPlanModal] = useState(false);
	const [isPlanIOSModal, setIsPlanIOSModal] = useState(false);
	const [deviceType, setDeviceType] = React.useState('');
	const { navigation, layout, active, dense, className } = props;
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			setDeviceType('window phone')
		}

		if (/android/i.test(userAgent)) {
			setDeviceType('android')
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			setDeviceType('ios')
		}

		const iPad = (userAgent.match(/(iPad)/)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
		if (iPad !== false) {
			setDeviceType('ios')
		}
	}, []);

	useEffect(() => {
		if (
			company.name !== '' &&
			company.tax_code !== '' &&
			company.vat_number !== '' &&
			company.address !== '' &&
			company.province !== '' &&
			company.cap !== '' &&
			company.country !== '' &&
			company.pec !== '' &&
			company.billing_email !== ''
		) {
			setCompanyValidate(true);
		} else {
			setCompanyValidate(false);
		}
	}, [company]);

	const verticalNav = (
		<List
			className={clsx(
				'navigation whitespace-no-wrap',
				classes.navigation,
				classes.verticalNavigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<>
					{
						deviceType === 'ios' || deviceType === 'android' ? (
							<>
							{
								_item.id !== "PLAN" &&
								<FuseNavItem key={_item.id} type={`vertical-${_item.type}`} item={_item} nestedLevel={0} />
							}
							{
								companyValidate && _item.id === "PLAN" &&
								<Link
									onClick={() => {
										setIsPlanIOSModal(true)
									}}
								>
									<FuseNavItem
										key={`plan`}
										type={`vertical-item`}
										item={{
											checkRole: true,
											roles: ['d', 'o'],
											id: '',
											title: 'Plan',
											translate: 'PLAN',
											type: 'item',
											icon: 'payment',
											url: '#'
										}}
										nestedLevel={0}
									/>
								</Link>
							}
							{
								!companyValidate && _item.id === "PLAN" &&
								<Link
									onClick={() => {
										setIsPlanModal(true)
									}}
								>
								<FuseNavItem key={`plan`} type={`vertical-item`} item={{
									checkRole: true,
									roles: ['d', 'o'],
									id: '',
									title: 'Plan',
									translate: 'PLAN',
									type: 'item',
									icon: 'payment',
									url: '#'
								}} nestedLevel={0} />
								</Link>
							}
							</>
						) : (
							<>
								{
									_item.id !== "PLAN" &&
									<FuseNavItem key={_item.id} type={`vertical-${_item.type}`} item={_item} nestedLevel={0} />
								}
								{
									companyValidate && _item.id === "PLAN" &&
									<FuseNavItem key={_item.id} type={`vertical-${_item.type}`} item={_item} nestedLevel={0} />
								}
								{
									!companyValidate && _item.id === "PLAN" &&
									<Link
										onClick={() => {
											setIsPlanModal(true)
										}}
									>
									<FuseNavItem key={`plan`} type={`vertical-item`} item={{
										checkRole: true,
										roles: ['d', 'o'],
										id: '',
										title: 'Plan',
										translate: 'PLAN',
										type: 'item',
										icon: 'payment',
										url: '#'
									}} nestedLevel={0} />
									</Link>
								}
							</>
						)
					}
					<div>
						<PlanFormAskDialog
							isPlanModal={isPlanModal}
							closePlanModal={() => setIsPlanModal(false)}
							onYes={() => {
								dispatch(SettingActions.filterByKey('billings'))
								history.push({
									pathname: '/apps/settings'
								});
								setIsPlanModal(false)
							}}
							onNo={() => setIsPlanModal(false)}
						/>
					</div>
					<div>
						<PlanIosDialog
							isPlanModal={isPlanIOSModal}
							closePlanModal={() => setIsPlanIOSModal(false)}
							onOk={() => {
								try {
									// if (window.webkit.messageHandlers) {
									// 	window.webkit.messageHandlers.PaymentRedirect.postMessage(`${process.env.REACT_APP_BASE_URL}/api/frontend/payments/customer-portal?customer_id=${company.customer}`);
									// }
									setIsPlanIOSModal(false)
								} catch (e) {
									// console.log('error', e);
								}
							}}
						/>
					</div>
				</>
			))}
		</List>
	);

	const horizontalNav = (
		<List
			className={clsx(
				'navigation whitespace-no-wrap flex p-0',
				classes.navigation,
				classes.horizontalNavigation,
				`active-${active}-list`,
				dense && 'dense',
				className
			)}
		>
			{navigation.map(_item => (
				<FuseNavItem
					key={_item.id}
					type={`horizontal-${_item.type}`}
					item={_item}
					nestedLevel={0}
					dense={dense}
				/>
			))}
		</List>
	);

	if (navigation.length > 0) {
		switch (layout) {
			case 'horizontal': {
				return horizontalNav;
			}
			case 'vertical':
			default: {
				return verticalNav;
			}
		}
	} else {
		return null;
	}
}

FuseNavigation.propTypes = {
	navigation: PropTypes.array.isRequired
};

FuseNavigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(FuseNavigation);
