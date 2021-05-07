import ChatPanel from 'app/fuse-layouts/shared-components/chatPanel/ChatPanel';
import QuickPanel from 'app/fuse-layouts/shared-components/quickPanel/QuickPanel';
import NotificationPanel from 'app/fuse-layouts/shared-components/notification/Notification';
import AccessibilityPanel from 'app/fuse-layouts/shared-components/accessibility/Accessibility';
import React from 'react';

// import React from 'react';
// // import loadable from '@loadable/component';
// const ChatPanel = React.lazy(() => import('app/fuse-layouts/shared-components/chatPanel/ChatPanel'))
// const QuickPanel = React.lazy(() => import('app/fuse-layouts/shared-components/quickPanel/QuickPanel'))
// const NotificationPanel = React.lazy(() => import('app/fuse-layouts/shared-components/notification/Notification'))
// const AccessibilityPanel = React.lazy(() => import('app/fuse-layouts/shared-components/accessibility/Accessibility'))

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
