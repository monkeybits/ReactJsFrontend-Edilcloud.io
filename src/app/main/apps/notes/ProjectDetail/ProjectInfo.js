// import React from 'react';
import { AppBar, Typography, IconButton, Toolbar, Dialog, DialogContent } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import loadable from '@loadable/component';
const ProjectDetailContent = loadable(() => import('./ProjectDetailContent'));

export default function ProjectInfo({ openDialog, closeDialog }) {
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);

	return (
		<Dialog
			open={openDialog}
			onClose={closeDialog}
			fullWidth
			maxWidth="sm"
			className="custom-modal-new custom-modal-lg"
		>
			<AppBar position="static" elevation={1}>
				<Toolbar className="flex">
					<Typography variant="h6" color="inherit">
						Project Details
					</Typography>
					<div className="absolute right-m-12">
						<IconButton onClick={closeDialog} edge="start" color="inherit" aria-label="close">
							<CloseIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<DialogContent classes={{ root: 'p-0' }}>
				<ProjectDetailContent projectDetail={projectDetail} />
			</DialogContent>
		</Dialog>
	);
}
