import { Button } from '@material-ui/core';
import { API_AUTH_LOGIN } from 'app/services/apiEndPoints';
import { apiCall, METHOD } from 'app/services/baseUrl';
import React from 'react';
import GoogleLogin from 'react-google-login';

class GoogleLoginComponent extends React.Component {
	responseGoogle(response) {
		const access_token = response.accessToken;
		const photo = response.profileObj.imageUrl;
		const provider = 'google-oauth2';
		console.log({
			access_token,
			photo,
			provider
		});
		apiCall(
			API_AUTH_LOGIN,
			{
				access_token,
				photo,
				provider
			},
			res => {
				console.log(res);
			},
			err => console.log(err),
			METHOD.POST
		);
		console.log(response);
	}

	render() {
		return (
			<GoogleLogin
				clientId="1081576602759-1la7b88gqbimjo499nd25jg76d86aulr.apps.googleusercontent.com"
				render={renderProps => (
					<Button
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						variant="outlined"
						color="primary"
						size="large"
						className="border-1 normal-case w-full"
					>
						<img src="assets/images/social-icons/google.png" className="h-20 mr-8" alt="Google" />
						Google
					</Button>
				)}
				onSuccess={this.responseGoogle}
				onFailure={this.responseGoogle}
				cookiePolicy={'single_host_origin'}
			/>
		);
	}
}

export default GoogleLoginComponent;
