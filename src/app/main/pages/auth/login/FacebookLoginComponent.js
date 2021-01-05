import { API_FACEBOOK_AUTH_LOGIN } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import jwtService from 'app/services/jwtService';
import * as authActions from 'app/auth/store/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
class FacebookLoginComponent extends React.Component {
	responseFacebook = response => {
		const access_token = response.accessToken;
		const photo = response.picture.data.url;
		const provider = response.graphDomain;
		console.log({
			access_token,
			photo,
			provider
		});
		apiCall(
			API_FACEBOOK_AUTH_LOGIN,
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
					})
					.catch(err => console.log(err));
			},
			err => console.log(err),
			METHOD.POST
		);
		console.log(response);
	};

	render() {
		return (
			<FacebookLogin
				cssClass="MuiButtonBase-root MuiButton-root MuiButton-outlined border-1 normal-case w-full flex items-center h-full"
				appId="1093743794410189"
				// autoLoad={true}
				fields="name,email,picture"
				scope="public_profile,user_friends,user_actions.books"
				callback={this.responseFacebook}
				onFailure={err => console.log(err)}
				icon={<img src="/assets/images/social-icons/facebook.png" className="h-20" alt="Facebook" />}
				textButton="Facebook"
			/>
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

export default withRouter(connect(null, mapDispatchToProps)(FacebookLoginComponent));
