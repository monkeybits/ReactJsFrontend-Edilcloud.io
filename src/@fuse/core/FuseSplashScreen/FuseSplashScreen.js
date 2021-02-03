import React from 'react';

function FuseSplashScreen() {
	return (
		
		<div id="fuse-splash-screen">
			<div class=" bg-white center -mt-2">
				<div class="logo">
					<img width="350" src="assets/images/logos/fuse.svg" alt="logo" />
				</div>
				<div class="spinner-wrapper">
					<div class="spinner">
						<div class="inner">
							<div class="gap"></div>
							<div class="left">
								<div class="half-circle"></div>
							</div>
							<div class="right">
								<div class="half-circle"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(FuseSplashScreen);
