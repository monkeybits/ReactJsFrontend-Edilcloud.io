import React, { useState } from 'react';
import loadable from '@loadable/component';
import { useSelector } from 'react-redux';
const CardAttachment = loadable(() => import('./CardAttachment'))
const ImagePreviewDialog = loadable(() => import('app/ImagePreviewDialog'))

export default function ViewFile({ files, open, setOpen }) {
	const media = useSelector(({ chatPanel }) => chatPanel.chat?.media);
	const [openDialog, setOpenDialog] = useState(false);
	const [activtStep, setActivtStep] = useState(0);

	const openImage = index => {
		const selected = media.files.filter(file => file.id === files[index].id)[0];
		// console.log(files[index], media.files, selected);
		if (selected) {
			setOpenDialog(true);
			setOpen(true);
			setActivtStep(selected.index);
		}
	};

	if (!media && !media.files.lenght) {
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
				isOpenViewFile={openDialog}
				imagesArray={media.files}
				activtStep={activtStep}
				closeViewFile={() => {
					setOpenDialog(false);
					setOpen(false);
				}}
			/>
		</div>
	);
}
