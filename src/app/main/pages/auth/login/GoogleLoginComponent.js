import { Button } from '@material-ui/core';
import React from 'react';
import GoogleLogin from 'react-google-login';

class GoogleLoginComponent extends React.Component {
	responseGoogle(response) {
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
