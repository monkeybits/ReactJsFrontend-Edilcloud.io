/* =============================================================================
 ContactsHeader.js
 ===============================================================================
*This file is created for ContactsApp
TODO: This is contacts page Header
*/
import FuseAnimate from '@fuse/core/FuseAnimate';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import Button from '@material-ui/core/Button';
import { useTranslation } from 'react-i18next';

function ContactsHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ contactsApp }) => contactsApp.contacts.searchText);
	const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
	const { t } = useTranslation('contacts');

	return (
		// <div className="flex w-full justify-between items-center p-24 pb-10">
		// 	<div className="mr-20">
		// 		<Typography variant="h5" className="mb-4">
		// 			Team
		// 		</Typography>
		// 		<FuseAnimate animation="transition.slideLeftIn" delay={300}>
		// 			<Typography variant="subtitle1" className="font-weight-700 mb-4">
		// 				Project Name
		// 			</Typography>
		// 		</FuseAnimate>
		// 		<Typography variant="subtitle1" className="text-14 font-weight-600 text-muted">
		// 			Nuernbergerstrasse 45, Elsfleth, Niedersachsen, 26931
		// 		</Typography>
		// 	</div>
		// 	<Button className="badge-btn" color="secondary" onClick={() => props.onOpen()}>
		// 		Open Details
		// 	</Button>
		// </div>
		<div className="flex w-full">
			<div className="flex w-full items-center justify-between p-20 border-b-1">
				<div>
					<Typography variant="h5" className="mb-4">
						{t('TEAM')}
					</Typography>
					{/* <Typography variant="subtitle1" className="text-14font-weight-600 ">
						{projectDetail.address}
					</Typography> */}
				</div>
				{/* <Button
					onClick={() => props.onOpen(true)}
					variant="contained"
					color="primary"
					className={'btn-primary normal-case m-0'}
				>
					Info Progetto
				</Button> */}
			</div>
		</div>
		// <div className="flex flex-1 items-center justify-between p-8 sm:p-24">
		// 	<div className="flex flex-shrink items-center sm:w-224">
		// 		<Hidden lgUp>
		// 			<IconButton
		// 				onClick={ev => {
		// 					props.pageLayout.current.toggleLeftSidebar();
		// 				}}
		// 				aria-label="open left sidebar"
		// 			>
		// 				<Icon>menu</Icon>
		// 			</IconButton>
		// 		</Hidden>

		// 		<div className="flex items-center">
		// 			<FuseAnimate animation="transition.expandIn" delay={300}>
		// 				<Icon className="text-32">account_box</Icon>
		// 			</FuseAnimate>
		// 			<FuseAnimate animation="transition.slideLeftIn" delay={300}>
		// 				<Typography variant="h6" className="mx-12 hidden sm:flex">
		// 					Contacts
		// 				</Typography>
		// 			</FuseAnimate>
		// 		</div>
		// 	</div>

		// 	<div className="flex flex-1 items-center justify-center px-8 sm:px-12">
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
