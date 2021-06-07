import FuseAnimate from '@fuse/core/FuseAnimate';
import { Button, Hidden, Icon, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ProjectDetailHeader(props) {
	const dispatch = useDispatch();
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);

	return (
		<div className="flex flex-1 items-center justify-between p-8 sm:p-24">
			{/* <div className="flex w-full justify-between items-center p-8 sm:p-24">
				<div className="mr-20">
					<Typography variant="h5">
						Chat
					</Typography>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography variant="subtitle1" className="font-600">{projectDetail.name}</Typography>
					</FuseAnimate>
					<Typography variant="subtitle1" className="text-14 text-muted">
						Nuernbergerstrasse 45, Elsfleth, Niedersachsen, 26931
					</Typography>
				</div>
				<Button color="secondary" onClick={() => props.onOpen()}>
					Open Details
				</Button>
			</div> */}
			<div className="flex flex-shrink items-center sm:w-444">
				<Hidden lgUp>
					<IconButton
						onClick={ev => {
							props.pageLayout.current.toggleLeftSidebar();
						}}
						aria-label="open left sidebar"
					>
						<Icon>menu</Icon>
					</IconButton>
				</Hidden>
				<div className="flex items-center">
					{/* <FuseAnimate animation="transition.expandIn" delay={300}>
						<Icon className="text-32">account_box</Icon>
					</FuseAnimate> */}
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography variant="h6" className="mx-12 sm:flex">
							{projectDetail.name}
						</Typography>
					</FuseAnimate>
					<Button color="secondary" onClick={() => props.onOpen()}>
						open detail
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ProjectDetailHeader;
