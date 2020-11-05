import React from 'react';
import ProjectTabs from './ProjectTabs';

export default function ProjectContent({value, setValue}) {
	return (
		<div className="flex flex-col w-full">
			<ProjectTabs {...{value, setValue}} />
		</div>
	);
}
