import FuseAnimate from '@fuse/core/FuseAnimate';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { Icon, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// import loadable from '@loadable/component';
const MailCompose = React.lazy(() => import('./MailCompose'));

const useStyles = makeStyles(theme => ({
	listItem: {
		color: 'inherit!important',
		textDecoration: 'none!important',
		height: 40,
		width: 'calc(100% - 16px)',
		borderRadius: '0 20px 20px 0',
		paddingLeft: 24,
		paddingRight: 12,
		'&.active': {
			backgroundColor: theme.palette.secondary.main,
			color: `${theme.palette.secondary.contrastText}!important`,
			pointerEvents: 'none',
			'& .list-item-icon': {
				color: 'inherit'
			}
		},
		'& .list-item-icon': {
			fontSize: 16,
			width: 16,
			height: 16,
			marginRight: 16
		}
	},
	listSubheader: {
		paddingLeft: 24
	}
}));

function MailAppSidebarContent(props) {
	const folders = useSelector(({ todoApp }) => todoApp.folders);
	const labels = useSelector(({ todoApp }) => todoApp.labels);
	const filters = useSelector(({ todoApp }) => todoApp.filters);

	const classes = useStyles();
	const { t } = useTranslation('todoApp');

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={400}>
			<div className="flex-auto border-l-1">
				<MailCompose />

				<div>
					<List />
				</div>
			</div>
		</FuseAnimate>
	);
}

export default MailAppSidebarContent;
