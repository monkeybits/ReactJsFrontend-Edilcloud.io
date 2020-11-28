import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SYSTEM_ROLES } from 'app/constants';
import { apiCall, METHOD } from 'app/services/baseUrl';
import { GET_COMPANY_PROFILE } from 'app/services/apiEndPoints';
import { getHeaderToken, decodeDataFromToken } from 'app/services/serviceUtils';
import * as authActions from 'app/auth/store/actions';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#1e2632',
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
		position: 'absolute',
		top: 92,
		padding: 8,
		background: theme.palette.background.default,
		boxSizing: 'content-box',
		left: '50%',
		transform: 'translateX(-50%)',
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		'& > img': {
			borderRadius: '100%'
		}
	}
}));

function UserNavbarHeader(props) {
	const user = useSelector(({ auth }) => auth.user.data.company);
	const company = useSelector(({ chatApp }) => chatApp?.company);
	const classes = useStyles();
	const [userCompanyData, setUserCompanyData] = useState({});

	return (
		<AppBar
			position="static"
			elevation={0}
			classes={{ root: classes.root }}
			className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-40 z-0"
		>
			{user && (
				<Typography className="username text-16 whitespace-no-wrap" color="inherit">
					{user.first_name + ' ' + user.last_name}
				</Typography>
			)}
			<Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">
				{company?.position}@{company?.name}
			</Typography>
			<Avatar
				className={clsx(classes.avatar, 'avatar')}
				alt="user photo"
				src={company?.logo ? company?.logo : 'assets/images/avatars/profile.jpg'}
			/>
		</AppBar>
	);
}

export default UserNavbarHeader;
