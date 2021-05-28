import React, { useState } from 'react';
import clsx from 'clsx';
import { AppBar, Avatar, Typography, IconButton, Icon } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#0d0a27',
		'&.user': {
			'& .username, & .email': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	avatar: {
		width: 72,
		height: 72,
		// position: 'absolute',
		// left: '50%',
		// transform: 'translateX(-50%)',
		// top: 110,
		padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		margin: '10px auto',
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		'& > img': {
			borderRadius: '50%'
		}
	}
}));

function UserNavbarHeader(props) {
	const user = useSelector(({ auth }) => auth.user.data.company);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const classes = useStyles();
	const [userCompanyData, setUserCompanyData] = useState({});

	console.log('company???????????????????????????????', company)

	return (
		<AppBar
			position="static"
			elevation={0}
			classes={{ root: classes.root }}
			className="user relative flex flex-col items-center sidebar-header-user justify-center pt-24 pb-24 mb-0 z-0"
		>
			{user && (
				<Typography className="username text-16 whitespace-no-wrap" color="inherit">
					{`${user.first_name} ${user.last_name}`}
				</Typography>
			)}
			{!!user?.position && (
				<Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">
					{/* {company?.position} @ */}
					{user?.position}
				</Typography>
			)}
			<Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">
				{company?.name}
			</Typography>
			{company?.logo ? (
				<Avatar className={clsx(classes.avatar, 'avatar')} alt="user photo" src={company.logo} />
			) : (
				<IconButton
					key="close"
					aria-label="Close"
					color="inherit"
					// onClick={() => dispatch(Actions.hideMessage())}
				>
					<Icon className="company-logo-icon">business</Icon>
				</IconButton>
			)}
			<span className="trial intrial">{company.trial_used ? 'Plan' : 'Periodo di Prova'}</span>
		</AppBar>
	);
}

export default UserNavbarHeader;
