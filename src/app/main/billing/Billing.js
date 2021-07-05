import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Card,
	CardContent,
	IconButton
} from '@material-ui/core';
import { connect } from 'react-redux';
import { useHistory, withRouter, useLocation } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useTranslation } from 'react-i18next';
import BillingContent from '../apps/settings/BillingContent';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		background: `#ffffff)`,
		color: theme.palette.primary.contrastText
	},
	button: {
		marginTop: theme.spacing(1),
		width: '190px'
	},
	actionsContainer: {
		marginBottom: theme.spacing(2)
	},
	resetContainer: {
		padding: theme.spacing(3)
	},
	progBox: {
		position: 'absolute',
		top: '10px',
		right: 0,
		width: '50px'
	}
}));

function Billing() {
	const { t } = useTranslation('billing');
	const location = useLocation();
	const routeHistory = useHistory();

	const classes = useStyles();

	const isMainWrap = !!(location.pathname === '/billing');

	return (
		<div
			className={clsx(
				classes.root,
				`flex flex-col flex-auto flex-shrink-0 ${isMainWrap ? 'items-center justify-center p-20 md:p-40' : ''}`
			)}
		>
			<div className={`flex flex-col w-full ${isMainWrap ? 'items-center justify-center' : ''}`}>
				<FuseAnimate animation="transition.expandIn">
					<Card className={`${isMainWrap ? 'w-full max-w-640' : ''}`}>
						<div className="absolute top-0 right-0">
							<IconButton aria-label="close" onClick={() => {
								routeHistory.goBack();
							}}>
								<CloseIcon />
							</IconButton>
						</div>
						<CardContent className={`flex flex-col ${isMainWrap ? 'items-center justify-center' : ''}`}>
							<BillingContent />
						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

function mapStateToProps({ auth }) {
	// return {
	// 	user: auth.user.data
	// };
}

export default withRouter(connect(mapStateToProps)(Billing));
