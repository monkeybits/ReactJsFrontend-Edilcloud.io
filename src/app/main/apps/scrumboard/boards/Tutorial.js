import React from 'react';
import loadable from '@loadable/component';
const CompanyCreationStepper = loadable(() => import('app/main/companyCreation/CompanyCreationStepper'));
const ContactDialogContent = loadable(() => import('app/main/apps/contacts/ContactDialogContent'));
const FullscreenModal = loadable(() => import('./FullscreenModal'));
const Steps = loadable(() => import('./Steps'));

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
