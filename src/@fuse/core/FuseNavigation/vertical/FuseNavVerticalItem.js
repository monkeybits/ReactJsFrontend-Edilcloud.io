import React, { useMemo } from 'react';
import loadable from '@loadable/component';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import FuseUtils from '@fuse/utils';
import { Icon, ListItem, ListItemText, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as Actions from 'app/store/actions';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { USER_CHATS_PATHS, FILE_MANAHER_PATHS } from 'app/constants';
import * as authActions from 'app/auth/store/actions';

const FuseNavBadge = loadable(() => import('../FuseNavBadge'));

const useStyles = makeStyles(theme => ({
	item: props => ({
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingRight: 12,
		paddingLeft: props.itemPadding > 80 ? 80 : props.itemPadding,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			// pointerEvents: 'none',
			transition: 'border-radius .15s cubic-bezier(0.4,0.0,0.2,1)',
			'& .list-item-text-primary': {
				color: 'inherit'
			},
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			marginRight: 16
		},
		'& .list-item-text': {},
		color: theme.palette.text.primary,
		cursor: 'pointer',
		textDecoration: 'none!important'
	})
}));

function FuseNavVerticalItem(props) {
	const userRole = useSelector(({ auth }) => auth.user.role);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const dispatch = useDispatch();
	const user = useSelector(({ auth }) => auth.user.data);

	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));
	const { item, nestedLevel } = props;
	const classes = useStyles({
		itemPadding: nestedLevel > 0 ? 40 + nestedLevel * 16 : 24
	});
	const { t } = useTranslation('navigation');

	const hasPermission = useMemo(() => FuseUtils.hasPermission(item.auth, userRole), [item.auth, userRole]);

	if (!hasPermission) {
		return null;
	}
	// const userInfo = decodeDataFromToken();
	// const getRole = () => userInfo?.extra?.profile.role;
	const checkHasPermissOnChat = USER_CHATS_PATHS.filter(d => String(item.url).includes(d));
	const checkHasPermissOnFile = FILE_MANAHER_PATHS.filter(d => String(item.url).includes(d));
	return (
		<ListItem
			button
			disabled={
				(checkHasPermissOnChat.length && !company.can_access_chat) ||
				(checkHasPermissOnFile.length && !company.can_access_files)
			}
			component={item.isOutsideLink ? 'a' : NavLinkAdapter}
			href={
				item.isOutsideLink
					? `https://back-test.edilcloud.io/api/frontend/payments/customer-portal?customer_id=${company?.customer}`
					: 'javascript:;'
			}
			// target="_blank"
			to={item.url}
			activeClassName={item.isLogoutActionOnClick ? '' : 'active'}
			className={
				props.item.checkRole && !props.item.roles.includes(user.extra?.profile?.role)
					? clsx(classes.item, 'list-item pointer-events-none')
					: clsx(classes.item, 'list-item')
			}
			onClick={ev =>
				item.isLogoutActionOnClick
					? dispatch(authActions.logoutUser())
					: mdDown && dispatch(Actions.navbarCloseMobile())
			}
			exact={item.exact}
		>
			{item.icon && (
				<Icon className="list-item-icon text-18 flex-shrink-0" color="action">
					{props.item.checkRole && !props.item.roles.includes(user.extra?.profile?.role) ? 'lock' : item.icon}
				</Icon>
			)}

			<ListItemText
				className="list-item-text"
				primary={item.translate ? t(item.translate) : item.title}
				classes={{ primary: 'text-14 list-item-text-primary' }}
			/>

			{item.badge && <FuseNavBadge badge={item.badge} />}
		</ListItem>
	);
}

FuseNavVerticalItem.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		icon: PropTypes.string,
		url: PropTypes.string
	})
};

FuseNavVerticalItem.defaultProps = {};

const NavVerticalItem = withRouter(React.memo(FuseNavVerticalItem));

export default NavVerticalItem;
