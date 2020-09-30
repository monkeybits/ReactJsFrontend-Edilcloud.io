import React, { useState } from 'react';
import CardAttachment from './CardAttachment';
import ImagePreviewDialog from './ImagePreviewDialog';

export default function ViewFile({ files }) {
	const [open, setOpen] = useState(false);
	const [activtStep, setActivtStep] = useState(0);
	const openImage = index => {
		setOpen(true);
		setActivtStep(index);
	};

	if (!files && !files.lenght) {
		return null;
	}
	return (
		<div>
			{files.map((item, index) => (
				<CardAttachment
					item={item}
					card={{}}
					openImage={() => openImage(index)}
					// makeCover={makeCover}
					// removeCover={removeCover}
					// removeAttachment={removeAttachment}
					key={item.id}
				/>
			))}
			<ImagePreviewDialog
				isOpenViewFile={open}
				imagesArray={files}
				activtStep={activtStep}
				closeViewFile={() => setOpen(false)}
			/>
		</div>
	);
}
