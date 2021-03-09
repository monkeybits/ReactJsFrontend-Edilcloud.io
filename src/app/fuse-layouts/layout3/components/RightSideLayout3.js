import React from 'react';
import loadable from '@loadable/component';
const ChatPanel = loadable(() => import('app/fuse-layouts/shared-components/chatPanel/ChatPanel'))
const QuickPanel = loadable(() => import('app/fuse-layouts/shared-components/quickPanel/QuickPanel'))

function RightSideLayout3() {
	return (
		<>
			<ChatPanel />

			<QuickPanel />
		</>
	);
}

export default React.memo(RightSideLayout3);
