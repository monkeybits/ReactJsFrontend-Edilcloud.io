import React from 'react';
import loadable from '@loadable/component';
const ProjectTabs = loadable(() => import('./ProjectTabs'));

export default function ProjectContent({ value, setValue, setOpenDialog }) {
	return (
		<div className="flex flex-col w-full">
			<ProjectTabs {...{ value, setValue, setOpenDialog }} />
		</div>
	);
}
