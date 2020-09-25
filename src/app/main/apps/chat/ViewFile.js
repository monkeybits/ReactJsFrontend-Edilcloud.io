import React from 'react';
import CardAttachment from './CardAttachment';

export default function ViewFile({ files }) {
	if (!files && !files.lenght) {
		return null;
	}
	return (
		<div>
			{files.map(item => (
				<CardAttachment
					item={item}
					card={{}}
					// makeCover={makeCover}
					// removeCover={removeCover}
					// removeAttachment={removeAttachment}
					key={item.id}
				/>
			))}
		</div>
	);
}
