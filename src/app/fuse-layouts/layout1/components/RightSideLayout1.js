import ChatPanel from 'app/fuse-layouts/shared-components/chatPanel/ChatPanel';
import QuickPanel from 'app/fuse-layouts/shared-components/quickPanel/QuickPanel';
import NotificationPanel from 'app/fuse-layouts/shared-components/notification/Notification';
import AccessibilityPanel from 'app/fuse-layouts/shared-components/accessibility/Accessibility';
import React from 'react';

// import React from 'react';
// import loadable from '@loadable/component';
// const ChatPanel = loadable(() => import('app/fuse-layouts/shared-components/chatPanel/ChatPanel'))
// const QuickPanel = loadable(() => import('app/fuse-layouts/shared-components/quickPanel/QuickPanel'))
// const NotificationPanel = loadable(() => import('app/fuse-layouts/shared-components/notification/Notification'))
// const AccessibilityPanel = loadable(() => import('app/fuse-layouts/shared-components/accessibility/Accessibility'))


function RightSideLayout1(props) {
	return (
		<>
			<ChatPanel />

			<QuickPanel />

			<NotificationPanel />

			<AccessibilityPanel />
		</>
	);
}

export default React.memo(RightSideLayout1);
