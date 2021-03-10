import FuseAnimate from '@fuse/core/FuseAnimate';
import { Typography, Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function ContactsHeader(props) {
	const { t } = useTranslation('contacts_project');
	const dispatch = useDispatch();
	const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	// const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const projectDetail = useSelector(({ notesApp }) => notesApp.project.projectDetail);
	return (
		<div className="flex w-full justify-between items-center mb-24">
			<div className="mr-20">
				<Typography variant="h5" className="mb-4">
					Team
				</Typography>
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Typography variant="subtitle1" className="font-weight-700 mb-4">
						{projectDetail.name}
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

		// <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
		// 	<div className="flex flex-shrink items-center sm:w-224">
		// 		<Hidden lgUp>
		// 			<IconButton
		// 				onClick={ev => {
		// 					props.pageLayout.current.toggleLeftSidebar();
		// 				}}
		// 				aria-label="open left sidebar"
		// 				className="ml-20"
		// 			>
		// 				<Icon>menu</Icon>
		// 			</IconButton>
		// 		</Hidden>

		// 		<div className="flex items-center">
		// 			<FuseAnimate animation="transition.expandIn" delay={300}>
		// 				<Icon className="text-32 hidden sm:flex">account_box</Icon>
		// 			</FuseAnimate>
		// 			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
		// 				<Typography variant="h6" className="mx-12 hidden sm:flex">
		// 					Contacts
		// 				</Typography>
		// 			</FuseAnimate>
		// 		</div>
		// 	</div>

		// 	<div className="flex flex-1">
		// 		<ThemeProvider theme={mainTheme}>
		// 			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
		// 				<Paper className="flex p-4 items-center w-full max-w-512 h-48 px-8 py-4" elevation={1}>
		// 					<Icon color="action">search</Icon>

		// 					<Input
		// 						placeholder="Search for anything"
		// 						className="flex flex-1 px-16"
		// 						disableUnderline
		// 						fullWidth
		// 						value={searchText}
		// 						inputProps={{
		// 							'aria-label': 'Search'
		// 						}}
		// 						onChange={ev => dispatch(Actions.setSearchText(ev))}
		// 					/>
		// 				</Paper>
		// 			</FuseAnimate>
		// 		</ThemeProvider>
		// 	</div>
		// </div>
	);
}

export default ContactsHeader;
