import FuseUtils from '@fuse/utils';
import AppContext from 'app/AppContext';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { withRouter } from 'react-router-dom';

class FuseAuthorization extends Component {
	constructor(props, context) {
		super(props);
		const { routes } = context;
		this.state = {
			accessGranted: true,
			routes,
			deviceType: ''
		};
	}

	componentDidMount() {
		if (!this.state.accessGranted) {
			this.redirectRoute();
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.accessGranted !== this.state.accessGranted;
	}

	componentDidUpdate() {
		if (!this.state.accessGranted) {
			this.redirectRoute();
		}
	}

	static getDerivedStateFromProps(props, state) {
		const { location, userRole } = props;
		const { pathname } = location;

		const matched = matchRoutes(state.routes, pathname)[0];

		return {
			accessGranted: matched ? FuseUtils.hasPermission(matched.route.auth, userRole) : true
		};
	}

	redirectRoute() {
		const { location, userRole, history } = this.props;
		const { pathname, state } = location;
		const redirectUrl = state && state.redirectUrl ? state.redirectUrl : '/';

		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		var deviceType = '';
		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			deviceType = 'window phone'
		}

		if (/android/i.test(userAgent)) {
			deviceType = 'android'
		}

		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			deviceType = 'ios'
		}

		const iPad = (userAgent.match(/(iPad)/)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
		if (iPad !== false) {
			deviceType = 'ios'
		}

		/*
        User is guest
        Redirect to Login Page
        */
		if (!userRole || userRole.length === 0) {
			if(deviceType === 'ios') {
				history.push({
					pathname: '/pages/auth/splash'
				});
			} else {
				history.push({
					pathname: '/pages/auth/login',
					state: { redirectUrl: pathname }
				});
			}
		} else {
			/*
			User is member
			User must be on unAuthorized page or just logged in
			Redirect to dashboard or redirectUrl
			*/
			history.push({
				pathname: redirectUrl
			});
		}
	}

	render() {
		// console.info('Fuse Authorization rendered', accessGranted);
		return this.state.accessGranted ? <>{this.props.children}</> : null;
	}
}

function mapStateToProps({ auth }) {
	return {
		userRole: auth.user.role
	};
}

FuseAuthorization.contextType = AppContext;

export default withRouter(connect(mapStateToProps)(FuseAuthorization));
