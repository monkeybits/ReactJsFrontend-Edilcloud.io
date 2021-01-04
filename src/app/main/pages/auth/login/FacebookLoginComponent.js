import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FacebookLoginComponent extends React.Component {
	responseFacebook(response) {
		console.log(response);
	}

	render() {
		return (
			<FacebookLogin
				cssClass="MuiButtonBase-root MuiButton-root MuiButton-outlined border-1 normal-case w-full flex items-center h-full"
				appId="1088597931155576"
				// autoLoad={true}
				fields="name,email,picture"
				scope="public_profile,user_friends,user_actions.books"
				callback={this.responseFacebook}
				icon={<img src="/assets/images/social-icons/facebook.png" className="h-20" alt="Facebook" />}
				textButton="Facebook"
			/>
		);
	}
}

export default FacebookLoginComponent;
