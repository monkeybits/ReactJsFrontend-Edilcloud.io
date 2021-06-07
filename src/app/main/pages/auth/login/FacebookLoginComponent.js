import { API_FACEBOOK_AUTH_LOGIN, API_FACEBOOK_AUTH_REGISTER } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import jwtService from 'app/services/jwtService';
import * as authActions from 'app/auth/store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { LinearProgress } from '@material-ui/core';
import { toast } from 'react-toastify';
import { REGISTER_SUCCESS } from 'app/auth/store/actions';

class FacebookLoginComponent extends React.Component {
	state = {
		loading: false
	};

	responseFacebook = response => {
		const access_token = response.accessToken;
		const photo = response.picture.data.url;
		const provider = response.graphDomain;
		this.startLoading();
		apiCall(
			this.props.isRegister ? API_FACEBOOK_AUTH_REGISTER : API_FACEBOOK_AUTH_LOGIN,
			{
				access_token,
				photo,
				provider
			},
			res => {
				const { token } = res;
				const { history, dispatch } = this.props;
				if (this.props.isRegister) {
					history.push('/pages/auth/mail-confirm', { email: '' });
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
						// console.log(err);
					});
			},
			err => {
				this.removeLoading();
				// console.log(err);
				toast.error(err?.error);
			},
			METHOD.POST
		);
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
				<FacebookLogin
					cssClass="MuiButtonBase-root MuiButton-root MuiButton-outlined border-1 normal-case w-full flex items-center h-40"
					appId="1093743794410189"
					// autoLoad={true}
					fields="name,email,picture"
					scope="public_profile"
					callback={this.responseFacebook}
					disableMobileRedirect
					onFailure={err => {
						// console.log(err)
					}}
					icon={<img src="/assets/images/social-icons/facebook.png" height="20" alt="Facebook" />}
					textButton="Facebook"
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
FacebookLoginComponent.defaultProps = {
	isRegister: false
};
export default withRouter(connect(null, mapDispatchToProps)(FacebookLoginComponent));
