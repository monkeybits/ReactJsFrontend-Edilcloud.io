import React from 'react';
import FullscreenModal from './FullscreenModal';
import Steps from './Steps';
import CompanyCreationStepper from 'app/main/companyCreation/CompanyCreationStepper';
import ContactDialogContent from 'app/main/apps/contacts/ContactDialogContent';
// import ContactsApp from '../../contacts/ContactsApp';

function getStepContent(step, elementProps) {
	switch (step) {
		case 0:
			return (
				<div>
					<h1>Welcome to Edilcloud</h1>
				</div>
			);
		case 1:
			return <CompanyCreationStepper />;
		case 2:
			return <ContactDialogContent />;
		default:
			return <div>You have finished tutorial!!</div>;
	}
}
export default function Tutorial({ open, setOpen }) {
	const [activeStep, setActiveStep] = React.useState(0);
	// const [open, setOpen] = React.useState(true);
	return (
		<FullscreenModal open={open} setOpen={setOpen}>
			{getStepContent(activeStep)}
			<Steps {...{ activeStep, setActiveStep }} />
		</FullscreenModal>
	);
}
