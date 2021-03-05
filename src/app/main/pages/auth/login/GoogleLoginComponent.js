import { Button, LinearProgress } from '@material-ui/core';
import { API_GOOGLE_AUTH_LOGIN, API_GOOGLE_AUTH_REGISTER } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import React from 'react';
import GoogleLogin from 'react-google-login';
import jwtService from 'app/services/jwtService';
import * as authActions from 'app/auth/store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { toast } from 'react-toastify';
import { REGISTER_SUCCESS } from 'app/auth/store/actions';

class GoogleLoginComponent extends React.Component {
	state = {
		loading: false
	};

	responseGoogle = response => {
		const access_token = response.accessToken;
		const photo = response.profileObj.imageUrl;
		const { email } = response.profileObj;
		const provider = 'google-oauth2';
		this.startLoading();
		console.log({
			response,
			access_token,
			photo,
			provider
		});
		apiCall(
			this.props.isRegister ? API_GOOGLE_AUTH_REGISTER : API_GOOGLE_AUTH_LOGIN,
			{
				access_token,
				photo,
				provider
			},
			res => {
				const { token } = res;
				const { history, dispatch } = this.props;
				if (this.props.isRegister) {
					history.push('/pages/auth/mail-confirm', { email });
					return dispatch({
						type: REGISTER_SUCCESS,
						payload: res
					});
				}
				new Promise((resolve, reject) => {
					if (res) {
						jwtService.setSession(token);
						resolve(res);
					} else {
						reject(res);
					}
				})
					.then(res => {
						this.props.onLogin(res);
						setTimeout(() => {
							this.removeLoading();
						}, 2000);
					})
					.catch(err => {
						this.removeLoading();
						console.log(err);
					});
			},
			err => {
				this.removeLoading();
				console.log(err);
				toast.error(err?.error);
			},
			METHOD.POST
		);
		console.log(response);
	};

	startLoading = () =>
		this.setState({
			loading: true
		});

	removeLoading = () =>
		this.setState({
			loading: false
		});

	render() {
		return (
			<>
				<GoogleLogin
					clientId="1081576602759-1la7b88gqbimjo499nd25jg76d86aulr.apps.googleusercontent.com"
					render={renderProps => (
						<Button
							onClick={renderProps.onClick}
							disabled={renderProps.disabled}
							variant="outlined"
							color="primary"
							size="large"
							className="border-1 normal-case w-full h-40"
						>
							<img src="assets/images/social-icons/google.png" className="h-20 mr-8" alt="Google" />
							Google
						</Button>
					)}
					onSuccess={this.responseGoogle}
					onFailure={this.responseGoogle}
					cookiePolicy="single_host_origin"
				/>
				{this.state.loading && <LinearProgress className="m-4" color="secondary" />}
			</>
		);
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			onLogin: authActions.onLogin
		},
		dispatch
	);
}
GoogleLoginComponent.defaultProps = {
	isRegister: false
};
export default withRouter(connect(null, mapDispatchToProps)(GoogleLoginComponent));
