import ImagePreviewDialog from 'app/ImagePreviewDialog';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CardAttachment from './CardAttachment';

export default function ViewFile({ files }) {
	const media = useSelector(({ chatAppProject }) => chatAppProject.chat?.media);
	const [open, setOpen] = useState(false);
	const [activtStep, setActivtStep] = useState(0);
	const openImage = index => {
		const selected = media.files.filter(file => file.id === files[index].id)[0];
		console.log(files[index], media.files, selected);
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
				nameSpace="chat_projects"
			/>
		</div>
	);
}
