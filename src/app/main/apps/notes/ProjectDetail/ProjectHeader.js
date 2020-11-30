import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Typography } from '@material-ui/core';
import React from 'react';

export default function ProjectHeader(props) {
	return (
		<div className="flex w-full justify-between bg-blue items-center p-24">
			<div className="pr-20">
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography variant="h4" className=" text-white font-weight-900 mb-4">
						Ristrutturazione Palazzo Pitti
					</Typography>
				</FuseAnimate>
				<Typography variant="subtitle1" className="text-14 text-white font-weight-600 ">
					Piazza della Signoria 23, Firenze (50121) Italia
				</Typography>
			</div>
			<Button className="badge-btn" color="secondary" onClick={() => props.onOpen(true)}>
				Open Details
			</Button>
		</div>
	);
}
