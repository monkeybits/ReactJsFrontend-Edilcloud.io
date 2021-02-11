import React from 'react';
import FullscreenModal from './FullscreenModal';
import Steps from './Steps';
import CompanyCreationStepper from 'app/main/companyCreation/CompanyCreationStepper';
export default function Tutorial({ open, setOpen }) {
	const [activeStepComponent, setActiveStepComponent] = React.useState(0);
	// const [open, setOpen] = React.useState(true);
	return (
		<FullscreenModal open={open} setOpen={setOpen}>
			{activeStepComponent == 0 ? <div>Welcome to Edilcloud</div> : <CompanyCreationStepper />}
			<Steps {...{ activeStep: activeStepComponent, setActiveStep: setActiveStepComponent }} />
		</FullscreenModal>
	);
}
