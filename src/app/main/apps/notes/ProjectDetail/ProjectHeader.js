import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Typography } from '@material-ui/core';
import React from 'react';

export default function ProjectHeader(props) {
	return (
		<div className="flex w-full justify-between items-center p-24 pb-0">
			<div className="mr-20">
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography variant="subtitle1" className="font-weight-700 mb-4">
						Project Name 12
					</Typography>
				</FuseAnimate>
				<Typography variant="subtitle1" className="text-14 font-weight-600 text-muted">
					Nuernbergerstrasse 45, Elsfleth, Niedersachsen, 26931
				</Typography>
			</div>
			<Button className="badge-btn" color="secondary" onClick={() => props.onOpen(true)}>
				Open Details
			</Button>
		</div>
	);
}
