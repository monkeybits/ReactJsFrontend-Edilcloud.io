import React, { useMemo } from 'react';
import loadable from '@loadable/component';
import FuseUtils from '@fuse/utils';
import {Icon, ListItem, ListItemText, useMediaQuery} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as Actions from 'app/store/actions';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
const FuseNavBadge = loadable(() => import('../FuseNavBadge'))

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
		textDecoration: 'none!important'
	})
}));

function FuseNavVerticalLink(props) {
	const dispatch = useDispatch();
	const userRole = useSelector(({ auth }) => auth.user.role);

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

	return (
		<ListItem
			button
			component="a"
			href={item.url}
			target={item.target ? item.target : '_blank'}
			className={clsx(classes.item, 'list-item')}
			onClick={ev => mdDown && dispatch(Actions.navbarCloseMobile())}
			role="button"
		>
			{item.icon && (
				<Icon className="list-item-icon text-16 flex-shrink-0" color="action">
					{item.icon}
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

FuseNavVerticalLink.propTypes = {
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string,
		icon: PropTypes.string,
		url: PropTypes.string,
		target: PropTypes.string
	})
};
FuseNavVerticalLink.defaultProps = {};

const NavVerticalLink = withRouter(React.memo(FuseNavVerticalLink));

export default NavVerticalLink;
