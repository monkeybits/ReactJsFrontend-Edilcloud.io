import React from 'react';
// import loadable from '@loadable/component';
const ChatPanel = React.lazy(() => import('app/fuse-layouts/shared-components/chatPanel/ChatPanel'));
const QuickPanel = React.lazy(() => import('app/fuse-layouts/shared-components/quickPanel/QuickPanel'));

function RightSideLayout2() {
	return (
		<>
			<ChatPanel />

			<QuickPanel />
		</>
	);
}

export default React.memo(RightSideLayout2);
