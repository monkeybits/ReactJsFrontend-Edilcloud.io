import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CardAttachment from './CardAttachment';
import ImagePreviewDialog from '../../../ImagePreviewDialog';

export default function ViewFile({ files }) {
	const media = useSelector(({ chatApp }) => chatApp.chat?.media);
	const [open, setOpen] = useState(false);
	const [activtStep, setActivtStep] = useState(0);
	const openImage = index => {
		let selected = media.files.filter(file => file.id === files[index].id)[0];
		// console.log(files[index], media.files, selected);
		if (selected) {
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
				isOpenViewFile={open}
				imagesArray={media.files}
				activtStep={activtStep}
				closeViewFile={() => setOpen(false)}
			/>
		</div>
	);
}
