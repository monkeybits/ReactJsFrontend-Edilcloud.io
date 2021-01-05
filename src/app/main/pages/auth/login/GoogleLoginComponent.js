import { Button } from '@material-ui/core';
import { API_GOOGLE_AUTH_LOGIN } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import React from 'react';
import GoogleLogin from 'react-google-login';
import jwtService from 'app/services/jwtService';
import * as authActions from 'app/auth/store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { LinearProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
class GoogleLoginComponent extends React.Component {
	state = {
		loading: false
	};
	responseGoogle = response => {
		const access_token = response.accessToken;
		const photo = response.profileObj.imageUrl;
		const provider = 'google-oauth2';
		this.startLoading();
		console.log({
			access_token,
			photo,
			provider
		});
		apiCall(
			API_GOOGLE_AUTH_LOGIN,
			{
				access_token,
				photo,
				provider
			},
			res => {
				const { token } = res;
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
				toast.error(err);
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
					cookiePolicy={'single_host_origin'}
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

export default withRouter(connect(null, mapDispatchToProps)(GoogleLoginComponent));
