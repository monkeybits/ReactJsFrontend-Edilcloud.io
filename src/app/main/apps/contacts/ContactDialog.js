/* =============================================================================
 ContactDialog.js
 ===============================================================================
*This file is created for ContactsApp
TODO: dialog to create new company team member
*/
import { Dialog } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
// import loadable from '@loadable/component';
const ContactDialogContent = React.lazy(() => import('./ContactDialogContent'));

function ContactDialog() {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ contactsApp }) => contactsApp.contacts.contactDialog);

	function closeComposeDialog() {
		return contactDialog.type === 'edit'
			? dispatch(Actions.closeEditContactDialog())
			: dispatch(Actions.closeNewContactDialog());
	}

	return (
		<Dialog
			disableBackdropClick
			classes={{
				paper: 'm-24'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<ContactDialogContent />
		</Dialog>
	);
}

export default ContactDialog;
